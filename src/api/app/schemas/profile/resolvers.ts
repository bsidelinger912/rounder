import Profile from './model';
import UserModel from '../user/model';
import { ICreateArgs, IQueryArgs, IUpdateArgs, IProfile, IProfileModel} from './types';
// const auth = require('../../authenticateResolver.js');

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
    // async createProfile(root, { input }, { req, res }) {
      /* try {
        const user = await auth(req, res);

        // does this profile belong to this user???

        return Profile.create({ ...input, userIds: [user._id] }); // eslint-disable-line
      } catch (e) {
        throw new Error(e);
      }*/
    async createProfile(_: {}, { input }: ICreateArgs): Promise<IProfile> {
      const userId = '5bdbe0e075d95e8db4a80bfb';

      // create the new profile
      const profile = await Profile.create(input);

      // save it to the user
      await UserModel.findOneAndUpdate({ _id: userId }, { $push: { profiles: profile } }, { new: true });

      return profile;
    },

    updateProfile(_: {}, { id, input }: IUpdateArgs) {
      return Profile.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });
    },

    async deleteProfile(_: {}, { id }: IQueryArgs) {
      const profile = await Profile.findOne({ _id: id });
      await (profile as any as IProfileModel).delete();
      return profile;
    },

    async restoreProfile(_: {}, { id }: IQueryArgs) {
      const profile = await Profile.findOne({ _id: id });
      await (Profile.findOne({ _id: id }) as any as IProfileModel).restore();
      return profile;
    },
  },
};
