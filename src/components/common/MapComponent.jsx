import React, { useEffect, useRef, useState } from "react";

const googleMapId = import.meta.env.VITE_GOOGLE_MAP_ID;

const MapComponent = ({ location }) => {
  const mapRef = useRef(null);
  const [mapError, setMapError] = useState(null);

  // Function to load the Google Maps API
  const loadGoogleMaps = () => {
    if (window.google && window.google.maps) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (loadGoogleMaps() && mapRef.current) {
      // Use address, city, and country if available, otherwise fall back to (0, 0)
      const { address, city, country } = location || {};
      const fullAddress =
        address || (city && country)
          ? `${address || ""}, ${city || ""}, ${country || ""}`
          : null;

      const geocoder = new window.google.maps.Geocoder();
      if (fullAddress) {
        // Geocode the full address if available
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
              setMapError(null); // Clear any previous errors if successful
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
        // Use coordinates (0, 0) if no address is available
        const map = new window.google.maps.Map(mapRef.current, {
          zoom: 2, // Zoom out to view the entire globe
          center: { lat: 0, lng: 0 },
          mapId: googleMapId,
        });

        try {
          const marker = new window.google.maps.marker.AdvancedMarkerElement({
            map,
            position: { lat: 0, lng: 0 },
          });
          setMapError(null); // Clear any previous errors
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
        <p>{mapError}</p>
      ) : (
        <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>
      )}
    </div>
  );
};

export default MapComponent;
