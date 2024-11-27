"use client";

import { useState } from "react";
import { Switch } from "@headlessui/react";

/**
 * Example is a functional component that renders a toggle switch using
 * the `Switch` component from Headless UI. The switch toggles between
 * an enabled and disabled state.
 *
 * @returns {JSX.Element} A toggle switch with accessible design.
 */
export default function Example() {
  const [enabled, setEnabled] = useState(false); // State for tracking toggle status

  return (
    <Switch
      checked={enabled} // Determines if the switch is enabled
      onChange={setEnabled} // Updates the enabled state on toggle
      className="group relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
    >
      <span className="sr-only">Use setting</span>{" "}
      {/* Screen reader-only label */}
      {/* Invisible background for accessibility */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute h-full w-full rounded-md bg-white"
      />
      {/* Background track for the toggle */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute mx-auto h-4 w-9 rounded-full bg-gray-200 transition-colors duration-200 ease-in-out group-data-[checked]:bg-accent"
      />
      {/* Toggle button that moves left/right */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out group-data-[checked]:translate-x-5"
      />
    </Switch>
  );
}
