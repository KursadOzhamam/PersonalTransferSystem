
import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Row,
  Col,
  FloatingLabel,
  Card,
  OverlayTrigger,
  Tooltip,
  ButtonGroup
} from 'react-bootstrap';
import { COURT_DATA } from '../data/COURT_DATA';
import bamList from '../data/bam.json';
import bimList from '../data/bim.json';
import './StepBasedRequestModal.css';
import { Paperclip } from 'react-bootstrap-icons';
import { IoIosArrowUp, IoIosArrowDown, IoIosClose } from 'react-icons/io';

function StepBasedRequestModal({ onSubmit, initialStep = 0, closeModal }) {
  const [step, setStep] = useState(initialStep);
  const [requestType, setRequestType] = useState('');
  const [requestAreas, setRequestAreas] = useState({
    ilkDerece: false,
    bam: false,
    bim: false,
  });
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [institution, setInstitution] = useState('');
  const [note, setNote] = useState('');
  const [file, setFile] = useState(null);
  const [preferences, setPreferences] = useState([]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const modal = document.querySelector('.step-card');
      if (modal && !modal.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  const provinces = Object.keys(COURT_DATA);
  const bamProvinces = bamList;
  const bimProvinces = bimList;

  const districts = province
    ? requestAreas.ilkDerece
      ? Object.keys(COURT_DATA[province] || {})
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

  const handleNext = () => {
    if (step === 1 && preferences.length === 0) return;
    setStep((prev) => Math.min(prev + 1, 2));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleAddPreference = () => {
    if (preferences.length >= 5) return;
    if (province && district && institution) {
      setPreferences([...preferences, { province, district, institution }]);
      setProvince('');
      setDistrict('');
      setInstitution('');
    }
  };

  const movePreference = (index, direction) => {
    const newList = [...preferences];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= preferences.length) return;
    [newList[index], newList[newIndex]] = [newList[newIndex], newList[index]];
    setPreferences(newList);
  };

  const removePreference = (index) => {
    const newList = [...preferences];
    newList.splice(index, 1);
    setPreferences(newList);
  };

  const handleFinalSubmit = () => {
    onSubmit({ requestType, preferences, note, file });
  };

  return (
    <div className="step-card">
      {step === 0 && (
        <>
          <h5 className="step-title">1. Tayin Türünü Seç</h5>
          <div className="d-flex flex-column gap-2">
            {['Aile Durumu', 'Eğitim', 'Can Güvenliği', 'Kararname'].map((type) => (
              <Form.Check
                type="radio"
                key={type}
                label={type}
                value={type}
                checked={requestType === type}
                onChange={(e) => setRequestType(e.target.value)}
              />
            ))}
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="step-title">2. Başvuru Alanı ve Kurum Bilgileri</h5>
            <Button
              size="sm"
              onClick={handleAddPreference}
              disabled={!(province && district && institution) || preferences.length >= 5}
            >
              + Ekle
            </Button>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Başvuru Alanı</Form.Label>
            <div className="d-flex flex-column gap-1">
              <Form.Check
                type="checkbox"
                label="Adli Yargı İlk Derece Mahkemesi"
                checked={requestAreas.ilkDerece}
                onChange={() =>
                  setRequestAreas((prev) => ({ ...prev, ilkDerece: !prev.ilkDerece }))
                }
              />
              <Form.Check
                type="checkbox"
                label="Bölge Adliye Mahkemesi"
                checked={requestAreas.bam}
                onChange={() =>
                  setRequestAreas((prev) => ({ ...prev, bam: !prev.bam }))
                }
              />
              <Form.Check
                type="checkbox"
                label="Bölge İdare Mahkemesi"
                checked={requestAreas.bim}
                onChange={() =>
                  setRequestAreas((prev) => ({ ...prev, bim: !prev.bim }))
                }
              />
            </div>
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>İl</Form.Label>
              <Form.Select
                value={province}
                onChange={(e) => {
                  setProvince(e.target.value);
                  setDistrict('');
                  setInstitution('');
                }}
              >
                <option value="">Seçiniz</option>
                {[
                  ...new Set([
                    ...(requestAreas.ilkDerece ? provinces : []),
                    ...(requestAreas.bam ? bamProvinces : []),
                    ...(requestAreas.bim ? bimProvinces : []),
                  ]),
                ].map((il) => (
                  <option key={il} value={il}>
                    {il}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Label>İlçe</Form.Label>
              <Form.Select
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setInstitution('');
                }}
                disabled={!province}
              >
                <option value="">Seçiniz</option>
                {districts.map((ilce) => (
                  <option key={ilce} value={ilce}>
                    {ilce}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          <Form.Group>
            <Form.Label>Yeni Görev Yeri</Form.Label>
            <Form.Select
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              disabled={!district}
            >
              <option value="">Seçiniz</option>
              {institutions().map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {preferences.length > 0 && (
            <Card className="mt-4">
              <Card.Body>
                <Card.Title>Eklenen Tercihler</Card.Title>
                <ul className="preference-list mb-0">
                  {preferences.map((p, i) => (
                    <li key={i} className="d-flex justify-content-between align-items-center">
                      <span>{p.province} / {p.district} - {p.institution}</span>
                      <ButtonGroup size="sm">
                        {i > 0 && (
                          <Button
                            variant="outline-secondary border-0 rounded-4 d-flex justify-content-center align-items-center"
                            onClick={() => movePreference(i, -1)}
                          >
                            <IoIosArrowUp />
                          </Button>
                        )}
                        {i < preferences.length - 1 && (
                          <Button
                            variant="outline-secondary border-0 rounded-4 d-flex justify-content-center align-items-center"
                            onClick={() => movePreference(i, 1)}
                          >
                            <IoIosArrowDown />
                          </Button>
                        )}
                        <Button variant="outline-danger border-0 rounded-4 d-flex justify-content-center align-items-center" onClick={() => removePreference(i)}>
                          <IoIosClose />
                        </Button>
                      </ButtonGroup>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          )}
        </>
      )}

      {step === 2 && (
        <>
          <h5 className="step-title">3. Açıklama ve Gönder</h5>
          <FloatingLabel label="Mazeret Açıklaması">
            <Form.Control
              as="textarea"
              style={{ height: '120px' }}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </FloatingLabel>

          <div className="d-flex align-items-center gap-2 mt-2">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Ek Dosya Seç</Tooltip>}
            >
              <label htmlFor="fileUpload" className="btn btn-light btn-sm p-2">
                <Paperclip size={18} />
              </label>
            </OverlayTrigger>
            <input
              id="fileUpload"
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <Button className="w-100 mt-4" variant="primary" onClick={handleFinalSubmit}>
            Başvuruyu Gönder
          </Button>
        </>
      )}

      <div className="step-actions">
        {step > 0 && <Button variant="light" onClick={handleBack}>Geri</Button>}
        {step < 2 ? (
          preferences.length > 0 || step === 0 ? (
            <Button onClick={handleNext}>İleri</Button>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>İlerleyebilmek için lütfen tercih belirtin, en az 1 en fazla 5 tercih ekleyebilirsiniz.</Tooltip>}
            >
              <span className="d-inline-block">
                <Button disabled style={{ pointerEvents: 'none' }}>
                  İleri
                </Button>
              </span>
            </OverlayTrigger>
          )
        ) : null}
      </div>
    </div>
  );
}

export default StepBasedRequestModal;
