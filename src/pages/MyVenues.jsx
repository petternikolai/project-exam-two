import React, { useEffect, useState } from "react";
import fetchUserProfile from "../services/fetchUserProfile";
import createVenue from "../services/createVenue";
import updateVenue from "../services/updateVenue";
import CreateUpdateVenueModal from "../components/CreateUpdateVenueModal"; // Import the new component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPaw } from "@fortawesome/free-solid-svg-icons";
import { faWifi, faCircleParking } from "@fortawesome/pro-solid-svg-icons";
import { faPanFrying } from "@fortawesome/pro-duotone-svg-icons";
import { API_BASE_URL } from "../constants/apiUrls";
import { API_KEY } from "../constants/apiKey";
import fetchVenueDetails from "../services/fetchVenueDetails"; // Import fetchVenueDetails

const MyVenues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingVenue, setEditingVenue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState([]); // Add state for bookings
  const [showBookings, setShowBookings] = useState(false); // Add state for toggling bookings
  const [selectedVenue, setSelectedVenue] = useState(null); // Add state for selected venue

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("username");

    if (token) {
      fetchUserProfile(username, token)
        .then((data) => {
          if (data) {
            const venuesWithBookings = data.venues.map((venue) => {
              return fetchVenueDetails(venue.id).then((venueDetails) => {
                console.log("Fetched venue details:", venueDetails); // Log the venue details
                return { ...venue, bookings: venueDetails.data.bookings || [] }; // Ensure bookings are correctly set
              });
            });

            Promise.all(venuesWithBookings).then((venues) => {
              setVenues(venues);
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("authToken");

    const newVenue = {
      name: event.target.venueName.value,
      description: event.target.venueDescription.value,
      price: parseFloat(event.target.venuePrice.value),
      maxGuests: parseInt(event.target.venueCapacity.value, 10),
      rating: parseFloat(event.target.venueRating.value) || 0, // Include rating
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
          setIsModalOpen(false); // Close the modal after updating
        })
        .catch((error) => {
          console.error(
            "Error updating venue:",
            error.response ? error.response.data : error.message
          );
        });
    } else {
      createVenue(newVenue)
        .then((response) => {
          setVenues((prevVenues) => [...prevVenues, response]);
          setIsModalOpen(false); // Close the modal after creating
        })
        .catch((error) => {
          console.error(
            "Error creating venue:",
            error.response ? error.response.data : error.message
          );
        });
    }
  };

  const handleDelete = async (venueId) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${API_BASE_URL}/holidaze/venues/${venueId}`,
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
        setVenues(venues.filter((venue) => venue.id !== venueId));
      } else {
        console.error("Failed to delete venue:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting venue:", error);
    }
  };

  const handleEdit = (venue) => {
    setEditingVenue(venue);
    setIsModalOpen(true);
  };

  const handleAddVenue = () => {
    setEditingVenue(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleViewBookings = (venue) => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div>Error loading venues: {error.message}</div>;
  }

  return (
    <>
      <div className="col-span-1">
        <h1 className="text-2xl font-bold text-gray-800">Venues</h1>
        <p className="mt-2 text-lg text-gray-500">Venues listed by you.</p>
      </div>
      <div className="md:col-span-2">
        <div className="col-span-full flex flex-row items-center gap-4 mb-10">
          <button
            onClick={handleAddVenue}
            type="button"
            className="text-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <p className="underline">Create new venue</p>
          </button>
        </div>
        <div className="col-span-full">
          <ul className="space-y-4">
            {venues.length > 0 ? (
              venues.map((venue) => (
                <li
                  key={venue.id}
                  className="border rounded-lg shadow-md overflow-hidden"
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100">
                    {venue.media && venue.media.length > 0 ? (
                      <img
                        src={venue.media[0].url}
                        alt={venue.media[0].alt}
                        className="h-64 w-full object-cover object-center"
                      />
                    ) : (
                      <img
                        alt="No image"
                        src="https://via.placeholder.com/300"
                        className="h-64 w-full object-cover object-center"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">{venue.name}</h2>
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-accent text-lg mr-2"
                        />
                        <p className="text-gray-900">
                          {venue.rating === 0
                            ? "No ratings"
                            : venue.rating.toFixed(1)}
                        </p>
                      </div>
                    </div>
                    {venue.location && (
                      <div className="mt-2 text-gray-600">
                        <p>
                          {venue.location.city}, {venue.location.country}
                        </p>
                      </div>
                    )}
                    <p className="mt-2 text-gray-600">
                      Capacity: {venue.maxGuests}{" "}
                      {venue.maxGuests === 1 ? "guest" : "guests"}
                    </p>
                    <p className="mt-2 text-gray-600">
                      ${venue.price} per night
                    </p>
                    <div className="mt-2 flex space-x-2 text-gray-600">
                      {venue.meta.wifi && <FontAwesomeIcon icon={faWifi} />}
                      {venue.meta.parking && (
                        <FontAwesomeIcon icon={faCircleParking} />
                      )}
                      {venue.meta.breakfast && (
                        <FontAwesomeIcon icon={faPanFrying} />
                      )}
                      {venue.meta.pets && <FontAwesomeIcon icon={faPaw} />}
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => handleEdit(venue)}
                        className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(venue.id)}
                        className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleViewBookings(venue)}
                        className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        {showBookings && selectedVenue?.id === venue.id
                          ? "Hide Bookings"
                          : "View Bookings"}
                      </button>
                    </div>
                    <div
                      className={`mt-4 transition-max-height ${
                        showBookings && selectedVenue?.id === venue.id
                          ? "max-h-screen opacity-100"
                          : "max-h-0 opacity-0"
                      } overflow-hidden`}
                    >
                      <h3 className="text-lg font-semibold">Bookings:</h3>
                      <ul className="mt-2 space-y-2">
                        {Array.isArray(bookings) && bookings.length > 0 ? (
                          bookings.map((booking, index) => (
                            <React.Fragment key={booking.id}>
                              <li className="text-gray-600">
                                <p className="font-semibold">
                                  Booking ID: {booking.id}
                                </p>
                                <p>User: {booking.customer.name}</p>
                                <p className="mt-1">
                                  {new Date(
                                    booking.dateFrom
                                  ).toLocaleDateString()}{" "}
                                  -{" "}
                                  {new Date(
                                    booking.dateTo
                                  ).toLocaleDateString()}
                                </p>
                                <p className="mt-1">Guests: {booking.guests}</p>
                              </li>
                              {index < bookings.length - 1 && (
                                <hr className="my-2 border-gray-300" />
                              )}
                            </React.Fragment>
                          ))
                        ) : (
                          <li className="text-gray-600">
                            This venue has not been booked yet...
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li>You have not listed any venues yet.</li>
            )}
          </ul>
        </div>
      </div>
      {isModalOpen && (
        <CreateUpdateVenueModal
          editingVenue={editingVenue}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default MyVenues;
