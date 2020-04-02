const sendgrid = require('sendgrid');
// Called 'helper' bc helper obj that helps to create the mailer
const helper = sendgrid.mail;
const keys = require('../config/keys');

// 'helper.Mail' prop is an obj that takes in configuration & gives back a Mailer
// We want to take Mail class and add customization (taking Mail obj & customizing)
// Called from surveyRoutes as new instance of class, so must have constructor
class Mailer extends helper.Mail {
  // Created minimal args bc reusable component
  constructor({ subject, recipients }, content) {
    // Using 'this', need to call super first
    super();

    // SendGrid sends obj to communicate w API
    // SendGrid-specific
    this.sgApi = sendgrid(keys.sendGridKey);
    // Who email is sent from
    this.from_email = new helper.Email('no-reply@emailsurveys.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    // An array of helper objs from formatAddresses
    this.recipients = this.formatAddresses(recipients);
    // addContent is Mailer helper fxn, has to be called w body of content
    this.addContent(this.body);
    // Enable click-tracking (SendGrid tracks links)
    this.addClickTracking();
    this.addRecipients();
  }
  formatAddresses(reciepients) {
    // For every email, extracting email prop
    return reciepients.map(({ email }) => {
      // Formatting w email helper
      return new helper.Email(email);
    });
  }
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      // Adding each recipient to the personalize obj
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }
  // Sending email instructions
  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });
    const response = await this.sgApi.API(request);
    return respond;
  }
}

module.exports = Mailer;
