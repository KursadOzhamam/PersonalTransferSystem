
import React, { useState } from 'react';
import './TransferReasonContent.css';
import CircleButton from '../../components/shared/CircleButton';
import EducationModal from '../transfer/EducationModal';
import FamilyModal from '../transfer/FamilyModal';
import DecreeModal from '../../components/modals/DecreeModal';
import SecurityModal from '../transfer/SecurityModal';

function TransferReasonContent({ onStepChange, setTalepNedeni, setKararname, reason: reasonProp, setReason: setReasonProp, hideNextButton }) {
  const [localReason, localSetReason] = useState('kararname');
  const reason = reasonProp !== undefined ? reasonProp : localReason;
  const setReason = setReasonProp !== undefined ? setReasonProp : localSetReason;
  const [step, setStep] = useState(1); 
  const [selectedKararname, setSelectedKararname] = useState('');

  const reasons = [
    { value: 'kararname', label: 'Kararname kapsamında Tayin Talebi' },
    { value: 'guvenlik', label: 'Can güvenliği nedeniyle tayin talebi' },
    { value: 'egitim', label: 'Eğitim Mazereti Tayini' },
    { value: 'aile', label: 'Aile Birliği Mazereti Tayini' },
  ];

  const handleNextClick = () => {
    setStep(2);
    onStepChange(2);
    setTalepNedeni(reasons.find(r => r.value === reason)?.label || '');
  };

  const handleBackClick = () => {
    setStep(1);
    onStepChange(1);
  };

  const handleFinalNext = (kararnameLabel) => {
    setTalepNedeni(reasons.find(r => r.value === reason)?.label || '');
    setKararname(kararnameLabel || '');
    onStepChange(3);
  };

  return (
    <div className="transfer-reason-wrapper">
      {step === 1 && (
        <>
          <div className="tayin-options">
            {reasons.map((item) => (
              <label key={item.value} className={reason === item.value ? 'active' : ''}>
                <input
                  type="radio"
                  value={item.value}
                  checked={reason === item.value}
                  onChange={() => setReason(item.value)}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>

          <CircleButton
            icon="src/assets/iconpack/arrow-right.svg"
            alt="Devam Et"
            onClick={handleNextClick}
            className="next-btn mt-3"
          />
        </>
      )}

      {step === 2 && reason === 'kararname' && (
        <DecreeModal onBack={handleBackClick} onStepChange={handleFinalNext} />
      )}

      {step === 2 && reason === 'guvenlik' && (
        <SecurityModal onBack={handleBackClick} onStepChange={onStepChange} />
      )}

      {step === 2 && reason === 'egitim' && (
        <EducationModal onBack={handleBackClick} onStepChange={onStepChange} />
      )}

      {step === 2 && reason === 'aile' && (
        <FamilyModal onBack={handleBackClick} onStepChange={onStepChange} />
      )}

      {step === 2 && reason !== 'kararname' && reason !== 'guvenlik' && reason !== 'egitim' && !hideNextButton && (
        <>
          <CircleButton
            icon="src/assets/iconpack/arrow-right.svg"
            alt="Devam Et"
            onClick={() => handleFinalNext('')}
            className="next-btn mt-4"
          />
        </>
      )}
    </div>
  );
}

export default TransferReasonContent;
