import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";
import fetchUserProfile from "../services/fetchUserProfile";
import { usePreviousLocation } from "../context/PreviousLocationContext";
import Loader from "../components/loaders/Loader";

/**
 * AuthProvider manages the global authentication state and provides
 * helper functions for login, logout, and setting user profiles.
 * It wraps the application with an authentication context.
 *
 * @param {React.ReactNode} children - The components to be rendered within the provider.
 * @returns {JSX.Element} The authentication context provider.
 */
const AuthProvider = ({ children }) => {
  // State to manage authentication details
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userProfile: null,
    loading: true, // Tracks the loading state while authenticating
  });

  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation(); // Current route location
  const previousLocation = usePreviousLocation(); // Stores the previous route location

  // Fetch user profile when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("username");

    if (token && username) {
      fetchUserProfile(username, token)
        .then((userProfile) => {
          if (userProfile) {
            // User successfully authenticated
            setAuthState({
              isLoggedIn: true,
              userProfile: userProfile,
              loading: false, // Authentication complete
            });
          } else {
            // Failed to fetch the user profile
            setAuthState({
              isLoggedIn: false,
              userProfile: null,
              loading: false,
            });
          }
        })
        .catch(() => {
          // Handle errors during authentication
          setAuthState({
            isLoggedIn: false,
            userProfile: null,
            loading: false,
          });
        });
    } else {
      // No token in localStorage; stop loading
      setAuthState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  }, []);

  /**
   * Logs in the user by saving their profile and token to localStorage
   * and updating the authentication state.
   *
   * @param {Object} userProfile - The user's profile data.
   * @param {string} token - The authentication token.
   */
  const login = (userProfile, token) => {
    const username = userProfile?.name;
    const accessToken = userProfile?.accessToken;

    if (username && accessToken) {
      localStorage.setItem("authToken", accessToken);
      localStorage.setItem("username", username);
      setAuthState({
        isLoggedIn: true,
        userProfile: userProfile.data || userProfile,
        loading: false,
      });
    }
  };

  /**
   * Logs out the user by clearing localStorage and resetting the authentication state.
   * Redirects the user to the current location or the home page.
   */
  const logout = () => {
    setAuthState({
      isLoggedIn: false,
      userProfile: null,
      loading: false,
    });
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");

    // Redirect to the current location or home page
    const redirectTo = location.pathname || "/";
    navigate(redirectTo);
  };

  /**
   * Updates the user profile in the authentication state.
   *
   * @param {Object} profile - The updated user profile.
   */
  const setUserProfile = (profile) => {
    setAuthState((prevState) => ({
      ...prevState,
      userProfile: profile,
    }));
  };

  return (
    <AuthContext.Provider
      value={{ ...authState, login, logout, setUserProfile }}
    >
      {authState.loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
