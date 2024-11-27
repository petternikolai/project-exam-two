import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/20/solid";
import { filtersData } from "../../constants/filtersData";
import { filterLabels } from "../../constants/filterLabels";
import SortMenu from "./SortMenu";

/**
 * FilterSection provides a UI for applying and clearing filters, as well as sorting options.
 * It includes expandable sections for different filter categories and a clear-all button.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.filters - The current filter state, organized by category.
 * @param {Function} props.handleFilterChange - Callback function to update filters when a user toggles a filter option.
 * @param {Function} props.clearFilters - Callback function to clear all selected filters.
 * @param {string} props.sortOption - The currently selected sorting option.
 * @param {Function} props.setSortOption - Callback function to update the sorting option.
 *
 * @returns {JSX.Element} A filter and sorting UI section.
 */
function FilterSection({
  filters,
  handleFilterChange,
  clearFilters,
  sortOption,
  setSortOption,
}) {
  /**
   * Counts the total number of selected filters across all categories.
   *
   * @returns {number} The number of selected filter options.
   */
  const countSelectedFilters = () => {
    if (!filters) return 0;
    return Object.values(filters).reduce(
      (acc, filter) => acc + filter.length,
      0
    );
  };

  return (
    <Disclosure
      as="section"
      aria-labelledby="filter-heading"
      className="grid items-center border-b border-t border-gray-200"
    >
      {/* Screen reader heading for accessibility */}
      <h2 id="filter-heading" className="sr-only">
        Filters
      </h2>

      <div className="relative col-start-1 row-start-1 py-4">
        <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
          {/* Button to toggle filter visibility */}
          <div>
            <DisclosureButton className="group flex items-center font-medium text-gray-700">
              <FunnelIcon
                aria-hidden="true"
                className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
              />
              Filters ({countSelectedFilters()})
            </DisclosureButton>
          </div>

          {/* Clear all filters button */}
          <div className="pl-6">
            <button
              type="button"
              className="text-gray-500"
              onClick={clearFilters}
            >
              Clear all
            </button>
          </div>
        </div>
      </div>

      {/* Filter options panel */}
      <DisclosurePanel className="border-t border-gray-200 py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-2 px-4 text-sm sm:px-6 md:gap-x-3 lg:px-8">
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
            {/* Map through filter categories */}
            {Object.keys(filtersData).map((category) => (
              <fieldset key={category} className="flex flex-col mb-4">
                <legend className="block font-medium">
                  {filterLabels[category]}
                </legend>
                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                  {/* Map through options within a category */}
                  {filtersData[category].map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center text-base sm:text-sm"
                    >
                      <input
                        value={option.value}
                        checked={filters?.[category]?.includes(option.value)}
                        onChange={() =>
                          handleFilterChange(category, option.value)
                        }
                        id={`${category}-${option.value}`}
                        name={`${category}[]`}
                        type="checkbox"
                        className="h-4 w-4 shrink-0 rounded border-gray-300 text-accent focus:ring-accent"
                      />
                      <label
                        htmlFor={`${category}-${option.value}`}
                        className="ml-3 min-w-0 flex-1 text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </div>
      </DisclosurePanel>

      {/* Sorting menu */}
      <SortMenu sortOption={sortOption} setSortOption={setSortOption} />
    </Disclosure>
  );
}

export default FilterSection;
