import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

/**
 * MobileMenu renders a collapsible menu for smaller screens.
 * It provides navigation links based on the user's authentication state.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.mobileMenuOpen - Indicates whether the mobile menu is open.
 * @param {Function} props.setMobileMenuOpen - Function to toggle the mobile menu's visibility.
 * @param {boolean} props.isLoggedIn - Indicates if the user is logged in.
 * @param {Function} props.logout - Function to log out the user.
 * @param {Object} props.userProfile - The logged-in user's profile data.
 * @param {string} [props.userProfile.name] - The user's name.
 * @param {Object} [props.userProfile.avatar] - The user's avatar details.
 * @param {string} [props.userProfile.avatar.url] - The URL of the user's avatar image.
 * @param {string} [props.userProfile.avatar.alt] - The alt text for the avatar image.
 *
 * @returns {JSX.Element} A mobile navigation menu component.
 */
export default function MobileMenu({
  mobileMenuOpen,
  setMobileMenuOpen,
  isLoggedIn,
  logout,
  userProfile,
}) {
  return (
    <Dialog
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
      className="lg:hidden"
    >
      {/* Background overlay */}
      <div className="fixed inset-0 z-50" />

      {/* Slide-in menu panel */}
      <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/project-exam-two/" className="-m-1.5 p-1.5">
            <span className="sr-only">Holidaze</span>
            <div className="logo text-accent">Holidaze</div>
          </Link>
          {/* Close button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/20">
            <div className="py-6">
              {isLoggedIn ? (
                <>
                  {/* User profile */}
                  <div className="flex items-center gap-3 mb-5">
                    <img
                      src={userProfile.avatar.url}
                      alt={userProfile.avatar.alt}
                      className="object-cover rounded-full h-10 w-10"
                    />
                    <p className="font-bold">{userProfile.name}</p>
                  </div>
                  {/* Authenticated user links */}
                  <Link
                    to="/project-exam-two/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Edit Profile
                  </Link>
                  <Link
                    to="/project-exam-two/bookings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Bookings
                  </Link>
                  {userProfile?.venueManager && (
                    <Link
                      to="/project-exam-two/manage-venues"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Manage Venues
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="-mx-3 block w-full text-left rounded-lg px-3 py-2.5 text-base font-semibold text-red-600 hover:bg-gray-50"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  {/* Guest user links */}
                  <Link
                    to="/project-exam-two/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Sign up
                  </Link>
                  <Link
                    to="/project-exam-two/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
