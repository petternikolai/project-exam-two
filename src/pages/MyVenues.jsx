import React, { useEffect, useState } from "react";
import fetchUserProfile from "../services/fetchUserProfile";
import fetchVenueDetails from "../services/fetchVenueDetails";
import MyVenuesSkeletonLoader from "../components/loaders/MyVenuesSkeletonLoader";
import CreateUpdateVenueModal from "../components/modals/CreateUpdateVenueModal";
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal";
import VenueItem from "../components/venue/VenueItem";
import handleSubmit from "../services/handleSubmit";
import handleDelete from "../services/handleDelete";
import handleViewBookings from "../services/handleViewBookings";
import AdminPagesLayout from "../components/layout/AdminPagesLayout";

/**
 * MyVenues renders the user's venues, allowing for editing, deleting, and viewing bookings.
 * It fetches venues from the user's profile, shows a loading state, and includes modals for managing venues.
 *
 * @returns {JSX.Element} A page displaying the user's venues with functionality to manage them.
 */
const MyVenues = () => {
  const [venues, setVenues] = useState([]); // List of venues
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [editingVenue, setEditingVenue] = useState(null); // Venue being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility for editing/creating a venue
  const [bookings, setBookings] = useState([]); // List of bookings for selected venue
  const [showBookings, setShowBookings] = useState(false); // Control for showing bookings
  const [selectedVenue, setSelectedVenue] = useState(null); // Selected venue
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Modal visibility for delete confirmation
  const [venueToDelete, setVenueToDelete] = useState(null); // Venue to be deleted

  useEffect(() => {
    // Fetch the user profile and associated venues
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
              setVenues(venues); // Set fetched venues
            });
          }
        })
        .catch((error) => {
          setError(error); // Handle errors
        })
        .finally(() => {
          setLoading(false); // Mark loading complete
        });
    }
  }, []); // Fetch data once on component mount

  // Handle modal closing
  const closeModal = () => setIsModalOpen(false);

  // Handle delete modal closing
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  // Handle venue editing
  const handleEdit = (venue) => {
    setEditingVenue(venue); // Set the venue for editing
    setIsModalOpen(true); // Open the edit modal
  };

  // Handle deleting a venue
  const openDeleteModal = (venue) => {
    setVenueToDelete(venue); // Set the venue to delete
    setIsDeleteModalOpen(true); // Open the delete confirmation modal
  };

  return (
    <AdminPagesLayout title="My Venues">
      {loading ? (
        <MyVenuesSkeletonLoader /> // Show skeleton loader while loading
      ) : error ? (
        <div className="error">{error.message}</div> // Show error message if any
      ) : (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">My Venues</h1>
            <p className="mt-2 text-lg">Manage your listed venues here.</p>
          </div>

          {/* List of venues */}
          <div className="space-y-4">
            {venues.length > 0 ? (
              venues.map((venue) => (
                <VenueItem
                  key={venue.id}
                  venue={venue}
                  handleEdit={handleEdit}
                  openDeleteModal={openDeleteModal}
                  handleViewBookings={handleViewBookings}
                  showBookings={showBookings && selectedVenue?.id === venue.id}
                  selectedVenue={selectedVenue}
                  bookings={bookings}
                  setShowBookings={setShowBookings}
                  setBookings={setBookings}
                  setSelectedVenue={setSelectedVenue}
                />
              ))
            ) : (
              <li>No venues listed yet.</li> // Message when no venues are listed
            )}
          </div>

          {/* Modal for editing/creating a venue */}
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

          {/* Modal for confirming venue deletion */}
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
