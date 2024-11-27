import createVenue from "./createVenue";
import updateVenue from "./updateVenue";

/**
 * Handles the submission of the venue form, creating or updating the venue based on whether it's an edit.
 * It validates the form data, creates the `newVenue` object, and calls the appropriate API function to either create or update a venue.
 * After the operation, it updates the venues list in the state and closes the modal.
 *
 * @param {Object} event - The form submit event.
 * @param {Object} editingVenue - The venue being edited, or `null` if a new venue is being created.
 * @param {Function} setVenues - Function to update the list of venues in the state.
 * @param {Function} setEditingVenue - Function to reset the editing venue state.
 * @param {Function} setIsModalOpen - Function to control the visibility of the modal.
 */
const handleSubmit = (
  event,
  editingVenue,
  setVenues,
  setEditingVenue,
  setIsModalOpen
) => {
  event.preventDefault(); // Prevent the default form submission behavior
  const token = localStorage.getItem("authToken"); // Get the authentication token from localStorage

  // Create the new venue object from the form data
  const newVenue = {
    name: event.target.venueName.value,
    description: event.target.venueDescription.value,
    price: parseFloat(event.target.venuePrice.value),
    maxGuests: parseInt(event.target.venueCapacity.value, 10),
    rating: parseFloat(event.target.venueRating.value) || 0, // Default to 0 if rating is not provided
  };

  // If location details are provided, add them to the newVenue object
  if (
    event.target.venueAddress.value ||
    event.target.venueCity.value ||
    event.target.venueZip.value ||
    event.target.venueCountry.value ||
    event.target.venueLat.value ||
    event.target.venueLng.value
  ) {
    newVenue.location = {
      address: event.target.venueAddress.value,
      city: event.target.venueCity.value,
      zip: event.target.venueZip.value,
      country: event.target.venueCountry.value,
      lat: parseFloat(event.target.venueLat.value),
      lng: parseFloat(event.target.venueLng.value),
    };
  }

  // Add meta information (features like Wi-Fi, parking, etc.)
  newVenue.meta = {
    wifi: event.target.venueWifi.checked,
    parking: event.target.venueParking.checked,
    breakfast: event.target.venueBreakfast.checked,
    pets: event.target.venuePets.checked,
  };

  // Add media (image URL and alt text) if provided
  if (event.target.venueImageUrl.value) {
    newVenue.media = [
      {
        url: event.target.venueImageUrl.value,
        alt: event.target.venueImageAlt.value,
      },
    ];
  }

  // If editing an existing venue, update it, otherwise create a new venue
  if (editingVenue) {
    updateVenue(editingVenue.id, newVenue, token)
      .then((response) => {
        // Update the venue list in the state by replacing the updated venue
        setVenues((prevVenues) =>
          prevVenues.map((venue) =>
            venue.id === editingVenue.id
              ? { ...venue, ...response.data }
              : venue
          )
        );
        setEditingVenue(null); // Reset the editing venue state
        setIsModalOpen(false); // Close the modal
      })
      .catch((error) => {
        console.error("Error updating venue:", error); // Log errors during the update process
      });
  } else {
    // Create a new venue if no editingVenue is provided
    createVenue(newVenue)
      .then((response) => {
        // Add the new venue to the venue list in the state
        setVenues((prevVenues) => [...prevVenues, response.data]);
        setIsModalOpen(false); // Close the modal after creation
      })
      .catch((error) => {
        console.error("Error creating venue:", error); // Log errors during the creation process
      });
  }
};

export default handleSubmit;
