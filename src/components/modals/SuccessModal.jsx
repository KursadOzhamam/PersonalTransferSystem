import React, { useEffect } from 'react';
import './SuccessModal.css';
import { CloseButton } from '../shared/CircleButton';

function SuccessModal({ onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className="success-modal-overlay">
      <div className="success-modal-box">
        <div className="success-modal-content">
          <img src="src/assets/iconpack/check-circle-succes.svg" alt="Başarılı" className="success-icon" />
          <h2 className="success-title">Tebrikler</h2>
          <p className="success-desc">Başvuru Tamamlandı</p>
        </div>
        <CloseButton onClick={onClose} className="close-btn modal-close" icon="src/assets/iconpack/close-circle.svg" />
      </div>
    </div>
  );
}

export default SuccessModal; 