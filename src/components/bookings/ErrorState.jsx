export default function ErrorState({ error }) {
  return (
    <div className="text-lg text-red-500">
      <p>Failed to fetch bookings. Please try again later.</p>
      <p>Error: {error?.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Retry
      </button>
    </div>
  );
}
