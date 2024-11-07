import React from "react";
import useFetch from "../hooks/useFetch";
import { API_BASE_URL, API_VENUES_URL } from "../constants/apiUrls";
import FilterSort from "../components/filters/FilterSort";
import VenueSkeleton from "../components/loaders/VenueSkeleton";

export default function Venues() {
  const { venues, loading, error } = useFetch(
    `${API_BASE_URL}${API_VENUES_URL}`
  );

  if (loading) {
    return <VenueSkeleton />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <FilterSort />
      <div className="bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 mt-8 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {venues.data.map((venue) => (
              <a
                key={venue.id}
                href={venue.href}
                className="group text-sm cursor-pointer"
              >
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
                <h3 className="mt-4 font-medium text-gray-900">{venue.name}</h3>
                {venue.location.city ? (
                  <p className="mt-2 text-gray-600">
                    Location: {venue.location.city}
                  </p>
                ) : (
                  <p className="mt-2 text-gray-600">Location: Not specified</p>
                )}
                <p className="mt-2 text-gray-600">Price: ${venue.price}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
