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
      <VenueImageGallery media={venue.data.media} />
      <div className="mx-auto max-w-2xl px-4 pb-8 pt-5 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-8 lg:pt-8">
        <VenueInfo name={venue.data.name} />
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
          <VenueDescription description={venue.data.description} />
          <VenueHost owner={venue.data.owner} />
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
          <VenueHighlights meta={venue.data.meta} />
          <VenueDetails maxGuests={venue.data.maxGuests} />
          <VenueLocation location={venue.data.location} />
        </div>
      </div>
    </>
  );
}
