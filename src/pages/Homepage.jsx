"use client";

import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="home-background custom-height">
      <div className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
            <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
              <h1 className="text-pretty text-5xl font-semibold tracking-tight text-black sm:text-7xl">
                Find your perfect getaway
              </h1>
              <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:max-w-md sm:text-xl/8 lg:max-w-none">
                Discover handpicked stays for your next adventure. Easy booking,
                beautiful destinations.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  to="/venues"
                  className="rounded-md bg-accent px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Find your stay
                </Link>
                <Link
                  to="/register"
                  className="text-sm/6 font-semibold text-gray-900"
                >
                  Sign up <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
