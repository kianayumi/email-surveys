// Shows a form for user to add input

import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import SurveyNew from './SurveyNew';

const FIELDS = [
  {
    label: 'Survey Title',
    name: 'title',
    missingInputError: 'Please provide a title.'
  },
  {
    label: 'Subject Line',
    name: 'subject',
    missingInputError: 'Please provide a subject.'
  },
  {
    label: 'Email Body',
    name: 'body',
    missingInputError: 'Please provide an email body.'
  },
  {
    label: 'Recipient List',
    name: 'emails',
    missingInputError: 'Please provide recipient email addresses.'
  }
];

class SurveyForm extends Component {
  renderFields() {
    // Iterate over FIELDS array & carry out fxn, returned from renderFields fxn
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        {/* Passing function into onSubmit means that it will auto be called when
        form is submitted */}
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

// Validate fxn has 'values' arg that hold values obj from form
function validate(values) {
  // Redux-forms sees values w/in obj & note that these form vals are invalid
  const errors = {};

  // Calling validateEmails fxn w/ list of emails
  // If an invalid email exists, will return message w/ invalid emails
  // Otherwise, returns undef (bc 'errors' prop only cares if it has values
  // assigned to it)
  // values.emails || '' bc validate auto runs upon boot-up, so will throw error
  // if no emails submitted
  errors.emails = validateEmails(values.emails || '');

  // For every field w/in FIELDS arr, execute arrow fxn
  _.each(FIELDS, ({ name, missingInputError }) => {
    // Looking at value of 'name' at RUN TIME
    // values.name refers to name prop
    if (!values[name]) {
      errors[name] = missingInputError;
    }
  });

  return errors;
}
// reduxForm takes in single arg (form)
export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
