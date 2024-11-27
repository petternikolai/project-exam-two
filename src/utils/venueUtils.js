/**
 * Handles the date change event, updating the total price based on the number of days
 * and setting the selected dates in a readable format. It also checks if both start and end dates are provided.
 *
 * @param {number} days - The number of days between the start and end dates.
 * @param {Date} startDate - The selected start date of the booking.
 * @param {Date} endDate - The selected end date of the booking.
 * @param {Object} venue - The venue object containing pricing information.
 * @param {Function} setTotalPrice - Function to update the total price based on the number of days and venue price.
 * @param {Function} setSelectedDates - Function to set the formatted selected dates as a string.
 */
export function handleDateChange(
  days,
  startDate,
  endDate,
  venue,
  setTotalPrice,
  setSelectedDates
) {
  // Update total price by multiplying the number of days with the venue price
  setTotalPrice(days * venue.price);

  // If both start and end dates are provided, format them into a readable string
  if (startDate && endDate) {
    setSelectedDates(
      `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
    );
  } else {
    // If dates are not provided, reset the selected dates
    setSelectedDates("");
  }
}
