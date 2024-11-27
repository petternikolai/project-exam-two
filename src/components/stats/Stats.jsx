/**
 * `stats` is an array of key statistics displayed on the platform.
 * Each object contains:
 * - `id`: A unique identifier for the stat.
 * - `name`: The description of the stat.
 * - `value`: The numerical or descriptive value of the stat.
 */
const stats = [
  { id: 1, name: "Venue managers on the platform", value: "8,000+" },
  { id: 2, name: "Flat platform fee", value: "3%" },
  { id: 3, name: "Uptime guarantee", value: "99.9%" },
  { id: 4, name: "Bookings per year", value: "80M+" },
];

/**
 * Stats component displays platform statistics in a visually appealing layout.
 * It includes a heading, description, and a grid of key statistics.
 *
 * @returns {JSX.Element} A section with platform statistics.
 */
export default function Stats() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Section Header */}
          <div className="text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Trusted by travelers worldwide
            </h2>
            <p className="mt-4 text-lg/8 text-gray-600">
              Travelers from around the world rely on Holidaze for their
              vacation accommodation needs.
            </p>
            <p className="text-lg/8 text-gray-600">
              Here are some key statistics about our platform:
            </p>
          </div>

          {/* Statistics Grid */}
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-accent/10 p-8">
                {/* Statistic Description */}
                <dt className="text-sm/6 font-semibold text-gray-600">
                  {stat.name}
                </dt>
                {/* Statistic Value */}
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
