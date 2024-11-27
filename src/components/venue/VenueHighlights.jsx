import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faWifi,
  faCircleParking,
} from "@fortawesome/pro-solid-svg-icons";
import { faPanFrying } from "@fortawesome/pro-duotone-svg-icons";

/**
 * VenueHighlights renders a section displaying the venue's available amenities.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.meta - Metadata about the venue's amenities.
 * @param {boolean} [props.meta.wifi] - Indicates if the venue offers Wi-Fi.
 * @param {boolean} [props.meta.parking] - Indicates if the venue offers parking.
 * @param {boolean} [props.meta.breakfast] - Indicates if breakfast is included.
 * @param {boolean} [props.meta.pets] - Indicates if pets are allowed.
 *
 * @returns {JSX.Element} A section displaying the venue's amenities or a message if none are available.
 */
export default function VenueHighlights({ meta }) {
  const hasAmenities =
    meta?.wifi || meta?.parking || meta?.breakfast || meta?.pets;

  return (
    <div className="mt-10">
      {/* Section heading */}
      <h3 className="text-sm font-medium text-gray-900">Amenities</h3>
      <div className="mt-2 text-gray-600">
        {hasAmenities ? (
          <table>
            <tbody>
              {/* Wi-Fi amenity */}
              {meta?.wifi && (
                <tr>
                  <td className="pr-2">
                    <FontAwesomeIcon icon={faWifi} />
                  </td>
                  <td>Free WiFi</td>
                </tr>
              )}
              {/* Parking amenity */}
              {meta?.parking && (
                <tr>
                  <td className="pr-2">
                    <FontAwesomeIcon icon={faCircleParking} />
                  </td>
                  <td>Free parking</td>
                </tr>
              )}
              {/* Breakfast amenity */}
              {meta?.breakfast && (
                <tr>
                  <td className="pr-2">
                    <FontAwesomeIcon icon={faPanFrying} />
                  </td>
                  <td>Breakfast included</td>
                </tr>
              )}
              {/* Pets amenity */}
              {meta?.pets && (
                <tr>
                  <td className="pr-2">
                    <FontAwesomeIcon icon={faPaw} />
                  </td>
                  <td>Pets allowed</td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <p>No amenities available.</p>
        )}
      </div>
    </div>
  );
}
