const passport = require('passport');

// Exporting function when calling file
module.exports = app => {
  // Route handlers
  app.get(
    // Access URL path
    '/auth/google',
    // If someone initiates oauth with 'google', do this...
    passport.authenticate('google', {
      // Asking Google to give us access to user profile info & email
      scope: ['profile', 'email']
    })
  );

  // Converting user code into a user profile
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    // After user successfully logs in, where to go next?
    (req, res) => {
      // Responds to browser, redirecting to URL
      res.redirect('/surveys');
    }
  );

  // When user makes get request to routes, sign them out
  app.get('/api/logout', (req, res) => {
    // Passport automatially attaches logout fxn to req obj
    // Takes cookie w user's id & takes away id (not associated with user)
    req.logout();
    // Takes user to homepage after logging out
    res.redirect('/');
  });

  // Display the user which is currently signed in
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
