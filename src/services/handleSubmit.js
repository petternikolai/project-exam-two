import createVenue from "./createVenue";
import updateVenue from "./updateVenue";

const handleSubmit = (
  event,
  editingVenue,
  setVenues,
  setEditingVenue,
  setIsModalOpen
) => {
  event.preventDefault();
  const token = localStorage.getItem("authToken");

  const newVenue = {
    name: event.target.venueName.value,
    description: event.target.venueDescription.value,
    price: parseFloat(event.target.venuePrice.value),
    maxGuests: parseInt(event.target.venueCapacity.value, 10),
    rating: parseFloat(event.target.venueRating.value) || 0,
  };

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

  newVenue.meta = {
    wifi: event.target.venueWifi.checked,
    parking: event.target.venueParking.checked,
    breakfast: event.target.venueBreakfast.checked,
    pets: event.target.venuePets.checked,
  };

  if (event.target.venueImageUrl.value) {
    newVenue.media = [
      {
        url: event.target.venueImageUrl.value,
        alt: event.target.venueImageAlt.value,
      },
    ];
  }

  if (editingVenue) {
    updateVenue(editingVenue.id, newVenue, token)
      .then((response) => {
        setVenues((prevVenues) =>
          prevVenues.map((venue) =>
            venue.id === editingVenue.id
              ? { ...venue, ...response.data }
              : venue
          )
        );
        setEditingVenue(null);
        setIsModalOpen(false);
      })
      .catch((error) => {});
  } else {
    createVenue(newVenue)
      .then((response) => {
        setVenues((prevVenues) => [...prevVenues, response.data]);
        setIsModalOpen(false);
      })
      .catch((error) => {});
  }
};

export default handleSubmit;
