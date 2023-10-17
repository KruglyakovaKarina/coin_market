import React from 'react';
import './index.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Coin from './pages/Coin';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
