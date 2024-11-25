export default function BookingsSkeletonLoader() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden animate-pulse flex flex-col justify-between">
      {/* Placeholder for Image */}
      <div className="bg-gray-200 h-48 w-full"></div>
      {/* Placeholder for Content */}
      <div className="p-6 flex-1">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
