// Figure out what set of credentials to return (depending on prod or dev enviro)

// When servers deployed to Heroku, there's an enviro var named node_env, tells
// if in dev or prod enviro

if (process.env.NODE_ENV === 'production') {
  // We are in production - return the prod keys
  // Bring in prod keys and immediately export
  module.exports = require('./prod');
} else {
  // We are in dev - return the dev keys
  // Bring in dev keys and immediately export
  module.exports = require('./dev');
}
