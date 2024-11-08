import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/20/solid";
import { filtersData } from "../../constants/filtersData";
import { filterLabels } from "../../constants/filterLabels";
import { sortOptions } from "../../constants/sortOptions";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FilterSort({ filters, setFilters, clearFilters }) {
  const handleFilterChange = (category, value) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter((v) => v !== value);
      } else {
        newFilters[category].push(value);
      }
      console.log("Updated filters:", newFilters);
      return newFilters;
    });
  };

  const countSelectedFilters = () => {
    if (!filters) return 0;
    return Object.values(filters).reduce(
      (acc, filter) => acc + filter.length,
      0
    );
  };

  return (
    <div className="bg-white">
      <div className="px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          It's time to find your perfect stay!
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
          Use the filters below to narrow down your search.
        </p>
      </div>
      <Disclosure
        as="section"
        aria-labelledby="filter-heading"
        className="grid items-center border-b border-t border-gray-200"
      >
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>
        <div className="relative col-start-1 row-start-1 py-4">
          <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
            <div>
              <DisclosureButton className="group flex items-center font-medium text-gray-700">
                <FunnelIcon
                  aria-hidden="true"
                  className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                />
                Filters ({countSelectedFilters()})
              </DisclosureButton>
            </div>
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
        <DisclosurePanel className="border-t border-gray-200 py-10">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-2 px-4 text-sm sm:px-6 md:gap-x-3 lg:px-8">
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
              {Object.keys(filtersData).map((category) => (
                <fieldset key={category} className="flex flex-col mb-4">
                  <legend className="block font-medium">
                    {filterLabels[category]}
                  </legend>
                  <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
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
        <div className="col-start-1 row-start-1 py-4">
          <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
            <Menu as="div" className="relative inline-block">
              <div className="flex">
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <MenuItem key={option.name}>
                      <a
                        href={option.href}
                        className={classNames(
                          option.current
                            ? "font-medium text-gray-900"
                            : "text-gray-500",
                          "block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none"
                        )}
                      >
                        {option.name}
                      </a>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}
