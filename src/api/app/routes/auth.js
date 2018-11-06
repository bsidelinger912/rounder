const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

const errorCodes = require('../errorCodes.js');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const User = require('../schemas/user/model');

module.exports = (app) => {
  const jwtOptions = {};
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  jwtOptions.secretOrKey = 'tasmanianDevil';


  // Strategy
  passport.use(new JwtStrategy(jwtOptions, (jwtPayload, next) => {
    User.findOne({ 'local.email': jwtPayload.id }, (err, user) => {
      if (!err && user) {
        next(null, user);
      } else {
        next(null, false);
      }
    });
  }));


  // Login
  app.post('/login', (req, res) => {
    User.findOne({ 'local.email': req.body.email }, (err, user) => {
      if (!user) {
        return res.status(401).json({ message: 'no such user found' });
      }

      if (user.validPassword(req.body.password)) {
        const payload = { id: user.local.email };
        const token = jwt.sign(payload, jwtOptions.secretOrKey);

        return res.json({ success: true, message: 'ok', token });
      }

      return res.status(401).json({ message: 'passwords did not match', code: errorCodes.BAD_PASSWORD });
    });
  });


  // Signup
  app.post('/signup', (req, res) => {
    if (!req.body.email || !req.body.password) {
      res.status(400).json({ message: 'you must pass both email and password', code: errorCodes.BAD_REQUEST });
    } else {
      User.findOne({ 'local.email': req.body.email }, (err, user) => {
        // if there are any errors, return the error
        if (err) {
          return res.status(500).json({ message: 'error connecting to the database', error: err, code: errorCodes.DB_ERROR });
        }

        // check to see if theres already a user with that email
        if (user) {
          return res.status(400).json({ message: 'That email is already taken', code: errorCodes.USER_TAKEN });
        }

        // if there is no user with that email
        // create the user
        const newUser = new User();

        // set the user's local credentials
        newUser.local.email = req.body.email;
        newUser.local.password = newUser.generateHash(req.body.password);

        // save the user
        return newUser.save((error) => {
          if (error) {
            return res.status(500).json({ message: 'error connecting saving user to the database', error: err, code: errorCodes.DB_ERROR });
          }

          const payload = { id: newUser.local.email };
          const token = jwt.sign(payload, jwtOptions.secretOrKey);

          return res.json({ token, message: 'user created', success: true });
        });
      });
    }
  });

  app.get('/secret', passport.authenticate('jwt', { session: false }), (req, res) => {
    // console.log(req.user);
    res.json('Success! You can not see this without a token');
  });
};
