export default function Bookings() {
  return (
    <>
      <div className="col-span-1">
        <h1 className="text-base/7 font-semibold text-black">Bookings</h1>
        <p className="mt-1 text-sm/6 text-gray-400">
          A list of your upcoming bookings.
        </p>
      </div>
      <div className="md:col-span-2">
        <div className="col-span-full">
          <ul>
            <li>Booking 1</li>
            <li>Booking 2</li>
          </ul>
        </div>
      </div>
    </>
  );
}
