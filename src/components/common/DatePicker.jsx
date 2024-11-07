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

export default function DatePicker() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

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
      // Set new start date
      setSelectedStartDate(day);
      setSelectedEndDate(null); // Reset end date if a new range starts
    } else {
      // Set end date and calculate the range
      if (isBefore(day, selectedStartDate)) {
        setSelectedStartDate(day);
        setSelectedEndDate(null);
      } else {
        setSelectedEndDate(day);
      }
    }
  };

  const isSelected = (day) => {
    return (
      (selectedStartDate && isSameDay(day, selectedStartDate)) ||
      (selectedEndDate && isSameDay(day, selectedEndDate)) ||
      (selectedStartDate &&
        selectedEndDate &&
        isAfter(day, selectedStartDate) &&
        isBefore(day, selectedEndDate)) ||
      (isToday(day) && !selectedStartDate && !selectedEndDate) // Allow today to be selected without range
    );
  };

  const isStartOrEnd = (day) => {
    return isSameDay(day, selectedStartDate) || isSameDay(day, selectedEndDate);
  };

  //   const getSelectedRange = () => {
  //     if (!selectedStartDate || !selectedEndDate) return null;
  //     const daysCount = differenceInCalendarDays(
  //       selectedEndDate,
  //       selectedStartDate
  //     );
  //     return `${daysCount + 1} days selected`;
  //   };

  const isPastDate = (day) => {
    return isBefore(day, new Date());
  };

  return (
    <div className="mx-auto max-w-96">
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
                  disabled={isPastDate(day) && !isToday(day)} // Only disable past dates (today is not disabled)
                  onClick={() => isInMonth && handleDateClick(day)}
                  className={classNames(
                    isInMonth
                      ? "bg-white text-gray-900"
                      : "bg-white text-gray-400",
                    isInMonth && isSelected(day) && "bg-accent/100 text-black", // Highlight selected dates
                    isInMonth && isStartOrEnd(day) && " text-black",
                    isInMonth &&
                      isSelected(day) &&
                      !isStartOrEnd(day) &&
                      "bg-accent text-black", // Color the days in between the start and end date
                    isInMonth &&
                      isPastDate(day) &&
                      !isToday(day) &&
                      " text-gray-300", // Gray out past dates except today
                    "relative py-1.5 focus:z-10"
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

        {/* <div className="mt-4 text-center">
          {getSelectedRange() && (
            <span className="text-sm font-semibold text-gray-900">
              {getSelectedRange()}
            </span>
          )}
        </div> */}
      </div>
    </div>
  );
}
