import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Dashboard'; 
import Signup from './Components/Signup'; 
import UserEdits from './UserEdits ';
import AboutUsEdits from './AboutUsEdits';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/user-edits" element={<UserEdits />} />
        <Route path="/about-us" element={<AboutUsEdits />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} /> 
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
