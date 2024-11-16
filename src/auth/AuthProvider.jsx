import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import fetchUserProfile from "../services/fetchUserProfile";

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userProfile: null,
  });

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
            console.error("User profile not found");
            setAuthState({
              isLoggedIn: false,
              userProfile: null,
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
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
    } else {
      console.error("Username or accessToken is undefined in userProfile");
    }
  };

  const logout = () => {
    setAuthState({
      isLoggedIn: false,
      userProfile: null,
    });
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
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
