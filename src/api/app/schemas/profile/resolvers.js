const Profile = require('./model');
const User = require('../user/model');
// const auth = require('../../authenticateResolver.js');

module.exports = {
  Query: {
    allProfiles() {
      return Profile.find();
    },
    getProfile(root, { id }) {
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
    async createProfile(root, { input }) {
      const userId = '5bdbe0e075d95e8db4a80bfb';

      // create the new profile
      const profile = await Profile.create(input);

      // save it to the user
      await User.findOneAndUpdate({ _id: userId }, { $push: { profiles: profile } }, { new: true });

      return profile;
    },

    updateProfile(root, { id, input }) {
      return Profile.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });
    },

    deleteProfile(root, { id }) {
      return Profile.findOneAndRemove({ _id: id });
    },
  },
};
