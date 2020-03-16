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
const app = express();

// Route handler
app.get('/', (rec, res) => {
  res.send({ Peter: 'I love you' });
});

// Dynamically figures out which port to listen to
// When Heroku runs app & injects environment variables (vars set in underlying
// runtime that Node runs on), Heroku doesn't know what port will be until runtime
// If running in dev enviro, run in port 5000
const PORT = process.env.PORT || 5000;

// Express telling Node to listen in on the designated port
app.listen(PORT);
