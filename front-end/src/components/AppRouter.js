import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Spotify from './Spotify';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Spotify />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;