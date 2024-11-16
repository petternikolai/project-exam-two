import { API_BASE_URL } from "../constants/apiUrls";
import { API_KEY } from "../constants/apiKey";

async function fetchUserProfile(username, token) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/holidaze/profiles/${username}?_holidaze=true&_bookings=true&_venues=true`,
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
}

export { fetchUserProfile as default };
