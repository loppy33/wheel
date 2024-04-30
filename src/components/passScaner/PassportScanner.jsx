import './PasScaner.sass'
import { FaLongArrowAltLeft } from "react-icons/fa";
import 'react-html5-camera-photo/build/css/index.css';

import React from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
const PassportScanner = ({ setPassScaner, passScaner, setFront, setBack, setSelfie, front }) => {

  const handleTakePhoto = (dataUri) => {
    if (passScaner === 'front') {
      setFront(dataUri)
    }
    if (passScaner === 'back') {
      setBack(dataUri)
    }
    if (passScaner === 'selfie') {
      setSelfie(dataUri)
    }
    setPassScaner(false)
  };

  return (
    <div className='PasScaner'>
      <FaLongArrowAltLeft className='arrow' onClick={() => setPassScaner(false)} />

      {passScaner !== 'selfie' ? (<span className='square'></span>) : (<span className="face"></span>)}



      <Camera
        className="camera"
        idealFacingMode={FACING_MODES.ENVIRONMENT}
        onTakePhoto={(dataUri) => handleTakePhoto(dataUri)}
        isFullscreen={true}
      />
    </div>
  );
};

export default PassportScanner;

