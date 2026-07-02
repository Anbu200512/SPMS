import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';

const categories = ['All', 'Academic', 'Achievements', 'Campus', 'Events', 'Sports'];

const NewsSidebar = ({ activeCategory, onCategoryChange, getCategoryCount, recentPosts }) => {
  return (
    <aside className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-gray-800 mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-colors ${
                activeCategory === cat
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{cat}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeCategory === cat ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-500'
              }`}>
                {getCategoryCount(cat)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-gray-800 mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              to="#"
              className="flex gap-3 group"
            >
              <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {post.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">{formatDate(post.date)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default NewsSidebar;
