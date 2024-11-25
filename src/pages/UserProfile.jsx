import { useParams } from "react-router-dom";
import RenderUserProfile from "../components/profile/RenderUserProfile";
import useFetch from "../hooks/useFetch";
import { API_BASE_URL } from "../constants/apiUrls";

export default function UserProfile() {
  const { id } = useParams();
  const queryParams = new URLSearchParams({
    _bookings: true,
    _venues: true,
  }).toString();
  const {
    data: profileData,
    loading,
    error,
  } = useFetch(`${API_BASE_URL}/holidaze/profiles/${id}?${queryParams}`);

  const renderContent = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    return <RenderUserProfile profileData={profileData.data} />;
  };

  return <div>{renderContent()}</div>;
}
