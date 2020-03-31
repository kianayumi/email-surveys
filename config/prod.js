// Export an obj (values from env vars w/in Heroku enviro)

module.exports = {
  // 'process.env' = look up my enviro vars
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  // Random string of chars
  cookieKey: process.env.COOKIE_KEY,
  googleRedirectURI: 'https://floating-fjord-33999.herokuapp.com',
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  sendGridKey: process.env.SEND_GRID_KEY
};
