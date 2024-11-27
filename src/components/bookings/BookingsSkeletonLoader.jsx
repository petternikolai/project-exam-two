/**
 * BookingsSkeletonLoader is a placeholder component used to show a loading
 * state while booking data is being fetched. It mimics the structure of a
 * `BookingCard` but uses animated skeletons to indicate loading.
 *
 * @returns {JSX.Element} A skeleton loader representing a booking card.
 */
export default function BookingsSkeletonLoader() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden animate-pulse flex flex-col justify-between">
      {/* Placeholder for image area */}
      <div className="bg-gray-200 h-48 w-full"></div>

      {/* Placeholder for text content */}
      <div className="p-6 flex-1">
        {/* Title placeholder */}
        <div className="h-6 bg-gray-200 rounded mb-4"></div>

        {/* Lines representing text content */}
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
