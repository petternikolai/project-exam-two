import { API_BASE_URL } from "../constants/apiUrls";

export async function fetchVenueDetails(id, setVenue) {
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

export function handleDateChange(
  days,
  startDate,
  endDate,
  venue,
  setTotalPrice,
  setSelectedDates
) {
  setTotalPrice(days * venue.price);
  if (startDate && endDate) {
    setSelectedDates(
      `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
    );
  } else {
    setSelectedDates("");
  }
}
