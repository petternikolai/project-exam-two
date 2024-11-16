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
import RenderUserProfile from "./components/common/RenderUserProfile";
import CreateBooking from "./pages/CreateBooking";
import PrivateRoute from "./components/common/PrivateRoute";
import { PreviousLocationProvider } from "./context/PreviousLocationContext";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={["marker"]}>
      <Router>
        <ScrollToTop />
        <Layout>
          <PreviousLocationProvider>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/project-exam-two/login" element={<Login />} />
              <Route path="/project-exam-two/register" element={<Register />} />
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
              <Route
                path="/project-exam-two/create-booking"
                element={<PrivateRoute element={<CreateBooking />} />}
              />
            </Routes>
          </PreviousLocationProvider>
        </Layout>
      </Router>
    </LoadScript>
  );
}

export default App;
