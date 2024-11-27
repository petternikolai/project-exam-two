/**
 * ErrorState is a functional component that displays an error message
 * when a fetch operation fails. It provides a retry button to reload the page.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.error - The error object containing details about the failure.
 * @param {string} [props.error.message] - A descriptive error message.
 *
 * @returns {JSX.Element} A component displaying an error message and a retry button.
 */
export default function ErrorState({ error }) {
  return (
    <div className="text-lg text-red-500">
      {/* General error message */}
      <p>Failed to fetch bookings. Please try again later.</p>

      {/* Specific error message, if available */}
      <p>Error: {error?.message}</p>

      {/* Retry button to reload the page */}
      <button
        onClick={() => window.location.reload()}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Retry
      </button>
    </div>
  );
}
