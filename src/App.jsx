import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Layout from "./components/common/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Faq from "./pages/Faq";
import Venues from "./pages/Venues";
import Dashboard from "./pages/Dashboard"; // Import Dashboard

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Venues />} />
          <Route path="/project-exam-two/" element={<Homepage />} />
          <Route path="/project-exam-two/login" element={<Login />} />
          <Route path="/project-exam-two/register" element={<Register />} />
          <Route path="/project-exam-two/about" element={<About />} />
          <Route path="/project-exam-two/faq" element={<Faq />} />
          <Route path="/project-exam-two/contact" element={<Contact />} />
          <Route path="/project-exam-two/venues" element={<Venues />} />
          <Route
            path="/project-exam-two/dashboard"
            element={<Dashboard />}
          />{" "}
          {/* Add Dashboard route */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
