import * as passport from 'passport';
import { Request, Response } from 'express';
import { AuthenticationError } from 'apollo-server';

import { IUserModel } from './schemas/user/types';

export default function auth(req: Request, res: Response): Promise<IUserModel> {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err) reject(err);
      if (user) resolve(user);
      else reject(new AuthenticationError('Authentication Failed'));
    })(req, res);
  });
};
