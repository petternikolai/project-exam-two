import React from "react";
import MapComponent from "../map/MapComponent";

/**
 * VenueLocation renders a section displaying the venue's location on a map.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.location - The location data for the venue.
 * @param {number} props.location.latitude - The latitude coordinate of the venue.
 * @param {number} props.location.longitude - The longitude coordinate of the venue.
 *
 * @returns {JSX.Element} A section displaying the venue's location on a map.
 */
function VenueLocation({ location }) {
  return (
    <div className="mt-10">
      {/* Section heading */}
      <h3 className="text-sm font-medium text-gray-900">Location</h3>
      {/* Map display */}
      <div className="mt-2">
        <MapComponent location={location} />
      </div>
    </div>
  );
}

export default VenueLocation;
