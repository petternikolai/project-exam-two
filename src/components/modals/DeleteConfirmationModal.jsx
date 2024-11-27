import { useEffect, useRef } from "react";

/**
 * DeleteConfirmationModal renders a confirmation dialog for deleting a booking.
 * It includes accessibility features like keyboard navigation and focus management.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Indicates whether the modal is open.
 * @param {Function} props.onClose - Callback function to close the modal.
 * @param {Function} props.onConfirm - Callback function triggered when the user confirms the deletion.
 *
 * @returns {JSX.Element|null} A modal component, or `null` if not open.
 */
function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  const modalRef = useRef();

  // Handle keyboard events, like closing the modal with "Escape"
  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  // Automatically focus on the modal when it opens
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  // Do not render anything if the modal is not open
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {/* Modal content */}
      <div
        className="bg-white p-6 rounded shadow-lg"
        ref={modalRef}
        tabIndex="-1"
      >
        {/* Modal title */}
        <h2 id="modal-title" className="text-xl font-semibold text-gray-800">
          Confirm Deletion
        </h2>
        {/* Modal description */}
        <p id="modal-description" className="mt-4 text-gray-600">
          Are you sure you want to delete this booking?
        </p>
        {/* Action buttons */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="mr-4 bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
