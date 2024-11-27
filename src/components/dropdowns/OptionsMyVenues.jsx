import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";

/**
 * OptionsMyVenues renders a dropdown menu with actions for managing venues.
 * Available actions include editing, deleting, and toggling the view of bookings.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onEdit - Callback function triggered when the "Edit" action is selected.
 * @param {Function} props.onDelete - Callback function triggered when the "Delete" action is selected.
 * @param {Function} props.onViewBookings - Callback function triggered to toggle booking visibility.
 * @param {boolean} props.showBookings - Boolean indicating whether bookings are currently shown.
 *
 * @returns {JSX.Element} A dropdown menu with venue management options.
 */
export default function OptionsMyVenues({
  onEdit,
  onDelete,
  onViewBookings,
  showBookings,
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        {/* Dropdown button to open menu */}
        <MenuButton className="flex items-center p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-100">
          <span className="sr-only">Open options</span>
          <FontAwesomeIcon
            icon={faEllipsis}
            className="size-5"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {/* Edit action */}
        <div className="py-1">
          <MenuItem className="group">
            <button
              onClick={onEdit}
              className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              <PencilSquareIcon
                aria-hidden="true"
                className="mr-3 size-5 text-gray-400 group-data-[focus]:text-gray-500"
              />
              Edit
            </button>
          </MenuItem>
        </div>

        {/* View or Hide Bookings action */}
        <div className="py-1">
          <MenuItem className="group">
            <button
              onClick={onViewBookings}
              className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              <FontAwesomeIcon
                icon={showBookings ? faEyeSlash : faEye}
                aria-hidden="true"
                className="mr-3 size-5 text-gray-400 group-data-[focus]:text-gray-500"
              />
              {showBookings ? "Hide Bookings" : "View Bookings"}
            </button>
          </MenuItem>
        </div>

        {/* Delete action */}
        <div className="py-1">
          <MenuItem className="group">
            <button
              onClick={onDelete}
              className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              <TrashIcon
                aria-hidden="true"
                className="mr-3 size-5 text-gray-400 group-data-[focus]:text-gray-500"
              />
              Delete
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
