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

    console.log("Retrieved token from localStorage:", token); // Log the retrieved token
    console.log("Retrieved username from localStorage:", username); // Log the retrieved username

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
    console.log("User profile received in login:", userProfile); // Log the user profile
    const username = userProfile?.name; // Extract username from userProfile
    if (username) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", username);
      console.log("Stored token in localStorage:", token); // Log the stored token
      console.log("Stored username in localStorage:", username); // Log the stored username
      setAuthState({
        isLoggedIn: true,
        userProfile: userProfile.data || userProfile, // Handle both structures
      });
    } else {
      console.error("Username is undefined in userProfile");
    }
  };

  const logout = () => {
    setAuthState({
      isLoggedIn: false,
      userProfile: null,
    });
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    console.log("Removed token and username from localStorage"); // Log the removal of token and username
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const fetchUserProfile = async (username, token) => {
  try {
    console.log("Fetching user profile with token:", token); // Log the token

    const response = await fetch(
      `${API_BASE_URL}/holidaze/profiles/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY,
        },
      }
    );

    const responseData = await response.json();
    if (response.ok) {
      console.log("Fetched user profile:", responseData.data); // Log the fetched user profile
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
