import * as React from 'react';

const CardLoadingSkeleton = () => {
  return (
    <div className="animate-pulse flex-col gap-2">
      <div className="rounded-md bg-gray-300 h-72 w-72"></div>
      <div className="flex-1 space-y-12 py-1">
        <div className="h-2 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default CardLoadingSkeleton;
