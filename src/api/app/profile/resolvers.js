const Profile = require('./model.js');

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
    createProfile(root, { input }) {
      return Profile.create(input);
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
