import VenueImageGallery from "./VenueImageGallery";
import VenueInfo from "./VenueInfo";
import VenueOptions from "./VenueOptions";
import VenueDescription from "./VenueDescription";
import VenueHost from "./VenueHost";
import VenueAvailability from "./VenueAvailability";
import VenueHighlights from "./VenueHighlights";
import VenueDetails from "./VenueDetails";
import VenueLocation from "./VenueLocation";
import { handleDateChange } from "../../utils/venueUtils";

/**
 * VenueContent renders the main content of a venue detail page, including the image gallery,
 * venue information, booking options, description, host details, availability calendar,
 * highlights, detailed features, and location.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.venue - The venue data to display.
 * @param {Array} props.selectedDates - The currently selected booking dates.
 * @param {number} props.selectedGuests - The currently selected number of guests.
 * @param {Function} props.setSelectedGuests - Function to update the selected guests.
 * @param {Function} props.setTotalPrice - Function to update the total price of the booking.
 * @param {Function} props.setSelectedDates - Function to update the selected booking dates.
 * @param {Function} props.setIsModalOpen - Function to toggle the modal's open state.
 * @param {Function} props.setModalContent - Function to set the content of the modal.
 * @param {Function} props.onBookNow - Function to handle the "Book Now" action.
 * @param {Function} props.handleBooking - Function to handle booking confirmation.
 *
 * @returns {JSX.Element} A detailed venue content layout.
 */
export default function VenueContent({
  venue,
  selectedDates,
  selectedGuests,
  setSelectedGuests,
  setTotalPrice,
  setSelectedDates,
  setIsModalOpen,
  setModalContent,
  onBookNow,
  handleBooking,
}) {
  return (
    <>
      {/* Venue Image Gallery */}
      <VenueImageGallery media={venue.data.media} />
      <div className="mx-auto max-w-2xl px-4 pb-8 pt-5 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-8 lg:pt-8">
        {/* Venue Info */}
        <VenueInfo name={venue.data.name} />
        {/* Booking Options */}
        <VenueOptions
          price={venue.data.price}
          rating={venue.data.rating}
          selectedDates={selectedDates}
          selectedGuests={selectedGuests}
          setSelectedGuests={setSelectedGuests}
          maxGuests={venue.data.maxGuests}
          onBookNow={onBookNow} // Pass onBookNow here
          handleBooking={handleBooking} // Pass handleBooking here
        />
        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          {/* Venue Description */}
          <VenueDescription description={venue.data.description} />
          {/* Host Information */}
          <VenueHost owner={venue.data.owner} />
          {/* Availability Calendar */}
          <VenueAvailability
            pricePerDay={venue.data.price}
            bookings={venue.data.bookings}
            handleDateChange={(days, startDate, endDate) =>
              handleDateChange(
                days,
                startDate,
                endDate,
                venue.data,
                setTotalPrice,
                setSelectedDates
              )
            }
            setIsModalOpen={setIsModalOpen}
            setModalContent={setModalContent}
          />
          {/* Venue Highlights */}
          <VenueHighlights meta={venue.data.meta} />
          {/* Venue Details */}
          <VenueDetails maxGuests={venue.data.maxGuests} />
          {/* Venue Location */}
          <VenueLocation location={venue.data.location} />
        </div>
      </div>
    </>
  );
}
