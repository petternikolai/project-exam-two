import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { handleSubmit } from "../utils/handleSubmit";
import ProfileUpdateForm from "../components/profile/ProfileUpdateForm";
import AdminPagesLayout from "../components/layout/AdminPagesLayout";
import { Helmet } from "react-helmet-async";

/**
 * Profile component allows users to update their profile information.
 * It fetches and displays the user's current profile data, handles form submission,
 * and shows notifications for successful or failed updates.
 *
 * @returns {JSX.Element} The profile update page with a form for editing user information.
 */
const Profile = () => {
  const { userProfile, setUserProfile } = useAuth(); // Access user profile from context
  const token = localStorage.getItem("authToken"); // Get the authentication token from local storage

  const [formData, setFormData] = useState({
    bio: "",
    avatar: "",
    venueManager: false,
  }); // Store form data
  const [isLoading, setIsLoading] = useState(false); // Loading state during form submission
  const [showNotification, setShowNotification] = useState({
    show: false,
    message: "",
  }); // State for showing notifications

  // Update formData when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setFormData({
        bio: userProfile.bio || "",
        avatar: userProfile.avatar?.url || "",
        venueManager: userProfile.venueManager || false,
      });
    }
  }, [userProfile]); // Re-run effect when userProfile changes

  /**
   * Handles form field changes for text inputs and checkboxes.
   *
   * @param {Object} e - The event object for input changes.
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /**
   * Handles dropdown selection change for the venue manager field.
   *
   * @param {Object} e - The event object for select input.
   */
  const handleSelectChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      venueManager: value === "Yes", // Convert "Yes" to true, "No" to false
    }));
  };

  /**
   * Handles the form submission and sends updated data to the server.
   *
   * @param {Object} e - The form submit event.
   */
  const handleSubmitWrapper = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true); // Set loading state

    try {
      // Handle the submission logic
      await handleSubmit(
        e,
        formData,
        token,
        userProfile,
        setUserProfile,
        setShowNotification,
        setIsLoading
      );
      setShowNotification({
        show: true,
        message: "Your changes were successfully saved!",
      }); // Success notification
    } catch (error) {
      console.error("Failed to save changes:", error);
      setShowNotification({
        show: true,
        message: "An error occurred while saving changes.",
      }); // Error notification
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  /**
   * Handles closing the notification when clicked.
   */
  const handleCloseNotification = () => {
    setShowNotification({ show: false, message: "" }); // Close the notification
  };

  return (
    <AdminPagesLayout
      title="Profile"
      notificationProps={{
        showNotification,
        setShowNotification: handleCloseNotification,
      }}
    >
      <Helmet>
        <title>Your Profile - Holidaze</title>
        <meta
          name="description"
          content="View and edit your profile details on Holidaze."
        />
      </Helmet>

      {/* Profile form heading */}
      <div className="col-span-1">
        <h1 className="text-2xl font-bold text-gray-800">
          Personal Information
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Update your profile information.
        </p>
      </div>

      {/* Profile update form */}
      <ProfileUpdateForm
        formData={formData}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        handleSubmit={handleSubmitWrapper}
        isLoading={isLoading}
      />
    </AdminPagesLayout>
  );
};

export default Profile;
