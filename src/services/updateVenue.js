import axios from "axios";
import { API_KEY } from "../constants/apiKeys";
import { API_BASE_URL } from "../constants/apiUrls";

/**
 * Sends a PUT request to update the details of a specific venue.
 * The function includes the updated venue data and the user's authorization token in the request headers.
 *
 * @param {string} venueId - The ID of the venue to be updated.
 * @param {Object} venueData - The updated data for the venue, including all fields that need to be modified.
 * @param {string} token - The authentication token for the user, which will be included in the request headers.
 *
 * @returns {Object} The updated venue data returned by the API.
 * @throws {Error} If the request fails or returns an error.
 */
const updateVenue = async (venueId, venueData, token) => {
  try {
    // Send a PUT request to update the venue with the provided venueId and venueData
    const response = await axios.put(
      `${API_BASE_URL}/holidaze/venues/${venueId}`, // API endpoint for updating the venue
      venueData, // The data to update the venue with
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the user's auth token in the request headers
          "X-Noroff-API-Key": API_KEY, // Include the API key for authentication
        },
      }
    );

    // Return the updated venue data from the API response
    return response.data;
  } catch (error) {
    // Log any errors encountered during the update process
    console.error("Error updating venue:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

export default updateVenue;
