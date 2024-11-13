import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Homepage from "./pages/Homepage";
import Layout from "./components/common/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Faq from "./pages/Faq";
import Venues from "./pages/Venues";
import Profile from "./pages/Profile";
import SpecificVenue from "./pages/SpecificVenue";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
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
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
