import { useState, useEffect } from "react";
import { useAuth } from "../auth/useAuth";
import Notification from "../components/common/Notification";
import ProfileForm from "../components/common/ProfileUpdateForm";
import SecondaryNavigation from "../components/common/SecondaryNavigation";
import { secondaryNavigation as initialNavigation } from "../components/common/SecondaryNavigation";
import { handleNavClick } from "../utils/navigationUtils";
import { handleSubmit } from "../utils/handleSubmit";
import RenderContent from "../components/common/RenderContent";

export default function Profile() {
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

  const renderContent = () => {
    return (
      <RenderContent
        selectedNav={selectedNav}
        formData={formData}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        handleSubmitWrapper={handleSubmitWrapper}
        isLoading={isLoading}
      />
    );
  };

  return (
    <>
      <div className="flex justify-center">
        <div>
          <main>
            <h1 className="sr-only">Profile</h1>
            <SecondaryNavigation
              secondaryNavigation={secondaryNavigation}
              handleNavClick={(name) =>
                handleNavClick(name, setSelectedNav, setSecondaryNavigation)
              }
            />
            {renderContent()}
          </main>
        </div>
      </div>

      <Notification
        showNotification={showNotification}
        setShowNotification={handleCloseNotification}
      />
    </>
  );
}
