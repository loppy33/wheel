import React, { useState, useEffect } from 'react';
import './wheelPage.sass';

import Wheel from './wheel/wheel';
import Modal from './modal/modal';
import PassportScanner from './passScaner/PassportScanner';

function WheelPage() {
  const [result, setResult] = useState(null);
  const [passScaner, setPassScaner] = useState();

  const [front, setFront] = useState();
  const [back, setBack] = useState();
  const [selfie, setSelfie] = useState();

  useEffect(() => {
    // Добавляем пиксель Facebook при монтировании компонента
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '770558885176026');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    return () => {
      // Удаление пикселя Facebook при размонтировании компонента
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className='WheelPage'>
      <div className="container">
        {passScaner ? (
          <PassportScanner
            front={front}
            setFront={setFront} setBack={setBack} setSelfie={setSelfie}
            passScaner={passScaner} setPassScaner={setPassScaner}
          ></PassportScanner>
        ) : (
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

export default WheelPage;
