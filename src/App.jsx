import React, { useState } from 'react';
import './App.sass';


import Wheel from './components/wheel/wheel';
import Modal from './components/modal/modal';


function App() {
  const [result, setResult] = useState(null);





  return (
    <div className="App">
      <div className="container">
        <Wheel setResult={setResult}></Wheel>
        <Modal result={result}></Modal>
      </div>
    </div>
  );
}

export default App;
