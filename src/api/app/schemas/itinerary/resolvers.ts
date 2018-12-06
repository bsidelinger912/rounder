import { ApolloError, ForbiddenError } from 'apollo-server';

import Itinerary from './model';
import Profile from '../profile/model';
import { ICreateArgs, IQueryArgs, IItinerary, IUpdateArgs} from './types';

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
      return Itinerary.findById(id).populate('profile').exec();
    },
  },

  Mutation: {
    async createItinerary(_: {}, { input, profileId }: ICreateArgs, { res, req }: IGraphQlContext): Promise<IItinerary> {
      const thisUser = await auth(req, res);

      // TODO: it'd be nice to not populate admins as all we need is the ID, which we have without populating
      const profile = await Profile.findOne({ _id: profileId }).populate('admins', ['id']).exec();

      if (!profile) {
        throw new ApolloError('Profile was not found', errorCodes.NOT_FOUND);
      }

      if (!userCanModifyProfile(thisUser, profile)) {
        throw new ForbiddenError('This profile does not belong to you');
      }

      try {
        const itinerary = await Itinerary.create({ ...input, profile });
        
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

    async updateItinerary(_: {}, { id, input }: IUpdateArgs, {res, req}: IGraphQlContext): Promise<IItinerary> {
      // const thisUser = await auth(req, res);
      const itinerary = await Itinerary.findById(id).populate('profile').exec();

      if (!itinerary) {
        throw new ApolloError('Itinerary was not found', errorCodes.NOT_FOUND);
      }

      console.log('*****');
      console.log(itinerary);

      return itinerary;

    },

    async deleteItinerary(_: {}, { id }: IQueryArgs, { res, req }: IGraphQlContext): Promise<IItinerary> {
      const thisUser = await auth(req, res);
      const itinerary = await Itinerary.findById(id).populate('profile').exec();

      if (!itinerary) {
        throw new ApolloError('Itinerary was not found', errorCodes.NOT_FOUND);
      }

      // TODO: it'd be nice to not have to populate this as it gives you the IDs you need without doing so
      await itinerary.profile.populate('admins').execPopulate();

      if (!userCanModifyProfile(thisUser, itinerary.profile)) {
        throw new ForbiddenError('This itinerary does not belong to you');
      }

      // remove this itin from the profile
      const safeItinArray = (itinerary.profile.itineraries || []);
      const itinIndex = safeItinArray.findIndex(itin => itin.id = itinerary.id);
      if (itinIndex > -1) {
        safeItinArray.splice(itinIndex, 1);
        await itinerary.profile.save();
      }

      // now we can delete the itinerary itself
      await itinerary.delete();

      return itinerary;
    }
  },
};
