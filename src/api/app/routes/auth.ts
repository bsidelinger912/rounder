import * as passport from 'passport';
import * as passportJWT from 'passport-jwt';
import * as jwt from 'jsonwebtoken';
import { Express } from 'express';

import UserModel, { generateHash } from '../schemas/user/model';
import { IUserInternal, IUserModel } from '../schemas/user/types';
import errorCodes from '../errorCodes.js';

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

export default (app: Express) => {
  const jwtOptions: passportJWT.StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    
    // TODO: secure further?
    secretOrKey: 'roundersgetaround'
  };

  // Strategy
  passport.use(new JwtStrategy(jwtOptions, (jwtPayload, next) => {
    UserModel.findOne({ 'local.email': jwtPayload.id }, (err, user: IUserInternal) => {
      if (!err && user) {
        next(null, user);
      } else {
        next(null, false);
      }
    });
  }));


  // Login
  app.post('/login', (req, res) => {
    UserModel.findOne({ 'local.email': req.body.email }, (err, user: IUserModel) => {
      if (!user) {
        return res.status(401).json({ message: 'no such user found' });
      }

      const email = user.local && user.local.email;

      if (user.validPassword(req.body.password)) {
        const payload = { id: email };
        const token = jwt.sign(payload, jwtOptions.secretOrKey as string);

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
      UserModel.findOne({ 'local.email': req.body.email }, (err, user) => {
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
        const newUserData: IUserInternal = {
          local: {
            email: req.body.email,
            password: generateHash(req.body.password),
          },
        };

        const newUser = new UserModel(newUserData);

        // save the user
        return newUser.save((error: any) => {
          if (error) {
            return res.status(500).json({ message: 'error connecting saving user to the database', error: err, code: errorCodes.DB_ERROR });
          }

          const payload = { id: (newUser as any).local.email };
          const token = jwt.sign(payload, jwtOptions.secretOrKey as string);

          return res.json({ token, message: 'user created', success: true });
        });
      });
    }
  });
};
