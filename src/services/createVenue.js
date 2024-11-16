import axios from "axios";
import { API_KEY } from "../constants/apiKey";
import { API_BASE_URL } from "../constants/apiUrls";

const createVenue = async (venueData) => {
  const accessToken = localStorage.getItem("authToken");

  const response = await axios.post(
    `${API_BASE_URL}/holidaze/venues`,
    venueData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
    }
  );
  return response.data;
};

export default createVenue;
