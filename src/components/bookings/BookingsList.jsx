import BookingCard from "./BookingCard";

export default function BookingsList({ bookings, onDelete }) {
  if (bookings.length === 0) {
    return (
      <p className="text-lg text-gray-500">
        You have not made any bookings yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} onDelete={onDelete} />
      ))}
    </div>
  );
}
