import { Link } from "react-router-dom";
import { navigationFooter } from "../../constants/navigationFooter";

/**
 * Footer renders a website footer with navigation links and social media icons.
 * It includes a copyright notice and dynamically displays content based on the `navigationFooter` data.
 *
 * @returns {JSX.Element} A styled footer component.
 */
export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-10 sm:py-12 lg:px-8">
        {/* Main navigation links */}
        <nav
          aria-label="Footer"
          className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6"
        >
          {navigationFooter.main.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-gray-600 hover:text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Social media links */}
        <div className="mt-16 flex justify-center gap-x-10">
          {navigationFooter.social.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-gray-600 hover:text-gray-800"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" className="h-6 w-6" />
            </Link>
          ))}
        </div>

        {/* Copyright notice */}
        <p className="mt-10 text-center text-sm/6 text-gray-600">
          &copy; 2024 Holidaze. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
