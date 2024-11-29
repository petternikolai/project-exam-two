import { describe, it, expect, vi } from "vitest";
import fetchUserProfile from "./fetchUserProfile";
import { API_BASE_URL } from "../constants/apiUrls";
import { API_KEY } from "../constants/apiKeys";

// Mock the global fetch function
global.fetch = vi.fn();

describe("fetchUserProfile", () => {
  const mockUsername = "testUser";
  const mockToken = "testToken";

  it("fetches user profile successfully", async () => {
    const mockResponse = {
      data: {
        id: "123",
        name: "Test User",
        bookings: [],
        venues: [],
      },
    };

    // Mock the fetch response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchUserProfile(mockUsername, mockToken);

    expect(fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/holidaze/profiles/${mockUsername}?_holidaze=true&_bookings=true&_venues=true`,
      {
        headers: {
          Authorization: `Bearer ${mockToken}`,
          "X-Noroff-API-Key": API_KEY,
        },
      }
    );

    expect(result).toEqual(mockResponse.data); // Ensure the function returns the expected data
  });

  it("returns null for unauthorized access", async () => {
    const mockErrorResponse = {
      message: "Unauthorized",
    };

    // Mock the fetch response
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => mockErrorResponse,
    });

    const result = await fetchUserProfile(mockUsername, mockToken);

    expect(fetch).toHaveBeenCalledTimes(1); // Ensure fetch was called once
    expect(result).toBeNull(); // Expect the function to return null for errors
  });

  it("returns null for network errors", async () => {
    // Mock a network error
    fetch.mockRejectedValueOnce(new Error("Network Error"));

    const result = await fetchUserProfile(mockUsername, mockToken);

    expect(fetch).toHaveBeenCalledTimes(1); // Ensure fetch was called once
    expect(result).toBeNull(); // Expect the function to return null for errors
  });
});
