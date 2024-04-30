
import Amazon from './assets/amazon.png';
import Netflix from './assets/netflix.png';
import Nike from './assets/nike.png';
import Spotify from './assets/spotify.png';
import SpainFlag from './assets/spainFlag.png';
import { BiSolidUpArrow } from "react-icons/bi";

import { useState } from 'react';

const Wheel = ({setResult}) => {
  const [rotation, setRotation] = useState(0);

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


    return (
        <div >
            <h1>Rueda de la fortuna1</h1>
            <div className="wheel" style={{ transform: `rotate(${rotation}deg)` }}>
                <img src={SpainFlag} alt="" className='icon' />
                <div className="one"><span><img src={Amazon} alt="" /></span></div>
                <div className="two"><span>€15</span></div>
                <div className="three"><span><img src={Nike} alt="" /></span></div>
                <div className="four"><span>€10</span></div>
                <div className="five"><span><img src={Netflix} alt="" /></span></div>
                <div className="six"><span>€5</span></div>
                <div className="seven"><span><img src={Spotify} alt="" /></span></div>
                <div className="eight"><span>€20</span></div>
            </div>
            <BiSolidUpArrow className='arrow' />
            <button onClick={spinWheel} style={rotation > 0 ? { backgroundColor: '#fbc50246', pointerEvents: 'none' } : {}}>Gira la Rueda</button>
            <p>Si algo salió mal, escribe al soporte.</p>
        </div>
    );
};

export default Wheel;