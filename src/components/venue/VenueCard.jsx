import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPaw } from "@fortawesome/free-solid-svg-icons";
import { faWifi, faCircleParking } from "@fortawesome/pro-solid-svg-icons";
import { faPanFrying } from "@fortawesome/pro-duotone-svg-icons";
import { Link } from "react-router-dom";

const defaultImageUrl =
  "https://amorgoshotel.com/wp-content/uploads/2014/12/Amorgos-Standard-Room1-e1464286427430.jpg";

/**
 * VenueCard renders a card with details of a venue, including its name, image,
 * rating, location, capacity, price, and available amenities. The card is clickable
 * and navigates to the venue's detailed page.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.venue - The venue data to display.
 * @param {string} props.venue.id - The unique identifier for the venue.
 * @param {string} props.venue.name - The name of the venue.
 * @param {Object[]} props.venue.media - Array of media objects for the venue.
 * @param {Object} props.venue.location - The location data of the venue.
 * @param {string} props.venue.location.city - The city where the venue is located.
 * @param {string} props.venue.location.country - The country where the venue is located.
 * @param {number} props.venue.maxGuests - Maximum number of guests allowed at the venue.
 * @param {number} props.venue.price - Price per night at the venue.
 * @param {number} props.venue.rating - The average rating of the venue.
 * @param {Object} props.venue.meta - Metadata about the venue's amenities.
 * @param {boolean} props.venue.meta.wifi - Whether the venue has Wi-Fi.
 * @param {boolean} props.venue.meta.parking - Whether the venue has parking.
 * @param {boolean} props.venue.meta.breakfast - Whether the venue offers breakfast.
 * @param {boolean} props.venue.meta.pets - Whether pets are allowed at the venue.
 *
 * @returns {JSX.Element} A clickable venue card component.
 */
const VenueCard = ({ venue }) => (
  <Link
    key={venue.id}
    to={`/project-exam-two/venues/${venue.id}`}
    state={{ venue }}
    className="group text-sm cursor-pointer"
  >
    {/* Venue image */}
    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
      <img
        alt={venue.media[0]?.alt || "No image"}
        src={venue.media[0]?.url || defaultImageUrl}
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loops on error
          e.target.src = defaultImageUrl;
        }}
        className="h-64 w-full object-cover object-center"
      />
    </div>

    {/* Venue name and rating */}
    <div className="flex justify-between items-center">
      <h3 className="mt-4 font-medium text-gray-900">{venue.name}</h3>
      <div className="flex items-center">
        <FontAwesomeIcon
          icon={faStar}
          className="text-accent mt-3 text-lg mr-2"
        />
        <p className="mt-4 text-gray-900">
          {venue.rating === 0 ? "No ratings" : venue.rating.toFixed(1)}
        </p>
      </div>
    </div>

    {/* Venue location */}
    {venue.location.country && venue.location.city && (
      <p className="mt-2 text-gray-600">
        {venue.location.city}, {venue.location.country}
      </p>
    )}

    {/* Venue capacity */}
    <p className="mt-2 text-gray-600">
      Capacity: {venue.maxGuests} {venue.maxGuests === 1 ? "guest" : "guests"}
    </p>

    {/* Venue price and amenities */}
    <div className="flex justify-between">
      <p className="mt-2 text-gray-600">${venue.price} per night</p>
      <div className="mt-2 flex space-x-2 text-gray-600">
        {venue.meta.wifi && <FontAwesomeIcon icon={faWifi} />}
        {venue.meta.parking && <FontAwesomeIcon icon={faCircleParking} />}
        {venue.meta.breakfast && <FontAwesomeIcon icon={faPanFrying} />}
        {venue.meta.pets && <FontAwesomeIcon icon={faPaw} />}
      </div>
    </div>
  </Link>
);

export default VenueCard;
