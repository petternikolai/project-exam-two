import { API_KEY } from "../constants/apiKeys";
import { API_BASE_URL } from "../constants/apiUrls";
import { validateImageUrl } from "../utils/validateImageUrl";

/**
 * Handles the submission of the profile update form, validates the data, and sends a request to update the user's profile.
 * It checks the avatar URL length and validity before submitting the form, and provides feedback to the user.
 *
 * @param {Object} e - The form submit event.
 * @param {Object} formData - The data to update the profile with, including bio, avatar URL, and venue manager status.
 * @param {string} token - The authentication token to authorize the request.
 * @param {Object} userProfile - The current user profile to be updated.
 * @param {Function} setUserProfile - Function to update the user profile in the state after the successful update.
 * @param {Function} setShowNotification - Function to show a notification after a successful update.
 * @param {Function} setIsLoading - Function to manage the loading state while the update request is being processed.
 */
export const handleSubmit = async (
  e,
  formData,
  token,
  userProfile,
  setUserProfile,
  setShowNotification,
  setIsLoading
) => {
  e.preventDefault(); // Prevent default form submission behavior

  // Check if token is available
  if (!token) {
    alert("You are not authorized to perform this action."); // Show alert if user is not authorized
    return;
  }

  // Validate avatar URL length
  if (formData.avatar.length > 300) {
    alert("Avatar URL cannot be greater than 300 characters.");
    return;
  }

  // Validate if the avatar URL is publicly accessible
  const isValidUrl = await validateImageUrl(formData.avatar);
  if (!isValidUrl) {
    alert("Avatar URL is not publicly accessible.");
    return;
  }

  // Set loading state to true while the request is being processed
  setIsLoading(true);

  try {
    // Send PUT request to update the user profile
    const response = await fetch(
      `${API_BASE_URL}/holidaze/profiles/${userProfile.name}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Content type header for JSON data
          Authorization: `Bearer ${token}`, // Authorization header with Bearer token
          "X-Noroff-API-Key": API_KEY, // Include API key for authentication
        },
        body: JSON.stringify({
          bio: formData.bio,
          avatar: { url: formData.avatar, alt: "User avatar" }, // Avatar data
          venueManager: formData.venueManager, // Venue manager status
        }),
      }
    );

    // Handle response errors
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData); // Log error response
      throw new Error(errorData.message || "Failed to update profile"); // Throw an error if update fails
    }

    // Parse the response data and update the user profile state
    const updatedProfile = await response.json();
    setUserProfile(updatedProfile.data);

    // Show success notification
    setShowNotification({
      show: true,
      message: "Profile updated successfully!",
    });
  } catch (error) {
    // Handle errors during the request
    alert("Failed to update profile: " + error.message); // Show alert with error message
  } finally {
    // Reset loading state to false
    setIsLoading(false);
  }
};
