import React from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

const categories = ['All', 'Academic', 'Cultural', 'Sports'];

const EventFilters = ({ searchTerm, onSearchChange, categoryFilter, onCategoryChange }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-10">
      <div className="relative flex-1">
        <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              categoryFilter === cat
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventFilters;
