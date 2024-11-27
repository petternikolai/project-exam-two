/**
 * Validates if the given URL is accessible by making a `HEAD` request to the URL.
 * This is used to check if an image URL is valid and publicly accessible.
 *
 * @param {string} url - The URL to be validated. It should point to an image resource.
 * @returns {boolean} `true` if the URL is accessible, `false` if there is an error or the URL is not accessible.
 */
export const validateImageUrl = async (url) => {
  try {
    // Perform a HEAD request to check if the URL is accessible
    const response = await fetch(url, { method: "HEAD" });

    // Return true if the response is successful (status code 200-299)
    return response.ok;
  } catch (error) {
    // Return false if there is any error (e.g., URL not reachable, or network error)
    return false;
  }
};
