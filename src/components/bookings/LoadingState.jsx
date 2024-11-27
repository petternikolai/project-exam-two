import BookingsSkeletonLoader from "./BookingsSkeletonLoader";

/**
 * LoadingState is a functional component that displays a skeleton
 * loader while booking data is being fetched. It provides placeholders
 * to mimic the structure of the bookings list.
 *
 * @returns {JSX.Element} A loading state component with skeleton loaders.
 */
export default function LoadingState() {
  return (
    <>
      <div className="col-span-1">
        {/* Heading for the loading state */}
        <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>
        <p className="mt-2 text-lg text-gray-500">
          A list of your upcoming bookings.
        </p>
      </div>

      <div className="md:col-span-2 mt-6">
        {/* Grid layout for skeleton loaders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Render 4 skeleton loaders to simulate loading bookings */}
          {Array.from({ length: 4 }).map((_, index) => (
            <BookingsSkeletonLoader key={index} />
          ))}
        </div>
      </div>
    </>
  );
}
