import * as mongoose from 'mongoose';

// TODO: make a types file?
const mongooseDelete = require('mongoose-delete');

import { IItineraryModel } from './types';

const ItinerarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  /* waypoints: [{
    type: (mongoose.Schema as any).ObjectId,
    ref: 'Waypoint',
  }],*/
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});


ItinerarySchema.plugin(mongooseDelete, { overrideMethods: 'all' }); // , { deletedBy : true });

// TODO is this really needed?
ItinerarySchema.virtual('id').get(function(this: any) {
  return this._id;
});

export default mongoose.model<IItineraryModel>('Itinerary', ItinerarySchema);
