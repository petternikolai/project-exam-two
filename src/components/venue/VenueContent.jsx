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
}) {
  return (
    <>
      <VenueImageGallery media={venue.media} />
      <div className="mx-auto max-w-2xl px-4 pb-8 pt-5 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-8 lg:pt-8">
        <VenueInfo name={venue.name} />
        <VenueOptions
          price={venue.price}
          rating={venue.rating}
          selectedDates={selectedDates}
          selectedGuests={selectedGuests}
          setSelectedGuests={setSelectedGuests}
          maxGuests={venue.maxGuests}
        />
        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          <VenueDescription description={venue.description} />
          <VenueHost owner={venue.owner} />
          <VenueAvailability
            pricePerDay={venue.price}
            bookings={venue.bookings}
            handleDateChange={(days, startDate, endDate) =>
              handleDateChange(
                days,
                startDate,
                endDate,
                venue,
                setTotalPrice,
                setSelectedDates
              )
            }
            setIsModalOpen={setIsModalOpen}
            setModalContent={setModalContent}
          />
          <VenueHighlights meta={venue.meta} />
          <VenueDetails maxGuests={venue.maxGuests} />
          <VenueLocation location={venue.location} />
        </div>
      </div>
    </>
  );
}
