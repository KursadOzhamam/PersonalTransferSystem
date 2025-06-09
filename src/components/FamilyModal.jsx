import React from 'react';
import './GuvenlikModal.css';
import CircleButton from './CircleButton';

function FamilyModal({ onBack, onStepChange }) {
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
        <img src="src/assets/iconpack/family-icon.svg" alt="Family" className="modal-icon" />
        <p className="modal-text">
          Bu ekranda yapacağınız talepler <strong>"Aile Birliği Mazereti"</strong> kapsamında değerlendirilecektir.<br/>
          Aile birliği mazeretine ilişkin ek belgelerinizi ibraz etmeniz gerekmektedir.
        </p>

        
      </div>
    </div>
  );
}

export default FamilyModal; 