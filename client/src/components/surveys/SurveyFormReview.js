// Shows users their form inputs for review

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';

const SurveyFormReview = ({ onCancel, formValues }) => {
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
      <button className="yellow darken-3 btn-flat" onClick={onCancel}>
        Back
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

export default connect(mapStateToProps)(SurveyFormReview);
