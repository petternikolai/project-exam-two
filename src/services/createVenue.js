import axios from "axios";
import { API_KEY } from "../constants/apiKeys";
import { API_BASE_URL } from "../constants/apiUrls";

/**
 * Creates a new venue by sending a POST request to the API with the provided venue data.
 * It includes the authorization token and API key in the request headers.
 *
 * @param {Object} venueData - The data for the venue to be created. This should include venue details.
 * @returns {Object} The response data from the API, which contains the created venue details.
 */
const createVenue = async (venueData) => {
  const accessToken = localStorage.getItem("authToken"); // Retrieve authentication token from localStorage

  // Send a POST request to create the venue
  const response = await axios.post(
    `${API_BASE_URL}/holidaze/venues`, // API endpoint for creating a venue
    venueData, // The venue data to be sent in the request body
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Authorization header with Bearer token
        "X-Noroff-API-Key": API_KEY, // API key for authentication
      },
    }
  );

  // Return the data from the API response
  return response.data;
};

export default createVenue;
