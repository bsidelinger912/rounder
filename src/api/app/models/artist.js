// load the things we need
const mongoose = require('mongoose');

// define the schema for our user model
const artistSchema = mongoose.Schema({
  local: {
    name: String,
    description: String,
  },
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Artist', artistSchema);
