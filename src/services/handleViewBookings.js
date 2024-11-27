/**
 * Handles toggling the visibility of the bookings for a specific venue.
 * If the venue is already selected, it toggles the display of the bookings.
 * If it's a new venue, it sets the bookings for that venue and marks it as selected.
 *
 * @param {Object} venue - The venue for which to toggle bookings visibility.
 * @param {Object|null} selectedVenue - The currently selected venue, or `null` if no venue is selected.
 * @param {Function} setShowBookings - Function to update the state controlling whether the bookings are visible.
 * @param {boolean} showBookings - State determining if bookings are currently shown for the selected venue.
 * @param {Function} setBookings - Function to update the bookings list for the selected venue.
 * @param {Function} setSelectedVenue - Function to set the currently selected venue.
 */
const handleViewBookings = (
  venue,
  selectedVenue,
  setShowBookings,
  showBookings,
  setBookings,
  setSelectedVenue
) => {
  // If the selected venue is the same as the current venue, toggle the bookings visibility
  if (selectedVenue?.id === venue.id) {
    setShowBookings(!showBookings); // Toggle the showBookings state
    if (!showBookings) {
      setBookings(venue.bookings || []); // Set bookings if not already shown
    } else {
      setSelectedVenue(null); // Deselect the venue when hiding the bookings
    }
  } else {
    // If a different venue is selected, show its bookings and set it as the selected venue
    setShowBookings(true); // Always show bookings for the new selected venue
    setBookings(venue.bookings || []); // Set bookings for the selected venue
    setSelectedVenue(venue); // Set the newly selected venue
  }
};

export default handleViewBookings;
