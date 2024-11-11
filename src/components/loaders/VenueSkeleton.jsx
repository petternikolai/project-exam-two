import FilterSort from "../../components/filters/FilterSort";
import SearchInput from "../common/SearchInput";

export default function VenueSkeleton() {
  return (
    <>
      <FilterSort />
      <div className="bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8">
          <SearchInput />
          <div className="grid grid-cols-1 mt-8 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="group text-sm cursor-pointer">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100">
                  <div className="h-64 w-full skeleton"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="mt-4 h-6 w-3/4 skeleton"></div>
                  <div className="mt-4 h-6 w-1/4 skeleton"></div>
                </div>
                <div className="mt-2 h-4 w-1/2 skeleton"></div>
                <div className="mt-2 h-4 w-1/4 skeleton"></div>
                <div className="flex justify-between">
                  <div className="mt-2 h-4 w-1/4 skeleton"></div>
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
