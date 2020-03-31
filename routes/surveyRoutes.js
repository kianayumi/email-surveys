const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

// Creating a survey and sending emails
module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;
    // Make sure user is authenticated
    // Make sure user has enough credits
    const survey = new Survey({
      title,
      subject,
      body,
      // Creates an obj w key of email and value of user's email
      // Splitting emails up by commas (split) & taking out spaces (trim)
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      // Mongoose models automatically generate IDs (referring to that ID)
      _user: req.user.id,
      dateSent: Date.now()
    });
    // Survey created, time to send an email!
    // Use 'new' keyword when wanting to create new instance of a class
    // Args are survey content and HTML to show in body of email
    const mailer = new Mailer(survey, surveyTemplate(survey));
  });
};
