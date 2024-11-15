import { StarIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../utils/classNames";

export default function VenueOptions({
  price,
  rating,
  selectedDates,
  selectedGuests,
  setSelectedGuests,
  maxGuests,
}) {
  return (
    <div className="mt-4 lg:row-span-3 lg:mt-0">
      <h2 className="sr-only">Product information</h2>
      <p className="text-3xl tracking-tight text-gray-900">${price} / day</p>
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
      {selectedDates && (
        <h3 className="mt-4 block text-sm font-medium text-gray-700">
          <p>
            Selected dates:<br></br>
            {selectedDates}
          </p>
        </h3>
      )}
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
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
      <form className="mt-10">
        <button
          type="submit"
          className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-accent px-8 py-3 text-base font-medium text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={!selectedDates}
        >
          Book now
        </button>
      </form>
    </div>
  );
}
