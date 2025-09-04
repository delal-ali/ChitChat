import React, { useState } from 'react';
import InputField from './InputField';

const PasswordField = ({ label = 'Password', name, placeholder, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="relative w-full mb-4">
      <InputField
        label={label}
        type={showPassword ? 'text' : 'password'}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
        className="pr-20" 
      />

      <button
        type="button"
        onClick={togglePassword}
        className="absolute right-3 top-[38px] md:top-[44px] text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white font-medium transition-colors"
      >
        {showPassword ? 'Hide' : 'Show'}
      </button>
    </div>
  );
};

export default PasswordField;
