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
 * MyVenues component handles the display and management of the user's listed venues.
 * It allows users to view their venues, edit existing venues, delete venues, and add new ones.
 *
 * @returns {JSX.Element} The layout with the venues, modals for creating/editing and deleting venues.
 */
const MyVenues = () => {
  // State for storing venues, loading state, error state, etc.
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

  /**
   * Fetch user profile and venue details on initial load.
   * If user profile and venues are fetched successfully, the venues are mapped
   * with their corresponding booking information.
   */
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

            // Wait for all venue details to be fetched and then update the state
            Promise.all(venuesWithBookings).then((venues) => {
              setVenues(venues);
            });
          }
        })
        .catch((error) => {
          setError(error); // Set error if fetching fails
        })
        .finally(() => {
          setLoading(false); // Set loading state to false after data is fetched
        });
    }
  }, []);

  /**
   * Opens the modal for editing an existing venue.
   *
   * @param {Object} venue - The venue object that needs to be edited.
   */
  const handleEdit = (venue) => {
    setEditingVenue(venue);
    setIsModalOpen(true); // Open the modal
  };

  /**
   * Opens the modal to add a new venue.
   */
  const handleAddVenue = () => {
    setEditingVenue(null); // Reset editing venue state
    setIsModalOpen(true); // Open the modal
  };

  /**
   * Closes the create/edit venue modal.
   */
  const closeModal = () => {
    setIsModalOpen(false);
  };

  /**
   * Opens the delete confirmation modal for a venue.
   *
   * @param {Object} venue - The venue that is to be deleted.
   */
  const openDeleteModal = (venue) => {
    setVenueToDelete(venue); // Set the venue to be deleted
    setIsDeleteModalOpen(true); // Open delete confirmation modal
  };

  /**
   * Closes the delete confirmation modal.
   */
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false); // Close the delete modal
    setVenueToDelete(null); // Clear the venue to delete
  };

  return (
    <AdminPagesLayout title="My Venues">
      {/* Loading state display */}
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
        // Display error message if there is an issue loading the venues
        <div>Error loading venues: {error.message}</div>
      ) : (
        <>
          <div className="col-span-1">
            <h1 className="text-2xl font-bold text-gray-800">Venues</h1>
            <p className="mt-2 text-lg text-gray-500">Venues listed by you.</p>
          </div>
          <div className="md:col-span-2">
            {/* Button to add a new venue */}
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

            {/* List of venues */}
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

          {/* Modals for creating/updating a venue and deleting a venue */}
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
