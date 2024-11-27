import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop is a component that automatically scrolls the window to the top
 * when the user navigates to a new route or path. This is useful for ensuring
 * that users start at the top of the page when navigating between pages.
 *
 * @returns {null} This component does not render anything; it only triggers side effects.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation(); // Get the current pathname from the URL

  useEffect(() => {
    // Scroll the window to the top whenever the pathname changes
    window.scrollTo(0, 0);
  }, [pathname]); // Re-run the effect whenever the pathname changes

  return null; // This component doesn't render anything
};

export default ScrollToTop;
