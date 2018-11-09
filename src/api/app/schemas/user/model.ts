// load the things we need
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

import { IUserModel } from './types';

require('../profile/model');

const userSchema = new mongoose.Schema({
  local: {
    email: String,
    password: String,
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String,
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
  profiles: [{
    type: (mongoose.Schema as any).ObjectId,
    ref: 'Profile',
  }],
});

export function generateHash(password: string): string {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

userSchema.methods.validPassword = function validPassword(password: string) {
  return bcrypt.compareSync(password, this.local.password);
};

export default mongoose.model<IUserModel>('User', userSchema);
