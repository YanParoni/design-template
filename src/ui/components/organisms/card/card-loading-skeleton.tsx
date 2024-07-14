import * as React from "react";

interface CardLoadingSkeletonProps{
  height: string;
}

const CardLoadingSkeleton = ({height}:CardLoadingSkeletonProps) => {
  return (
    <div className="animate-pulse flex-col gap-2">
      <div className={`${height} w-full rounded-md bg-gray-300`}></div>
      <div className="flex-1 space-y-12 py-1">
        <div className="h-2 rounded bg-gray-300"></div>
      </div>
    </div>
  );
};

export default CardLoadingSkeleton;
