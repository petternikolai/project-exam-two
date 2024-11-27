import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/**
 * VenueSkeleton renders a skeleton placeholder for a venue page.
 * It provides a placeholder structure while the venue data is being loaded.
 *
 * @returns {JSX.Element} A skeleton loader for the venue details page.
 */
export default function VenueSkeleton() {
  return (
    <div className="bg-white">
      {/* Image skeleton */}
      <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-1 lg:gap-x-8 overflow-hidden">
        <Skeleton height={400} />
      </div>

      {/* Content skeleton */}
      <div className="mx-auto max-w-2xl px-4 pb-8 pt-5 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-8 lg:pt-8">
        {/* Title skeleton */}
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <Skeleton height={40} width={300} />
        </div>

        {/* Price and details skeleton */}
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <Skeleton height={40} width={100} />
          <div className="mt-4">
            <Skeleton height={20} width={150} />
            <Skeleton height={20} width={150} />
          </div>
          <div className="mt-4">
            <Skeleton height={40} width={200} />
          </div>
        </div>

        {/* Description skeleton */}
        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          <Skeleton height={20} count={5} />
        </div>
      </div>
    </div>
  );
}
