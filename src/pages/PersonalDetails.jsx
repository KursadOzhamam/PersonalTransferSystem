import React, { useState } from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import TabsPanel from '../components/TabsPanel';
import './ProfileImage.css';

function PersonalDetails() {
  const [profileImage, setProfileImage] = useState('https://i.pravatar.cc/200?img=52');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-100 d-flex justify-content-center align-items-center">
        <Col xs={12} md={12} lg={12}>
          <Card className="shadow-sm border-0 rounded-4 p-4">
            <Row>
              {/* Sol: Profil Bilgisi */}
              <Col md={5} className="mb-4 text-start d-flex flex-column align-items-center">
  <div className="position-relative mx-auto" style={{ width: '200px', height: '200px' }}>
    <div
      className="profile-image-wrapper"
      onClick={() => document.getElementById('profileUpload').click()}
    >
      <Image
        src={profileImage}
        className="shadow rounded-4 w-100 h-100"
        style={{ objectFit: 'cover' }}
      />
      <div className="profile-hover-overlay">
        <i className="bi bi-camera-fill fs-3"></i>
        <span className="hover-text mt-2">Profil Fotoğrafını Değiştir</span>
      </div>
    </div>
    <input
      id="profileUpload"
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      style={{ display: 'none' }}
    />
  </div>

  <h5 className="fw-bold mt-3">{'Kürşad Şükrü Özhamam'}</h5>

  <div className="mt-3 d-flex flex-column align-items-start gap-2">
    <div className="d-flex">
      <span className="fw-semibold me-2" style={{ minWidth: '140px' }}>TCKN:</span>
      <span className="text-muted">21908457062</span>
    </div>
    <div className="d-flex">
      <span className="fw-semibold me-2" style={{ minWidth: '140px' }}>Doğum Tarihi:</span>
      <span className="text-muted">21/07/1992</span>
    </div>
    <div className="d-flex">
      <span className="fw-semibold me-2" style={{ minWidth: '140px' }}>Sicil No:</span>
      <span className="text-muted">188236</span>
    </div>
    <div className="d-flex">
      <span className="fw-semibold me-2" style={{ minWidth: '140px' }}>Göreve Başlama:</span>
      <span className="text-muted">07/07/2015</span>
    </div>
  </div>
</Col>


              {/* Sağ: Sekmeli Alan */}
              <Col md={7}>
                <div style={{ minHeight: '550px' }}>
                  <TabsPanel />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PersonalDetails;
