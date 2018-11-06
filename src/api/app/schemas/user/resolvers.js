const User = require('./model.js');

module.exports = {
  Query: {
    getUser(root, { id }) {
      return new Promise((resolve, reject) => {
        User.findById(id) // eslint-disable-line no-underscore-dangle
          .populate('profiles', ['name', 'description'])
          .exec((err, user) => {
            if (err) {
              reject(err);
            }

            return resolve({ email: user.local.email, profiles: user.profiles });
          });
      });
    },
  },
};
