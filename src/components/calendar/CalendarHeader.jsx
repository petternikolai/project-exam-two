import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { format } from "date-fns";

/**
 * CalendarHeader displays the current month and provides navigation buttons
 * to move to the previous or next month.
 *
 * @param {Object} props - The component props.
 * @param {Date} props.currentMonth - The currently displayed month.
 * @param {Function} props.onPreviousMonth - Callback function to navigate to the previous month.
 * @param {Function} props.onNextMonth - Callback function to navigate to the next month.
 *
 * @returns {JSX.Element} The calendar header with navigation controls.
 */
const CalendarHeader = ({ currentMonth, onPreviousMonth, onNextMonth }) => {
  return (
    <div className="relative text-center">
      {/* Button to navigate to the previous month */}
      <button
        type="button"
        onClick={onPreviousMonth}
        className="absolute -left-1.5 -top-1 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Previous month</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Button to navigate to the next month */}
      <button
        type="button"
        onClick={onNextMonth}
        className="absolute -right-1.5 -top-1 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Next month</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Display the current month in "MMMM yyyy" format */}
      <h2 className="text-sm font-semibold text-gray-900">
        {format(currentMonth, "MMMM yyyy")}
      </h2>
    </div>
  );
};

export default CalendarHeader;
