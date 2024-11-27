import { useState, useEffect } from "react";
import { API_KEY } from "../constants/apiKeys"; // Import the API key

/**
 * Custom hook for data fetching with error handling.
 *
 * @param {string} url - The API endpoint to fetch data from.
 *
 * @returns {Object} An object containing `data`, `loading`, and `error` states.
 */

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setError("URL is required for fetching data.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("authToken"); // Get accessToken from local storage
        if (!accessToken) {
          throw new Error("Missing access token. Please log in again.");
        }

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": API_KEY, // Include the API key in the headers
          },
        });

        if (!response.ok) {
          throw new Error(
            `Network error: ${response.status} ${response.statusText}`
          );
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format: Expected JSON.");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
