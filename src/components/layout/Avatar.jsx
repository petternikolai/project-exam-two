import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Avatar renders a user's profile picture and name. If the user is logged in,
 * it provides a link to their profile page.
 *
 * @param {Object} props - The component props.
 * @param {string} props.altText - The alternative text for the profile image.
 * @param {string} props.imageUrl - The URL of the profile image.
 * @param {string} props.name - The user's name.
 *
 * @returns {JSX.Element} An avatar component with a name and optional profile link.
 */
export default function Avatar({ altText, imageUrl, name }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login state

  // Check login state on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // Set state based on token presence
  }, []);

  // Common avatar content
  const AvatarContent = (
    <div className="flex items-center">
      <div>
        {/* Profile image or placeholder */}
        {imageUrl ? (
          <img
            alt={altText}
            src={imageUrl}
            className="inline-block w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <span className="inline-block w-10 h-10 overflow-hidden rounded-full bg-gray-100">
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              className="size-full text-gray-300"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
        )}
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
          {name}
        </p>
        {isLoggedIn && (
          <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
            View profile
          </p>
        )}
      </div>
    </div>
  );

  // If logged in, provide a link to the user's profile; otherwise, just display the avatar
  return isLoggedIn ? (
    <Link
      to={`/project-exam-two/user-profile/${name}`}
      className="group block shrink-0 mt-2"
    >
      {AvatarContent}
    </Link>
  ) : (
    <div className="group block shrink-0 mt-2">{AvatarContent}</div>
  );
}
