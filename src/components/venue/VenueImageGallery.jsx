/**
 * VenueImageGallery renders the main image gallery for a venue.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.media - An array of media objects for the venue.
 * @param {string} [props.media[].url] - The URL of the media item.
 * @param {string} [props.media[].alt] - The alt text for the media item.
 *
 * @returns {JSX.Element} A responsive image gallery displaying the venue's main image.
 */
export default function VenueImageGallery({ media }) {
  const defaultImageUrl =
    "https://amorgoshotel.com/wp-content/uploads/2014/12/Amorgos-Standard-Room1-e1464286427430.jpg";

  return (
    <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-1 lg:gap-x-8 overflow-hidden">
      {/* Main image display */}
      <div className="flex items-center justify-center">
        <img
          alt={media?.[0]?.alt || "Default Image"}
          src={media?.[0]?.url || defaultImageUrl}
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loops on image error
            e.target.src = defaultImageUrl; // Fallback to default image
          }}
          className="w-full h-96 object-cover object-center"
        />
      </div>
    </div>
  );
}
