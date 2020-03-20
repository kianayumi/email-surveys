// ** to start server : "npm run dev" (nodemon will update server)
// ** to deploy : "git add .", "git commit -m '...'", "git push heroku master"

// Helper modules and business logic

// MongoDB records & stores all surveys & emails
// Express & Node communicate between UI (React & HTTP reqs) requests &
// MongoDB answers
// HTTP reqs > specific port on machine > Node > Express (Express routes >
// responses) > Node > port > response > HTTP req
// Node : JS runtime used to execute code outside of the browser (otherwise,
// JS is run w/in browser).
// Express : Library that runs in the Node runtime. Has collection of fxns (all
// in JS) to make dealing w HTTP traffic (of Node) easier. Looks at req & decides
// what piece of code will handle & respond. Our route handlers will process reqs
// and generate responses.

// Using common JS modules bc Node doesn't support import... (ES6)
const express = require('express');
//
const mongoose = require('mongoose');
// Gaining access to cookies (express nor passport do this)
// Processes incoming request, populates req.session prop & passport accesses
// req.session data
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// Don't need to set it to a variable bc file not returning anything
// Order is important! Need instance of user before using passport
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// 'app.use()' fires up middleware (small fxns used to modify incoming reqs to
// app before being sent to route handlers)

app.use(
  cookieSession({
    // How long cookie can exist in broswer before it expires
    // Math comes out to 30 days (time in milliseconds)
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // The cookie key needs to be encrypted so someone cannot find the cookie
    // and pretend to be another person
    keys: [keys.cookieKey]
  })
);

// Passport instructed to use cookies
app.use(passport.initialize());
app.use(passport.session());

// Instead of setting to var since only using once
// authRoutes file exports fxn & immediately calls w app
require('./routes/authRoutes')(app);

// Dynamically figures out which port to listen to
// When Heroku runs app & injects environment variables (vars set in underlying
// runtime that Node runs on), Heroku doesn't know what port will be until runtime
// If running in dev enviro, run in port 5000
const PORT = process.env.PORT || 5000;

// Express telling Node to listen in on the designated port
app.listen(PORT);
