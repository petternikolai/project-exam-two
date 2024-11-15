import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import VenueSkeleton from "../components/venue/VenueSkeleton";
import VenueContent from "../components/venue/VenueContent";
import DateErrorModal from "../components/modals/DateErrorModal";
import { fetchVenueDetails } from "../utils/venueUtils";
import DatePicker from "../components/common/DatePicker";

export default function SpecificVenue() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const today = format(new Date(), "MM/dd/yyyy");
  const [selectedDates, setSelectedDates] = useState(`${today} - ${today}`);
  const [selectedGuests, setSelectedGuests] = useState(1);

  useEffect(() => {
    fetchVenueDetails(id, setVenue);
  }, [id]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  const handleDateChange = (daysCount, startDate, endDate) => {
    if (startDate && endDate) {
      setSelectedDates(
        `${format(startDate, "MM/dd/yyyy")} - ${format(endDate, "MM/dd/yyyy")}`
      );
    }
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
      />
      <DateErrorModal isOpen={isModalOpen} onClose={handleModalClose}>
        {modalContent}
      </DateErrorModal>
    </div>
  );
}
