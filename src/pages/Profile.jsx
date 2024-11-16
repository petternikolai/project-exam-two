import { useState, useEffect } from "react";
import useAuth from "../auth/useAuth";
import ProfileLayout from "../components/profile/ProfileLayout";
import { secondaryNavigation as initialNavigation } from "../components/common/SecondaryNavigation";
import { handleNavClick } from "../utils/navigationUtils";
import { handleSubmit } from "../utils/handleSubmit";
import ProfileRenderContent from "../components/profile/ProfileRenderContent";

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
  const [selectedNav, setSelectedNav] = useState("Profile");
  const [secondaryNavigation, setSecondaryNavigation] =
    useState(initialNavigation);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        bio: userProfile.bio || "",
        avatar: userProfile.avatar.url || "",
        venueManager: userProfile.venueManager || false,
      });
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      venueManager: value === "Yes",
    }));
  };

  const handleSubmitWrapper = (e) => {
    handleSubmit(
      e,
      formData,
      token,
      userProfile,
      setUserProfile,
      setShowNotification,
      setIsLoading
    );
  };

  const handleCloseNotification = () => {
    setShowNotification({ show: false, message: "" });
  };

  const renderContent = () => (
    <ProfileRenderContent
      selectedNav={selectedNav}
      formData={formData}
      handleChange={handleChange}
      handleSelectChange={handleSelectChange}
      handleSubmitWrapper={handleSubmitWrapper}
      isLoading={isLoading}
    />
  );

  return (
    <ProfileLayout
      secondaryNavigation={secondaryNavigation}
      handleNavClick={(name) =>
        handleNavClick(name, setSelectedNav, setSecondaryNavigation)
      }
      selectedNav={selectedNav}
      renderContent={renderContent}
      showNotification={showNotification}
      handleCloseNotification={handleCloseNotification}
    />
  );
};

export default Profile;
