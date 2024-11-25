import { TrashIcon } from "@heroicons/react/24/outline";

export default function BookingCard({ booking, onDelete }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col justify-between">
      <div>
        <img
          src={booking.venue.media[0].url}
          alt={booking.venue.media[0].alt}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {booking.venue.name}
          </h2>
          <p className="mt-6 text-gray-600">
            Booking created on:
            <br />
            {new Date(booking.created).toLocaleDateString()}
          </p>
          <div className="flex flex-row justify-between">
            <p className="mt-4 text-gray-600">
              {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
              {new Date(booking.dateTo).toLocaleDateString()}
            </p>
          </div>
          <p className="mt-4 text-gray-600">{booking.guests} guests</p>
          <p className="mt-4 text-gray-600">
            Last updated:
            <br />
            {new Date(booking.updated).toLocaleDateString()}
          </p>
        </div>
      </div>
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
