import { ApolloError, ForbiddenError } from 'apollo-server';

import Profile from './model';
// import UserModel from '../user/model';
import { ICreateArgs, IQueryArgs, IUpdateArgs, IProfile, IProfileModel} from './types';
import { userCanModifyProfile, addProfileToUser, removeProfileFromUser, userCanConnectToProfile, removeUserFromProfile, addUserToProfile } from './util';

import errorCodes from '../../errorCodes';
import { IGraphQlContext } from '../../../index';
import auth from '../../authenticateResolver.js';

const UserDisconnectDelayMs = 30000;

// TODO: get error handling dialed
// https://blog.apollographql.com/full-stack-error-handling-with-graphql-apollo-5c12da407210

export default {
  Query: {
    profiles() {
      return Profile.find();
    },
    profile(_: {}, { id }: IQueryArgs) {
      return Profile.findById(id);
    },
  },

  Mutation: {
    async createProfile(_: {}, { input }: ICreateArgs, { res, req }: IGraphQlContext): Promise<IProfile> {
      const user = await auth(req, res);

      try {
        // create the new profile
        const profile = await Profile.create({ 
          ...input,
          admins: [user],
        });

        await addProfileToUser(user, profile);

        return profile;
      } catch(e) {
        throw new ApolloError('Failed to create profile', errorCodes.DB_ERROR);
      }
    },

    async updateProfile(_: {}, { id, input }: IUpdateArgs, { res, req }: IGraphQlContext): Promise<IProfile> {
      const thisUser = await auth(req, res);

      const profile = await Profile.findOne({ _id: id }).populate('users', ['id']).exec();

      if (!profile) {
        throw new ApolloError('Profile was not found', errorCodes.NOT_FOUND);
      }

      if (!userCanModifyProfile(thisUser, profile)) {
        throw new ForbiddenError('This profile does not belong to you');
      }

      profile.set(input);
      await profile.save();

      return profile;
    },

    async deleteProfile(_: {}, { id }: IQueryArgs, { res, req }: IGraphQlContext): Promise<IProfile> {
      const thisUser = await auth(req, res);

      const profile = await Profile.findOne({ _id: id }).populate('admins', ['id']).exec();
     
      if (!profile) {
        throw new ApolloError('Profile was not found', errorCodes.NOT_FOUND);
      }

      if (!userCanModifyProfile(thisUser, profile)) {
        throw new ForbiddenError('This profile does not belong to you');
      }

      await profile.delete();

      // disconnect all users
      const promises = profile.admins.map(user => removeProfileFromUser(user, profile));
      await Promise.all(promises);

      return profile;
    },

    async restoreProfile(_: {}, { id }: IQueryArgs, { res, req }: IGraphQlContext): Promise<IProfile> {
      const thisUser = await auth(req, res);
      const profile = await (Profile as any as IProfileModel).findOneWithDeleted({ _id: id }).populate('admins', ['id']).exec() as IProfileModel;

      if (!profile) {
        throw new ApolloError('Profile was not found', errorCodes.NOT_FOUND);
      }

      if (!userCanModifyProfile(thisUser, profile)) {
        throw new ForbiddenError('This profile does not belong to you');
      }
      
      await profile.restore();
      
      // reconnect all users
      const promises = profile.admins.map(user => addProfileToUser(user, profile));
      await Promise.all(promises);
      
      return profile;
    },

    async disconnectFromProfile(_: {}, { id }: IQueryArgs, { res, req }: IGraphQlContext): Promise<void> {
      const thisUser = await auth(req, res);
      const profile = await (Profile as any as IProfileModel).findOneWithDeleted({ _id: id }).populate('admins', ['id']).exec() as IProfileModel;
      
      if (!profile) {
        throw new ApolloError('Profile was not found', errorCodes.NOT_FOUND);
      }

      await removeProfileFromUser(thisUser, profile);

      // they have a little time to undo the disconnect, but after that they need a grant of access from another admin
      setTimeout(() => removeUserFromProfile(thisUser, profile), UserDisconnectDelayMs);
    },

    async reconnectToProfile(_: {}, { id }: IQueryArgs, { res, req }: IGraphQlContext): Promise<void> {
      const thisUser = await auth(req, res);
      const profile = await (Profile as any as IProfileModel).findOneWithDeleted({ _id: id }).populate('admins', ['id']).exec() as IProfileModel;
      
      if (!profile) {
        throw new ApolloError('Profile was not found', errorCodes.NOT_FOUND);
      }

      // TODO: make this smarter when there are different relationships
      if (!userCanConnectToProfile(thisUser, profile)) {
        throw new ForbiddenError('This profile does not belong to you');
      }

      await Promise.all([addProfileToUser(thisUser, profile), addUserToProfile(thisUser, profile)]);
    },
  },
};
