import React, { useState } from 'react';
import {
  Button,
  Table,
  Modal,
  Form,
  Row,
  Col,
  FloatingLabel,
} from 'react-bootstrap';
import { COURT_DATA } from '../../data/COURT_DATA';
import bamList from '../../data/bam.json';
import bimList from '../../data/bim.json';
import './RequestsTab.css';

function RequestsTab() {
  const [showModal, setShowModal] = useState(false);
  const [requestType, setRequestType] = useState('');
  const [requestAreas, setRequestAreas] = useState({
    ilkDerece: false,
    bam: false,
    bim: false,
  });

  const [selectedDecree, setSelectedDecree] = useState('');
  const [showDecreeModal, setShowDecreeModal] = useState(false);

  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [institution, setInstitution] = useState('');
  const [note, setNote] = useState('');
  const [file, setFile] = useState(null);
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('transferRequests');
    return saved ? JSON.parse(saved) : [];
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!requestType || !province || !district || !institution || !note) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    const newRequest = {
      date: new Date().toLocaleDateString(),
      type: requestType,
      decree: requestType === 'Kararname Kapsamı' ? selectedDecree : null,
      province,
      district,
      institution,
    };

    const updatedRequests = [newRequest, ...requests];
    setRequests(updatedRequests);
    localStorage.setItem('transferRequests', JSON.stringify(updatedRequests));

    // 🔧 Admin panelini tetikle
    window.dispatchEvent(new CustomEvent('tayinTalepGuncelle'));

    // Reset form
    setRequestType('');
    setRequestAreas({ ilkDerece: false, bam: false, bim: false });
    setSelectedDecree('');
    setProvince('');
    setDistrict('');
    setInstitution('');
    setNote('');
    setFile(null);
    setShowModal(false);
  };

  return (
    <>
      <div className="d-flex justify-content-end align-items-center mb-3">
        <Button variant="success" onClick={() => setShowModal(true)}>
          Yeni Başvuru Yap
        </Button>
      </div>

      <div className="requests-table-wrapper">
        <Table hover responsive className="mb-0 requests-table">
          <thead>
            <tr>
              <th>Başvuru Tarihi</th>
              <th>Talep Türü</th>
              <th>İl</th>
              <th>İlçe</th>
              <th>Yeni Görev Yeri</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, i) => (
              <tr key={i} className="requests-row">
                <td>{req.date}</td>
                <td>{req.type}{req.decree ? ` (${req.decree})` : ''}</td>
                <td>{req.province}</td>
                <td>{req.district}</td>
                <td>{req.institution}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Kararname Seçim Modali */}
      <Modal show={showDecreeModal} onHide={() => setShowDecreeModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Kararname Seçimi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {[
              { id: 'Tayin1', label: 'Mücbir Sebepler Nedeniyle Yayınlanan Kararname' },
              { id: 'Tayin2', label: 'İsteğe Bağlı Yer Değiştirme Kararnamesi' },
              { id: 'Tayin3', label: 'Sözleşmeli Personel Karşılıklı Yer Değişimi' },
            ].map((opt) => (
              <Form.Check
                key={opt.id}
                type="radio"
                label={opt.label}
                name="decree"
                value={opt.id}
                checked={selectedDecree === opt.id}
                onChange={(e) => setSelectedDecree(e.target.value)}
              />
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDecreeModal(false)}>
            Vazgeç
          </Button>
          <Button
            variant="primary"
            onClick={() => setShowDecreeModal(false)}
            disabled={!selectedDecree}
          >
            Seçimi Onayla
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Tayin Talebi Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop="static" size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Tayin Talebi Oluştur</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Mevcut Adliye</Form.Label>
              <Form.Control value="Ankara Adliyesi" disabled />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tayin Talebi Kapsamı</Form.Label>
              <div className="d-flex flex-column gap-2">
                {['Aile Durumu Mazereti', 'Can Güvenliği Mazereti', 'Eğitim Mazereti', 'Kararname Kapsamı'].map(
                  (type) => (
                    <Form.Check
                      key={type}
                      type="radio"
                      name="requestType"
                      label={type}
                      value={type}
                      checked={requestType === type}
                      onChange={(e) => {
                        const val = e.target.value;
                        setRequestType(val);
                        if (val === 'Kararname Kapsamı') {
                          setShowDecreeModal(true);
                        }
                      }}
                    />
                  )
                )}
              </div>
            </Form.Group>

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

            <Form.Group className="mb-3">
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

            <Form.Group className="mb-3">
              <Form.Label>Mazeret Açıklaması</Form.Label>
              <FloatingLabel label="En fazla 500 karakter" className="mb-2">
                <Form.Control
                  as="textarea"
                  maxLength={500}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  style={{ height: '100px' }}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Ek Dosya (isteğe bağlı)</Form.Label>
              <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 rounded-pill">
              Başvurumu Tamamla
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RequestsTab;
