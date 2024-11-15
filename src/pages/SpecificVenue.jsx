import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { classNames } from "../utils/classNames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faWifi,
  faCircleParking,
} from "@fortawesome/pro-solid-svg-icons";
import { faPanFrying } from "@fortawesome/pro-duotone-svg-icons";
import DatePicker from "../components/common/DatePicker";
import DateErrorModal from "../components/modals/DateErrorModal";
import Avatar from "../components/common/Avatar";
import MapComponent from "../components/common/MapComponent";
import { format } from "date-fns";
import { API_BASE_URL } from "../constants/apiUrls";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SpecificVenue() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const today = format(new Date(), "MM/dd/yyyy");
  const [selectedDates, setSelectedDates] = useState(`${today} - ${today}`);
  const [selectedGuests, setSelectedGuests] = useState(1);

  useEffect(() => {
    // Fetch the full venue details based on the venue ID
    async function fetchVenueDetails() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/holidaze/venues/${id}?_owner=true&_bookings=true`
        );
        const data = await response.json();
        setVenue(data.data);
      } catch (error) {
        console.error("Error fetching venue details:", error);
      }
    }

    fetchVenueDetails();
  }, [id]);

  const handleDateChange = (days, startDate, endDate) => {
    setTotalPrice(days * venue.price);
    if (startDate && endDate) {
      setSelectedDates(
        `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
      );
    } else {
      setSelectedDates("");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = (event) => {};

    window.addEventListener("mousewheel", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousewheel", handleScroll);
    };
  }, []);

  if (!venue) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-1 lg:gap-x-8 overflow-hidden">
          <Skeleton height={400} />
        </div>
        <div className="mx-auto max-w-2xl px-4 pb-8 pt-5 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-8 lg:pt-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <Skeleton height={40} width={300} />
          </div>
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <Skeleton height={40} width={100} />
            <div className="mt-4">
              <Skeleton height={20} width={150} />
              <Skeleton height={20} width={150} />
            </div>
            <div className="mt-4">
              <Skeleton height={40} width={200} />
            </div>
          </div>
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <Skeleton height={20} count={5} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div>
        {/* Image gallery */}
        <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-1 lg:gap-x-8 overflow-hidden">
          <div className="flex items-center justify-center">
            {venue.media?.[0] && (
              <img
                alt={venue.media[0].alt}
                src={venue.media[0].url}
                className="w-full h-96 object-cover object-center" // Removed rounded-lg class
              />
            )}
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-8 pt-5 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-8 lg:pt-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {venue.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              ${venue.price} / day
            </p>

            {/* Reviews */}
            <div className="mt-4">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        venue.rating > rating ? "text-accent" : "text-gray-200",
                        "size-5 shrink-0"
                      )}
                    />
                  ))}
                </div>
                <p className="sr-only">{venue.rating} out of 5 stars</p>
              </div>
            </div>

            {/* Selected dates */}
            {selectedDates && (
              <h3 className="mt-4 block text-sm font-medium text-gray-700">
                <p>
                  Selected dates:<br></br>
                  {selectedDates}
                </p>
              </h3>
            )}

            {/* Guests selection */}
            <div className="mt-4">
              <label
                htmlFor="guests"
                className="block text-sm font-medium text-gray-700"
              >
                Number of guests
              </label>
              <select
                id="guests"
                name="guests"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={selectedGuests}
                onChange={(e) => setSelectedGuests(Number(e.target.value))}
              >
                {Array.from({ length: venue.maxGuests }, (_, i) => i + 1).map(
                  (guest) => (
                    <option key={guest} value={guest}>
                      {guest}
                    </option>
                  )
                )}
              </select>
            </div>

            <form className="mt-10">
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-accent px-8 py-3 text-base font-medium text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                disabled={!selectedDates} // Disable button if no dates are selected
              >
                Book now
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{venue.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Your host</h3>
              {venue.owner && venue.owner.avatar && (
                <Avatar
                  imageUrl={venue.owner.avatar.url}
                  altText={venue.owner.avatar.alt}
                  name={venue.owner.name}
                />
              )}
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">
                Availability
              </h3>
              <DatePicker
                className="mt-2 justify-start"
                pricePerDay={venue.price}
                onDateChange={(days, startDate, endDate) =>
                  handleDateChange(days, startDate, endDate)
                }
                bookings={venue.bookings || []} // Pass bookings to DatePicker
                setIsModalOpen={setIsModalOpen} // Pass setIsModalOpen to DatePicker
                setModalContent={setModalContent} // Pass setModalContent to DatePicker
              />
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-2 text-gray-600">
                <table>
                  <tbody>
                    {venue.meta?.wifi && (
                      <tr>
                        <td className="pr-2">
                          <FontAwesomeIcon icon={faWifi} />
                        </td>
                        <td>Free WiFi</td>
                      </tr>
                    )}
                    {venue.meta?.parking && (
                      <tr>
                        <td className="pr-2">
                          <FontAwesomeIcon icon={faCircleParking} />
                        </td>
                        <td>Free parking</td>
                      </tr>
                    )}
                    {venue.meta?.breakfast && (
                      <tr>
                        <td className="pr-2">
                          <FontAwesomeIcon icon={faPanFrying} />
                        </td>
                        <td>Breakfast included</td>
                      </tr>
                    )}
                    {venue.meta?.pets && (
                      <tr>
                        <td className="pr-2">
                          <FontAwesomeIcon icon={faPaw} />
                        </td>
                        <td>Pets allowed</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Details</h3>

              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  Max guests: {venue.maxGuests}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Location</h3>

              <div className="mt-4 space-y-6">
                <MapComponent location={venue.location} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <DateErrorModal isOpen={isModalOpen} onClose={handleModalClose}>
        {modalContent}
      </DateErrorModal>
    </div>
  );
}
