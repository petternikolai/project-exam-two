import { API_BASE_URL } from "../constants/apiUrls";
import { API_KEY } from "../constants/apiKeys";

/**
 * Fetches the details of a specific venue from the API.
 * It includes the venue's owner information and bookings as part of the response.
 * The function requires a valid venue ID and uses the provided authentication token.
 *
 * @param {string} venueId - The ID of the venue to fetch details for.
 *
 * @returns {Object} The venue details data if the request is successful.
 * @throws {Error} If the venue ID is invalid or the API request fails.
 */
const fetchVenueDetails = async (venueId) => {
  if (!venueId) {
    throw new Error("Invalid venue ID"); // Throw error if venue ID is not provided
  }

  const token = localStorage.getItem("authToken"); // Retrieve the authentication token from local storage

  try {
    // Send a GET request to fetch venue details, including owner and bookings
    const response = await fetch(
      `${API_BASE_URL}/holidaze/venues/${venueId}?_owner=true&_bookings=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Specify JSON content type
          Authorization: `Bearer ${token}`, // Include the authorization token
          "X-Noroff-API-Key": API_KEY, // Include the API key for authentication
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch venue details"); // Throw an error if the response is not OK
    }

    const data = await response.json(); // Parse the response data
    return data; // Return the fetched venue details
  } catch (error) {
    console.error("Error fetching venue details:", error); // Log any errors during the fetch process
    throw error; // Rethrow the error to be handled by the calling function
  }
};

export default fetchVenueDetails;
