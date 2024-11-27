import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";

/**
 * UserMenu renders a desktop dropdown menu for user actions.
 * The menu includes links for viewing the profile, bookings, managing venues, and authentication actions.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isLoggedIn - Indicates if the user is logged in.
 * @param {Function} props.logout - Function to log out the user.
 * @param {Object} props.userProfile - The logged-in user's profile data.
 * @param {string} [props.userProfile.name] - The name of the user.
 * @param {Object} [props.userProfile.avatar] - The user's avatar information.
 * @param {string} [props.userProfile.avatar.url] - The URL of the user's avatar image.
 * @param {string} [props.userProfile.avatar.alt] - The alt text for the avatar image.
 * @param {boolean} [props.userProfile.venueManager] - Indicates if the user is a venue manager.
 *
 * @returns {JSX.Element} A dropdown menu component with user actions.
 */
export default function UserMenu({ isLoggedIn, logout, userProfile }) {
  const navigate = useNavigate();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        {/* Dropdown toggle button */}
        <MenuButton className="relative inline-flex items-center justify-center">
          <div className="group relative inline-block h-10 w-10 overflow-visible rounded-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400">
            {/* User Avatar */}
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

      {/* Dropdown menu items */}
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div className="py-1">
          {isLoggedIn ? (
            <>
              {/* Profile Link */}
              <MenuItem>
                <Link
                  to="/project-exam-two/profile"
                  className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </MenuItem>
              {/* Bookings Link */}
              <MenuItem>
                <Link
                  to="/project-exam-two/bookings"
                  className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Bookings
                </Link>
              </MenuItem>
              {/* Venue Manager Link */}
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
              {/* Logout Button */}
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
              {/* Login Link */}
              <MenuItem>
                <Link
                  to="/project-exam-two/login"
                  className="block px-4 py-2 font-semibold text-sm text-gray-700 hover:bg-gray-100"
                >
                  Log in
                </Link>
              </MenuItem>
              {/* Sign Up Link */}
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
