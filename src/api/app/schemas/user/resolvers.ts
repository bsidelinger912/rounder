import UserModel from './model.js';
import { IUser, IQueryArgs, IUserModel } from './types';
import { IProfile } from '../profile/types';
import { IGraphQlContext } from '../../../index';
import auth from '../../authenticateResolver';

// maps the user as defined in Mongo to what we have in graphql,
// this allows for future logic using different login types
function userModelToQueryResult(user: IUserModel): Partial<IUser> {
  // TODO: add logic as other auth types are supported
  const email = user.local && user.local.email;

  return { email, id: user._id };
}

export default {
  Query: {
    async user(_: {}, { id }: IQueryArgs, { res, req }: IGraphQlContext): Promise<Partial<IUser>> {

      let user: IUserModel | null;

      if (id) {
        user = await UserModel.findById(id);
      } else {
        user = await auth(req, res);
      }
      
      if(!user) {
        // TODO: split to the logic?
        throw new Error('either the id passed was not found or you are unauthenticated');
      }

      return userModelToQueryResult(user);
    },
  },

  User: {
    profiles(user: IUser): Promise<IProfile[]> {
      return new Promise((resolve, reject) => {
        UserModel.findById(user.id)
          .populate('profiles', ['name', 'description'])
          .exec((err, populatedUser: IUser) => {
            if (err) {
              reject(err);
            }

            resolve(populatedUser.profiles);
          });
      });
    },
  },
};
