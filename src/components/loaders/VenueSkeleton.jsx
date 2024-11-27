import FilterSort from "../../components/filters/FilterSort";
import SearchInput from "../ui/SearchInput";

/**
 * VenueSkeleton renders a placeholder UI for loading venue cards.
 * It includes a filter and search section followed by a grid of skeleton loaders.
 *
 * @returns {JSX.Element} A skeleton loader component for venues.
 */
export default function VenueSkeleton() {
  return (
    <>
      {/* Filter and sorting section */}
      <FilterSort />
      <div className="bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8">
          {/* Search input field */}
          <SearchInput />
          <div className="grid grid-cols-1 mt-8 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {/* Skeleton loaders for venue cards */}
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="group text-sm cursor-pointer">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100">
                  {/* Skeleton for the venue image */}
                  <div className="h-64 w-full skeleton"></div>
                </div>
                <div className="flex justify-between items-center">
                  {/* Skeletons for venue name and rating */}
                  <div className="mt-4 h-6 w-3/4 skeleton"></div>
                  <div className="mt-4 h-6 w-1/4 skeleton"></div>
                </div>
                {/* Skeletons for venue details */}
                <div className="mt-2 h-4 w-1/2 skeleton"></div>
                <div className="mt-2 h-4 w-1/4 skeleton"></div>
                <div className="flex justify-between">
                  {/* Skeleton for price */}
                  <div className="mt-2 h-4 w-1/4 skeleton"></div>
                  {/* Skeletons for amenities */}
                  <div className="mt-2 flex space-x-2">
                    <div className="h-4 w-4 skeleton"></div>
                    <div className="h-4 w-4 skeleton"></div>
                    <div className="h-4 w-4 skeleton"></div>
                    <div className="h-4 w-4 skeleton"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
