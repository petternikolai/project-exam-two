import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { sortOptions } from "../../constants/sortOptions";
import { classNames } from "../../utils/classNames";

function SortMenu({ sortOption, setSortOption }) {
  return (
    <div className="col-start-1 row-start-1 py-4">
      <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
        <Menu as="div" className="relative inline-block">
          <div className="flex">
            <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
              Sort by: {sortOption}
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 ml-1 h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-500"
              />
            </MenuButton>
          </div>

          <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none">
            <div className="py-1">
              {sortOptions.map((option) => (
                <MenuItem
                  key={option.name}
                  onClick={() => setSortOption(option.name)}
                >
                  {({ focus }) => (
                    <button
                      type="button"
                      className={classNames(
                        option.name === sortOption
                          ? "font-medium text-gray-900"
                          : "text-gray-500",
                        focus ? "bg-gray-100" : "",
                        "block w-full text-left px-4 py-2 text-sm"
                      )}
                    >
                      {option.name}
                    </button>
                  )}
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}

export default SortMenu;
