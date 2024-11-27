/**
 * Combines multiple class names into a single string, filtering out any falsy values.
 * This is useful for conditionally applying class names in JSX.
 *
 * @param {...(string|boolean|null|undefined)} classes - A list of class names or values to be included.
 * @returns {string} A string of class names, with falsy values excluded.
 */
export function classNames(...classes) {
  // Filter out falsy values (false, null, undefined, etc.) and join the remaining class names into a single string
  return classes.filter(Boolean).join(" ");
}
