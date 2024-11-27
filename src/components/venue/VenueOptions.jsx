import { StarIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../utils/classNames";
import { useEffect, useState } from "react";
import MustBeLoggedInModal from "../modals/MustBeLoggedInModal";
import { useNavigate } from "react-router-dom"; // Import useNavigate

/**
 * VenueOptions renders the booking options for a venue, including price, ratings,
 * selected dates, guest count, and a booking button.
 *
 * @param {Object} props - The component props.
 * @param {number} props.price - The price per day for the venue.
 * @param {number} props.rating - The average rating of the venue.
 * @param {Array|string} props.selectedDates - The currently selected dates for booking.
 * @param {number} props.selectedGuests - The number of guests selected.
 * @param {Function} props.setSelectedGuests - Function to update the selected number of guests.
 * @param {number} props.maxGuests - The maximum number of guests allowed.
 * @param {Function} [props.handleBooking] - Callback function triggered when booking.
 *
 * @returns {JSX.Element} A section with booking options for the venue.
 */
export default function VenueOptions({
  price,
  rating,
  selectedDates,
  selectedGuests,
  setSelectedGuests,
  maxGuests,
  handleBooking = () => {}, // Default to a no-op function
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const navigate = useNavigate(); // Navigate between pages

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsLoggedIn(!!authToken); // Update login state
  }, []);

  const handleBookingClick = () => {
    handleBooking(); // Trigger booking callback
  };

  return (
    <div className="mt-4 lg:row-span-3 lg:mt-0">
      {/* Price display */}
      <h2 className="sr-only">Product information</h2>
      <p className="text-3xl tracking-tight text-gray-900">${price} / day</p>

      {/* Ratings display */}
      <div className="mt-4">
        <h3 className="sr-only">Reviews</h3>
        <div className="flex items-center">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((ratingIndex) => (
              <StarIcon
                key={ratingIndex}
                aria-hidden="true"
                className={classNames(
                  rating > ratingIndex ? "text-accent" : "text-gray-200",
                  "size-5 shrink-0"
                )}
              />
            ))}
          </div>
          <p className="sr-only">{rating} out of 5 stars</p>
        </div>
      </div>

      {/* Selected dates */}
      {selectedDates && (
        <h3 className="mt-4 block text-sm font-medium text-gray-700">
          <p>
            Selected dates:
            <br />
            {selectedDates}
          </p>
        </h3>
      )}

      {/* Guest selection */}
      <div className="mt-4">
        <label
          htmlFor="guests"
          className="block text-sm font-medium text-gray-700"
        >
          Number of guests
        </label>
        <select
          id="guests"
          name="guests"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm rounded-md"
          value={selectedGuests}
          onChange={(e) => setSelectedGuests(Number(e.target.value))}
        >
          {Array.from({ length: maxGuests }, (_, i) => i + 1).map((guest) => (
            <option key={guest} value={guest}>
              {guest}
            </option>
          ))}
        </select>
      </div>

      {/* Booking button */}
      <form className="mt-10">
        <button
          type="button"
          className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-accent px-8 py-3 text-base font-medium text-black focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          onClick={handleBookingClick}
        >
          Book now
        </button>
      </form>
    </div>
  );
}
