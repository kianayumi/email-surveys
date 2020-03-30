// Google OAuth managed by Passport
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
// Keys.js houses all sensitive user info
const keys = require('../config/keys');

// One arg = trying to load something into Mongoose
// 'User' obj is user class (can be used to create new model instance)
const User = mongoose.model('users');

// 'user' is the same as from 'new User' (mongoose model instance)
// Use 'user' to generate an identifying piece of info for passport to set up a cookie
passport.serializeUser((user, done) => {
  // Using 'user.id' instead of googleId bc if user signs in w another provider
  // (EX: Facebook or LinkedIn), want to just keep track of person, not provider
  // Second arg : what to send in cookie
  done(null, user.id);
});

// Tell passport that it needs to use cookies to keep track of
// currently-signed-in user (manage authentication)

// Use id from cookie to convert into user model
// First arg : what was sent in cookie
passport.deserializeUser((id, done) => {
  // Pass in id of record we want to find
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Google O-Auth (configuring passport)
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: keys.googleRedirectURI
      // If our request runs thru a proxy, continue with the req
      // Without, URL may change (EX: http to https), and 404 error
      // proxy: true
    },
    // User's profile info that was requested is returned
    async (accessToken, refreshToken, profile, done) => {
      // Don't want duplicate records (if a user logs in multiple times, they
      // should only have one record created), so check to see if they exist in
      // the db before creating a record
      // Query returns Promise (async)
      // prior to asunc-await refactor :
      // User.findOne({ googleId: profile.id }).then(existingUser => {
      const existingUser = await User.findOne({ googleId: profile.id });
      // existingUser refers to a model instance (one record) that represents
      // a user whose googleId = profile.id ; otherwise, if no user found,
      // existingUser = null
      if (existingUser) {
        // 'Done' tells passport to proceed with user authentication flow
        // First arg : error object (tells passport that something went wrong)
        // null means that everything went okay
        // Second arg : user record
        done(null, existingUser);
      } else {
        // Creating record ("model instance") in our db
        // new User({ googleId: profile.id })
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
        // Async, creating callback bc this 'user' has returned from db &
        // may be more up-to-date than existingUser
      }
    }
  )
);
