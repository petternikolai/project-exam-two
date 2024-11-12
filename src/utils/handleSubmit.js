import { API_KEY } from "../constants/apiKey";
import { API_BASE_URL } from "../constants/apiUrls";
import { validateImageUrl } from "../utils/validateImageUrl";

export const handleSubmit = async (
  e,
  formData,
  token,
  userProfile,
  setUserProfile,
  setShowNotification,
  setIsLoading
) => {
  e.preventDefault();
  if (!token) {
    alert("You are not authorized to perform this action.");
    return;
  }
  if (formData.avatar.length > 300) {
    alert("Avatar URL cannot be greater than 300 characters.");
    return;
  }
  const isValidUrl = await validateImageUrl(formData.avatar);
  if (!isValidUrl) {
    alert("Avatar URL is not publicly accessible.");
    return;
  }
  setIsLoading(true);
  try {
    const response = await fetch(
      `${API_BASE_URL}/holidaze/profiles/${userProfile.name}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify({
          bio: formData.bio,
          avatar: { url: formData.avatar, alt: "User avatar" },
          venueManager: formData.venueManager,
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      throw new Error(errorData.message || "Failed to update profile");
    }
    const updatedProfile = await response.json();
    setUserProfile(updatedProfile.data);
    setShowNotification({
      show: true,
      message: "Profile updated successfully!",
    });
  } catch (error) {
    alert("Failed to update profile: " + error.message);
  } finally {
    setIsLoading(false);
  }
};
