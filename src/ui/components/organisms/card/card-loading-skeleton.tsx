import * as React from "react";

const CardLoadingSkeleton = () => {
  return (
    <div className="animate-pulse flex-col gap-2">
      <div className="h-72 w-72 rounded-md bg-gray-300"></div>
      <div className="flex-1 space-y-12 py-1">
        <div className="h-2 rounded bg-gray-300"></div>
      </div>
    </div>
  );
};

export default CardLoadingSkeleton;
