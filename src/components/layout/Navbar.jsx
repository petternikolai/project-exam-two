import { Link } from "react-router-dom";
import { navigationNav } from "../../constants/navigationNav";
import UserMenu from "./DesktopMenu";
import { Bars3Icon } from "@heroicons/react/24/outline";

/**
 * Navbar renders the main navigation bar for the application.
 * It supports both desktop and mobile views and integrates with the `UserMenu` and `MobileMenu`.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isLoggedIn - Indicates if the user is logged in.
 * @param {Function} props.logout - Function to log out the user.
 * @param {Object} props.userProfile - The logged-in user's profile data.
 * @param {Function} props.setMobileMenuOpen - Function to toggle the mobile menu's visibility.
 *
 * @returns {JSX.Element} A responsive navigation bar.
 */
export default function Navbar({
  isLoggedIn,
  logout,
  userProfile,
  setMobileMenuOpen,
}) {
  return (
    <nav
      aria-label="Global"
      className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
    >
      {/* Logo section */}
      <div className="flex lg:flex-1">
        <Link to="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Holidaze</span>
          <div className="logo text-accent">Holidaze</div>
        </Link>
      </div>

      {/* Mobile menu toggle button */}
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

      {/* Desktop navigation links */}
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

      {/* User menu for desktop */}
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <UserMenu
          isLoggedIn={isLoggedIn}
          logout={logout}
          userProfile={userProfile}
        />
      </div>
    </nav>
  );
}
