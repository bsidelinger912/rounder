import * as mongoose from 'mongoose';

import { IProfileModel } from './types';

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

// TODO does "this" work this way?
profileSchema.virtual('id').get(function(this: any) {
  return this._id;
});

export default mongoose.model<IProfileModel>('Profile', profileSchema);
