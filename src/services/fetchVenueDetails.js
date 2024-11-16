import { API_BASE_URL } from "../constants/apiUrls";

async function fetchVenueDetails(id, setVenue) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/holidaze/venues/${id}?_owner=true&_bookings=true`
    );
    const data = await response.json();
    setVenue(data.data);
  } catch (error) {
    console.error("Error fetching venue details:", error);
  }
}

export default fetchVenueDetails;
