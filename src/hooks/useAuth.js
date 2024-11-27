import { useContext } from "react";
import AuthContext from "../auth/AuthContext";

/**
 * Custom hook to access the authentication context.
 * This hook ensures that the `AuthContext` is used only within an `AuthProvider`.
 *
 * @throws {Error} If the hook is used outside an `AuthProvider`.
 *
 * @example
 * // Example usage:
 * import useAuth from "./useAuth";
 *
 * const MyComponent = () => {
 *   const { isLoggedIn, userProfile, login, logout } = useAuth();
 *   return isLoggedIn ? <div>Welcome, {userProfile.name}</div> : <div>Please log in</div>;
 * };
 *
 * @returns {Object} The authentication context value provided by `AuthProvider`.
 */
const useAuth = () => {
  const context = useContext(AuthContext);

  // Ensure the hook is used within a valid provider
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default useAuth;
