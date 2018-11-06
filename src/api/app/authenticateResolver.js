const passport = require('passport');

module.exports = function auth(req, res) {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err) reject(err);
      if (user) resolve(user);
      else reject('Unauthorized');
    })(req, res);
  });
};
