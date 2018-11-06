// load the things we need
const mongoose = require('mongoose');

// define the schema for our user model
const profileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});


profileSchema.virtual('id').get(function() { // eslint-disable-line
  return this._id; // eslint-disable-line
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Profile', profileSchema);
