import React, { useEffect, useRef, useState } from "react";

const googleMapId = import.meta.env.VITE_GOOGLE_MAP_ID;

/**
 * MapComponent renders a Google Map centered at a given location.
 * It supports geocoding to display the location by address or coordinates.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.location - The location data for the map.
 * @param {string} [props.location.address] - The address of the location.
 * @param {string} [props.location.city] - The city of the location.
 * @param {string} [props.location.country] - The country of the location.
 *
 * @returns {JSX.Element} A Google Map centered at the specified location.
 */
const MapComponent = ({ location }) => {
  const mapRef = useRef(null); // Ref for the map container
  const [mapError, setMapError] = useState(null); // State for handling map errors

  /**
   * Checks if the Google Maps API is available.
   * @returns {boolean} True if the API is loaded, otherwise false.
   */
  const loadGoogleMaps = () => {
    if (window.google && window.google.maps) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (loadGoogleMaps() && mapRef.current) {
      const { address, city, country } = location || {};
      const fullAddress =
        address || (city && country)
          ? `${address || ""}, ${city || ""}, ${country || ""}`
          : null;

      const geocoder = new window.google.maps.Geocoder();
      if (fullAddress) {
        // Geocode the full address to get coordinates
        geocoder.geocode({ address: fullAddress }, (results, status) => {
          if (status === "OK") {
            const map = new window.google.maps.Map(mapRef.current, {
              zoom: 15,
              center: results[0].geometry.location,
              mapId: googleMapId,
            });

            try {
              const marker =
                new window.google.maps.marker.AdvancedMarkerElement({
                  map,
                  position: results[0].geometry.location,
                });
              setMapError(null); // Clear errors if the map loads successfully
            } catch (error) {
              console.error("Error initializing AdvancedMarkerElement:", error);
              setMapError(
                "Map marker could not be loaded. Please try again later."
              );
            }
          } else if (status === "ZERO_RESULTS") {
            console.error("No results found for the given address.");
            setMapError("No map results found for the given address.");
          } else {
            console.error(
              "Geocode was not successful for the following reason: " + status
            );
            setMapError("Unable to load map. Please try again later.");
          }
        });
      } else {
        // Default to (0, 0) if no valid address is provided
        const map = new window.google.maps.Map(mapRef.current, {
          zoom: 2, // Global view
          center: { lat: 0, lng: 0 },
          mapId: googleMapId,
        });

        try {
          const marker = new window.google.maps.marker.AdvancedMarkerElement({
            map,
            position: { lat: 0, lng: 0 },
          });
          setMapError(null); // Clear errors if successful
        } catch (error) {
          console.error("Error initializing AdvancedMarkerElement:", error);
          setMapError(
            "Map marker could not be loaded. Please try again later."
          );
        }
      }
    } else {
      console.error("Google Maps API is not available.");
      setMapError("Google Maps API not available. Please try again later.");
    }
  }, [location]);

  return (
    <div style={{ width: "100%", height: "300px" }}>
      {mapError ? (
        // Display error message if the map fails to load
        <p>{mapError}</p>
      ) : (
        // Render the map container
        <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>
      )}
    </div>
  );
};

export default MapComponent;
