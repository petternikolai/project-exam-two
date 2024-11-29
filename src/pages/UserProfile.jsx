import { useParams } from "react-router-dom";
import RenderUserProfile from "../components/profile/RenderUserProfile";
import useFetch from "../hooks/useFetch";
import { API_BASE_URL } from "../constants/apiUrls";
import { Helmet } from "react-helmet-async";

/**
 * UserProfile fetches and displays a user's profile, including their bookings and venues.
 *
 * @returns {JSX.Element} A user profile page with details and associated bookings/venues.
 */
export default function UserProfile() {
  const { id } = useParams(); // Extract the user ID from the URL
  const queryParams = new URLSearchParams({
    _bookings: true, // Include bookings in the response
    _venues: true, // Include venues in the response
  }).toString();

  // Fetch user profile data using a custom hook
  const {
    data: profileData,
    loading,
    error,
  } = useFetch(`${API_BASE_URL}/holidaze/profiles/${id}?${queryParams}`);

  /**
   * Conditionally render content based on the state of the fetch request.
   *
   * @returns {JSX.Element} The appropriate content for the current state.
   */
  const renderContent = () => {
    if (loading) {
      // Display a loading state while data is being fetched
      return <div>Loading...</div>;
    }
    if (error) {
      // Display an error message if the fetch fails
      return <div>Error: {error.message}</div>;
    }
    // Render the user profile data
    return <RenderUserProfile profileData={profileData.data} />;
  };

  return (
    <>
      <Helmet>
        <title>User Profile - Holidaze</title>
        <meta
          name="description"
          content="View the profile and listings of this user on Holidaze."
        />
      </Helmet>
      <div>{renderContent()}</div>;
    </>
  );
}
