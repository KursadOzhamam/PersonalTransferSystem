import React from 'react';
import './SecurityModal.css';
import CircleButton from '../../components/shared/CircleButton';

function EducationModal({ onBack, onStepChange }) {
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
        <img src="src/assets/iconpack/education-icon.svg" alt="Education" className="modal-icon" />
        <p className="modal-text">
          Bu ekranda yapacağınız talepler <strong>"Eğitim Mazereti"</strong> kapsamında değerlendirilecektir.<br/>
          Eğitim mazeretine ilişkin ek belgelerinizi ibraz etmeniz gerekmektedir.
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

export default EducationModal; 