import { TrashIcon } from "@heroicons/react/24/outline";

/**
 * BookingCard is a functional component that renders the details
 * of a booking, including venue information, booking dates, and guest count.
 * It also provides a delete button to allow the user to remove a booking.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.booking - The booking data to be displayed.
 * @param {Object} props.booking.venue - The venue associated with the booking.
 * @param {Object[]} props.booking.venue.media - Array of media objects for the venue.
 * @param {string} props.booking.venue.name - The name of the venue.
 * @param {string} props.booking.created - The creation date of the booking.
 * @param {string} props.booking.dateFrom - The start date of the booking.
 * @param {string} props.booking.dateTo - The end date of the booking.
 * @param {number} props.booking.guests - The number of guests.
 * @param {string} props.booking.updated - The last updated date of the booking.
 * @param {Function} props.onDelete - Callback function to handle booking deletion.
 *
 * @returns {JSX.Element} A card component displaying booking details.
 */
export default function BookingCard({ booking, onDelete }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col justify-between">
      <div>
        {/* Venue media display */}
        <img
          src={booking.venue.media[0].url}
          alt={booking.venue.media[0].alt}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          {/* Venue name */}
          <h2 className="text-xl font-semibold text-gray-800">
            {booking.venue.name}
          </h2>

          {/* Booking creation date */}
          <p className="mt-6 text-gray-600">
            Booking created on:
            <br />
            {new Date(booking.created).toLocaleDateString()}
          </p>

          {/* Booking date range */}
          <div className="flex flex-row justify-between">
            <p className="mt-4 text-gray-600">
              {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
              {new Date(booking.dateTo).toLocaleDateString()}
            </p>
          </div>

          {/* Number of guests */}
          <p className="mt-4 text-gray-600">{booking.guests} guests</p>

          {/* Last updated date */}
          <p className="mt-4 text-gray-600">
            Last updated:
            <br />
            {new Date(booking.updated).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Delete button */}
      <button onClick={() => onDelete(booking.id)} className="p-6">
        <div className="flex items-center gap-2 justify-end">
          <TrashIcon
            aria-hidden="true"
            className="mr-3 size-5 text-gray-500 hover:text-red-500 group-data-[focus]:text-gray-500"
          />
        </div>
      </button>
    </div>
  );
}
