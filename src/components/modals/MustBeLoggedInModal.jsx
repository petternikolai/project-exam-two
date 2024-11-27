import React from "react";

/**
 * MustBeLoggedInModal renders a modal that prompts the user to log in.
 * It includes customizable content and a close button.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to display inside the modal.
 * @param {Function} props.onClose - Callback function to close the modal.
 *
 * @returns {JSX.Element} A modal component.
 */
export default function MustBeLoggedInModal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-lg">
        {/* Modal content */}
        {children}
        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-4 w-full rounded-md bg-gray-300 px-4 py-2 text-black"
        >
          Close
        </button>
      </div>
    </div>
  );
}
