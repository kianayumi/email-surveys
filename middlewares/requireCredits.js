module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    // error status 403 means Forbidden
    return res.status(403).send({ error: 'Please purchase more credits.' });
  }
  next();
};
