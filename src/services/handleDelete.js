import { API_BASE_URL } from "../constants/apiUrls";
import { API_KEY } from "../constants/apiKey";

const handleDelete = async (
  venueToDelete,
  setVenues,
  setIsDeleteModalOpen,
  setVenueToDelete
) => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch(
      `${API_BASE_URL}/holidaze/venues/${venueToDelete.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY,
        },
      }
    );

    if (response.status === 204) {
      setVenues((prevVenues) =>
        prevVenues.filter((venue) => venue.id !== venueToDelete.id)
      );
      setIsDeleteModalOpen(false);
      setVenueToDelete(null);
    } else {
      // Handle error
    }
  } catch (error) {
    // Handle error
  }
};

export default handleDelete;
