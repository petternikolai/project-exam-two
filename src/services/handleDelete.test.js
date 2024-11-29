import { describe, it, expect, vi, beforeEach } from "vitest";
import handleDelete from "./handleDelete";
import { API_BASE_URL } from "../constants/apiUrls";
import { API_KEY } from "../constants/apiKeys";

// Mock the global fetch function
global.fetch = vi.fn();

// Mock functions for state updates
const mockSetVenues = vi.fn();
const mockSetIsDeleteModalOpen = vi.fn();
const mockSetVenueToDelete = vi.fn();

beforeEach(() => {
  vi.clearAllMocks(); // Clear all mock calls and implementations
  localStorage.setItem("authToken", "testToken"); // Mock the auth token
});

describe("handleDelete", () => {
  const venueToDelete = { id: "123" };

  it("successfully deletes a venue", async () => {
    // Mock fetch response for a successful deletion
    fetch.mockResolvedValueOnce({ status: 204 });

    await handleDelete(
      venueToDelete,
      mockSetVenues,
      mockSetIsDeleteModalOpen,
      mockSetVenueToDelete
    );

    expect(fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/holidaze/venues/${venueToDelete.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer testToken",
          "X-Noroff-API-Key": API_KEY,
        },
      }
    );
    expect(mockSetVenues).toHaveBeenCalled();
    expect(mockSetIsDeleteModalOpen).toHaveBeenCalledWith(false);
    expect(mockSetVenueToDelete).toHaveBeenCalledWith(null);
  });

  it("handles API errors gracefully", async () => {
    // Mock fetch response for an unsuccessful deletion
    fetch.mockResolvedValueOnce({ status: 400 });

    await handleDelete(
      venueToDelete,
      mockSetVenues,
      mockSetIsDeleteModalOpen,
      mockSetVenueToDelete
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(mockSetVenues).not.toHaveBeenCalled();
    expect(mockSetIsDeleteModalOpen).not.toHaveBeenCalled();
    expect(mockSetVenueToDelete).not.toHaveBeenCalled();
  });

  it("handles network errors gracefully", async () => {
    // Mock fetch to simulate a network error
    fetch.mockRejectedValueOnce(new Error("Network Error"));

    await handleDelete(
      venueToDelete,
      mockSetVenues,
      mockSetIsDeleteModalOpen,
      mockSetVenueToDelete
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(mockSetVenues).not.toHaveBeenCalled();
    expect(mockSetIsDeleteModalOpen).not.toHaveBeenCalled();
    expect(mockSetVenueToDelete).not.toHaveBeenCalled();
  });
});
