import React, { useState, useEffect } from "react";
import FilterSort from "../components/filters/FilterSort";
import VenueSkeleton from "../components/loaders/VenueSkeleton";
import useVenueFilters from "../hooks/useVenueFilters";
import SearchInput from "../components/common/SearchInput";
import VenueCard from "../components/common/VenueCard";
import Pagination from "../components/common/Pagination"; // Import Pagination component
import sortVenues from "../utils/sortVenues"; // Import sortVenues function
import fetchAllVenues from "../services/fetchAllVenues"; // Import fetchAllVenues function

export default function Venues() {
  const [currentPage, setCurrentPage] = useState(1);
  const venuesPerPage = 27;
  const [allFetchedVenues, setAllFetchedVenues] = useState([]); // State to store all fetched venues
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const { filters, setFilters, clearFilters, applyFilters } = useVenueFilters();
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { allFetchedVenues, totalFetchedCount } = await fetchAllVenues();
        setAllFetchedVenues(allFetchedVenues);
        setTotalCount(totalFetchedCount);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (allFetchedVenues.length > 0 && typeof applyFilters === "function") {
      const filteredVenues = applyFilters({ data: allFetchedVenues }).filter(
        (venue) => venue.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const sortedVenues = sortVenues(filteredVenues, sortOption);
      setVenues(
        sortedVenues.slice(
          (currentPage - 1) * venuesPerPage,
          currentPage * venuesPerPage
        )
      );
      setTotalCount(filteredVenues.length); // Update totalCount to reflect filtered results
    }
  }, [allFetchedVenues, currentPage, sortOption, searchQuery, filters]);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters or search query change
  }, [filters, searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <VenueSkeleton />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

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
            {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
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
