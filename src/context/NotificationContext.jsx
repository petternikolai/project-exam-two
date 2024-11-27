import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

/**
 * Custom hook to access the notification context.
 *
 * @returns {Object} The notification context value, including state and functions.
 */
export const useNotification = () => useContext(NotificationContext);

/**
 * NotificationProvider wraps the application to provide notification state and controls.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components wrapped by the provider.
 *
 * @returns {JSX.Element} A provider component that supplies notification functionality.
 */
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });

  /**
   * Displays a notification with a specified message.
   *
   * @param {string} message - The notification message to display.
   */
  const showNotification = (message) => {
    setNotification({ show: true, message });
  };

  /**
   * Hides the currently displayed notification.
   */
  const hideNotification = () => {
    setNotification({ show: false, message: "" });
  };

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification, hideNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
