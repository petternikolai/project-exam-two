import { useEffect, useRef } from "react";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  const modalRef = useRef();

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

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className="bg-white p-6 rounded shadow-lg"
        ref={modalRef}
        tabIndex="-1"
      >
        <h2 id="modal-title" className="text-xl font-semibold text-gray-800">
          Confirm Deletion
        </h2>
        <p id="modal-description" className="mt-4 text-gray-600">
          Are you sure you want to delete this booking?
        </p>
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
