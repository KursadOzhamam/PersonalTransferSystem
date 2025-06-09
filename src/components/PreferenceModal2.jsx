// 📁 src/components/PreferenceModal.jsx
import React, { useState, useRef } from 'react';
import './PreferenceModal.css';
import { COURT_DATA } from '../data/COURT_DATA';
import bamList from '../data/bam.json';
import bimList from '../data/bim.json';
import CircleButton from './CircleButton';

function PreferenceModal({ onBack, personName, gorevYeri, puan, gorevSuresi, talepNedeni, kararname }) {
  const [requestAreas, setRequestAreas] = useState({
    ilkDerece: false,
    bam: false,
    bim: false,
  });

  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [institution, setInstitution] = useState('');
  const [note, setNote] = useState('');
  const [preferences, setPreferences] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const listRef = useRef(null);

  const provinces = Object.keys(COURT_DATA);
  const bamProvinces = bamList;
  const bimProvinces = bimList;

  const districts = province
    ? requestAreas.ilkDerece
      ? Object.keys(COURT_DATA[province])
      : ['Merkez']
    : [];

  const institutions = () => {
    const list = [];
    if (requestAreas.ilkDerece && COURT_DATA[province]?.[district]) {
      list.push(...COURT_DATA[province][district]);
    }
    if (requestAreas.bam && bamProvinces.includes(province)) {
      list.push(`${province} Bölge Adliye Mahkemesi`);
    }
    if (requestAreas.bim && bimProvinces.includes(province)) {
      list.push(`${province} Bölge İdare Mahkemesi`);
    }
    return list;
  };

  const handleAddPreference = () => {
    if (preferences.length >= 5) {
      alert('En fazla 5 tercih ekleyebilirsiniz.');
      return;
    }
    if (!province || !district || !institution) {
      alert('Lütfen il, ilçe ve görev yeri seçiniz.');
      return;
    }
    const newPreference = {
      id: Date.now(),
      province,
      district,
      institution,
      note
    };
    setPreferences([...preferences, newPreference]);
    setProvince('');
    setDistrict('');
    setInstitution('');
    setNote('');
  };

  const handleRemovePreference = (id) => {
    if (preferences.length <= 1) {
      alert('En az bir tercih olmalı.');
      return;
    }
    setPreferences(preferences.filter(pref => pref.id !== id));
  };

  // Sürükle-bırak fonksiyonları
  const handleDragStart = (index) => setDraggedIndex(index);
  const handleDragOver = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const updated = [...preferences];
    const [removed] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, removed);
    setPreferences(updated);
    setDraggedIndex(index);
  };
  const handleDragEnd = () => setDraggedIndex(null);

  // Yön tuşları ile sıralama
  const movePreference = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= preferences.length) return;
    const updated = [...preferences];
    const [removed] = updated.splice(index, 1);
    updated.splice(newIndex, 0, removed);
    setPreferences(updated);
  };

  const handleSubmit = () => {
    if (preferences.length === 0) {
      alert('Lütfen en az bir tercih ekleyin.');
      return;
    }

    // Burada form gönderme işlemi yapılacak
    console.log({
      preferences,
      requestAreas
    });
  };

  return (
    <div className="preference-modal-wrapper">
      <div className="preference-header mb-5">
        <CircleButton
          icon="src/assets/iconpack/close-cricle.svg"
          alt="Kapat"
          onClick={onBack}
          className="close-btn modal-close"
        />
        <span className="badge top-fix">Mevcut görev yeri: Kahramankazan Adalet Sarayı</span>
        <button className="modal-close">×</button>
      </div>

      <div className="scrollable-content">
        <div className="preference-grid">
          <div className="section">
            <h5 className='bg-light p-3 rounded-4 d-block'>Başvuru Bölgesi Seçiniz</h5>
            <label>
              <input 
                type="radio" 
                name="bolge" 
                checked={requestAreas.ilkDerece}
                onChange={() => setRequestAreas({ ilkDerece: true, bam: false, bim: false })}
              /> 
              Adli Yargı İlk Derece Mahkemesi
            </label>
            <label>
              <input 
                type="radio" 
                name="bolge" 
                checked={requestAreas.bam}
                onChange={() => setRequestAreas({ ilkDerece: false, bam: true, bim: false })}
              /> 
              Bölge Adliye Mahkemesi
            </label>
            <label>
              <input 
                type="radio" 
                name="bolge" 
                checked={requestAreas.bim}
                onChange={() => setRequestAreas({ ilkDerece: false, bam: false, bim: true })}
              /> 
              Bölge İdare Mahkemesi
            </label>
          </div>

          <div className="section">
            <h5 className='bg-light p-3 rounded-4 d-block'>Tercih Listesi</h5>
            <ul
              className="preference-list style-none d-flex flex-column gap-2 align-items-start justify-content-center"
              ref={listRef}
            >
              {preferences.map((pref, index) => (
                <li
                  key={pref.id}
                  className={`preference-item bg-light p-3 rounded-3 shadow-sm d-flex align-items-center gap-2 w-100${draggedIndex === index ? ' dragging' : ''}`}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => { e.preventDefault(); handleDragOver(index); }}
                  onDragEnd={handleDragEnd}
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'ArrowUp') movePreference(index, -1);
                    if (e.key === 'ArrowDown') movePreference(index, 1);
                  }}
                  style={{ cursor: 'grab', transition: 'box-shadow 0.2s, background 0.2s' }}
                >
                  <span className="flex-grow-1">{index + 1}- {pref.institution}</span>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => handleRemovePreference(pref.id)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="section">
            <h5 className='bg-light p-3 rounded-4 d-block'>İl, İlçe ve Görev Yeri Tercihi</h5>
            <select 
              value={province} 
              onChange={(e) => {
                setProvince(e.target.value);
                setDistrict('');
                setInstitution('');
              }}
            >
              <option value="">İl Seçiniz</option>
              {provinces.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            
            <select 
              value={district} 
              onChange={(e) => {
                setDistrict(e.target.value);
                setInstitution('');
              }}
              disabled={!province}
            >
              <option value="">İlçe Seçiniz</option>
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            
            <select 
              value={institution} 
              onChange={(e) => setInstitution(e.target.value)}
              disabled={!district}
            >
              <option value="">Görev Yeri Seçiniz</option>
              {institutions().map((inst) => (
                <option key={inst} value={inst}>{inst}</option>
              ))}
            </select>
            
            <textarea 
              placeholder="Mazeret Açıklaması ve Ekler"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <div className="d-flex align-items-center justify-content-center gap-3 mt-3">
              <CircleButton
                icon="src/assets/iconpack/paperclip.svg"
                alt="Ek Ekle"
                onClick={() => alert('Ek dosya ekleme yakında!')}
              />
              <CircleButton
                icon="src/assets/iconpack/plus.svg"
                alt="Ekle"
                onClick={handleAddPreference}
              />
            </div>
          </div>

          <div className="section">
            <h5 className='bg-light p-3 rounded-4 d-block'>Talep Özeti</h5>
            <ul className="summary">
              <li>{personName}</li>
              <li>{gorevYeri}</li>
              <li>{kararname ? kararname : talepNedeni}</li>
              <li>{talepNedeni}</li>
              <li>Tercih listesi bölgesine naklen atama talebi edilmiştir.</li>
              <li>Memuriyet Puan Bilgisi: {puan}</li>
              <li>Son Görev Mahallinde Geçen Süre: {gorevSuresi}</li>
            </ul>
            <p className="note">* Talep özeti hatalıysa önceki adıma dönüp tekrar kontrol ediniz.</p>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <CircleButton
            icon="src/assets/iconpack/arrow-right.svg"
            alt="Devam Et"
            onClick={handleSubmit}
            className="next-btn"
          />
        </div>
      </div>
    </div>
  );
}

export default PreferenceModal;
