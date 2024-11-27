import BookingCard from "./BookingCard";

/**
 * BookingsList renders a list of booking cards. If there are no bookings,
 * it displays a message indicating the absence of bookings.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.bookings - An array of booking objects to display.
 * @param {Function} props.onDelete - Callback function to handle deletion of a booking.
 *
 * @returns {JSX.Element} A list of booking cards or a message if there are no bookings.
 */
export default function BookingsList({ bookings, onDelete }) {
  // If there are no bookings, display a message
  if (bookings.length === 0) {
    return (
      <p className="text-lg text-gray-500">
        You have not made any bookings yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {/* Map through bookings array and render a BookingCard for each booking */}
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} onDelete={onDelete} />
      ))}
    </div>
  );
}
