const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  // An array containing a list of recipients
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  // Est relationship btn a given Schema and a given user
  // 'Schema.Types.ObjectId' refers to ID of user
  // 'User' means that ref we're making it to is from User collection
  // '_' bc setting up relationship btn this model and another
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema);
