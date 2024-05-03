import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.sass';
import WheelPage from './components/wheelPage';


function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route index element={<WheelPage />} />
        <Route exact path="/" component={<WheelPage />} />
        <Route path="/wheel" component={<WheelPage /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
