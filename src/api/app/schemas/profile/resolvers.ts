import { ApolloError, ForbiddenError } from 'apollo-server';

import Profile from './model';
// import UserModel from '../user/model';
import { ICreateArgs, IQueryArgs, IUpdateArgs, IProfile, IProfileModel} from './types';
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

        if (!user.profiles) {
          user.profiles = [];
        }

        // save it to the user
        user.profiles.push(profile);
        await user.save();

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

      if (profile.users.find(user => user.id === thisUser.id)) {
        profile.set(input);
        await profile.save();

        return profile;
      } else {
        throw new ForbiddenError('This profile does not belong to you');
      }
    },

    async deleteProfile(_: {}, { id }: IQueryArgs, { res, req }: IGraphQlContext) {
      const thisUser = await auth(req, res);

      const profile = await Profile.findOne({ _id: id }).populate('users', ['id']).exec();
     
      if (!profile) {
        throw new ApolloError('Profile was not found', errorCodes.NOT_FOUND);
      }

      if (profile.users.find(user => user.id === thisUser.id)) {
        if (profile.users.length < 2) {
          await profile.delete();
        } else {
          // If there are other users, just remove this one
          // TODO: test this!!!!!!!!
          profile.set({ $pull: { users: { id: thisUser.id } } });

          await profile.save();
        }

        return profile;
      } else {
        throw new ForbiddenError('This profile does not belong to you');
      }
    },

    async restoreProfile(_: {}, { id }: IQueryArgs) {
      const profile = await (Profile as any as IProfileModel).findOneWithDeleted({ _id: id }).populate('users', ['id']).exec();

      if (!profile) {
        throw new ApolloError('Profile was not found', errorCodes.NOT_FOUND);
      }

      // See if we need to just add the user, or totally restore it ********

      await profile.restore();
      
      return profile;
    },
  },
};
