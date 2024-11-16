import React from "react";

const CreateUpdateVenueModal = ({ editingVenue, handleSubmit, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-hidden">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>
      <div className="bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg sm:w-full mx-4 my-8">
        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto modal-height">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h1 className="text-lg leading-6 font-medium text-gray-900">
                {editingVenue ? "Edit Venue" : "Add Venue"}
              </h1>
              <div className="mt-2">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="venueName"
                      className="block text-sm/6 font-medium text-black"
                    >
                      * Venue Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="venueName"
                        name="venueName"
                        defaultValue={editingVenue ? editingVenue.name : ""}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="venueDescription"
                      className="block text-sm/6 font-medium text-black"
                    >
                      * Venue Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="venueDescription"
                        name="venueDescription"
                        defaultValue={
                          editingVenue ? editingVenue.description : ""
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="venuePrice"
                      className="block text-sm/6 font-medium text-black"
                    >
                      * Venue Price
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        id="venuePrice"
                        name="venuePrice"
                        defaultValue={editingVenue ? editingVenue.price : ""}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="venueCapacity"
                      className="block text-sm/6 font-medium text-black"
                    >
                      * Venue Capacity
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        id="venueCapacity"
                        name="venueCapacity"
                        defaultValue={
                          editingVenue ? editingVenue.maxGuests : ""
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="venueAddress"
                      className="block text-sm/6 font-medium text-black"
                    >
                      Address (Optional)
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="venueAddress"
                        name="venueAddress"
                        defaultValue={
                          editingVenue && editingVenue.location
                            ? editingVenue.location.address
                            : ""
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="venueCity"
                      className="block text-sm/6 font-medium text-black"
                    >
                      City (Optional)
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="venueCity"
                        name="venueCity"
                        defaultValue={
                          editingVenue && editingVenue.location
                            ? editingVenue.location.city
                            : ""
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="venueZip"
                      className="block text-sm/6 font-medium text-black"
                    >
                      Zip Code (Optional)
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="venueZip"
                        name="venueZip"
                        defaultValue={
                          editingVenue && editingVenue.location
                            ? editingVenue.location.zip
                            : ""
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="venueCountry"
                      className="block text-sm/6 font-medium text-black"
                    >
                      Country (Optional)
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="venueCountry"
                        name="venueCountry"
                        defaultValue={
                          editingVenue && editingVenue.location
                            ? editingVenue.location.country
                            : ""
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="venueLat"
                      className="block text-sm/6 font-medium text-black"
                    >
                      Latitude (Optional)
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        id="venueLat"
                        name="venueLat"
                        defaultValue={
                          editingVenue && editingVenue.location
                            ? editingVenue.location.lat
                            : ""
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="venueLng"
                      className="block text-sm/6 font-medium text-black"
                    >
                      Longitude (Optional)
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        id="venueLng"
                        name="venueLng"
                        defaultValue={
                          editingVenue && editingVenue.location
                            ? editingVenue.location.lng
                            : ""
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="venueImageUrl"
                      className="block text-sm/6 font-medium text-black"
                    >
                      Image URL (Optional)
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="venueImageUrl"
                        name="venueImageUrl"
                        defaultValue={
                          editingVenue &&
                          editingVenue.media &&
                          editingVenue.media.length > 0
                            ? editingVenue.media[0].url
                            : ""
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="venueImageAlt"
                      className="block text-sm/6 font-medium text-black"
                    >
                      Image Alt Text (Optional)
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="venueImageAlt"
                        name="venueImageAlt"
                        defaultValue={
                          editingVenue &&
                          editingVenue.media &&
                          editingVenue.media.length > 0
                            ? editingVenue.media[0].alt
                            : ""
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="venueRating"
                      className="block text-sm/6 font-medium text-black"
                    >
                      Rating (Optional)
                    </label>
                    <div className="mt-2 flex space-x-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <div key={value}>
                          <input
                            type="radio"
                            id={`venueRating${value}`}
                            name="venueRating"
                            value={value}
                            defaultChecked={
                              editingVenue && editingVenue.rating === value
                            }
                            className="mr-1"
                          />
                          <label
                            htmlFor={`venueRating${value}`}
                            className="text-sm text-black"
                          >
                            {value}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm/6 font-medium text-black">
                      Amenities (Optional)
                    </label>
                    <div className="mt-2 space-y-2">
                      <div>
                        <input
                          type="checkbox"
                          id="venueWifi"
                          name="venueWifi"
                          defaultChecked={
                            editingVenue ? editingVenue.meta.wifi : false
                          }
                          className="mr-2"
                        />
                        <label
                          htmlFor="venueWifi"
                          className="text-sm text-black"
                        >
                          Wifi
                        </label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="venueParking"
                          name="venueParking"
                          defaultChecked={
                            editingVenue ? editingVenue.meta.parking : false
                          }
                          className="mr-2"
                        />
                        <label
                          htmlFor="venueParking"
                          className="text-sm text-black"
                        >
                          Parking
                        </label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="venueBreakfast"
                          name="venueBreakfast"
                          defaultChecked={
                            editingVenue ? editingVenue.meta.breakfast : false
                          }
                          className="mr-2"
                        />
                        <label
                          htmlFor="venueBreakfast"
                          className="text-sm text-black"
                        >
                          Breakfast
                        </label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="venuePets"
                          name="venuePets"
                          defaultChecked={
                            editingVenue ? editingVenue.meta.pets : false
                          }
                          className="mr-2"
                        />
                        <label
                          htmlFor="venuePets"
                          className="text-sm text-black"
                        >
                          Pets Allowed
                        </label>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-accent hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                  >
                    {editingVenue ? "Update Venue" : "Add Venue"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
