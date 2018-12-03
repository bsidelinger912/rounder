import { ApolloError, ForbiddenError } from 'apollo-server';

import Itinerary from './model';
import Profile from '../profile/model';
import { ICreateArgs, IQueryArgs, IItinerary} from './types';

import errorCodes from '../../errorCodes';
import { IGraphQlContext } from '../../../index';
import auth from '../../authenticateResolver.js';
import { userCanModifyProfile } from '../profile/util';

export default {
  Query: {
    itineraries() {
      return Itinerary.find();
    },
    itinerary(_: {}, { id }: IQueryArgs) {
      return Itinerary.findById(id);
    },
  },

  Mutation: {
    async createItinerary(_: {}, { input, profileId }: ICreateArgs, { res, req }: IGraphQlContext): Promise<IItinerary> {
      const thisUser = await auth(req, res);
      const profile = await Profile.findOne({ _id: profileId });

      if (!profile) {
        throw new ApolloError('Profile was not found', errorCodes.NOT_FOUND);
      }

      if (!userCanModifyProfile(thisUser, profile)) {
        throw new ForbiddenError('This profile does not belong to you');
      }

      try {
        const itinerary = await Itinerary.create(input);
        
        if (!profile.itineraries) {
          profile.itineraries = [];
        }

        profile.itineraries.push(itinerary);

        await profile.save();

        return itinerary;

      } catch (e) {
        throw new ApolloError('Failed to create itinerary', errorCodes.DB_ERROR);
      }
    },
  },
};
