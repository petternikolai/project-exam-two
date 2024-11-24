import React, { useEffect, useState } from "react";
import fetchUserProfile from "../services/fetchUserProfile";
import fetchVenueDetails from "../services/fetchVenueDetails";
import MyVenuesSkeletonLoader from "../components/MyVenuesSkeletonLoader";
import CreateUpdateVenueModal from "../components/modals/CreateUpdateVenueModal";
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal";
import VenueItem from "../components/VenueItem";
import handleSubmit from "../services/handleSubmit";
import handleDelete from "../services/handleDelete";
import handleViewBookings from "../services/handleViewBookings";
import AdminPagesLayout from "../components/layout/AdminPagesLayout";

const MyVenues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingVenue, setEditingVenue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [showBookings, setShowBookings] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("username");

    if (token) {
      fetchUserProfile(username, token)
        .then((data) => {
          if (data) {
            const venuesWithBookings = data.venues.map((venue) => {
              return fetchVenueDetails(venue.id).then((venueDetails) => {
                return { ...venue, bookings: venueDetails.data.bookings || [] };
              });
            });

            Promise.all(venuesWithBookings).then((venues) => {
              setVenues(venues);
            });
          }
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

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

  const openDeleteModal = (venue) => {
    setVenueToDelete(venue);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setVenueToDelete(null);
  };

  return (
    <AdminPagesLayout title="My Venues">
      {loading ? (
        <>
          <div className="col-span-1">
            <h1 className="text-2xl font-bold text-gray-800">Venues</h1>
            <p className="mt-2 text-lg text-gray-500">Venues listed by you.</p>
          </div>
          <div className="md:col-span-2 mt-6">
            <div className="grid grid-cols-1 gap-6">
              {Array.from({ length: 2 }).map((_, index) => (
                <MyVenuesSkeletonLoader key={index} />
              ))}
            </div>
          </div>
        </>
      ) : error ? (
        <div>Error loading venues: {error.message}</div>
      ) : (
        <>
          <div className="col-span-1">
            <h1 className="text-2xl font-bold text-gray-800">Venues</h1>
            <p className="mt-2 text-lg text-gray-500">Venues listed by you.</p>
          </div>
          <div className="md:col-span-2">
            <div className="col-span-full flex justify-start mb-10">
              <button
                onClick={handleAddVenue}
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-black bg-accent rounded-md shadow hover:bg-accent/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create New Venue
              </button>
            </div>
            <div className="col-span-full">
              <ul className="space-y-4">
                {venues.length > 0 ? (
                  venues.map((venue) => (
                    <VenueItem
                      key={venue.id}
                      venue={venue}
                      handleEdit={handleEdit}
                      openDeleteModal={openDeleteModal}
                      handleViewBookings={handleViewBookings}
                      showBookings={showBookings}
                      selectedVenue={selectedVenue}
                      bookings={bookings}
                      setShowBookings={setShowBookings}
                      setBookings={setBookings}
                      setSelectedVenue={setSelectedVenue}
                    />
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
              handleSubmit={(event) =>
                handleSubmit(
                  event,
                  editingVenue,
                  setVenues,
                  setEditingVenue,
                  setIsModalOpen
                )
              }
              closeModal={closeModal}
            />
          )}
          {isDeleteModalOpen && (
            <DeleteConfirmationModal
              isOpen={isDeleteModalOpen}
              onClose={closeDeleteModal}
              onConfirm={() =>
                handleDelete(
                  venueToDelete,
                  setVenues,
                  setIsDeleteModalOpen,
                  setVenueToDelete
                )
              }
            />
          )}
        </>
      )}
    </AdminPagesLayout>
  );
};

export default MyVenues;
