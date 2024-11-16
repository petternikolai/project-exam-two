import Calendar from "../common/calendar/Calendar";

export default function VenueAvailability({
  pricePerDay,
  bookings,
  handleDateChange,
  setIsModalOpen,
  setModalContent,
}) {
  return (
    <div className="mt-10">
      <h3 className="text-sm font-medium text-gray-900">Availability</h3>
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
