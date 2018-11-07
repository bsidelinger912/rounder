const User = require('./model.js');

// maps the user as defined in Mongo to what we have in graphql,
// this allows for future logic using different login types
function userModelToQueryResult(user) {
  return { id: user._id, email: user.local.email };// eslint-disable-line no-underscore-dangle
}

module.exports = {
  Query: {
    getUser(root, { id }) {
      return User.findById(id).then(userModelToQueryResult);
    },
  },

  User: {
    profiles(user) {
      return new Promise((resolve, reject) => {
        User.findById(user.id)
          .populate('profiles', ['name', 'description'])
          .exec((err, populatedUser) => {
            if (err) {
              reject(err);
            }

            return resolve(populatedUser.profiles);
          });
      });
    },
  },
};
