import useFetch from "../hooks/useFetch";
import { API_BASE_URL } from "../constants/apiUrls";
import useAuth from "../auth/useAuth";
import { useState, useEffect } from "react";
import { useDeleteBooking } from "../hooks/useDeleteBooking";
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal";
import LoadingState from "../components/bookings/LoadingState";
import ErrorState from "../components/bookings/ErrorState";
import BookingsList from "../components/bookings/BookingsList";
import AdminPagesLayout from "../components/layout/AdminPagesLayout";

export default function Bookings() {
  const { userProfile, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  const accessToken = localStorage.getItem("authToken");

  const apiUrl =
    userProfile?.name && accessToken
      ? `${API_BASE_URL}/holidaze/profiles/${userProfile.name}/bookings?_venue=true`
      : null;

  const { data: fetchedBookings, error: fetchError } = useFetch(apiUrl);

  const { deleteBooking, error: deleteError } = useDeleteBooking(
    accessToken,
    bookings,
    setBookings
  );

  useEffect(() => {
    if (fetchedBookings?.data && Array.isArray(fetchedBookings.data)) {
      setBookings(fetchedBookings.data);
    }
  }, [fetchedBookings]);

  const handleDeleteBooking = async () => {
    await deleteBooking(bookingToDelete);
    toggleModal();
  };

  const toggleModal = (id = null) => {
    setBookingToDelete(id);
    setIsModalOpen((prev) => !prev);
  };

  return (
    <AdminPagesLayout title="Bookings">
      {authLoading ? (
        <LoadingState />
      ) : !userProfile || !accessToken ? (
        <p className="text-lg text-red-500">
          Unauthorized access. Please log in to view your bookings.
        </p>
      ) : !fetchedBookings && !fetchError ? (
        <LoadingState />
      ) : fetchError || deleteError ? (
        <ErrorState
          error={fetchError || deleteError || "Failed to fetch bookings."}
        />
      ) : (
        <>
          <div className="col-span-1">
            <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>
            <p className="mt-2 text-lg text-gray-500">
              A list of your upcoming bookings.
            </p>
          </div>
          <div className="md:col-span-2 mt-6">
            <BookingsList bookings={bookings} onDelete={toggleModal} />
          </div>
          <DeleteConfirmationModal
            isOpen={isModalOpen}
            onClose={toggleModal}
            onConfirm={handleDeleteBooking}
          />
        </>
      )}
    </AdminPagesLayout>
  );
}
