import {
  format,
  isSameDay,
  isSameMonth,
  isBefore,
  isAfter,
  isToday,
} from "date-fns";

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
  const classNames = (...classes) => classes.filter(Boolean).join(" ");

  return (
    <div className="isolate mt-2 grid grid-cols-7 gap-px">
      {calendarDays.map((day, dayIdx) => {
        const isInMonth = isSameMonth(day, currentMonth);
        const isDisabled = (isPastDate(day) && !isToday(day)) || isBooked(day);
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
              {isInMonth ? format(day, "d") : ""}
            </time>
          </button>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
