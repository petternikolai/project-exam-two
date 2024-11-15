import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faWifi,
  faCircleParking,
} from "@fortawesome/pro-solid-svg-icons";
import { faPanFrying } from "@fortawesome/pro-duotone-svg-icons";

export default function VenueHighlights({ meta }) {
  return (
    <div className="mt-10">
      <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
      <div className="mt-2 text-gray-600">
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
      </div>
    </div>
  );
}
