import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import ScrollToTop from "./utils/ScrollToTop";
import Homepage from "./pages/Homepage";
import Layout from "./components/layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Faq from "./pages/Faq";
import Venues from "./pages/Venues";
import Profile from "./pages/Profile";
import SpecificVenue from "./pages/SpecificVenue";
import UserProfile from "./pages/UserProfile";
import RenderUserProfile from "./components/profile/RenderUserProfile";
import CreateBooking from "./pages/CreateBooking";
import PrivateRoute from "./components/routes/PrivateRoute";
import { PreviousLocationProvider } from "./context/PreviousLocationContext";
import AuthProvider from "./auth/AuthProvider";
import Bookings from "./pages/Bookings";
import MyVenues from "./pages/MyVenues";
import Loader from "./components/loaders/Loader";
import { GOOGLE_API_KEY } from "./constants/apiKeys";

/**
 * The main app component that defines the routes and layout of the application.
 * It wraps the app in necessary context providers like `PreviousLocationProvider` and `AuthProvider`
 * and configures the routing logic for different pages.
 *
 * @returns {JSX.Element} The main app structure with routing, layout, and context providers.
 */
function App() {
  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_API_KEY} // Load Google Maps with the provided API key
      libraries={["marker"]} // Load required libraries for Google Maps
      loadingElement={<Loader />} // Display a loading element while Google Maps is being loaded
    >
      <Router>
        {/* Scrolls the page to the top on every route change */}
        <ScrollToTop />
        <PreviousLocationProvider>
          <AuthProvider>
            <Layout>
              <Routes>
                {/* Define all routes for the application */}
                <Route path="/" element={<Homepage />} />
                <Route path="/project-exam-two/login" element={<Login />} />
                <Route
                  path="/project-exam-two/register"
                  element={<Register />}
                />
                <Route path="/project-exam-two/about" element={<About />} />
                <Route path="/project-exam-two/faq" element={<Faq />} />
                <Route path="/project-exam-two/contact" element={<Contact />} />
                <Route path="/project-exam-two/venues" element={<Venues />} />
                <Route path="/project-exam-two/profile" element={<Profile />} />
                <Route
                  path="/project-exam-two/venues/:id"
                  element={<SpecificVenue />}
                />
                <Route
                  path="/project-exam-two/user-profile/:id"
                  element={<UserProfile />}
                />
                <Route path="/user/:id" element={<RenderUserProfile />} />

                {/* Protected routes wrapped with PrivateRoute */}
                <Route
                  path="/project-exam-two/create-booking"
                  element={<PrivateRoute element={<CreateBooking />} />}
                />
                <Route
                  path="/project-exam-two/bookings"
                  element={<PrivateRoute element={<Bookings />} />}
                />
                <Route
                  path="/project-exam-two/manage-venues"
                  element={<PrivateRoute element={<MyVenues />} />}
                />
              </Routes>
            </Layout>
          </AuthProvider>
        </PreviousLocationProvider>
      </Router>
    </LoadScript>
  );
}

export default App;
