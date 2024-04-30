import React, { useRef, useState } from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const PassportScanner = ({ onCapture }) => {
  const cameraRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleTakePhoto = (dataUri) => {
    if (onCapture) {
      onCapture(dataUri);
    }
  };

  const handleCameraLoad = () => {
    setIsFocused(true);
  };

  return (
    <div>
      {isFocused && (
        <div style={{ position: 'relative', width: '100%' }}>
          <Camera
            idealFacingMode={FACING_MODES.ENVIRONMENT}
            isImageMirror={false}
            onTakePhoto={(dataUri) => handleTakePhoto(dataUri)}
            imageType="png"
            ref={cameraRef}
            onCameraLoad={() => handleCameraLoad()}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '50%',
              height: '70%',
              border: '2px solid red',
              boxSizing: 'border-box',
            }}
          >
            {/* Здесь можете добавить текст или инструкции */}
          </div>
        </div>
      )}
    </div>
  );
};

export default PassportScanner;
