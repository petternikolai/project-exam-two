/**
 * Handles the navigation item click event, updating the selected navigation item
 * and marking it as "current" in the secondary navigation state.
 * This function updates the main navigation and secondary navigation states based on the clicked item.
 *
 * @param {string} name - The name of the clicked navigation item.
 * @param {Function} setSelectedNav - Function to set the selected navigation item in the main navigation state.
 * @param {Function} setSecondaryNavigation - Function to update the secondary navigation state with the "current" property.
 */
export const handleNavClick = (
  name,
  setSelectedNav,
  setSecondaryNavigation
) => {
  // Set the selected navigation item
  setSelectedNav(name);

  // Update the secondary navigation state to mark the clicked item as "current"
  setSecondaryNavigation((prevNav) =>
    prevNav.map(
      (item) =>
        item.name === name
          ? { ...item, current: true } // Mark the clicked item as "current"
          : { ...item, current: false } // Set other items to not be "current"
    )
  );
};
