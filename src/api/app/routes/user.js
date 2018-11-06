const passport = require('passport');

const User = require('../schemas/user/model');

module.exports = (app) => {
  app.get('/user', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findById(req.user._id) // eslint-disable-line no-underscore-dangle
      .populate('profiles', ['name']) // <-- only return the Artists name
      .exec((err, user) => {
        if (err) {
          return res.status(500).json({ error: err });
        }

        return res.json({ user: { email: user.local.email, profiles: user.profiles } });
      });
  });
};
