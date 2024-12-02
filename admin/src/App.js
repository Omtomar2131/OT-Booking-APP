import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Header from './components/header/Header';
import './app.styles.scss';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateRoom from './pages/create/CreateRoom';
import Rooms from './pages/Rooms/Rooms';
import Room from './pages/Room/Room';
import EditRoom from './pages/EditRoom/EditRoom';
import Booking from './pages/Booking/Booking';
import Footer from './components/Footer/Footer';

const App = () => {
  // Track if the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by checking localStorage (you can adjust this as needed)
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle logout: clear the login status and update state
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Router>
        {/* Pass login state and handleLogout function to Header */}
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/create" element={<CreateRoom />} />
          <Route path="rooms/all/:id" element={<Room />} />
          <Route path="rooms/edit/:id" element={<EditRoom />} />
          <Route path="/bookings/:id" element={<Booking />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
};

export default App;
