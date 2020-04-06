// Contains logic to render a single label and text input

import React from 'react';

// Being rendered in redux-form's field, so inherits props
// Input, label, and meta destructured from props
// Error and Touched destructured from meta
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }} />
      {/* If touched (the form has been submitted) & there is an error (EX: no
        title), then error string is returned */}
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
