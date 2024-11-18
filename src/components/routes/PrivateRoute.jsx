import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { usePreviousLocation } from "../../context/PreviousLocationContext";

const PrivateRoute = ({ element: Component }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  const location = useLocation();
  const previousLocation = usePreviousLocation();

  return isAuthenticated ? (
    Component
  ) : (
    <Navigate
      to="/project-exam-two/login"
      state={{ from: previousLocation?.pathname || location.pathname }}
      replace
    />
  );
};

export default PrivateRoute;
