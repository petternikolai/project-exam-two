import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPaw } from "@fortawesome/free-solid-svg-icons";
import { faWifi, faCircleParking } from "@fortawesome/pro-solid-svg-icons";
import { faPanFrying } from "@fortawesome/pro-duotone-svg-icons";
import { Link } from "react-router-dom";

const defaultImageUrl =
  "https://amorgoshotel.com/wp-content/uploads/2014/12/Amorgos-Standard-Room1-e1464286427430.jpg";

const VenueCard = ({ venue }) => (
  <Link
    key={venue.id}
    to={`/project-exam-two/venues/${venue.id}`}
    state={{ venue }}
    className="group text-sm cursor-pointer"
  >
    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
      <img
        alt={venue.media[0]?.alt || "No image"}
        src={venue.media[0]?.url || defaultImageUrl}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultImageUrl;
        }}
        className="h-64 w-full object-cover object-center"
      />
    </div>
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

    {venue.location.country && venue.location.city ? (
      <p className="mt-2 text-gray-600">
        {venue.location.city}, {venue.location.country}
      </p>
    ) : (
      ""
    )}
    <p className="mt-2 text-gray-600">
      Capacity: {venue.maxGuests} {venue.maxGuests === 1 ? "guest" : "guests"}
    </p>
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
