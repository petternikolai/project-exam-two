import axios from "axios";
import { API_KEY } from "../constants/apiKey";
import { API_BASE_URL } from "../constants/apiUrls";

const updateVenue = async (venueId, venueData, token) => {
  const response = await axios.put(
    `${API_BASE_URL}/holidaze/venues/${venueId}`,
    venueData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
    }
  );
  return response.data;
};

export default updateVenue;
