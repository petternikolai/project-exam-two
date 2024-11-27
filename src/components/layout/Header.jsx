import { useState } from "react";
import useAuth from "../../hooks/useAuth"; // Import custom hook for authentication
import MobileMenu from "./MobileMenu"; // Import MobileMenu component
import Navbar from "./Navbar"; // Import Navbar component

/**
 * Header component renders the top navigation section of the application.
 * It includes a responsive `Navbar` and a collapsible `MobileMenu` for smaller screens.
 *
 * @returns {JSX.Element} A sticky header with navigation and menu functionality.
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Tracks the state of the mobile menu
  const { isLoggedIn, logout, userProfile } = useAuth(); // Get authentication status, logout function, and user profile

  return (
    <header className="sticky inset-x-0 top-0 z-50 bg-white shadow-md">
      {/* Main navigation bar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        logout={logout}
        userProfile={userProfile}
        setMobileMenuOpen={setMobileMenuOpen} // Pass the function as a prop
      />
      {/* Mobile menu for smaller screens */}
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        isLoggedIn={isLoggedIn}
        logout={logout}
        userProfile={userProfile}
      />
    </header>
  );
}
