export const secondaryNavigation = [
  { name: "Profile", current: true },
  { name: "Bookings", current: false },
  { name: "Venues", current: false },
];

export default function SecondaryNavigation({
  secondaryNavigation,
  handleNavClick,
}) {
  return (
    <div className="border-b border-white/5">
      <nav className="flex overflow-x-auto py-4">
        <ul
          role="list"
          className="flex min-w-full flex-none gap-x-6 px-4 text-sm/6 font-semibold text-gray-400 sm:px-6 lg:px-8"
        >
          {secondaryNavigation.map((item) => (
            <li key={item.name}>
              <button
                className={item.current ? "text-accent" : ""}
                onClick={() => handleNavClick(item.name)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
