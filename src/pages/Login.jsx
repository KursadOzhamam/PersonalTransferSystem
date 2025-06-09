
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [registry, setRegistry] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (registry === '123456' && password === 'Admin148*') {

       localStorage.setItem('isAuthenticated', 'true');
      navigate('/personnel-info');
    } else {
      setError(true);
    }
  };

  return (
    <div className="welcome-wrapper">
      {/* Sol Panel */}
      <div className="welcome-left">
        <img src="/logo512.png" alt="Logo" className="welcome-logo" />
        <h2 className="welcome-title">TAYİN TALEP SİSTEMİNE<br />HOŞ GELDİNİZ</h2>
        <p className="welcome-desc">BAKANLIK SİCİL VE UYAP ŞİFRENİZ İLE GİRİŞ YAPINIZ</p>
      </div>

      {/* Sağ Panel */}
      <div className="welcome-right">
        <img src="/logo513.png" alt="Small Logo" className="form-logo" />
        <h5 className="form-title">Tayin Talep Sistemine Hoş Geldiniz</h5>

        <Form className="login-form" onSubmit={handleLogin}>
          <Form.Group controlId="formRegistry" className="mb-3">
            <Form.Label className="font-wight-custom">Sicil Numarası</Form.Label>
            <Form.Control
              type="text"
              placeholder="Sicil Numaranızı girmek için tıklayın..."
              value={registry}
              onChange={(e) => setRegistry(e.target.value)}
              isInvalid={error}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-1" style={{ position: 'relative' }}>
            <Form.Label className="font-wight-custom">Şifre</Form.Label>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Şifrenizi girmek için tıklayın..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={error}
              style={{ paddingRight: '2.5rem' }}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: 'absolute',
                top: '50%',
                bottom: '50%',
                right: '1rem',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#888',
                fontSize: '1.25rem',
                zIndex: 2
              }}
              tabIndex={0}
              aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </Form.Group>

          {error && (
            <div className="error-message">
              <span className="text-danger">
                <strong>❗ Yanlış sicil ya da şifre girdiniz.</strong> Tekrar deneyin ya da{' '}
                <span className="link-danger" onClick={() => navigate('/reset-password')}>
                  şifrenizi unuttuysanız "Şifremi Unuttum" linkine tıklayın.
                </span>
              </span>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
            <Form.Check label="Beni Hatırla" />
            <span className="text-end link-primary fw-normal pointer" onClick={() => navigate('/reset-password')}>
              Şifremi Unuttum
            </span>
          </div>

          <Button type="submit" className="login-btn w-100">
            Giriş
          </Button>

          <div className="divider">
            <span>Diğer giriş seçenekleri</span>
          </div>

          <div className="login-alternatives">
            <Button
              variant="light"
              className="border flex-fill"
              onClick={() => window.location.href = 'https://giris.turkiye.gov.tr/Giris/gir'}
            >
              <img src="/edevlet-icon.png" alt="edevlet" height="20" className="me-2" />
              E-Devlet
            </Button>
            <Button
              variant="light"
              className="border flex-fill"
              onClick={() => window.location.href = 'https://giris.turkiye.gov.tr/Giris/Elektronik-Imza'}
            >
              <img src="/eimza-icon.png" alt="eimza" height="20" className="me-2" />
              E-İmza
            </Button>
          </div>
        </Form>

        <footer className="text-muted small mt-4 text-center">
          © 2025 Adalet Bakanlığı Yetenek Geliştirme Programı (AYEP)
        </footer>
      </div>
    </div>
  );
}

export default Login;
