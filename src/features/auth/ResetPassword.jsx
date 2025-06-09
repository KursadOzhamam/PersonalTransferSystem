import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css'; 

function ResetPassword() {
  const [registry, setRegistry] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleVerify = () => {
    const cleanedPhone = phone.replace(/\D/g, ''); 
    if (registry === '123456' && cleanedPhone === '1234567890') {
      navigate('/forgot');
    } else {
      alert('Sicil numarası veya telefon numarası hatalı.');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="reset-container">
      <img src="/logo513.png" alt="Logo" className="reset-logo" />

      <h5 className="reset-title">Şifrenizi sıfırlayın</h5>
      <p className="reset-subtext">
        Şifrenizi sıfırlamak için sicil ve telefon numarası bilgilerinizi tuşlayarak
        yönergeleri takip edebilirsiniz
      </p>

      <Form className="reset-form">
        <Form.Group className="mb-3">
          <Form.Label className="font-wight-custom">Sicil Numarası</Form.Label>
          <Form.Control
            type="text"
            placeholder="Sicil Numaranızı girmek için tıklayın..."
            value={registry}
            onChange={(e) => setRegistry(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="font-wight-custom">Telefon Numarası</Form.Label>
          <Form.Control
            type="text"
            placeholder="(___) ___ __ __"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" className="w-100 mb-2 reset-btn" onClick={handleVerify}>
          Doğrula
        </Button>

        <Button variant="danger" className="w-100" onClick={handleBack}>
          Giriş sayfasına dön
        </Button>
      </Form>

      <footer className="reset-footer mt-4 text-muted small">
        © 2025 Adalet Bakanlığı Yetenek Geliştirme Programı (AYEP)
      </footer>
    </div>
  );
}

export default ResetPassword;
