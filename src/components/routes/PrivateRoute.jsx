import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { usePreviousLocation } from "../../context/PreviousLocationContext";

/**
 * PrivateRoute restricts access to authenticated users only.
 * If the user is authenticated, the specified component is rendered.
 * Otherwise, the user is redirected to the login page.
 *
 * @param {Object} props - The component props.
 * @param {JSX.Element} props.element - The component to render if the user is authenticated.
 *
 * @returns {JSX.Element} The specified component or a redirect to the login page.
 */
const PrivateRoute = ({ element: Component }) => {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Check if the user is logged in
  const location = useLocation(); // Current location
  const previousLocation = usePreviousLocation(); // Retrieve previous location

  return isAuthenticated ? (
    Component // Render the protected component if authenticated
  ) : (
    <Navigate
      to="/project-exam-two/login" // Redirect to login
      state={{ from: previousLocation?.pathname || location.pathname }} // Preserve navigation history
      replace
    />
  );
};

export default PrivateRoute;
