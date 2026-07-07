import React from 'react';

const categories = ['All', 'Academic', 'Achievements', 'Campus', 'Events', 'Sports'];

const NewsFilters = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeCategory === cat
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default NewsFilters;
