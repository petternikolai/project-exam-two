import { Link } from "react-router-dom";

/**
 * RenderUserProfile displays a user's profile details, including their avatar, bio, and venues.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.profileData - The data for the user's profile.
 * @param {string} props.profileData.name - The name of the user.
 * @param {Object} props.profileData.avatar - The user's avatar details.
 * @param {string} [props.profileData.avatar.url] - The URL of the avatar image.
 * @param {string} [props.profileData.avatar.alt] - The alt text for the avatar image.
 * @param {boolean} [props.profileData.venueManager] - Indicates if the user is a venue manager.
 * @param {string} [props.profileData.bio] - The bio text of the user.
 * @param {Array} [props.profileData.venues] - An array of venues managed by the user.
 *
 * @returns {JSX.Element} A user profile component displaying the avatar, bio, and venues.
 */
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
      {/* User information section */}
      <div className="flex items-center mt-4 px-4">
        {/* Avatar */}
        <img
          className="w-32 h-32 rounded-lg object-cover"
          src={profileData.avatar?.url || ""}
          alt={profileData.avatar?.alt || "Avatar"}
        />
        <div className="flex flex-col gap-1 ml-4">
          {/* User name */}
          <h1 className="text-2xl font-bold flex items-center">
            {profileData.name}
          </h1>

          {/* Venue manager badge */}
          {profileData.venueManager && (
            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 max-w-max">
              Venue Manager
            </span>
          )}
        </div>
      </div>

      <div className="px-4">
        {/* User bio */}
        <h2 className="text-lg font-bold mt-10">Bio</h2>
        <p className="text-left">
          {!profileData.bio || profileData.bio.length === 0
            ? "The user has not written a bio yet..."
            : profileData.bio}
        </p>

        {/* User venues */}
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
              {/* Venue name */}
              <h3 className="text-md font-bold">{venue.name}</h3>
              {/* Venue image */}
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
