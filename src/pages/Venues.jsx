import React, { useState, useEffect } from "react";
import FilterSort from "../components/filters/FilterSort";
import VenueSkeleton from "../components/loaders/VenueSkeleton";
import useVenueFilters from "../hooks/useVenueFilters";
import SearchInput from "../components/ui/SearchInput";
import VenueCard from "../components/venue/VenueCard";
import Pagination from "../components/pagination/Pagination"; // Import Pagination component
import sortVenues from "../utils/sortVenues"; // Import sortVenues function
import fetchAllVenues from "../services/fetchAllVenues"; // Import fetchAllVenues function

/**
 * Venues component displays a list of venues with sorting, filtering, and pagination functionality.
 * It fetches all venues, applies filters and sorting, and renders them in a paginated grid.
 * The user can search, filter, and sort the venues.
 *
 * @returns {JSX.Element} A page displaying the list of venues with sorting, filtering, and pagination controls.
 */
export default function Venues() {
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page for pagination
  const venuesPerPage = 27; // Number of venues per page for pagination
  const [allFetchedVenues, setAllFetchedVenues] = useState([]); // State to store all fetched venues
  const [venues, setVenues] = useState([]); // State to store filtered and sorted venues to be displayed
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to handle errors during data fetching
  const [totalCount, setTotalCount] = useState(0); // Total number of venues after filtering

  const { filters, setFilters, clearFilters, applyFilters } = useVenueFilters(); // Custom hook for venue filters
  const [sortOption, setSortOption] = useState(""); // Sort option for sorting venues
  const [searchQuery, setSearchQuery] = useState(""); // Search query for venue search

  /**
   * Fetches all venues from the API on component mount.
   * Sets the fetched venues to the state and handles any errors.
   */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true while fetching data
      try {
        const { allFetchedVenues, totalFetchedCount } = await fetchAllVenues(); // Fetch venues data
        setAllFetchedVenues(allFetchedVenues); // Store all venues in state
        setTotalCount(totalFetchedCount); // Set the total number of fetched venues
      } catch (err) {
        setError(err); // Handle any errors during fetching
      } finally {
        setLoading(false); // Set loading to false once data fetching is complete
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Only run once on mount

  /**
   * Filters and sorts the venues based on the selected filters, search query, and sort option.
   * This is triggered every time the venues, current page, sort option, filters, or search query change.
   */
  useEffect(() => {
    if (allFetchedVenues.length > 0 && typeof applyFilters === "function") {
      // Apply filters and search query
      const filteredVenues = applyFilters({ data: allFetchedVenues }).filter(
        (venue) => venue.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      // Apply sorting to the filtered venues
      const sortedVenues = sortVenues(filteredVenues, sortOption);
      // Paginate the sorted venues
      setVenues(
        sortedVenues.slice(
          (currentPage - 1) * venuesPerPage,
          currentPage * venuesPerPage
        )
      );
      setTotalCount(filteredVenues.length); // Update total count based on filtered venues
    }
  }, [allFetchedVenues, currentPage, sortOption, searchQuery, filters]); // Dependencies for useEffect

  /**
   * Resets the current page to 1 whenever filters or the search query changes.
   */
  useEffect(() => {
    setCurrentPage(1); // Reset pagination to the first page
  }, [filters, searchQuery]);

  /**
   * Handles page changes in the pagination control.
   *
   * @param {number} page - The page number to navigate to.
   */
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update the current page state
  };

  // If the component is loading, show a loading skeleton
  if (loading) {
    return <VenueSkeleton />;
  }

  // If there is an error, display the error message
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      {/* Filter and sort controls */}
      <FilterSort
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <div className="bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8">
          {/* Search input to filter venues */}
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {/* Display venue cards in a grid layout */}
          <div className="grid grid-cols-1 mt-8 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
          {/* Pagination control */}
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={venuesPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}
