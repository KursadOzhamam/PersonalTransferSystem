import React from 'react';
import './AlertDropdown.css';

function AlertDropdown({ onClose }) {
  return (
    <div className="alert-dropdown-overlay" onClick={onClose}>
      <div className="alert-dropdown-box" onClick={(e) => e.stopPropagation()}>
        <p className="alert-dropdown-empty">Yeni bir bildiriminiz bulunmamaktadır</p>
      </div>
    </div>
  );
}

export default AlertDropdown; 