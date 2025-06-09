
import React, { useRef, useEffect, useState } from 'react';
import './TransferModal.css';
import TransferReasonContent from './TransferReasonContent';
import ModalTabs from '../../components/shared/ModalTabs';
import PreferenceModal from './PreferenceModal';
import CircleButton from '../../components/shared/CircleButton';

function TransferModal({ showModal, setShowModal, activeTab, setActiveTab, izinTipi, setIzinTipi, personName, gorevYeri, puan, gorevSuresi }) {
  const modalRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [talepNedeni, setTalepNedeni] = useState('');
  const [kararname, setKararname] = useState('');
  const [reason, setReason] = useState('kararname');
  const [showSuccess, setShowSuccess] = useState(false);

  const closeAllModals = () => {
    setShowSuccess(false);
    setShowModal(false);
    setCurrentStep(1);
    setTalepNedeni('');
    setKararname('');
    setReason('kararname');
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box animate-slide-in" ref={modalRef}>
        <CircleButton
          icon="src/assets/iconpack/close-circle.svg"
          alt="Kapat"
          onClick={() => setShowModal(false)}
          className="close-btn modal-close"
        />
        <div className="modal-inner">
          {currentStep === 1 && <ModalTabs activeTab={activeTab} setActiveTab={setActiveTab} />}
          <div className={`modal-right ${currentStep > 1 ? 'no-header' : ''}`}>
            {activeTab === 'izin' && (
              <>
                <div className="izin-options">
                  <label>
                    <input
                      type="radio"
                      checked={izinTipi === 'mazeret'}
                      onChange={() => setIzinTipi('mazeret')}
                    />
                    <span>Mazeret İzni Talebi</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      checked={izinTipi === 'yillik'}
                      onChange={() => setIzinTipi('yillik')}
                    />
                    <span>Yıllık İzin Talebi</span>
                  </label>
                </div>
                <button className="modal-submit">İzin talebi oluştur</button>
              </>
            )}

            {activeTab === 'tayin' && currentStep <= 2 && (
              <TransferReasonContent 
                onStepChange={setCurrentStep} 
                setTalepNedeni={setTalepNedeni}
                setKararname={setKararname}
                reason={reason}
                setReason={setReason}
                hideNextButton={currentStep === 2 && reason === 'guvenlik'}
              />
            )}

            {activeTab === 'tayin' && currentStep === 3 && (
              <PreferenceModal 
                onBack={() => setCurrentStep(1)}
                personName={personName}
                gorevYeri={gorevYeri}
                puan={puan}
                gorevSuresi={gorevSuresi}
                talepNedeni={talepNedeni}
                kararname={kararname}
                closeAllModals={closeAllModals}
                setShowSuccess={setShowSuccess}
                showSuccess={showSuccess}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferModal;
