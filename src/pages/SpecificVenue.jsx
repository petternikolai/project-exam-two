import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import VenueSkeleton from "../components/venue/VenueSkeleton";
import VenueContent from "../components/venue/VenueContent";
import DateErrorModal from "../components/modals/DateErrorModal";
import fetchVenueDetails from "../services/fetchVenueDetails";

export default function SpecificVenue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const today = format(new Date(), "MM/dd/yyyy");
  const [selectedDates, setSelectedDates] = useState(`${today} - ${today}`);
  const [selectedGuests, setSelectedGuests] = useState(1);

  // Check if the user is authenticated based on the presence of 'authToken' in localStorage
  const isAuthenticated = localStorage.getItem("authToken") !== null;

  useEffect(() => {
    fetchVenueDetails(id, (venueData) => {
      if (venueData) {
        setVenue(venueData);
      } else {
        console.error("Invalid venue data:", venueData);
      }
    });
  }, [id]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  const handleBooking = () => {
    if (!isAuthenticated) {
      // Store the current path (specific venue page) in state
      const currentPath = window.location.pathname + window.location.search;

      // Redirect to login page with state
      navigate("/project-exam-two/login", { state: { from: currentPath } });
      return; // Prevent further execution
    }

    // If authenticated, proceed with the booking
    navigate("/project-exam-two/create-booking", {
      state: {
        venueId: id,
        selectedDates,
        selectedGuests,
        totalPrice,
      },
    });
  };

  if (!venue) {
    return <VenueSkeleton />;
  }

  return (
    <div className="bg-white">
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

      <DateErrorModal isOpen={isModalOpen} onClose={handleModalClose}>
        {modalContent}
      </DateErrorModal>
    </div>
  );
}
