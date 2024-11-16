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

const Calendar = ({
  className,
  onDateChange,
  bookings,
  setIsModalOpen,
  setModalContent,
}) => {
  const today = new Date();

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

  useEffect(() => {
    onDateChange(1, selectedStartDate, selectedEndDate);
  }, []);

  const startOfTheMonth = startOfMonth(currentMonth);
  const endOfTheMonth = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(startOfTheMonth, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(endOfTheMonth, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const handlePreviousMonth = () =>
    setCurrentMonth(addMonths(currentMonth, -1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

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

  const isStartOrEnd = (day) => {
    return isSameDay(day, selectedStartDate) || isSameDay(day, selectedEndDate);
  };

  const isPastDate = (day) => {
    return isBefore(day, new Date());
  };

  return (
    <div className={`max-w-96 ${className}`}>
      <CalendarHeader
        currentMonth={currentMonth}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
      />
      <section className="text-center">
        <div className="mt-6 grid grid-cols-7 text-xs text-gray-700">
          <div>Mo.</div>
          <div>Tu.</div>
          <div>We.</div>
          <div>Th.</div>
          <div>Fr.</div>
          <div>Sa.</div>
          <div>Su.</div>
        </div>
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
      {errorMessage && (
        <div className="mt-4 text-left text-red-500">{errorMessage}</div>
      )}
    </div>
  );
};

export default Calendar;
