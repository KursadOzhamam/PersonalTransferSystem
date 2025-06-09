
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css';
import { toast } from 'react-toastify';

function StepOne() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();

  const handleInputChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Otomatik olarak sonraki inputa geç
    if (value && index < 5) {
      const next = document.getElementById(`code-${index + 1}`);
      if (next) next.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode === '123456') {
      navigate('/forgot-step2'); 
    } else {
      toast.error('Doğrulama kodu hatalı.');
    }
  };

  return (
    <div className="reset-container">
      <img src="/logo513.png" alt="Logo" className="reset-logo" />
      <h5 className="reset-title">SMS Doğrulaması</h5>
      <p className="reset-subtext">Lütfen cep telefonunuza gönderilen doğrulama kodunu tuşlayın.</p>

      <Form className="reset-form" onSubmit={handleSubmit}>
        <div className="otp-input-group mb-3">
          {code.map((digit, idx) => (
            <Form.Control
              key={idx}
              id={`code-${idx}`}
              type="text"
              maxLength={1}
              className="otp-input"
              value={digit}
              onChange={(e) => handleInputChange(idx, e.target.value)}
            />
          ))}
        </div>

        <Button type="submit" variant="primary" className="w-100 reset-btn">
          Doğrula
        </Button>
      </Form>
    </div>
  );
}

export default StepOne;
