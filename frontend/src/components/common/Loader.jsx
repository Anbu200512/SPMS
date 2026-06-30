import React from 'react';

const Loader = ({ fullScreen = true, text = 'Loading...' }) => {
  if (!fullScreen) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
          {text && <span className="text-sm text-gray-500">{text}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary-100 rounded-full" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-accent-500 rounded-full animate-spin" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-primary-500 rounded-full animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-primary-700 font-heading font-semibold text-lg">{text}</p>
          <p className="text-gray-500 text-sm mt-1">Please wait...</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
