export function handleDateChange(
  days,
  startDate,
  endDate,
  venue,
  setTotalPrice,
  setSelectedDates
) {
  setTotalPrice(days * venue.price);
  if (startDate && endDate) {
    setSelectedDates(
      `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
    );
  } else {
    setSelectedDates("");
  }
}
