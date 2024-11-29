import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import createVenue from "./createVenue";

vi.mock("axios");

describe("createVenue", () => {
  it("sends a POST request to create a venue", async () => {
    const mockVenueData = { name: "Test Venue", price: 100 };
    const mockResponse = { data: { id: 1, ...mockVenueData } };

    axios.post.mockResolvedValueOnce(mockResponse);

    const result = await createVenue(mockVenueData);

    expect(axios.post).toHaveBeenCalledWith(
      "https://v2.api.noroff.dev/holidaze/venues",
      mockVenueData,
      expect.objectContaining({
        headers: {
          Authorization: expect.stringContaining("Bearer"),
          "X-Noroff-API-Key": expect.any(String),
        },
      })
    );
    expect(result).toEqual(mockResponse.data);
  });

  it("handles API errors gracefully", async () => {
    axios.post.mockRejectedValueOnce(new Error("API Error"));

    await expect(createVenue({})).rejects.toThrow("API Error");
  });
});
