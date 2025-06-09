import React from 'react';
import './MessageModal.css';

function MessageModal({ onClose }) {
  return (
    <div className="mobile-message-modal-overlay">
      <div className="mobile-message-modal-box">
        <button className="mobile-message-close" onClick={onClose}>×</button>
        <div className="mobile-message-center">
          <p className="mobile-message-empty">Yeni bir mesajınız bulunmamaktadır</p>
        </div>
      </div>
    </div>
  );
}

export default MessageModal; 