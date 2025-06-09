import React from 'react';
import './CircleButton.css';

// [commit] Geri butonu: Sol ok ikonu ile döner
export function BackButton({ onClick, className = '' }) {
  return (
    <button
      type="button"
      className={`circle-btn back-btn ${className}`}
      onClick={onClick}
    >
      <img src="src/assets/iconpack/arrow-left.svg" alt="Geri" />
    </button>
  );
}

// [commit] İleri butonu: Sağ ok ikonu ile ilerler
export function NextButton({ onClick, className = '' }) {
  return (
    <button
      type="button"
      className={`circle-btn next-btn ${className}`}
      onClick={onClick}
    >
      <img src="src/assets/iconpack/arrow-right.svg" alt="Devam Et" />
    </button>
  );
}

// [commit] Kapat butonu: Çarpı ikonu ile kapatır
export function CloseButton({ onClick, className = '' }) {
  return (
    <button
      type="button"
      className={`circle-btn close-btn ${className}`}
      onClick={onClick}
    >
      <img src="src/assets/iconpack/close-circle.svg" alt="Kapat" />
    </button>
  );
}

// Genel amaçlı CircleButton (ikonu dışarıdan alır)
function CircleButton({ icon, alt, onClick, className = '', type = 'button' }) {
  return (
    <button
      type={type}
      className={`circle-btn ${className}`}
      onClick={onClick}
    >
      <img src={icon} alt={alt} />
    </button>
  );
}

export default CircleButton; 