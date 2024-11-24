import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants/apiUrls";
import { API_KEY } from "../constants/apiKey";

export function useDeleteBooking(accessToken, bookings, setBookings) {
  const [error, setError] = useState(null);

  const deleteBooking = async (bookingId) => {
    try {
      await axios.delete(`${API_BASE_URL}/holidaze/bookings/${bookingId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": API_KEY,
        },
      });
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
    } catch (err) {
      setError(err);
    }
  };

  return { deleteBooking, error };
}
