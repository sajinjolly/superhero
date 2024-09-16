import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import './App.css';
import HomePage from './Home/Homepage';
import Grievance from './Home/Grievance/Grievance';
import AboutUs from './Home/About/AboutUs';


const App = () => (
  <Router>
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gri" element={<Grievance />} />
        <Route path="/about" element={<AboutUs />} />


      </Routes>
    </main>
  </Router>
);

export default App;
