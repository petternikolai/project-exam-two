import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants/apiUrls";
import { API_KEY } from "../constants/apiKeys";

/**
 * CreateBooking allows the user to create a booking for a specific venue.
 * The form includes date selection, guest count, and venue information.
 * Upon successful booking, a confirmation modal is shown.
 *
 * @returns {JSX.Element} A booking form for a venue, with success modal functionality.
 */
export default function CreateBooking() {
  const location = useLocation(); // Access the current location (used for navigation state)
  const navigate = useNavigate(); // Navigate between pages
  const { state } = location; // Extract state passed from previous page
  const { venueId: stateVenueId, selectedDates, selectedGuests } = state || {};

  // Extract venueId from state or fallback to the current path if venueId is not available
  const venueId = stateVenueId || location.pathname.split("/").pop();
  const [venue, setVenue] = useState(null); // Store venue details
  const [loading, setLoading] = useState(true); // Loading state while fetching venue data
  const [error, setError] = useState(null); // Store any errors during fetch
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Modal visibility state

  // Parse the selected dates into a start and end date
  const dates = selectedDates ? selectedDates.split(" - ") : ["", ""];
  const dateFrom = dates[0] || "";
  const dateTo = dates[1] || dateFrom; // If only one date is selected, use it for both from and to

  // Initialize form data with the venue ID, selected dates, and guests
  const [formData, setFormData] = useState({
    dateFrom,
    dateTo,
    guests: selectedGuests,
    venueId,
  });

  const accessToken = localStorage.getItem("authToken"); // Retrieve authentication token

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
  }, [venueId]); // Run effect when venueId changes

  /**
   * Handles the form submission and creates the booking.
   */
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/holidaze/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Booking failed");
      }
      const result = await response.json();
      setShowSuccessModal(true); // Show success modal after successful booking
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  /**
   * Closes the success modal and redirects to the venues page.
   */
  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate("/project-exam-two/venues");
  };

  // Render loading or error states while data is being fetched
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
