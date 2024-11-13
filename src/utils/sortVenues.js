const sortVenues = (venues, sortOption) => {
  return venues.sort((a, b) => {
    switch (sortOption) {
      case "Rating (High to low)":
        return b.rating - a.rating;
      case "Rating (Low to high)":
        return a.rating - b.rating;
      case "Price (High to low)":
        return b.price - a.price;
      case "Price (Low to high)":
        return a.price - a.price;
      default:
        return 0;
    }
  });
};

export default sortVenues;
