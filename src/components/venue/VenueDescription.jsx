/**
 * VenueDescription renders the description section of a venue.
 *
 * @param {Object} props - The component props.
 * @param {string} props.description - The description of the venue.
 *
 * @returns {JSX.Element} A section displaying the venue description.
 */
export default function VenueDescription({ description }) {
  return (
    <div>
      {/* Accessibility-friendly title for screen readers */}
      <h3 className="sr-only">Description</h3>
      <div className="space-y-6">
        {/* Venue description text */}
        <p className="text-base text-gray-900">{description}</p>
      </div>
    </div>
  );
}
