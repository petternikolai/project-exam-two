import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { navigationNav } from "../../constants/navigationNav";

export default function MobileMenu({
  mobileMenuOpen,
  setMobileMenuOpen,
  isLoggedIn,
  logout,
  userProfile,
}) {
  const navigate = useNavigate();

  return (
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
                      localStorage.setItem(
                        "previousUrl",
                        window.location.pathname
                      );
                      setMobileMenuOpen(false);
                      logout();
                      navigate("/project-exam-two/login");
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
  );
}
