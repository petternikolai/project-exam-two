import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPaw } from "@fortawesome/free-solid-svg-icons";
import { faWifi, faCircleParking } from "@fortawesome/pro-solid-svg-icons";
import { faPanFrying } from "@fortawesome/pro-duotone-svg-icons";
import OptionsMyVenues from "../components/dropdowns/OptionsMyVenues";

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
        {venue.location && (
          <div className="mt-2 text-gray-600">
            <p>
              {venue.location.city}
              {venue.location.city && venue.location.country && ", "}
              {venue.location.country}
            </p>
          </div>
        )}
        <p className="mt-2 text-gray-600">
          Capacity: {venue.maxGuests}{" "}
          {venue.maxGuests === 1 ? "guest" : "guests"}
        </p>
        <p className="mt-2 text-gray-600">
          ${venue.price ? venue.price.toFixed(2) : "N/A"} per night
        </p>
        <div className="mt-2 flex space-x-2 text-gray-600">
          {venue.meta.wifi && <FontAwesomeIcon icon={faWifi} />}
          {venue.meta.parking && <FontAwesomeIcon icon={faCircleParking} />}
          {venue.meta.breakfast && <FontAwesomeIcon icon={faPanFrying} />}
          {venue.meta.pets && <FontAwesomeIcon icon={faPaw} />}
        </div>
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
