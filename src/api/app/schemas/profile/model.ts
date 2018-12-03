import * as mongoose from 'mongoose';

// TODO: make a types file?
const mongooseDelete = require('mongoose-delete');

import { IProfileModel } from './types';

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  admins: [{
    type: (mongoose.Schema as any).ObjectId,
    ref: 'User',
  }],
  itineraries: [{
    type: (mongoose.Schema as any).ObjectId,
    ref: 'Itinerary',
  }],
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});


ProfileSchema.plugin(mongooseDelete, { overrideMethods: 'all' }); // , { deletedBy : true });

// TODO does "this" work this way?
ProfileSchema.virtual('id').get(function(this: any) {
  return this._id;
});

export default mongoose.model<IProfileModel>('Profile', ProfileSchema);
