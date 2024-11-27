import React from "react";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";

/**
 * Pagination component handles navigation between pages of data.
 * It includes buttons for previous, next, and numbered page navigation.
 *
 * @param {Object} props - The component props.
 * @param {number} props.currentPage - The current page number.
 * @param {number} props.totalCount - The total number of items.
 * @param {number} props.pageSize - The number of items per page.
 * @param {Function} props.onPageChange - Callback function to handle page changes.
 *
 * @returns {JSX.Element} A pagination control for navigating between pages.
 */
const Pagination = ({ currentPage, totalCount, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  /**
   * Handles page changes and scrolls to the top of the page.
   *
   * @param {number} page - The page number to navigate to.
   */
  const handlePageChange = (page) => {
    onPageChange(page);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  // Navigate to the previous page or wrap to the last page
  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    } else {
      handlePageChange(totalPages); // Go to the last page
    }
  };

  // Navigate to the next page or wrap to the first page
  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    } else {
      handlePageChange(1); // Go to the first page
    }
  };

  // Render numbered page buttons
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
            currentPage === i
              ? "border-accent text-accent"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 mt-6 px-4 sm:px-0">
      {/* Previous button */}
      <div className="-mt-px flex w-0 flex-1">
        <button
          onClick={handlePrevious}
          className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          <ArrowLongLeftIcon
            aria-hidden="true"
            className="mr-3 h-5 w-5 text-gray-400"
          />
          Previous
        </button>
      </div>

      {/* Page numbers */}
      <div className="hidden md:-mt-px md:flex">{renderPageNumbers()}</div>

      {/* Next button */}
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          onClick={handleNext}
          className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          Next
          <ArrowLongRightIcon
            aria-hidden="true"
            className="ml-3 h-5 w-5 text-gray-400"
          />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
