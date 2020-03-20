// Mogoose model class

const mongoose = require('mongoose');
// "const Schema = mongoose.Schema;"" same as :
const { Schema } = mongoose;

// Describes what every record looks like
const userSchema = new Schema({
  googleId: String
});

// Telling mongoose that we want to create a new collection called users
// Two args = load something into Mongoose
mongoose.model('users', userSchema);

// Not a require statement bc when testing, mongoose may think that
// multiple 'users' models are running and will throw an error
