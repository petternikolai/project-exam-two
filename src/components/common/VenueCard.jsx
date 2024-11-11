import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const VenueCard = ({ venue }) => (
  <a key={venue.id} href={venue.href} className="group text-sm cursor-pointer">
    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
      {venue.media[0] ? (
        <img
          alt={venue.media[0].alt}
          src={venue.media[0].url}
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
    <p className="mt-2 text-gray-600">${venue.price} per night</p>
  </a>
);

export default VenueCard;
