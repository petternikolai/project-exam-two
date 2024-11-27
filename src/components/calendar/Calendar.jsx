import { useState, useEffect } from "react";
import {
  startOfMonth,
  endOfMonth,
  addMonths,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isToday,
  isBefore,
  isSameDay,
  isAfter,
  differenceInCalendarDays,
  addDays,
  format,
} from "date-fns";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";

/**
 * Calendar component provides an interactive calendar with functionalities
 * like selecting a date range, handling bookings, and navigating months.
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - Additional CSS classes for the container.
 * @param {Function} props.onDateChange - Callback function triggered when the selected dates change.
 * @param {Array} props.bookings - An array of booking objects with date ranges.
 * @param {Function} props.setIsModalOpen - Function to toggle the modal state.
 * @param {Function} props.setModalContent - Function to set the content of the modal.
 *
 * @returns {JSX.Element} The interactive calendar component.
 */
const Calendar = ({
  className,
  onDateChange,
  bookings,
  setIsModalOpen,
  setModalContent,
}) => {
  const today = new Date();

  /**
   * Checks if a given day is booked based on the bookings array.
   *
   * @param {Date} day - The date to check.
   * @returns {boolean} True if the date is booked, otherwise false.
   */
  const isBooked = (day) => {
    return bookings.some((booking) => {
      const dateFrom = new Date(booking.dateFrom);
      const dateTo = new Date(booking.dateTo);
      return (
        isSameDay(day, dateFrom) ||
        isSameDay(day, dateTo) ||
        (isAfter(day, dateFrom) && isBefore(day, dateTo))
      );
    });
  };

  /**
   * Finds the next available date starting from a given date.
   *
   * @param {Date} startDate - The start date to begin searching.
   * @returns {Date} The next available date.
   */
  const findNextAvailableDate = (startDate) => {
    let nextAvailableDate = startDate;
    while (isBooked(nextAvailableDate) || isBefore(nextAvailableDate, today)) {
      nextAvailableDate = addDays(nextAvailableDate, 1);
    }
    return nextAvailableDate;
  };

  const [currentMonth, setCurrentMonth] = useState(() => {
    return isBooked(today) ? findNextAvailableDate(today) : today;
  });
  const [selectedStartDate, setSelectedStartDate] = useState(() => {
    return isBooked(today) ? findNextAvailableDate(today) : today;
  });
  const [selectedEndDate, setSelectedEndDate] = useState(selectedStartDate);
  const [errorMessage, setErrorMessage] = useState("");
  const [clickCount, setClickCount] = useState(0);

  // Trigger the initial date change callback
  useEffect(() => {
    onDateChange(1, selectedStartDate, selectedEndDate);
  }, []);

  // Calendar calculations for the current month
  const startOfTheMonth = startOfMonth(currentMonth);
  const endOfTheMonth = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(startOfTheMonth, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(endOfTheMonth, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  // Handlers for navigating months
  const handlePreviousMonth = () =>
    setCurrentMonth(addMonths(currentMonth, -1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  /**
   * Handles a date click event to select start and end dates for a range.
   *
   * @param {Date} day - The clicked date.
   */
  const handleDateClick = (day) => {
    if (isBefore(day, new Date()) && !isToday(day)) return;

    if (clickCount % 2 === 0) {
      setSelectedStartDate(day);
      setSelectedEndDate(day);
      onDateChange(1, day, day);
      setErrorMessage("");
    } else {
      if (isBefore(day, selectedStartDate)) {
        setSelectedStartDate(day);
        setSelectedEndDate(day);
        onDateChange(1, day, day);
        setErrorMessage("");
      } else {
        const daysCount = differenceInCalendarDays(day, selectedStartDate) + 1;
        const rangeHasBookedDates = eachDayOfInterval({
          start: selectedStartDate,
          end: day,
        }).some(isBooked);

        if (rangeHasBookedDates) {
          const bookedDates = eachDayOfInterval({
            start: selectedStartDate,
            end: day,
          })
            .filter(isBooked)
            .map((d) => format(d, "yyyy-MM-dd"))
            .join(", ");
          setModalContent(
            `The following dates are already booked: ${bookedDates}`
          );
          setIsModalOpen(true);
          setSelectedStartDate(null);
          setSelectedEndDate(null);
          onDateChange(0, null, null);
        } else {
          setSelectedEndDate(day);
          onDateChange(daysCount, selectedStartDate, day);
          setErrorMessage("");
        }
      }
    }
    setClickCount((prev) => prev + 1);
  };

  /**
   * Checks if a day is either the start or end date of the selected range.
   *
   * @param {Date} day - The date to check.
   * @returns {boolean} True if the date is the start or end date, otherwise false.
   */
  const isStartOrEnd = (day) => {
    return isSameDay(day, selectedStartDate) || isSameDay(day, selectedEndDate);
  };

  /**
   * Checks if a date is in the past.
   *
   * @param {Date} day - The date to check.
   * @returns {boolean} True if the date is in the past, otherwise false.
   */
  const isPastDate = (day) => {
    return isBefore(day, new Date());
  };

  return (
    <div className={`max-w-96 ${className}`}>
      {/* Calendar header for navigating months */}
      <CalendarHeader
        currentMonth={currentMonth}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
      />
      <section className="text-center">
        {/* Weekday headers */}
        <div className="mt-6 grid grid-cols-7 text-xs text-gray-700">
          <div>Mo.</div>
          <div>Tu.</div>
          <div>We.</div>
          <div>Th.</div>
          <div>Fr.</div>
          <div>Sa.</div>
          <div>Su.</div>
        </div>
        {/* Calendar grid with days */}
        <CalendarGrid
          calendarDays={calendarDays}
          currentMonth={currentMonth}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          handleDateClick={handleDateClick}
          isBooked={isBooked}
          isStartOrEnd={isStartOrEnd}
          isPastDate={isPastDate}
        />
      </section>
      {/* Error message display */}
      {errorMessage && (
        <div className="mt-4 text-left text-red-500">{errorMessage}</div>
      )}
    </div>
  );
};

export default Calendar;
