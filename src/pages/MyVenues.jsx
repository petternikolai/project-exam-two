export default function MyVenues() {
  return (
    <>
      <div className="col-span-1">
        <h1 className="text-base/7 font-semibold text-black">Venues</h1>
        <p className="mt-1 text-sm/6 text-gray-400">Venues listed by you.</p>
      </div>
      <div className="md:col-span-2">
        <div className="col-span-full">
          <ul>
            <li>Venue 1</li>
            <li>Venue 2</li>
          </ul>
        </div>
      </div>
      <div className="col-span-1">
        <h1 className="text-base/7 font-semibold text-black">Add Venue</h1>
        <p className="mt-1 text-sm/6 text-gray-400">
          Create a new venue listing.
        </p>
      </div>
      <div className="md:col-span-2">
        <div className="col-span-full">
          <form action="">
            <div>
              <label
                htmlFor="venueName"
                className="block text-sm/6 font-medium text-black"
              >
                Venue Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="venueName"
                  name="venueName"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="venueLocation"
                className="block text-sm/6 font-medium text-black"
              >
                Venue Location
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="venueLocation"
                  name="venueLocation"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="venueDescription"
                className="block text-sm/6 font-medium text-black"
              >
                Venue Description
              </label>
              <div className="mt-2">
                <textarea
                  id="venueDescription"
                  name="venueDescription"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>
            </div>
            <div>
              <label
                htmlFor="venueCapacity"
                className="block text-sm/6 font-medium text-black"
              >
                Venue Capacity
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  id="venueCapacity"
                  name="venueCapacity"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="venuePrice"
                className="block text-sm/6 font-medium text-black"
              >
                Venue Price
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  id="venuePrice"
                  name="venuePrice"
                  className="block
                  w-full
                  rounded-md
                  border-gray-300
                  shadow-sm
                  focus:border-indigo-500
                  focus:ring-indigo-500
                  sm:text-sm"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
