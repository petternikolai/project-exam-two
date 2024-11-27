import React from "react";

/**
 * SearchInput is a controlled input component for filtering venue results.
 * It updates the search query state as the user types.
 *
 * @param {Object} props - The component props.
 * @param {string} props.searchQuery - The current search query value.
 * @param {Function} props.setSearchQuery - Function to update the search query state.
 *
 * @returns {JSX.Element} The search input field with a search icon.
 */
const SearchInput = ({ searchQuery, setSearchQuery }) => (
  <div className="relative mt-4 mb-4">
    {/* Input field for entering search terms */}
    <input
      type="text"
      placeholder="Search for a venue"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)} // Update query on input change
      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-accent focus:border-accent sm:text-sm"
    />
    {/* Search icon positioned to the left of the input field */}
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg
        className="h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  </div>
);

export default SearchInput;
