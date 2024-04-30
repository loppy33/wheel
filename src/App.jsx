import React, { useState } from 'react';
import './App.sass';


import Wheel from './components/wheel/wheel';
import Modal from './components/modal/modal';
import PassportScanner from './components/passScaner/PassportScanner';


function App() {
  const [result, setResult] = useState(null);
  const [passScaner, setPassScaner] = useState()

  const [front, setFront] = useState();
  const [back, setBack] = useState();
  const [selfie, setSelfie] = useState();

  return (
    <div className="App">
      <div className="container">
        {passScaner ? (
          // Если passScaner установлен в true, отображаем компонент PassportScanner
          <PassportScanner
            front={front}
            setFront={setFront} setBack={setBack} setSelfie={setSelfie}
            passScaner={passScaner} setPassScaner={setPassScaner}
          ></PassportScanner>
        ) : (
          // Если passScaner не установлен, отображаем компонент Wheel и Modal
          <>
            <Wheel setResult={setResult}></Wheel>
            <Modal
              setFront={setFront} setBack={setBack} setSelfie={setSelfie}
              front={front} back={back} selfie={selfie}
              setPassScaner={setPassScaner} result={result}
            ></Modal>
          </>
        )}

      </div>
    </div>
  );
}

export default App;
