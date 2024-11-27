import { API_BASE_URL, API_VENUES_URL } from "../constants/apiUrls";

/**
 * Fetches all venues from the API, paginated, until all venues are retrieved.
 * It keeps making requests until a response with fewer than 100 venues is returned, indicating the last page.
 * This function supports pagination and aggregates the results.
 *
 * @returns {Object} An object containing:
 *   - `allFetchedVenues` (Array): A list of all fetched venues.
 *   - `totalFetchedCount` (number): The total number of venues fetched.
 * @throws {Error} If the fetched data is not in an expected array format.
 */
const fetchAllVenues = async () => {
  let allFetchedVenues = []; // Array to store all fetched venues
  let totalFetchedCount = 0; // Counter to track total number of fetched venues
  let page = 1; // Start with the first page

  while (true) {
    // Fetch data from the API for the current page with query parameters for pagination and sorting
    const response = await fetch(
      `${API_BASE_URL}${API_VENUES_URL}?_owner=true&_bookings=true&page=${page}&sort=created&sortOrder=desc`
    );
    const data = await response.json(); // Parse the response JSON

    // Check if the fetched data is in the expected array format
    if (!Array.isArray(data.data)) {
      throw new Error("Fetched data is not an array"); // Throw error if data is not an array
    }

    // Add the fetched venues to the list
    allFetchedVenues = [...allFetchedVenues, ...data.data];
    totalFetchedCount += data.data.length; // Update the total count of venues

    // Break the loop if fewer than 100 venues were fetched, indicating the last page
    if (data.data.length < 100) break;

    page++; // Increment the page number to fetch the next page of results
  }

  return { allFetchedVenues, totalFetchedCount }; // Return the aggregated venues and the total count
};

export default fetchAllVenues;
