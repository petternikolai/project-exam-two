import React from "react";

export default function MustBeLoggedInModal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-lg">
        {children}
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
