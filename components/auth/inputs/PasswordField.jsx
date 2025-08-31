import React, { useState } from 'react';
import InputField from './InputField';

const PasswordField = ({ label = 'Password', name, placeholder, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="password-field">
      <InputField
        label={label}
        type={showPassword ? 'text' : 'password'}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
      />
      <button
        type="button"
        className="toggle-password-btn"
        onClick={togglePassword}
      >
        {showPassword ? 'Hide' : 'Show'}
      </button>
    </div>
  );
};

export default PasswordField;
