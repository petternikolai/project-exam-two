import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPaw } from "@fortawesome/free-solid-svg-icons";
import { faWifi, faCircleParking } from "@fortawesome/pro-solid-svg-icons";
import { faPanFrying } from "@fortawesome/pro-duotone-svg-icons";
import OptionsMyVenues from "../dropdowns/OptionsMyVenues";

/**
 * VenueItem renders details of a venue along with options to edit, delete, or view bookings.
 * It dynamically displays venue information, amenities, and bookings if applicable.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.venue - The venue data to display.
 * @param {Function} props.handleEdit - Callback function to handle venue editing.
 * @param {Function} props.openDeleteModal - Callback function to handle venue deletion.
 * @param {Function} props.handleViewBookings - Callback function to toggle bookings visibility.
 * @param {boolean} props.showBookings - Indicates whether bookings are currently visible.
 * @param {Object|null} props.selectedVenue - The currently selected venue for bookings.
 * @param {Array} props.bookings - List of bookings for the venue.
 * @param {Function} props.setShowBookings - Function to toggle the `showBookings` state.
 * @param {Function} props.setBookings - Function to set the list of bookings.
 * @param {Function} props.setSelectedVenue - Function to set the currently selected venue.
 *
 * @returns {JSX.Element} A venue item card with options and booking details.
 */
const VenueItem = ({
  venue,
  handleEdit,
  openDeleteModal,
  handleViewBookings,
  showBookings,
  selectedVenue,
  bookings,
  setShowBookings,
  setBookings,
  setSelectedVenue,
}) => {
  return (
    <li className="border rounded-lg shadow-md overflow-visible">
      {/* Venue image */}
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100">
        {venue.media && venue.media.length > 0 ? (
          <img
            src={venue.media[0].url}
            alt={venue.media[0].alt}
            className="h-64 w-full object-cover object-center"
          />
        ) : (
          <img
            alt="No image"
            src="https://via.placeholder.com/300"
            className="h-64 w-full object-cover object-center"
          />
        )}
      </div>

      {/* Venue details */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{venue.name}</h2>
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faStar}
              className="text-accent text-lg mr-2"
            />
            <p className="text-gray-900">
              {typeof venue.rating === "number" && !isNaN(venue.rating)
                ? venue.rating
                : "No ratings"}
            </p>
          </div>
        </div>

        {/* Location */}
        {venue.location && (
          <div className="mt-2 text-gray-600">
            <p>
              {venue.location.city}
              {venue.location.city && venue.location.country && ", "}
              {venue.location.country}
            </p>
          </div>
        )}

        {/* Capacity and price */}
        <p className="mt-2 text-gray-600">
          Capacity: {venue.maxGuests}{" "}
          {venue.maxGuests === 1 ? "guest" : "guests"}
        </p>
        <p className="mt-2 text-gray-600">
          ${venue.price ? venue.price.toFixed(2) : "N/A"} per night
        </p>

        {/* Amenities */}
        <div className="mt-2 flex space-x-2 text-gray-600">
          {venue.meta.wifi && <FontAwesomeIcon icon={faWifi} />}
          {venue.meta.parking && <FontAwesomeIcon icon={faCircleParking} />}
          {venue.meta.breakfast && <FontAwesomeIcon icon={faPanFrying} />}
          {venue.meta.pets && <FontAwesomeIcon icon={faPaw} />}
        </div>

        {/* Options dropdown */}
        <div className="mt-4 flex flex-col items-end">
          <OptionsMyVenues
            onEdit={() => handleEdit(venue)}
            onDelete={() => openDeleteModal(venue)}
            onViewBookings={() =>
              handleViewBookings(
                venue,
                selectedVenue,
                setShowBookings,
                showBookings,
                setBookings,
                setSelectedVenue
              )
            }
            showBookings={showBookings && selectedVenue?.id === venue.id}
          />
        </div>

        {/* Bookings section */}
        <div
          className={`mt-4 transition-max-height ${
            showBookings && selectedVenue?.id === venue.id
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <h3 className="text-lg font-semibold">Bookings:</h3>
          <ul className="mt-2 space-y-2">
            {Array.isArray(bookings) && bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <React.Fragment key={booking.id}>
                  <li className="text-gray-600">
                    <p className="font-semibold">Booking ID: {booking.id}</p>
                    <p>User: {booking.customer.name}</p>
                    <p className="mt-1">
                      {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
                      {new Date(booking.dateTo).toLocaleDateString()}
                    </p>
                    <p className="mt-1">Guests: {booking.guests}</p>
                  </li>
                  {index < bookings.length - 1 && (
                    <hr className="my-2 border-gray-300" />
                  )}
                </React.Fragment>
              ))
            ) : (
              <li className="text-gray-600">
                This venue has not been booked yet...
              </li>
            )}
          </ul>
        </div>
      </div>
    </li>
  );
};

export default VenueItem;
