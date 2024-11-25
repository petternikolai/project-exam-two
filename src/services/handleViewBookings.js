const handleViewBookings = (
  venue,
  selectedVenue,
  setShowBookings,
  showBookings,
  setBookings,
  setSelectedVenue
) => {
  if (selectedVenue?.id === venue.id) {
    setShowBookings(!showBookings);
    if (!showBookings) {
      setBookings(venue.bookings || []);
    } else {
      setSelectedVenue(null);
    }
  } else {
    setShowBookings(true);
    setBookings(venue.bookings || []);
    setSelectedVenue(venue);
  }
};

export default handleViewBookings;
