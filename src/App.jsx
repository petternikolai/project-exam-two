import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Layout from "./components/common/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Faq from "./pages/Faq";

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/project-exam-two/" element={<Homepage />} />
          <Route path="/project-exam-two/login" element={<Login />} />
          <Route path="/project-exam-two/register" element={<Register />} />
          <Route path="/project-exam-two/about" element={<About />} />
          <Route path="/project-exam-two/faq" element={<Faq />} />
          <Route path="/project-exam-two/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
