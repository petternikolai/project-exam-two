export const handleNavClick = (
  name,
  setSelectedNav,
  setSecondaryNavigation
) => {
  setSelectedNav(name);
  setSecondaryNavigation((prevNav) =>
    prevNav.map((item) =>
      item.name === name
        ? { ...item, current: true }
        : { ...item, current: false }
    )
  );
};
