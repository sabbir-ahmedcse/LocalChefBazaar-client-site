import React from 'react';

const Loader = () => {
  return (
    <div className="animate-pulse space-y-6 p-6">
      {/* Header Skeleton */}
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-32"></div>
          <div className="h-3 bg-gray-200 rounded w-24"></div>
        </div>
      </div>

      {/* Content Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white p-6 rounded-xl shadow space-y-4">
            <div className="h-40 bg-gray-300 rounded-lg"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;