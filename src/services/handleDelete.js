import { API_BASE_URL } from "../constants/apiUrls";
import { API_KEY } from "../constants/apiKeys";

/**
 * Handles the deletion of a venue by sending a DELETE request to the API.
 * It removes the venue from the local state if the deletion is successful and closes the delete modal.
 *
 * @param {Object} venueToDelete - The venue to be deleted, containing its `id` property.
 * @param {Function} setVenues - The function to update the list of venues in state after deletion.
 * @param {Function} setIsDeleteModalOpen - The function to control the visibility of the delete confirmation modal.
 * @param {Function} setVenueToDelete - The function to reset the venue to delete in state after the operation.
 *
 * @throws {Error} If the API request fails or the deletion is unsuccessful.
 */
const handleDelete = async (
  venueToDelete,
  setVenues,
  setIsDeleteModalOpen,
  setVenueToDelete
) => {
  const token = localStorage.getItem("authToken"); // Get authentication token from local storage

  try {
    // Send a DELETE request to the API to delete the venue
    const response = await fetch(
      `${API_BASE_URL}/holidaze/venues/${venueToDelete.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
          Authorization: `Bearer ${token}`, // Include the auth token in the request headers
          "X-Noroff-API-Key": API_KEY, // Include the API key for authentication
        },
      }
    );

    if (response.status === 204) {
      // If the deletion is successful, update the venues list in the state
      setVenues((prevVenues) =>
        prevVenues.filter((venue) => venue.id !== venueToDelete.id)
      );
      setIsDeleteModalOpen(false); // Close the delete modal
      setVenueToDelete(null); // Reset the venue to delete
    } else {
      // Handle error if the deletion response is not successful (status code not 204)
      console.error("Failed to delete the venue");
    }
  } catch (error) {
    // Log any errors that occur during the fetch request
    console.error("Error during venue deletion:", error);
  }
};

export default handleDelete;
