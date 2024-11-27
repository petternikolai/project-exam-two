/**
 * Sorts an array of venues based on the specified sort option.
 * It handles sorting by rating (high to low, low to high) and by price (high to low, low to high).
 *
 * @param {Array} venues - The array of venue objects to be sorted. Each venue should have a `rating` and `price` property.
 * @param {string} sortOption - The sorting criterion. It can be one of the following:
 *   - "Rating (High to low)"
 *   - "Rating (Low to high)"
 *   - "Price (High to low)"
 *   - "Price (Low to high)"
 *
 * @returns {Array} The sorted array of venues.
 */
const sortVenues = (venues, sortOption) => {
  return venues.sort((a, b) => {
    switch (sortOption) {
      case "Rating (High to low)":
        return b.rating - a.rating; // Sort by rating in descending order
      case "Rating (Low to high)":
        return a.rating - b.rating; // Sort by rating in ascending order
      case "Price (High to low)":
        return b.price - a.price; // Sort by price in descending order
      case "Price (Low to high)":
        return a.price - b.price; // Sort by price in ascending order
      default:
        return 0; // If no valid sort option, return the original order
    }
  });
};

export default sortVenues;
