import useFetch from "../hooks/useFetch";
import { API_BASE_URL } from "../constants/apiUrls";
import useAuth from "../auth/useAuth"; // Import the useAuth hook
import { useState, useEffect, useRef } from "react"; // Import useState, useEffect, and useRef
import { API_KEY } from "../constants/apiKey";

function BookingsSkeletonLoader() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="bg-gray-200 h-48 w-full"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
      </div>
    </div>
  );
}

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  const modalRef = useRef();

  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className="bg-white p-6 rounded shadow-lg"
        ref={modalRef}
        tabIndex="-1"
      >
        <h2 id="modal-title" className="text-xl font-semibold text-gray-800">
          Confirm Deletion
        </h2>
        <p id="modal-description" className="mt-4 text-gray-600">
          Are you sure you want to cancel this booking?
        </p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="mr-4 bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Bookings() {
  const { userProfile } = useAuth(); // Get userProfile from useAuth
  const profileName = userProfile?.name; // Extract profileName from userProfile
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const accessToken = localStorage.getItem("authToken");

  // Show a message early if profileName is undefined
  if (!profileName) {
    return (
      <p className="text-lg text-red-500">
        Unauthorized access. Please log in to view your bookings.
      </p>
    );
  }

  // Ensure accessToken is available
  if (!accessToken) {
    return (
      <p className="text-lg text-red-500">
        Unauthorized access. Please log in to view your bookings.
      </p>
    );
  }

  const { data: fetchedBookings, error } = useFetch(
    `${API_BASE_URL}/holidaze/profiles/${profileName}/bookings?_venue=true`,
    { skip: !profileName || !accessToken } // Skip fetching if profileName or accessToken is missing
  );

  useEffect(() => {
    if (fetchedBookings) {
      setLoading(true);
      setBookings(fetchedBookings.data);
      setLoading(false);
    }
  }, [fetchedBookings]);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/holidaze/bookings/${bookingToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": API_KEY,
          },
        }
      );

      if (response.status === 204) {
        setBookings(
          bookings.filter((booking) => booking.id !== bookingToDelete)
        );
        toggleModal();
      } else {
        console.error("Failed to delete booking:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const toggleModal = (id = null) => {
    setBookingToDelete(id);
    setIsModalOpen((prev) => !prev);
  };

  if (loading) {
    return (
      <>
        <div className="col-span-1">
          <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>
          <p className="mt-2 text-lg text-gray-500">
            A list of your upcoming bookings.
          </p>
        </div>
        <div className="md:col-span-2 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <BookingsSkeletonLoader key={index} />
            ))}
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="text-lg text-red-500">
        <p>Failed to fetch bookings. Please try again later.</p>
        <p>Error: {error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="col-span-1">
        <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>
        <p className="mt-2 text-lg text-gray-500">
          A list of your upcoming bookings.
        </p>
      </div>
      <div className="md:col-span-2 mt-6">
        {bookings.length === 0 ? (
          <p className="text-lg text-gray-500">
            You have not made any bookings yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <img
                    src={booking.venue.media[0].url}
                    alt={booking.venue.media[0].alt}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {booking.venue.name}
                    </h2>
                    <p className="mt-6 text-gray-600">
                      Booking created on:
                      <br />
                      {new Date(booking.created).toLocaleDateString()}
                    </p>
                    <div className="flex flex-row justify-between">
                      <p className="mt-4 text-gray-600">
                        {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
                        {new Date(booking.dateTo).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="mt-4 text-gray-600">
                      {booking.guests} guests
                    </p>

                    <p className="mt-4 text-gray-600">
                      Last updated:
                      <br />
                      {new Date(booking.updated).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleModal(booking.id)}
                  className="text-red-600 underline p-6"
                >
                  Delete booking
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onConfirm={handleDelete}
      />
    </>
  );
}
