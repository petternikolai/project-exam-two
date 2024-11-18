// src/context/PreviousLocationContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useLocation } from "react-router-dom";

const PreviousLocationContext = createContext();

export const PreviousLocationProvider = ({ children }) => {
  const [previousLocation, setPreviousLocation] = useState(null);
  const location = useLocation();
  const prevLocationRef = useRef();

  useEffect(() => {
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

export const usePreviousLocation = () => useContext(PreviousLocationContext);
