import UserModel from './model.js';
import { IUser, IQueryArgs, IUserModel } from './types';
import { IProfile } from '../profile/types';

// maps the user as defined in Mongo to what we have in graphql,
// this allows for future logic using different login types
function userModelToQueryResult(user: IUserModel): Partial<IUser> {
  // TODO: add logic as other auth types are supported
  const email = user.local && user.local.email;

  return { email, id: user._id };
}

export default {
  Query: {
    async getUser(_: {}, { id }: IQueryArgs): Promise<Partial<IUser>> {

      // TODO: find out how to make this better ***
      const user = await UserModel.findById(id);
      
      if (!user) return {};

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
