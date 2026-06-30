import React from 'react';
import { HiOutlineSearch, HiOutlinePlus } from 'react-icons/hi';
import Button from '../ui/Button';

const ActionBar = ({
  searchPlaceholder = 'Search...',
  searchValue,
  onSearchChange,
  filters,
  onAdd,
  addLabel = 'Add New',
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex flex-1 items-center gap-3 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-none sm:w-72">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
        </div>
        {filters && (
          <div className="flex items-center gap-2">
            {filters.map((filter) => (
              <select
                key={filter.key}
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm bg-white"
              >
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ))}
          </div>
        )}
      </div>
      {onAdd && (
        <Button variant="primary" size="md" iconLeft={<HiOutlinePlus className="w-4 h-4" />} onClick={onAdd}>
          {addLabel}
        </Button>
      )}
    </div>
  );
};

export default ActionBar;
