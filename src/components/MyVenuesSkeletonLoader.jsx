import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function MyVenuesSkeletonLoader() {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100">
        <Skeleton height={256} />
      </div>
      <div className="p-4">
        <Skeleton height={24} width={200} />
        <Skeleton height={20} width={150} className="mt-2" />
        <Skeleton height={20} width={100} className="mt-2" />
        <Skeleton height={20} width={100} className="mt-2" />
        <Skeleton height={20} width={100} className="mt-2" />
        <div className="mt-4 flex space-x-2">
          <Skeleton height={40} width={80} />
          <Skeleton height={40} width={80} />
          <Skeleton height={40} width={80} />
        </div>
      </div>
    </div>
  );
}

export default MyVenuesSkeletonLoader;
