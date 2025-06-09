import React from 'react';
import './MessageDropdown.css';

function MessageDropdown({ onClose }) {
  return (
    <div className="message-dropdown-overlay" onClick={onClose}>
      <div className="message-dropdown-box" onClick={(e) => e.stopPropagation()}>
        <p className="message-dropdown-empty">Yeni bir mesajınız bulunmamaktadır</p>
      </div>
    </div>
  );
}

export default MessageDropdown; 