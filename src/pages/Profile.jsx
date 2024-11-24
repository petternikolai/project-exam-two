import { useState, useEffect } from "react";
import useAuth from "../auth/useAuth";
import { handleSubmit } from "../utils/handleSubmit";
import ProfileUpdateForm from "../components/profile/ProfileUpdateForm";
import AdminPagesLayout from "../components/layout/AdminPagesLayout";

const Profile = () => {
  const { userProfile, setUserProfile } = useAuth();
  const token = localStorage.getItem("authToken");

  const [formData, setFormData] = useState({
    bio: "",
    avatar: "",
    venueManager: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState({
    show: false,
    message: "",
  });

  // Update formData when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setFormData({
        bio: userProfile.bio || "",
        avatar: userProfile.avatar?.url || "",
        venueManager: userProfile.venueManager || false,
      });
    }
  }, [userProfile]);

  // Handle text input and checkbox changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle dropdown changes
  const handleSelectChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      venueManager: value === "Yes", // Converts "Yes" to true, "No" to false
    }));
  };

  const handleSubmitWrapper = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
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
      });
    } catch (error) {
      console.error("Failed to save changes:", error);
      setShowNotification({
        show: true,
        message: "An error occurred while saving changes.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle closing notifications
  const handleCloseNotification = () => {
    setShowNotification({ show: false, message: "" });
  };

  return (
    <AdminPagesLayout
      title="Profile"
      notificationProps={{
        showNotification,
        setShowNotification: handleCloseNotification,
      }}
    >
      <div className="col-span-1">
        <h1 className="text-2xl font-bold text-gray-800">
          Personal Information
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Update your profile information.
        </p>
      </div>
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
