import React from "react";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";

const Pagination = ({ currentPage, totalCount, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
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
      <div className="hidden md:-mt-px md:flex">{renderPageNumbers()}</div>
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
