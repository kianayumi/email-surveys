// Shows users their form inputs for review

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey }) => {
  // '{ name, label }' destructured from field prop
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please review your entries:</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues)}
        className="green btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

// 'formValues' is being passed as props

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values
  };
}

// What first param (mapStateToProps) returns is sent to component
// (SurveyFormReview) as props (that's why we can destructure 'formValues' as
// an arg)

export default connect(mapStateToProps, actions)(SurveyFormReview);
