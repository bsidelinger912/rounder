import UserModel from './model.js';
import { User, QueryArgs } from './types';

// maps the user as defined in Mongo to what we have in graphql,
// this allows for future logic using different login types
function userModelToQueryResult(user: User | null): Partial<User> | null {
  if (!user) return null;

  // TODO: add logic as other auth types are supported
  const email = user.local && user.local.email;

  return { email, id: user._id };
}

export default {
  Query: {
    async getUser(_: {}, { id }: QueryArgs) {

      // TODO: find out how to make this better ***
      const user = await UserModel.findById(id) as any as User;
      
      if (!user) return {};

      return userModelToQueryResult(user);
    },
  },

  User: {
    profiles(user: User) {
      return new Promise((resolve, reject) => {
        UserModel.findById(user.id)
          .populate('profiles', ['name', 'description'])
          .exec((err, populatedUser: User) => {
            if (err) {
              reject(err);
            }

            return resolve(populatedUser.profiles);
          });
      });
    },
  },
};
