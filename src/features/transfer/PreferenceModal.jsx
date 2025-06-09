
import React, { useState, useRef, useEffect } from 'react';
import './PreferenceModal.css';
import { COURT_DATA } from '../../data/COURT_DATA';
import bamList from '../../data/bam.json';
import bimList from '../../data/bim.json';
import CircleButton from '../../components/shared/CircleButton';
import SuccessModal from '../../components/modals/SuccessModal';
import { toast } from 'react-toastify';

function PreferenceModal({ onBack, personName, gorevYeri, puan, gorevSuresi, talepNedeni, kararname, closeAllModals, showSuccess, setShowSuccess }) {
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
  const scrollRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

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
      toast.error('En fazla 5 tercih ekleyebilirsiniz.');
      return;
    }
    if (!province || !district || !institution) {
      toast.error('Lütfen il, ilçe ve görev yeri seçiniz.');
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
      toast.error('En az bir tercih olmalı.');
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
      toast.error('Lütfen en az bir tercih ekleyin.');
      return;
    }
    const sicil = localStorage.getItem('sicil') || '';
    const newApplication = {
      id: Date.now(),
      personName,
      gorevYeri,
      puan,
      gorevSuresi,
      talepNedeni,
      kararname,
      preferences,
      requestAreas,
      createdAt: new Date().toISOString(),
      sicil,
      status: 'pending'
    };
    const prev = JSON.parse(localStorage.getItem('applications') || '[]');
    const updatedApplications = [newApplication, ...prev];
    localStorage.setItem('applications', JSON.stringify(updatedApplications));

    // Dispatch custom event
    const event = new CustomEvent('transferRequestUpdated', {
      detail: { applications: updatedApplications }
    });
    window.dispatchEvent(event);

    setShowSuccess(true);
  };

  // Gerekli alanlar dolu mu kontrolü
  const isFormValid = province && district && institution && preferences.length > 0;

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10); // 10px tolerans
    };
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="preference-modal-wrapper">
      <div className="preference-header mb-5">
        <CircleButton
          icon="src/assets/iconpack/arrow-left.svg"
          alt="Geri"
          onClick={onBack}
          className="back-btn me-3"
        />
        <span className="badge top-fix">Mevcut görev yeri: Kahramankazan Adalet Sarayı</span>

      </div>

      <div className="scrollable-content responsive-order gap-5">
        <div className="section section-bolge">
          <h5 className='bg-light p-3 rounded-4 d-block'>Başvuru Bölgesi Seçiniz</h5>

          <div className='d-flex align-items-center gap-2 mb-3'>
            <input
              id='ilkDerece'
              style={{ width: '20px', height: '20px' }}
              type="radio"
              name="bolge"
              checked={requestAreas.ilkDerece}
              onChange={() => setRequestAreas({ ilkDerece: true, bam: false, bim: false })}
            />
            <label for="ilkDerece">

              Adli Yargı İlk Derece Mahkemesi
            </label>
          </div>
          <div className='d-flex align-items-center gap-2 mb-3'>
            <input
              id='bam'
              style={{ width: '20px', height: '20px' }}
              type="radio"
              name="bolge"
              checked={requestAreas.bam}
              onChange={() => setRequestAreas({ ilkDerece: false, bam: true, bim: false })}
            />
            <label for="bam">

              Bölge Adliye Mahkemesi
            </label>
          </div>

          <div className='d-flex align-items-center gap-2 mb-3'>
            <input
              id='bim'
              style={{ width: '20px', height: '20px' }}
              type="radio"
              name="bolge"
              checked={requestAreas.bim}
              onChange={() => setRequestAreas({ ilkDerece: false, bam: false, bim: true })}
            />
            <label for="bim">

              Bölge İdare Mahkemesi
            </label>
          </div>

        </div>
        <div className="section section-ililce">
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
          <div className='w-100'>
            <div className="ek-ekle-row">
              <div className='w-100 mb-5'>
                <h5 className='bg-light p-3 rounded-4 d-block'>Mazeret Açıklaması ve Ekler</h5>
                <textarea
                  placeholder="Mazeret Açıklaması ve Ekler"
                  value={note}
                  rows={3}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              <div className="d-flex align-items-center justify-content-center gap-3 mt-3 position-relative">
                <CircleButton
                  icon="src/assets/iconpack/paperclip-alt-svgrepo-com.svg"
                  alt="Ek Ekle"
                  onClick={() => toast.info('Ek dosya ekleme yakında!')}
                  className="position-absolute  start-0"
                />
                <CircleButton
                  icon="src/assets/iconpack/plus-circle-svgrepo-com.svg"
                  alt="Ekle"
                  onClick={handleAddPreference}
                  className="position-absolute end-0"
                />
              </div>
            </div>
          </div>

        </div>

        <div className="section section-tercihler my-5">
          {preferences.length > 0 && (
            <>
              <h5 className='bg-light p-3 rounded-4 d-block'>Tercih Listesi</h5>
              <div className="tercih-listesi-border">
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
            </>
          )}
        </div>
        <div className="section section-ozet">
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
        </div>
        <p className="note dipnot">*Talep özetinde hatalı bilgi olduğunu düşünüyorsanız geri butonuna tıklayarak düzeltme yapınız.

          *Memuriyet puan bilgisi ve görev mahallinde geçen sürede hata olduğunu düşünüyorsanız bağlı bulunduğunuz komisyon başkanlığı ile iletişime geçiniz.</p>
        <div className="d-flex justify-content-end mt-4 devam-btn-row">
          {preferences.length > 0 && (
            <CircleButton
              icon="src/assets/iconpack/arrow-right.svg"
              alt="Devam Et"
              onClick={handleSubmit}
              className="next-btn devam-btn"
            />
          )}
        </div>
      </div>
      {showSuccess && (
        <SuccessModal onClose={closeAllModals} />
      )}
    </div>
  );
}

export default PreferenceModal;
