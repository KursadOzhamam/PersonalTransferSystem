// 📁 src/components/KararnameModal.jsx
import React, { useState } from 'react';
import './KararnameModal.css';
import CircleButton from './CircleButton';
import { toast } from 'react-toastify';

function KararnameModal({ onBack, onStepChange }) {
  const [selected, setSelected] = useState('');
  const handleContinue = () => {
    if (selected) {
      onStepChange(selected);
    } else {
      toast.error('Lütfen bir kararname seçiniz.');
    }
  };

  return (
    <div className="kararname-modal">
      <CircleButton
        icon="src/assets/iconpack/arrow-left.svg"
        alt="Geri"
        onClick={onBack}
        className="back-btn"
      />

      <div className="kararname-content">
        <p className="modal-subtitle">Aşağıda aktif kararnameler listelenmektedir</p>
        <h3 className="modal-title">Kararname Seçiniz</h3>

        <div className="kararname-options">
          <label className="kararname-option">
            <input type="radio" name="kararname" value="2024 Yaz Kararnamesi" checked={selected === '2024 Yaz Kararnamesi'} onChange={() => setSelected('2024 Yaz Kararnamesi')} /> <span>2024 Yaz Kararnamesi</span>
          </label>
          <label className="kararname-option">
            <input type="radio" name="kararname" value="2024 Kış Kararnamesi" checked={selected === '2024 Kış Kararnamesi'} onChange={() => setSelected('2024 Kış Kararnamesi')} /> <span>2024 Kış Kararnamesi</span>
          </label>
          <label className="kararname-option">
            <input type="radio" name="kararname" value="2023 Ek Kararname" checked={selected === '2023 Ek Kararname'} onChange={() => setSelected('2023 Ek Kararname')} /> <span>2023 Ek Kararname</span>
          </label>
        </div>

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

export default KararnameModal;
