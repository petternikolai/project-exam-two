import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";
import fetchUserProfile from "../services/fetchUserProfile";
import { usePreviousLocation } from "../context/PreviousLocationContext";
import Loader from "../components/loaders/Loader";

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userProfile: null,
    loading: true, // Ny tilstand for å spore lasting
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
              loading: false, // Lasting fullført
            });
          } else {
            setAuthState({
              isLoggedIn: false,
              userProfile: null,
              loading: false,
            });
          }
        })
        .catch(() => {
          setAuthState({
            isLoggedIn: false,
            userProfile: null,
            loading: false,
          });
        });
    } else {
      setAuthState((prevState) => ({
        ...prevState,
        loading: false, // Ingen token, lasting fullført
      }));
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
        loading: false,
      });
    }
  };

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
