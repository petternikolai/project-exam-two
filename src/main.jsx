import { StrictMode } from "react"; // Import StrictMode to activate additional checks for React components
import { createRoot } from "react-dom/client"; // Import createRoot to initialize the React app in the root DOM element
import App from "./App.jsx"; // Import the main App component
import "./styles/tailwind.css"; // Import Tailwind CSS for styling

/**
 * Initializes and renders the React application.
 * The root element of the app is injected into the HTML with the id "root".
 * StrictMode is used to activate additional development checks for potential issues in the app.
 *
 * @returns {JSX.Element} The root element that contains the entire React app.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App /> {/* Render the main App component */}
  </StrictMode>
);
