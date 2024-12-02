import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Room from './Pages/Room/Room';
import Rooms from './Pages/Rooms/Rooms';
import Header from './component/header/Header';
import './App.styles.scss'
import Booking from './Pages/Booking/Booking';
import Success from './Pages/Success/Success';
import Spa from './Pages/Spa/Spa';
import Dining from './Pages/Dining/Dining';
import Footer from './Pages/Footer/Footer';

const App = () => {
  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/rooms" element={<Rooms/>} />
          <Route path="/spa" element={<Spa/>} />
          <Route path="/dining" element={<Dining/>} />
          <Route path="/bookings/:id" element={<Booking/>} />
          <Route path='/success' element={<Success/>}/>
          <Route path="/rooms/all/:id" element={<Room/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
};

export default App;
