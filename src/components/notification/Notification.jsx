import { useEffect } from "react";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";

/**
 * Notification is a functional component for displaying notifications with
 * smooth transitions. The notification automatically hides after 5 seconds
 * or can be manually closed by the user.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.showNotification - Notification state object.
 * @param {boolean} props.showNotification.show - Whether the notification is visible.
 * @param {string} props.showNotification.message - The message to display in the notification.
 * @param {Function} props.setShowNotification - Function to update the notification state.
 *
 * @returns {JSX.Element} The notification component with transitions.
 */
export default function Notification({
  showNotification,
  setShowNotification,
}) {
  // Automatically close the notification after 5 seconds
  useEffect(() => {
    if (showNotification.show) {
      const timer = setTimeout(() => {
        setShowNotification({ show: false, message: "" });
      }, 5000); // Auto-hide after 5 seconds

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [showNotification, setShowNotification]);

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 mt-20"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={showNotification.show && !!showNotification.message} // Only show if there is a message
          enter="transition ease-out duration-300"
          enterFrom="opacity-0 translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-2"
        >
          <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start">
                {/* Notification Icon */}
                <div className="flex-shrink-0">
                  <CheckCircleIcon
                    className="h-6 w-6 text-green-400"
                    aria-hidden="true"
                  />
                </div>
                {/* Notification Message */}
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">
                    {showNotification.message}
                  </p>
                </div>
                {/* Close Button */}
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    onClick={() =>
                      setShowNotification({ show: false, message: "" })
                    }
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}
