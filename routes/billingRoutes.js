const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

// Handles API reqs from payment info input
module.exports = app => {
  // Whenever a POST req is made, run requireLogin fxn
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // Bill the user for $5
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });
    // Reference to current user model
    // Updates user on how many credits they have
    req.user.credits += 5;
    // Set user model to updated val
    const user = await req.user.save();
    // Data we want to send back to browser
    res.send(user);
  });
};
