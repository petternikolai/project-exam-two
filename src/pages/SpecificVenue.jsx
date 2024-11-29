import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import VenueSkeleton from "../components/venue/VenueSkeleton";
import VenueContent from "../components/venue/VenueContent";
import DateErrorModal from "../components/modals/DateErrorModal";
import fetchVenueDetails from "../services/fetchVenueDetails";
import { Helmet } from "react-helmet-async";

/**
 * SpecificVenue renders the details page for a specific venue.
 * It handles fetching venue details, displaying the venue content, and managing user interactions.
 *
 * @returns {JSX.Element} A detailed venue page with options for booking.
 */
export default function SpecificVenue() {
  const { id } = useParams(); // Get the venue ID from the URL
  const navigate = useNavigate(); // For navigation between pages
  const [venue, setVenue] = useState(null); // State to store venue details
  const [totalPrice, setTotalPrice] = useState(0); // Total price for booking
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [modalContent, setModalContent] = useState(""); // Content to display in the modal
  const today = format(new Date(), "MM/dd/yyyy"); // Today's date formatted
  const [selectedDates, setSelectedDates] = useState(`${today} - ${today}`); // Default booking dates
  const [selectedGuests, setSelectedGuests] = useState(1); // Number of guests
  const [error, setError] = useState(null); // Error state

  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem("authToken") !== null;

  // Fetch venue details on component mount or when `id` changes
  useEffect(() => {
    fetchVenueDetails(id)
      .then((venueData) => {
        if (venueData) {
          setVenue(venueData);
        } else {
          console.error("Invalid venue data:", venueData);
          setError("Invalid venue data");
        }
      })
      .catch((error) => {
        console.error("Error fetching venue details:", error);
        setError("Failed to load venue details");
      });
  }, [id]);

  // Close the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  // Handle the booking process
  const handleBooking = () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate("/project-exam-two/login");
      return; // Stop further execution
    }

    // Proceed to the booking page with state
    navigate("/project-exam-two/create-booking", {
      state: {
        venueId: id,
        selectedDates,
        selectedGuests,
        totalPrice,
      },
    });
  };

  // Display error message if any
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Display skeleton loader while fetching data
  if (!venue) {
    return <VenueSkeleton />;
  }

  return (
    <>
      <Helmet>
        <title>Venue Details - Holidaze</title>
        <meta
          name="description"
          content="Explore detailed information about this venue and make a booking on Holidaze."
        />
      </Helmet>
      <div className="bg-white">
        {/* Venue content */}
        <VenueContent
          venue={venue}
          selectedDates={selectedDates}
          selectedGuests={selectedGuests}
          setSelectedGuests={setSelectedGuests}
          setTotalPrice={setTotalPrice}
          setSelectedDates={setSelectedDates}
          setIsModalOpen={setIsModalOpen}
          setModalContent={setModalContent}
          handleBooking={handleBooking}
        />

        {/* Modal for displaying errors */}
        <DateErrorModal isOpen={isModalOpen} onClose={handleModalClose}>
          {modalContent}
        </DateErrorModal>
      </div>
    </>
  );
}
