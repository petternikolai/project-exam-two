export default function VenueDetails({ maxGuests }) {
  return (
    <div className="mt-10">
      <h3 className="text-sm font-medium text-gray-900">Details</h3>
      <div className="mt-2">
        <p className="text-sm text-gray-600">Max guests: {maxGuests}</p>
      </div>
    </div>
  );
}
