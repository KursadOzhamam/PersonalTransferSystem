// 📁 src/components/GuvenlikModal.jsx
import React from 'react';
import './GuvenlikModal.css';
import CircleButton from './CircleButton';

function GuvenlikModal({ onBack, onStepChange }) {
  const handleContinue = () => {
    onStepChange(3);
  };

  return (
    <div className="guvenlik-modal-content animate-slide-in">
      <CircleButton
        icon="src/assets/iconpack/arrow-left.svg"
        alt="Geri"
        onClick={onBack}
        className="back-btn"
      />

      <div className="guvenlik-modal-center">
        <img src="src/assets/iconpack/headache-fever-flu-sick-svgrepo-com.svg" alt="User" className="modal-icon" />
        <p className="modal-text">
          Bu ekranda yapacağınız talepler <strong>"Can güvenliği"</strong> kapsamında değerlendirilecektir.
          Can güvenliğine ilişkin ek belgelerinizi ibraz etmeniz gerekmektedir.
        </p>

        <CircleButton
          icon="src/assets/iconpack/arrow-right.svg"
          alt="Devam Et"
          onClick={handleContinue}
          className="next-btn mt-4"
        />
      </div>
    </div>
  );
}

export default GuvenlikModal;
