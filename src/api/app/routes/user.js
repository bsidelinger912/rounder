const passport = require('passport');

// const User = require('../models/user');

module.exports = (app) => {
  app.get('/user', passport.authenticate('jwt', { session: false }), (req, res) => {
    // console.log(req.user);
    res.json({ user: req.user });
  });
};
