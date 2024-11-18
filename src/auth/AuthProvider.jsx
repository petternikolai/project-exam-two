import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";
import fetchUserProfile from "../services/fetchUserProfile";
import { usePreviousLocation } from "../context/PreviousLocationContext";

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userProfile: null,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const previousLocation = usePreviousLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("username");

    if (token && username) {
      fetchUserProfile(username, token)
        .then((userProfile) => {
          if (userProfile) {
            setAuthState({
              isLoggedIn: true,
              userProfile: userProfile,
            });
          } else {
            setAuthState({
              isLoggedIn: false,
              userProfile: null,
            });
          }
        })
        .catch(() => {
          setAuthState({
            isLoggedIn: false,
            userProfile: null,
          });
        });
    }
  }, []);

  const login = (userProfile, token) => {
    const username = userProfile?.name;
    const accessToken = userProfile?.accessToken;
    if (username && accessToken) {
      localStorage.setItem("authToken", accessToken);
      localStorage.setItem("username", username);
      setAuthState({
        isLoggedIn: true,
        userProfile: userProfile.data || userProfile,
      });
    }
  };

  const logout = () => {
    setAuthState({
      isLoggedIn: false,
      userProfile: null,
    });
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");

    // Redirect to the current location or home page
    const redirectTo = location.pathname || "/";
    navigate(redirectTo);
  };

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
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
