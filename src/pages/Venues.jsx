import React from "react";
import useFetch from "../hooks/useFetch";
import { API_BASE_URL, API_VENUES_URL } from "../constants/apiUrls";
import FilterSort from "../components/filters/FilterSort";
import VenueSkeleton from "../components/loaders/VenueSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import useVenueFilters from "../hooks/useVenueFilters";

export default function Venues() {
  const {
    data: venues,
    loading,
    error,
  } = useFetch(`${API_BASE_URL}${API_VENUES_URL}`);
  const { filters, setFilters, clearFilters, applyFilters } = useVenueFilters();

  if (loading) {
    return <VenueSkeleton />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const filteredVenues = applyFilters(venues);

  return (
    <>
      <FilterSort
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
      />
      <div className="bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 mt-8 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {filteredVenues.map((venue) => (
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
                <div className="flex justify-between items-center">
                  <h3 className="mt-4 font-medium text-gray-900">
                    {venue.name}
                  </h3>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-accent mt-3 text-lg mr-2"
                    />
                    <p className="mt-4 text-gray-900">
                      {venue.rating.toFixed(1)}
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
