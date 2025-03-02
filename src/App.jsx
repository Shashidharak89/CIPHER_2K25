import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Footer from './components/Footer';
import EventsSection from './components/Home-comonents/EventsSection';
import BugSlayer from './components/Event-components/BugSlayer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/events" element={<EventsSection/>} />

        <Route path="/EventsSection" element={<EventsSection/>} />

        <Route path="/register" element={<Register />} />

        <Route path="/team" element={<BugSlayer/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
