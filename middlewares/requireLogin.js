// Next called when middleware completes
module.exports = (req, res, next) => {
  // If no user (nobody has logged in)
  if (!req.user) {
    // Send unauth error
    return res.status(401).send({ error: 'Please log in!' });
  }
  // Otherwise, proceed
  next();
};
