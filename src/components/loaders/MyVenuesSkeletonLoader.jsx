import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/**
 * MyVenuesSkeletonLoader renders a skeleton placeholder for the "My Venues" section.
 * It is used while venue data is being loaded to provide a better user experience.
 *
 * @returns {JSX.Element} A skeleton loader for venue cards.
 */
function MyVenuesSkeletonLoader() {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100">
        <Skeleton height={256} />
      </div>

      {/* Text and action button placeholders */}
      <div className="p-4">
        {/* Venue title */}
        <Skeleton height={24} width={200} />
        {/* Subtitle placeholders */}
        <Skeleton height={20} width={150} className="mt-2" />
        <Skeleton height={20} width={100} className="mt-2" />
        <Skeleton height={20} width={100} className="mt-2" />
        <Skeleton height={20} width={100} className="mt-2" />
        {/* Action buttons */}
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
