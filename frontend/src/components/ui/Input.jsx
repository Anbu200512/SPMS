import React, { forwardRef } from 'react';

const Input = forwardRef(
  (
    {
      label,
      name,
      type = 'text',
      error,
      helperText,
      icon,
      className,
      placeholder,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {icon}
            </div>
          )}
          {type === 'textarea' ? (
            <textarea
              ref={ref}
              id={name}
              name={name}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none ${
                icon ? 'pl-10' : ''
              } ${
                error
                  ? 'border-red-300 focus:ring-red-500 bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              rows={4}
              placeholder={placeholder}
              {...props}
            />
          ) : type === 'file' ? (
            <input
              ref={ref}
              id={name}
              name={name}
              type="file"
              className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 ${
                error ? 'border-red-300' : ''
              }`}
              {...props}
            />
          ) : (
            <input
              ref={ref}
              id={name}
              name={name}
              type={type}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                icon ? 'pl-10' : ''
              } ${
                error
                  ? 'border-red-300 focus:ring-red-500 bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              placeholder={placeholder}
              {...props}
            />
          )}
        </div>
        {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
