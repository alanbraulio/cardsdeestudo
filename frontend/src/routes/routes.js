import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../Components/Home';
import { StoreProvider } from '../Infrastructure/Store/Store';


function Rotas() {
  return (
    <div>
      <StoreProvider>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
      </StoreProvider>
    </div>
  );
}

export default Rotas;
