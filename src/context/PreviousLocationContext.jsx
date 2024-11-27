import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useLocation } from "react-router-dom";

const PreviousLocationContext = createContext();

/**
 * PreviousLocationProvider tracks and provides the previously visited location.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components wrapped by the provider.
 *
 * @returns {JSX.Element} A provider component for managing previous location state.
 */
export const PreviousLocationProvider = ({ children }) => {
  const [previousLocation, setPreviousLocation] = useState(null);
  const location = useLocation(); // Current location from React Router
  const prevLocationRef = useRef(); // Reference to store the last location

  useEffect(() => {
    // Update the previous location when the component unmounts
    return () => {
      prevLocationRef.current = location;
      setPreviousLocation(prevLocationRef.current);
    };
  }, [location]);

  return (
    <PreviousLocationContext.Provider value={previousLocation}>
      {children}
    </PreviousLocationContext.Provider>
  );
};

/**
 * Custom hook to access the previous location context.
 *
 * @returns {Object|null} The previous location, or `null` if not set.
 */
export const usePreviousLocation = () => useContext(PreviousLocationContext);
