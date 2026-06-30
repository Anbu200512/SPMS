import React, { forwardRef } from 'react';

const Select = forwardRef(({ label, name, error, options, placeholder, className, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={name}
        name={name}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 appearance-none bg-white ${
          error
            ? 'border-red-300 focus:ring-red-500 bg-red-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        {...props}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
