import React from "react";
import createUpdateVenueFields from "../../constants/createUpdateVenueFields";

/**
 * CreateUpdateVenueModal renders a modal for creating or updating venue details.
 * It dynamically renders form fields based on the provided configuration.
 *
 * @param {Object} props - The component props.
 * @param {Object} [props.editingVenue] - The venue being edited (if applicable).
 * @param {Function} props.handleSubmit - Function to handle the form submission.
 * @param {Function} props.closeModal - Function to close the modal.
 *
 * @returns {JSX.Element} A modal component for creating or updating venues.
 */
const CreateUpdateVenueModal = ({ editingVenue, handleSubmit, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-hidden">
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>

      {/* Modal container */}
      <div className="bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg sm:w-full mx-4 my-8 w-full max-w-md">
        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto modal-height">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              {/* Modal title */}
              <h1 className="text-lg leading-6 font-medium text-gray-900">
                {editingVenue ? "Edit Venue" : "Add Venue"}
              </h1>

              {/* Dynamic form fields */}
              <div className="mt-2">
                <form onSubmit={handleSubmit}>
                  {createUpdateVenueFields.map((field) => {
                    if (field.type === "input" || field.type === "textarea") {
                      return (
                        <div key={field.id} className="mb-4">
                          <label
                            htmlFor={field.id}
                            className="block text-sm font-medium text-gray-700"
                          >
                            {field.label}
                          </label>
                          <div className="mt-2">
                            {field.type === "input" ? (
                              <input
                                id={field.id}
                                name={field.name}
                                defaultValue={field.defaultValue(editingVenue)}
                                required={field.required}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                              />
                            ) : (
                              <textarea
                                id={field.id}
                                name={field.name}
                                defaultValue={field.defaultValue(editingVenue)}
                                required={field.required}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm h-32"
                              ></textarea>
                            )}
                          </div>
                        </div>
                      );
                    }

                    if (field.type === "radio") {
                      return (
                        <div key={field.id} className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">
                            {field.label}
                          </label>
                          <div className="mt-2 flex space-x-2">
                            {field.options.map((option) => (
                              <div key={option} className="flex items-center">
                                <input
                                  type="radio"
                                  id={`${field.id}-${option}`}
                                  name={field.name}
                                  value={option}
                                  defaultChecked={
                                    field.defaultCheckedValue(editingVenue) ===
                                    option
                                  }
                                  className="mr-1 focus:ring-accent text-accent"
                                />
                                <label
                                  htmlFor={`${field.id}-${option}`}
                                  className="text-sm"
                                >
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    if (field.type === "checkbox") {
                      return (
                        <div key={field.id} className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">
                            {field.label}
                          </label>
                          <div className="mt-2 space-y-2">
                            {field.options.map((checkbox) => (
                              <div
                                key={checkbox.id}
                                className="flex items-center"
                              >
                                <input
                                  type="checkbox"
                                  id={checkbox.id}
                                  name={checkbox.name}
                                  defaultChecked={checkbox.defaultChecked(
                                    editingVenue
                                  )}
                                  className="mr-2 focus:ring-accent text-accent"
                                />
                                <label
                                  htmlFor={checkbox.id}
                                  className="text-sm"
                                >
                                  {checkbox.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    return null; // Fallback for unsupported field types
                  })}

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-accent hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent w-full sm:w-auto"
                  >
                    {editingVenue ? "Update Venue" : "Add Venue"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Cancel button */}
        <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUpdateVenueModal;
