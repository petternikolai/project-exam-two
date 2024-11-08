import { useState } from "react";

export default function useVenueFilters() {
  const [filters, setFilters] = useState({
    price: [],
    maxGuests: [],
    rating: [],
    amenities: [],
  });

  const clearFilters = () => {
    setFilters({
      price: [],
      maxGuests: [],
      rating: [],
      amenities: [],
    });
  };

  const applyFilters = (venues) => {
    if (!venues) return [];
    return venues.data.filter((venue) => {
      // Apply price filter
      if (filters.price.length > 0) {
        const price = parseFloat(venue.price);
        if (
          !filters.price.some((range) => {
            if (range === "2000+") {
              return price >= 2000;
            }
            const [min, max] = range.split("-").map(Number);
            return price >= min && (max ? price <= max : true);
          })
        ) {
          return false;
        }
      }
      // Apply maxGuests filter
      if (filters.maxGuests.length > 0) {
        const guests = parseInt(venue.maxGuests);
        if (
          !filters.maxGuests.some((range) => {
            if (range === "7+") {
              return guests >= 7;
            }
            const [min, max] = range.split("-").map(Number);
            return guests >= min && (max ? guests <= max : true);
          })
        ) {
          return false;
        }
      }
      // Apply rating filter
      if (
        filters.rating.length > 0 &&
        !filters.rating.includes(venue.rating.toString())
      ) {
        return false;
      }
      // Apply amenities filter
      if (
        filters.amenities.length > 0 &&
        !filters.amenities.every((amenity) => venue.meta[amenity])
      ) {
        return false;
      }
      return true;
    });
  };

  return { filters, setFilters, clearFilters, applyFilters };
}
