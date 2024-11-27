/**
 * VenueInfo renders the title section of a venue, displaying its name prominently.
 *
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the venue.
 *
 * @returns {JSX.Element} A section displaying the venue's name.
 */
export default function VenueInfo({ name }) {
  return (
    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
      {/* Venue name */}
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        {name}
      </h1>
    </div>
  );
}
