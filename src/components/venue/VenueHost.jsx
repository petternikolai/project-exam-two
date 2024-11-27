import Avatar from "../layout/Avatar";

/**
 * VenueHost renders a section displaying the host's information, including their avatar and name.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.owner - The owner's information.
 * @param {string} props.owner.name - The name of the host.
 * @param {Object} props.owner.avatar - The avatar details of the host.
 * @param {string} [props.owner.avatar.url] - The URL of the host's avatar image.
 * @param {string} [props.owner.avatar.alt] - The alt text for the host's avatar image.
 *
 * @returns {JSX.Element} A section displaying the venue host's details.
 */
export default function VenueHost({ owner }) {
  return (
    <div className="mt-10">
      {/* Section heading */}
      <h3 className="text-sm font-medium text-gray-900">Your host</h3>
      {/* Host avatar and name */}
      {owner && owner.avatar && (
        <Avatar
          imageUrl={owner.avatar.url}
          altText={owner.avatar.alt}
          name={owner.name}
        />
      )}
    </div>
  );
}
