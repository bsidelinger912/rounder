import * as passport from 'passport';
import { Request, Response } from 'express';

export default function auth(req: Request, res: Response) {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err) reject(err);
      if (user) resolve(user);
      else reject('Unauthorized');
    })(req, res);
  });
};
