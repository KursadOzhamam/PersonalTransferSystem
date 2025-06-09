import React, { useState } from 'react';
import './MobileSearchModal.css';
import '../pages/PersonnelInfo.css';     
import { CloseButton } from './CircleButton';
import searchIcon from '../assets/iconpack/search.svg';

function MobileSearchModal({ onClose }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      console.log('Arama:', query);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mobile-search-modal-overlay">
      <div className="mobile-search-modal-box">
        <button className="mobile-search-close" onClick={onClose}>×</button>
        <div className="mobile-search-center">
          <div className="search-containerr">
            <input
              type="text"
              placeholder="Ara..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className='mobile-search-input'
            />
            <img
              src="src/assets/iconpack/Search-icon.svg"
              alt=""
              onClick={handleSearch}
              style={{ cursor: 'pointer' }}
              tabIndex={-1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileSearchModal;
