import React from 'react';

const InputField = ({
  label,
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  error,
  className = '',
}) => {
  return (
    <div className={`flex flex-col w-full mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="mb-1 text-black font-medium">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 rounded-full border transition-colors duration-300
      focus:outline-none focus:ring-2 focus:ring-blue-500
      ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
      dark:bg-gray-700 dark:text-white
    `}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
