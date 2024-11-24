import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faWifi,
  faCircleParking,
} from "@fortawesome/pro-solid-svg-icons";
import { faPanFrying } from "@fortawesome/pro-duotone-svg-icons";

export default function VenueHighlights({ meta }) {
  const hasAmenities =
    meta?.wifi || meta?.parking || meta?.breakfast || meta?.pets;

  return (
    <div className="mt-10">
      <h3 className="text-sm font-medium text-gray-900">Amenities</h3>
      <div className="mt-2 text-gray-600">
        {hasAmenities ? (
          <table>
            <tbody>
              {meta?.wifi && (
                <tr>
                  <td className="pr-2">
                    <FontAwesomeIcon icon={faWifi} />
                  </td>
                  <td>Free WiFi</td>
                </tr>
              )}
              {meta?.parking && (
                <tr>
                  <td className="pr-2">
                    <FontAwesomeIcon icon={faCircleParking} />
                  </td>
                  <td>Free parking</td>
                </tr>
              )}
              {meta?.breakfast && (
                <tr>
                  <td className="pr-2">
                    <FontAwesomeIcon icon={faPanFrying} />
                  </td>
                  <td>Breakfast included</td>
                </tr>
              )}
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
