import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isToday,
  isSameMonth,
  isBefore,
  isSameDay,
  isAfter,
  differenceInCalendarDays,
} from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DatePicker = ({
  className,
  onDateChange,
  bookings,
  setIsModalOpen,
  setModalContent,
}) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedStartDate, setSelectedStartDate] = useState(today);
  const [selectedEndDate, setSelectedEndDate] = useState(today);
  const [errorMessage, setErrorMessage] = useState("");

  // Get the start and end date of the month and generate only the days in the current month
  const startOfTheMonth = startOfMonth(currentMonth);
  const endOfTheMonth = endOfMonth(currentMonth);

  // Get the first day of the week and last day of the week of the selected month
  const calendarStart = startOfWeek(startOfTheMonth, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(endOfTheMonth, { weekStartsOn: 1 });

  // All days in the calendar grid (with empty days for the first/last week outside the current month)
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const handlePreviousMonth = () =>
    setCurrentMonth(addMonths(currentMonth, -1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleDateClick = (day) => {
    if (isBefore(day, new Date()) && !isToday(day)) {
      // Don't allow selecting past dates, except today
      return;
    }

    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      // Set new start date and reset total price
      setSelectedStartDate(day);
      setSelectedEndDate(null); // Reset end date if a new range starts
      onDateChange(0, null, null); // Reset total price
      setErrorMessage(""); // Reset error message
    } else {
      // Set end date and calculate the range
      if (isBefore(day, selectedStartDate)) {
        setSelectedStartDate(day);
        setSelectedEndDate(null);
        onDateChange(0, null, null); // Reset total price
        setErrorMessage(""); // Reset error message
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
          setSelectedStartDate(null); // Reset start date
          setSelectedEndDate(null); // Reset end date
          onDateChange(0, null, null); // Reset total price
        } else {
          setSelectedEndDate(day);
          onDateChange(daysCount, selectedStartDate, day);
          setErrorMessage(""); // Reset error message
        }
      }
    }
  };

  const isStartOrEnd = (day) => {
    return isSameDay(day, selectedStartDate) || isSameDay(day, selectedEndDate);
  };

  const getSelectedRange = () => {
    if (!selectedStartDate || !selectedEndDate) return null;
    const daysCount = differenceInCalendarDays(
      selectedEndDate,
      selectedStartDate
    );
    return `${daysCount + 1} days selected`;
  };

  const isPastDate = (day) => {
    return isBefore(day, new Date());
  };

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

  return (
    <div className={`max-w-96 ${className}`}>
      <div className="relative text-center">
        <button
          type="button"
          onClick={handlePreviousMonth}
          className="absolute -left-1.5 -top-1 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={handleNextMonth}
          className="absolute -right-1.5 -top-1 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        <section className="text-center">
          <h2 className="text-sm font-semibold text-gray-900">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <div className="mt-6 grid grid-cols-7 text-xs text-gray-700">
            <div>Mo.</div>
            <div>Tu.</div>
            <div>We.</div>
            <div>Th.</div>
            <div>Fr.</div>
            <div>Sa.</div>
            <div>Su.</div>
          </div>
          <div className="isolate mt-2 grid grid-cols-7 gap-px">
            {calendarDays.map((day, dayIdx) => {
              const isInMonth = isSameMonth(day, currentMonth);

              return (
                <button
                  key={day ? day.toISOString() : `empty-${dayIdx}`}
                  type="button"
                  disabled={(isPastDate(day) && !isToday(day)) || isBooked(day)} // Disable booked dates
                  onClick={() => isInMonth && handleDateClick(day)}
                  className={classNames(
                    isInMonth
                      ? "bg-white text-gray-900"
                      : "bg-white text-gray-400",

                    // Apply styles to start date
                    isInMonth &&
                      isSameDay(day, selectedStartDate) &&
                      "start-date",

                    // Apply styles to end date
                    isInMonth && isSameDay(day, selectedEndDate) && "end-date ",

                    // Apply color to days in between the start and end date
                    isInMonth &&
                      selectedStartDate &&
                      selectedEndDate &&
                      !isStartOrEnd(day) &&
                      isAfter(day, selectedStartDate) &&
                      isBefore(day, selectedEndDate) &&
                      "in-between-dates text-black", // Light gray background for days between

                    // Gray out past dates except today
                    isInMonth &&
                      isPastDate(day) &&
                      !isToday(day) &&
                      "text-gray-300",

                    isBooked(day) && "line-through" // Add line-through for booked dates
                  )}
                >
                  <time
                    dateTime={day ? format(day, "yyyy-MM-dd") : ""}
                    className={classNames(
                      "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                      isInMonth && isStartOrEnd(day) ? "rounded-full" : "" // Keep rounded corners for start/end date
                    )}
                  >
                    {isInMonth ? format(day, "d") : ""}
                  </time>
                </button>
              );
            })}
          </div>
        </section>
        {errorMessage && (
          <div className="mt-4 text-left text-red-500">{errorMessage}</div>
        )}
        <div className="mt-4 text-left">
          {getSelectedRange() && (
            <span className="text-sm text-gray-900">{getSelectedRange()}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
