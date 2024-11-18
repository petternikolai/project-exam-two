import { API_BASE_URL } from "../constants/apiUrls";
import { API_KEY } from "../constants/apiKey";

const fetchVenueDetails = async (venueId) => {
  if (!venueId) {
    throw new Error("Invalid venue ID");
  }

  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch(
      `${API_BASE_URL}/holidaze/venues/${venueId}?_owner=true&_bookings=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch venue details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching venue details:", error);
    throw error;
  }
};

export default fetchVenueDetails;
