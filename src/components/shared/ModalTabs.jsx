import React from 'react';

function ModalTabs({ activeTab, setActiveTab }) {
  return (
    <div className="modal-left">
      <button
        className={`modal-tab ${activeTab === 'izin' ? 'active' : ''}`}
        onClick={() => setActiveTab('izin')}
      >
        İzin Talebi
      </button>
      <button
        className={`modal-tab ${activeTab === 'tayin' ? 'active' : ''}`}
        onClick={() => setActiveTab('tayin')}
      >
        Tayin Talebi
      </button>
    </div>
  );
}

export default ModalTabs; 