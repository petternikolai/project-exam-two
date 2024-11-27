import {
  format,
  isSameDay,
  isSameMonth,
  isBefore,
  isAfter,
  isToday,
} from "date-fns";

/**
 * CalendarGrid renders the days of a calendar month in a grid format.
 * It highlights selected dates, booked dates, and dates outside the current month.
 *
 * @param {Object} props - The component props.
 * @param {Date[]} props.calendarDays - Array of all days in the calendar view.
 * @param {Date} props.currentMonth - The currently displayed month.
 * @param {Date} props.selectedStartDate - The start date of the selected range.
 * @param {Date} props.selectedEndDate - The end date of the selected range.
 * @param {Function} props.handleDateClick - Callback function for handling date clicks.
 * @param {Function} props.isBooked - Function to determine if a date is booked.
 * @param {Function} props.isStartOrEnd - Function to check if a date is the start or end of a range.
 * @param {Function} props.isPastDate - Function to check if a date is in the past.
 *
 * @returns {JSX.Element} A grid of calendar days with appropriate styles and interactivity.
 */
const CalendarGrid = ({
  calendarDays,
  currentMonth,
  selectedStartDate,
  selectedEndDate,
  handleDateClick,
  isBooked,
  isStartOrEnd,
  isPastDate,
}) => {
  /**
   * Combines and filters CSS class names into a single string.
   *
   * @param {...string} classes - CSS class names.
   * @returns {string} A single string of class names.
   */
  const classNames = (...classes) => classes.filter(Boolean).join(" ");

  return (
    <div className="isolate mt-2 grid grid-cols-7 gap-px">
      {calendarDays.map((day, dayIdx) => {
        // Check if the day is in the current month
        const isInMonth = isSameMonth(day, currentMonth);

        // Determine if the date should be disabled (e.g., past dates or booked dates)
        const isDisabled = (isPastDate(day) && !isToday(day)) || isBooked(day);

        // Dynamic button styling based on date state
        const buttonClasses = classNames(
          isInMonth ? "bg-white text-gray-900" : "bg-white text-gray-400/50",
          isInMonth && isSameDay(day, selectedStartDate) && "start-date",
          isInMonth && isSameDay(day, selectedEndDate) && "end-date",
          isInMonth &&
            selectedStartDate &&
            selectedEndDate &&
            !isStartOrEnd(day) &&
            isAfter(day, selectedStartDate) &&
            isBefore(day, selectedEndDate) &&
            "in-between-dates text-black",
          isInMonth && isPastDate(day) && !isToday(day) && "past-date",
          isBooked(day) && "line-through text-red-500"
        );

        // Time styling for individual days
        const timeClasses = classNames(
          "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
          isInMonth && isStartOrEnd(day) ? "rounded-full" : ""
        );

        return (
          <button
            key={day ? day.toISOString() : `empty-${dayIdx}`}
            type="button"
            disabled={isDisabled}
            onClick={() => isInMonth && handleDateClick(day)}
            className={buttonClasses}
          >
            <time
              dateTime={day ? format(day, "yyyy-MM-dd") : ""}
              className={timeClasses}
            >
              {/* Display the day number if it belongs to the current month */}
              {isInMonth ? format(day, "d") : ""}
            </time>
          </button>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
