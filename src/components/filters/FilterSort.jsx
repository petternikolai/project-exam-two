import React from "react";
import FilterSection from "./FilterSection";

/**
 * FilterSort combines a heading, description, and a `FilterSection` component
 * to provide users with a filter and sorting interface for finding venues.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.filters - The current filter state, organized by category.
 * @param {Function} props.setFilters - Function to update the filter state.
 * @param {Function} props.clearFilters - Function to clear all selected filters.
 * @param {string} props.sortOption - The currently selected sorting option.
 * @param {Function} props.setSortOption - Function to update the sorting option.
 *
 * @returns {JSX.Element} A filter and sorting interface with a heading.
 */
export default function FilterSort({
  filters,
  setFilters,
  clearFilters,
  sortOption,
  setSortOption,
}) {
  /**
   * Handles updates to a specific filter category by toggling the selected value.
   *
   * @param {string} category - The category of the filter being updated.
   * @param {string} value - The value to toggle in the selected filters.
   */
  const handleFilterChange = (category, value) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (newFilters[category].includes(value)) {
        // Remove the value if it's already selected
        newFilters[category] = newFilters[category].filter((v) => v !== value);
      } else {
        // Add the value if it's not already selected
        newFilters[category].push(value);
      }
      return newFilters;
    });
  };

  return (
    <div className="bg-white">
      {/* Heading and description */}
      <div className="px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          It's time to find your perfect stay!
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
          Pro tip: Use the filters below to narrow down your search.
        </p>
      </div>

      {/* Filter and sorting section */}
      <FilterSection
        filters={filters}
        handleFilterChange={handleFilterChange}
        clearFilters={clearFilters}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
    </div>
  );
}
