import { createContext, useContext, useState, useEffect } from "react";
import { API_BASE_URL } from "../constants/apiUrls";
import { API_KEY } from "../constants/apiKey";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userProfile: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("username");

    if (token && username) {
      // Fetch user profile using the stored username and token
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
          console.error("Error fetching user profile:", error); // Log any errors
          setAuthState({
            isLoggedIn: false,
            userProfile: null,
          });
        });
    }
  }, []);

  const login = (userProfile, token) => {
    const username = userProfile?.name; // Extract username from userProfile
    const accessToken = userProfile?.accessToken; // Extract accessToken from userProfile
    if (username && accessToken) {
      localStorage.setItem("authToken", accessToken);
      localStorage.setItem("username", username);
      setAuthState({
        isLoggedIn: true,
        userProfile: userProfile.data || userProfile, // Handle both structures
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

export const useAuth = () => useContext(AuthContext);

const fetchUserProfile = async (username, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/holidaze/profiles/${username}?_holidaze=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY,
        },
      }
    );

    const responseData = await response.json();
    if (response.ok) {
      return responseData.data; // Return the data property
    } else {
      console.error("Failed to fetch user profile:", responseData);
      return null;
    }
  } catch (error) {
    console.error("Error in fetchUserProfile:", error); // Log any errors
    return null;
  }
};
