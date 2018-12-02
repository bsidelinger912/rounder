import { ApolloError, ForbiddenError } from 'apollo-server';

import Profile from './model';
// import UserModel from '../user/model';
import { ICreateArgs, IQueryArgs, IUpdateArgs, IProfile, IProfileModel} from './types';
import { userCanModifyProfile, addProfileToUser, removeProfileFromUser } from './util';

import errorCodes from '../../errorCodes';
import { IGraphQlContext } from '../../../index';
import auth from '../../authenticateResolver.js';

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
          users: [user],
        });

        await addProfileToUser(user, profile);

        return profile;
      } catch(e) {
        throw new ApolloError('Failed to create profile', errorCodes.DB_ERROR);
      }
    },

    async updateProfile(_: {}, { id, input }: IUpdateArgs, { res, req }: IGraphQlContext) {
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

    async deleteProfile(_: {}, { id }: IQueryArgs, { res, req }: IGraphQlContext) {
      const thisUser = await auth(req, res);

      const profile = await Profile.findOne({ _id: id }).populate('users', ['id']).exec();
     
      if (!profile) {
        throw new ApolloError('Profile was not found', errorCodes.NOT_FOUND);
      }

      if (!userCanModifyProfile(thisUser, profile)) {
        throw new ForbiddenError('This profile does not belong to you');
      }


      // Remove this profile from the denormalized user object
      await removeProfileFromUser(thisUser, profile);
      
      // only actually delete it if this is the last user
      if (profile.users.length < 1) {
        await profile.delete();
      }

      return profile;
    },

    async restoreProfile(_: {}, { id }: IQueryArgs, { res, req }: IGraphQlContext) {
      const thisUser = await auth(req, res);
      const profile = await (Profile as any as IProfileModel).findOneWithDeleted({ _id: id }).populate('users', ['id']).exec() as IProfileModel;

      if (!profile) {
        throw new ApolloError('Profile was not found', errorCodes.NOT_FOUND);
      }

      if (!userCanModifyProfile(thisUser, profile)) {
        throw new ForbiddenError('This profile does not belong to you');
      }

      await addProfileToUser(thisUser, profile);

      // If it wasn't fully deleted (due to other users), we just have to add it pack to the user record
      if (profile.deleted) {
        await profile.restore();
      }
      
      return profile;
      
    },
  },
};
