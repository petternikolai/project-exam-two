import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { format } from "date-fns";

const CalendarHeader = ({ currentMonth, onPreviousMonth, onNextMonth }) => {
  return (
    <div className="relative text-center">
      <button
        type="button"
        onClick={onPreviousMonth}
        className="absolute -left-1.5 -top-1 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Previous month</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={onNextMonth}
        className="absolute -right-1.5 -top-1 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Next month</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <h2 className="text-sm font-semibold text-gray-900">
        {format(currentMonth, "MMMM yyyy")}
      </h2>
    </div>
  );
};

export default CalendarHeader;
