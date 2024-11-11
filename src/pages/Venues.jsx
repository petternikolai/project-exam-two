import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { API_BASE_URL, API_VENUES_URL } from "../constants/apiUrls";
import FilterSort from "../components/filters/FilterSort";
import VenueSkeleton from "../components/loaders/VenueSkeleton";
import useVenueFilters from "../hooks/useVenueFilters";
import SearchInput from "../components/common/SearchInput";
import VenueCard from "../components/common/VenueCard";

const sortVenues = (venues, sortOption) => {
  return venues.sort((a, b) => {
    switch (sortOption) {
      case "Rating (High to low)":
        return b.rating - a.rating;
      case "Rating (Low to high)":
        return a.rating - b.rating;
      case "Price (High to low)":
        return b.price - a.price;
      case "Price (Low to high)":
        return a.price - b.price;
      default:
        return 0;
    }
  });
};

export default function Venues() {
  const {
    data: venues,
    loading,
    error,
  } = useFetch(`${API_BASE_URL}${API_VENUES_URL}`);
  const { filters, setFilters, clearFilters, applyFilters } = useVenueFilters();
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVenue, setSelectedVenue] = useState(null);

  const handleVenueClick = (venue) => {
    setSelectedVenue(venue);
  };

  if (loading) {
    return <VenueSkeleton />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const filteredVenues = applyFilters(venues).filter((venue) =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedVenues = sortVenues(filteredVenues, sortOption);

  return (
    <>
      <FilterSort
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <div className="bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8">
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div className="grid grid-cols-1 mt-8 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {sortedVenues.map((venue) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                onClick={() => handleVenueClick(venue)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
