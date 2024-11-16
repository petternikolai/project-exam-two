import { Link } from "react-router-dom";

export default function RenderUserProfile({ profileData }) {
  if (!profileData) {
    return (
      <div className="loading text-center text-gray-500">
        Profile not found...
      </div>
    );
  }
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center mt-4 px-4">
        <img
          className="w-32 h-32 rounded-lg object-cover"
          src={profileData.avatar?.url || ""}
          alt={profileData.avatar?.alt || "Avatar"}
        />
        <div className="flex flex-col gap-1 ml-4">
          <h1 className="text-2xl font-bold flex items-center">
            {profileData.name}
          </h1>

          {profileData.venueManager && (
            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 max-w-max">
              Venue Manager
            </span>
          )}
        </div>
      </div>
      <div className="px-4">
        <h2 className="text-lg font-bold mt-10">Bio</h2>
        <p className="text-left">
          {!profileData.bio || profileData.bio.length === 0
            ? "The user has not written a bio yet..."
            : profileData.bio}
        </p>
        <h2 className="text-lg font-bold mt-10 flex items-center">
          Venues
          <span className="ml-2 text-sm font-medium text-gray-500">
            ({profileData.venues?.length || 0})
          </span>
        </h2>
        {profileData.venues?.length === 0 ? (
          <p className="text-left">No venues available.</p>
        ) : (
          profileData.venues?.map((venue) => (
            <Link
              key={venue.id}
              to={`/project-exam-two/venues/${venue.id}`}
              state={{ venue }}
              className="block mt-4 p-4 border rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-md font-bold">{venue.name}</h3>
              <img
                className="w-full h-48 object-cover mt-2 rounded"
                src={venue.media[0]?.url || ""}
                alt={venue.media[0]?.alt || "Venue"}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
