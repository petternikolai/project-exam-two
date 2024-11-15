import React from "react";
import MapComponent from "../common/MapComponent";

function VenueLocation({ location }) {
  return (
    <div className="mt-10">
      <h3 className="text-sm font-medium text-gray-900">Details</h3>
      <div className="mt-2">
        <MapComponent location={location} />
      </div>
    </div>
  );
}

export default VenueLocation;
