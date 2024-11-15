import { API_BASE_URL, API_VENUES_URL } from "../constants/apiUrls";

const fetchAllVenues = async () => {
  let allFetchedVenues = [];
  let totalFetchedCount = 0;
  let page = 1;

  while (true) {
    const response = await fetch(
      `${API_BASE_URL}${API_VENUES_URL}?_owner=true&_bookings=true&page=${page}`
    );
    const data = await response.json();
    if (!Array.isArray(data.data)) {
      throw new Error("Fetched data is not an array");
    }
    allFetchedVenues = [...allFetchedVenues, ...data.data];
    totalFetchedCount += data.data.length;
    if (data.data.length < 100) break; // Exit loop if less than 100 venues are fetched
    page++;
  }

  return { allFetchedVenues, totalFetchedCount };
};

export default fetchAllVenues;
