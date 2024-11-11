import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { navigationNav } from "../../constants/navigationNav";
import { useAuth } from "../../hooks/useAuth"; // Import custom hook for authentication

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn, logout, userProfile } = useAuth(); // Get authentication status, logout function, and user profile
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userProfile !== null) {
      setLoading(false);
    }
  }, [userProfile]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-md">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/project-exam-two/" className="-m-1.5 p-1.5">
            <span className="sr-only">Holidaze</span>
            <div className="logo text-accent">Holidaze</div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigationNav.main.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm/6 font-semibold text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="relative inline-flex items-center justify-center">
                <div className="group relative inline-block h-10 w-10 overflow-visible rounded-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400">
                  {/* Avatar */}
                  {!loading && userProfile?.avatar?.url ? (
                    <img
                      src={userProfile.avatar.url}
                      alt={userProfile.avatar.alt}
                      className="h-full w-full object-cover rounded-full" // Rounded avatar
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
                  {/* ChevronDownIcon positioned outside to ensure visibility */}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="absolute bottom-0 right-0 h-4 w-4 text-gray-400 bg-gray-100 rounded-full z-20" // Ensure icon is outside and visible
                  />
                </div>
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                {isLoggedIn ? (
                  <>
                    <MenuItem>
                      <Link
                        to="/project-exam-two/profile"
                        className="block px-4 py-2 text-sm font-semibold text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                      >
                        Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/project-exam-two/bookings"
                        className="block px-4 py-2 text-sm font-semibold text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                      >
                        Bookings
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm font-semibold text-red-600 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                      >
                        Log out
                      </button>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem>
                      <Link
                        to="/project-exam-two/register"
                        className="block px-4 py-2 text-sm font-semibold text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                      >
                        Sign up
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/project-exam-two/login"
                        className="block px-4 py-2 text-sm  text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                      >
                        Log in
                      </Link>
                    </MenuItem>
                  </>
                )}
              </div>
            </MenuItems>
          </Menu>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/project-exam-two/" className="-m-1.5 p-1.5">
              <span className="sr-only">Holidaze</span>
              <div className="logo text-accent">Holidaze</div>
            </Link>
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
              <div className="space-y-2 py-6">
                {navigationNav.main.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center gap-3 mb-5">
                      <img
                        src={userProfile.avatar.url}
                        alt={userProfile.avatar.alt}
                        className=" object-cover rounded-full h-10 w-10" // Rounded avatar
                      />
                      <p className="font-bold">{userProfile.name}</p>
                    </div>

                    <Link
                      to="/project-exam-two/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/project-exam-two/bookings"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Bookings
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logout();
                      }}
                      className="-mx-3 block w-full text-left rounded-lg px-3 py-2.5 text-base/7 font-semibold text-red-600 hover:bg-gray-50"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/project-exam-two/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/project-exam-two/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
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
    </header>
  );
}
