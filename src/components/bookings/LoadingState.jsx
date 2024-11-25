import BookingsSkeletonLoader from "./BookingsSkeletonLoader";

export default function LoadingState() {
  return (
    <>
      <div className="col-span-1">
        <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>
        <p className="mt-2 text-lg text-gray-500">
          A list of your upcoming bookings.
        </p>
      </div>
      <div className="md:col-span-2 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <BookingsSkeletonLoader key={index} />
          ))}
        </div>
      </div>
    </>
  );
}
