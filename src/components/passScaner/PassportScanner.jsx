import './PasScaner.sass'
import { FaLongArrowAltLeft } from "react-icons/fa";
import 'react-html5-camera-photo/build/css/index.css';

import React from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
const PassportScanner = ({ setPassScaner, passScaner, setFront, setBack, setSelfie, front }) => {

  const handleTakePhoto = (dataUri) => {
    if (passScaner === 'front') {
      const file = dataURLtoFile(dataUri, 'front.jpg');
      setFront(file)

    }
    if (passScaner === 'back') {
      const file = dataURLtoFile(dataUri, 'back.jpg');
      setBack(file)
    }
    if (passScaner === 'selfie') {
      const file = dataURLtoFile(dataUri, 'selfie.jpg');

      setSelfie(file)
    }
    setPassScaner(false)
  };

  const dataURLtoFile = (dataURL, filename) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <div className='PasScaner'>
      <FaLongArrowAltLeft className='arrow' onClick={() => setPassScaner(false)} />

      {passScaner !== 'selfie' ? (<span className='square'></span>) : (<span className="face"></span>)}



      <Camera
        className="camera"
        idealFacingMode={passScaner === 'selfie' ? FACING_MODES.USER : FACING_MODES.ENVIRONMENT}
        onTakePhoto={(dataUri) => handleTakePhoto(dataUri)}
        isFullscreen={true} imageCompression={0.5}
      />
    </div>
  );
};

export default PassportScanner;

