import Profile from './model';
import UserModel from '../user/model';
import { CreateArgs, QueryArgs, UpdateArgs} from './types';
// const auth = require('../../authenticateResolver.js');

export default {
  Query: {
    allProfiles() {
      return Profile.find();
    },
    getProfile(_: {}, { id }: QueryArgs) {
      return Profile.findById(id);
    },
  },

  Mutation: {
    // async createProfile(root, { input }, { req, res }) {
      /* try {
        const user = await auth(req, res);

        // does this profile belong to this user???

        return Profile.create({ ...input, userIds: [user._id] }); // eslint-disable-line
      } catch (e) {
        throw new Error(e);
      }*/
    async createProfile(_: {}, { input }: CreateArgs) {
      const userId = '5bdbe0e075d95e8db4a80bfb';

      // create the new profile
      const profile = await Profile.create(input);

      // save it to the user
      await UserModel.findOneAndUpdate({ _id: userId }, { $push: { profiles: profile } }, { new: true });

      return profile;
    },

    updateProfile(_: {}, { id, input }: UpdateArgs) {
      return Profile.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });
    },

    deleteProfile(_: {}, { id }: QueryArgs) {
      return Profile.findOneAndRemove({ _id: id });
    },
  },
};
