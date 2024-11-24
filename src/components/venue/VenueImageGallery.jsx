export default function VenueImageGallery({ media }) {
  const defaultImageUrl =
    "https://amorgoshotel.com/wp-content/uploads/2014/12/Amorgos-Standard-Room1-e1464286427430.jpg";
  return (
    <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-1 lg:gap-x-8 overflow-hidden">
      <div className="flex items-center justify-center">
        <img
          alt={media?.[0]?.alt || "Default Image"}
          src={media?.[0]?.url || defaultImageUrl}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImageUrl;
          }}
          className="w-full h-96 object-cover object-center"
        />
      </div>
    </div>
  );
}
