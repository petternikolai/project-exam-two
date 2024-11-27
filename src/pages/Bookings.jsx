import useFetch from "../hooks/useFetch";
import { API_BASE_URL } from "../constants/apiUrls";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { useDeleteBooking } from "../hooks/useDeleteBooking";
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal";
import LoadingState from "../components/bookings/LoadingState";
import ErrorState from "../components/bookings/ErrorState";
import BookingsList from "../components/bookings/BookingsList";
import AdminPagesLayout from "../components/layout/AdminPagesLayout";

/**
 * Bookings displays the user's upcoming bookings and provides functionality to delete bookings.
 * It includes loading and error states, and interacts with the booking API.
 *
 * @returns {JSX.Element} A page displaying the list of bookings with options to delete.
 */
export default function Bookings() {
  const { userProfile, loading: authLoading } = useAuth(); // Get authentication data
  const [bookings, setBookings] = useState([]); // Store the list of bookings
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for confirmation
  const [bookingToDelete, setBookingToDelete] = useState(null); // Store the booking to delete

  const accessToken = localStorage.getItem("authToken"); // Get authentication token

  const apiUrl =
    userProfile?.name && accessToken
      ? `${API_BASE_URL}/holidaze/profiles/${userProfile.name}/bookings?_venue=true`
      : null; // Construct the API URL

  const { data: fetchedBookings, error: fetchError } = useFetch(apiUrl); // Fetch bookings data

  const { deleteBooking, error: deleteError } = useDeleteBooking(
    accessToken,
    bookings,
    setBookings
  ); // Function to handle booking deletion

  useEffect(() => {
    // Set the bookings once data is fetched
    if (fetchedBookings?.data && Array.isArray(fetchedBookings.data)) {
      setBookings(fetchedBookings.data);
    }
  }, [fetchedBookings]);

  const handleDeleteBooking = async () => {
    await deleteBooking(bookingToDelete); // Delete the selected booking
    toggleModal(); // Close the confirmation modal
  };

  const toggleModal = (id = null) => {
    // Toggle the modal visibility and set the booking to delete
    setBookingToDelete(id);
    setIsModalOpen((prev) => !prev);
  };

  return (
    <AdminPagesLayout title="Bookings">
      {authLoading ? (
        <LoadingState /> // Display loading state while authenticating
      ) : !userProfile || !accessToken ? (
        <p className="text-lg text-red-500">
          Unauthorized access. Please log in to view your bookings.
        </p>
      ) : !fetchedBookings && !fetchError ? (
        <LoadingState /> // Display loading state while fetching bookings
      ) : fetchError || deleteError ? (
        <ErrorState
          error={fetchError || deleteError || "Failed to fetch bookings."}
        /> // Display error if fetch or delete fails
      ) : (
        <>
          <div className="col-span-1">
            <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>
            <p className="mt-2 text-lg text-gray-500">
              A list of your upcoming bookings.
            </p>
          </div>
          <div className="md:col-span-2 mt-6">
            <BookingsList bookings={bookings} onDelete={toggleModal} />{" "}
            {/* Render the bookings list and delete handler */}
          </div>
          <DeleteConfirmationModal
            isOpen={isModalOpen}
            onClose={toggleModal}
            onConfirm={handleDeleteBooking} // Confirm booking deletion
          />
        </>
      )}
    </AdminPagesLayout>
  );
}
