import React from 'react';

const SubmitButton = ({ text = 'Submit', disabled = false, className = '' }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`submit-button ${disabled ? 'disabled' : ''} ${className}`}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
