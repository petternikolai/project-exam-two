import React from "react";
import FilterSection from "./FilterSection";

export default function FilterSort({
  filters,
  setFilters,
  clearFilters,
  sortOption,
  setSortOption,
}) {
  const handleFilterChange = (category, value) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter((v) => v !== value);
      } else {
        newFilters[category].push(value);
      }
      return newFilters;
    });
  };

  return (
    <div className="bg-white">
      <div className="px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          It's time to find your perfect stay!
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
          Pro tip: Use the filters below to narrow down your search.
        </p>
      </div>
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
