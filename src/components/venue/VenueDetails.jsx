/**
 * VenueDetails renders the details section of a venue, displaying the maximum number of guests allowed.
 *
 * @param {Object} props - The component props.
 * @param {number} props.maxGuests - The maximum number of guests allowed at the venue.
 *
 * @returns {JSX.Element} A section displaying the venue details.
 */
export default function VenueDetails({ maxGuests }) {
  return (
    <div className="mt-10">
      {/* Section heading */}
      <h3 className="text-sm font-medium text-gray-900">Details</h3>
      {/* Maximum guests */}
      <div className="mt-2">
        <p className="text-sm text-gray-600">Max guests: {maxGuests}</p>
      </div>
    </div>
  );
}
