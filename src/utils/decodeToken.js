/**
 * Decodes a JWT (JSON Web Token) and returns the payload as a JavaScript object.
 * It extracts the payload from the token, decodes it from base64, and parses it into JSON.
 *
 * @param {string} token - The JWT to decode.
 * @returns {Object|null} The decoded payload as a JavaScript object, or `null` if an error occurs during decoding.
 */
export const decodeToken = (token) => {
  try {
    // Split the token into its three parts (header, payload, signature) and get the payload
    const base64Url = token.split(".")[1];

    // Convert base64Url to base64 format (replacing URL-safe characters)
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    // Decode base64 into a JSON payload string
    const jsonPayload = decodeURIComponent(
      atob(base64) // Decode the base64 string
        .split("") // Split the string into individual characters
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)) // Convert each character to a URL-encoded format
        .join("") // Join the characters back into a string
    );

    // Parse the JSON payload and return it as an object
    return JSON.parse(jsonPayload);
  } catch (error) {
    // Log any errors during decoding (e.g., invalid token format)
    console.error("Error decoding token:", error);
    return null; // Return null in case of an error
  }
};
