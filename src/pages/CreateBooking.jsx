import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants/apiUrls";
import { API_KEY } from "../constants/apiKey";

export default function CreateBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { venueId: stateVenueId, selectedDates, selectedGuests } = state || {};

  // Extract venueId from the previous URL if not in state
  const venueId = stateVenueId || location.pathname.split("/").pop();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const dates = selectedDates ? selectedDates.split(" - ") : ["", ""];
  const dateFrom = dates[0] || "";
  const dateTo = dates[1] || dateFrom; // If only one date is selected, use it for both from and to

  const [formData, setFormData] = useState({
    dateFrom,
    dateTo,
    guests: selectedGuests,
    venueId,
  });

  const accessToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      if (!venueId) {
        setError(new Error("Venue ID is not defined"));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/holidaze/venues/${venueId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch venue details");
        }

        const venueData = await response.json();
        const venue = venueData.data;

        if (venue && venue.id) {
          setVenue(venue);
          setFormData((prevFormData) => ({
            ...prevFormData,
            venueId: venue.id,
          }));
        } else {
          throw new Error("Invalid venue data");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [venueId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.dateFrom || !formData.dateTo) {
      console.error("Date fields cannot be empty");
      return;
    }

    const [dayFrom, monthFrom, yearFrom] = formData.dateFrom.split(".");
    const [dayTo, monthTo, yearTo] = formData.dateTo.split(".");

    const dateFrom = new Date(`${yearFrom}-${monthFrom}-${dayFrom}`);
    const dateTo = new Date(`${yearTo}-${monthTo}-${dayTo}`);

    if (isNaN(dateFrom) || isNaN(dateTo)) {
      console.error("Invalid date values");
      return;
    }

    const bookingData = {
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString(),
      guests: formData.guests,
      venueId: formData.venueId,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/holidaze/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify(bookingData),
      });
      if (!response.ok) {
        throw new Error("Booking failed");
      }
      const result = await response.json();
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate("/project-exam-two/venues");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Create Booking</h1>
      {venue && (
        <div className="mb-4 p-4 border rounded-md">
          <img
            src={venue.media?.[0]?.url || "default-image-url.jpg"}
            alt={venue.name || "Venue Image"}
            className="w-full h-80 object-cover rounded-md mb-4"
          />

          <h2 className="text-xl font-bold">{venue.name}</h2>
          <p className="text-sm mt-2">From: {formData.dateFrom}</p>
          <p className="text-sm mt-2">To: {formData.dateTo}</p>
          <p className="text-sm mt-2">Guests: {formData.guests}</p>
          <button
            onClick={handleSubmit}
            className="mt-4 flex w-full items-center justify-center rounded-md bg-accent px-8 py-3 text-base font-medium text-black"
          >
            Confirm Booking
          </button>
        </div>
      )}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl font-bold mb-4">Booking Successful</h2>
            <p>Your booking has been successfully created.</p>
            <button
              onClick={handleCloseModal}
              className="mt-4 flex w-full items-center justify-center rounded-md bg-accent px-8 py-3 text-base font-medium text-black"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
