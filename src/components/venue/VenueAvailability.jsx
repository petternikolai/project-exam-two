import Calendar from "../calendar/Calendar";

/**
 * VenueAvailability renders the availability section for a venue, including a calendar
 * for selecting booking dates and displaying existing bookings.
 *
 * @param {Object} props - The component props.
 * @param {number} props.pricePerDay - The price per day for the venue.
 * @param {Array} props.bookings - An array of existing bookings for the venue.
 * @param {Function} props.handleDateChange - Callback function triggered when the booking date changes.
 * @param {Function} props.setIsModalOpen - Function to toggle the state of a modal.
 * @param {Function} props.setModalContent - Function to set the content of a modal.
 *
 * @returns {JSX.Element} A component displaying venue availability with a calendar.
 */
export default function VenueAvailability({
  pricePerDay,
  bookings,
  handleDateChange,
  setIsModalOpen,
  setModalContent,
}) {
  return (
    <div className="mt-10">
      {/* Availability header */}
      <h3 className="text-sm font-medium text-gray-900">Availability</h3>

      {/* Calendar component for date selection */}
      <Calendar
        className="mt-2 justify-start"
        pricePerDay={pricePerDay}
        onDateChange={handleDateChange}
        bookings={bookings || []}
        setIsModalOpen={setIsModalOpen}
        setModalContent={setModalContent}
      />
    </div>
  );
}
