// ** to start server : "npm run dev" (nodemon will update server)
// ** to deploy : (in client) "npm run build", "git add .", "git commit -m '...'", "git push heroku master", "heroku open"

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
// Express server sends JSON data : MongoDB > server > JSON > browser
// React server send frontend assets (Express server sends data assets)
// ** to start Express server : (in "scripts" { "client": "npm run start --prefix client" })
const express = require('express');
//
const mongoose = require('mongoose');
// Gaining access to cookies (express nor passport do this)
// Processes incoming request, populates req.session prop & passport accesses
// req.session data
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
// Don't need to set it to a variable bc file not returning anything
// Order is important! Need instance of user before using passport
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// 'app.use()' fires up middleware (small fxns used to modify incoming reqs to
// app before being sent to route handlers)

// middleware can intercept every incoming req & can be instructed to handle a
// single req

// All reqs made to body (PUT, POST, PATCH) are assigned to req.body
app.use(bodyParser.json());

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
// routes files exports fxns & immediately calls w app
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./services/emailTemplates/surveyTemplate')(app);

// Config to make sure that Express runs correctly in prod enviro
if (process.env.NODE_ENV === 'production') {
  // Express will serve up prod assets (main.js or main.css)
  // If route GET req comes in & don't have route handler, look in client/build
  // directory to see if a file matches, if not then continues
  app.use(express.static('client/build'));
  // Express will serve up index.html if route not recognized
  // ~ catch-all if no other route w/in code can handle req
  const path = require('path');
  app.get('*', (req, res) => {
    res.send(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Dynamically figures out which port to listen to
// When Heroku runs app & injects environment variables (vars set in underlying
// runtime that Node runs on), Heroku doesn't know what port will be until runtime
// If running in dev enviro, run in port 5000
const PORT = process.env.PORT || 5000;

// Express telling Node to listen in on the designated port
app.listen(PORT);
