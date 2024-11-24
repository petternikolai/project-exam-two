import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";

export default function UserMenu({ isLoggedIn, logout, userProfile }) {
  const navigate = useNavigate();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="relative inline-flex items-center justify-center">
          <div className="group relative inline-block h-10 w-10 overflow-visible rounded-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400">
            {/* Avatar */}
            {userProfile?.avatar?.url ? (
              <img
                src={userProfile.avatar.url}
                alt={userProfile.avatar.alt}
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-full w-full text-gray-500 rounded-full"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
            <ChevronDownIcon
              aria-hidden="true"
              className="absolute bottom-0 right-0 h-4 w-4 text-gray-400 bg-gray-100 rounded-full z-20"
            />
          </div>
          {userProfile?.name && (
            <p className="ml-2 text-sm font-semibold text-gray-900 group-hover:text-gray-800">
              {userProfile.name}
            </p>
          )}
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div className="py-1">
          {isLoggedIn ? (
            <>
              <MenuItem>
                <Link
                  to="/project-exam-two/profile"
                  className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/project-exam-two/bookings"
                  className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Bookings
                </Link>
              </MenuItem>
              {userProfile?.venueManager && (
                <MenuItem>
                  <Link
                    to="/project-exam-two/manage-venues"
                    className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    My Venues
                  </Link>
                </MenuItem>
              )}
              <MenuItem>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm font-semibold text-red-600 hover:bg-gray-100"
                >
                  Log out
                </button>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <Link
                  to="/project-exam-two/login"
                  className="block px-4 py-2 font-semibold text-sm text-gray-700 hover:bg-gray-100"
                >
                  Log in
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/project-exam-two/register"
                  className="block px-4 py-2 font-semibold text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign up
                </Link>
              </MenuItem>
            </>
          )}
        </div>
      </MenuItems>
    </Menu>
  );
}
