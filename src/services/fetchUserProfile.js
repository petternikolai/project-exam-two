import { API_BASE_URL } from "../constants/apiUrls";
import { API_KEY } from "../constants/apiKeys";

/**
 * Fetches the user profile data for a given username from the API.
 * This function includes the user's bookings and venues as part of the response.
 * It uses the provided token for authentication and sends the appropriate headers.
 *
 * @param {string} username - The username of the user whose profile is to be fetched.
 * @param {string} token - The authentication token to be used in the request headers.
 *
 * @returns {Object|null} The user profile data if the request is successful, or `null` if the request fails.
 */
async function fetchUserProfile(username, token) {
  try {
    // Fetch user profile data from the API with additional query parameters for bookings and venues
    const response = await fetch(
      `${API_BASE_URL}/holidaze/profiles/${username}?_holidaze=true&_bookings=true&_venues=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the auth token in the request headers
          "X-Noroff-API-Key": API_KEY, // Include the API key in the request headers
        },
      }
    );

    const responseData = await response.json(); // Parse the response JSON

    if (response.ok) {
      return responseData.data; // Return the profile data if the request was successful
    } else {
      console.error("Failed to fetch user profile:", responseData); // Log the error if the response is not OK
      return null; // Return null in case of an error
    }
  } catch (error) {
    console.error("Error in fetchUserProfile:", error); // Log any errors encountered during the fetch
    return null; // Return null in case of a fetch error
  }
}

export { fetchUserProfile as default };
