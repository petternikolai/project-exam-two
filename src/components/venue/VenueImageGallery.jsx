export default function VenueImageGallery({ media }) {
  return (
    <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-1 lg:gap-x-8 overflow-hidden">
      <div className="flex items-center justify-center">
        {media?.[0] && (
          <img
            alt={media[0].alt}
            src={media[0].url}
            className="w-full h-96 object-cover object-center"
          />
        )}
      </div>
    </div>
  );
}
