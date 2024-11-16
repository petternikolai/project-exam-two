import { useState } from "react";
import useAuth from "../../auth/useAuth"; // Import custom hook for authentication
import MobileMenu from "./MobileMenu"; // Import MobileMenu component
import Navbar from "./Navbar"; // Import Navbar component

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn, logout, userProfile } = useAuth(); // Get authentication status, logout function, and user profile

  return (
    <header className="sticky inset-x-0 top-0 z-50 bg-white shadow-md">
      <Navbar
        isLoggedIn={isLoggedIn}
        logout={logout}
        userProfile={userProfile}
        setMobileMenuOpen={setMobileMenuOpen} // Pass the function as a prop
      />
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
