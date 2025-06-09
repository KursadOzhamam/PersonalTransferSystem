import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../../pages/login.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@admin.com' && password === 'admin123') {
       localStorage.setItem('isAuthenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      setError(true);
    }
  };

  return (
    <div className="welcome-wrapper">
      {/* Sol Panel */}
      <div className="welcome-left">
        <img src="/logo512.png" alt="Logo" className="welcome-logo" />
        <h2 className="welcome-title">YÖNETİCİ PANELİNE<br />HOŞ GELDİNİZ</h2>
        <p className="welcome-desc">YÖNETİCİ ŞİFRENİZ İLE GİRİŞ YAPINIZ</p>
      </div>

      {/* Sağ Panel */}
      <div className="welcome-right">
        <img src="/logo513.png" alt="Small Logo" className="form-logo" />
        <h5 className="form-title">Yönetici Girişi</h5>

        <Form className="login-form" onSubmit={handleLogin}>

           <Form.Group controlId="formRegistry" className="mb-3">
                      <Form.Label className="font-wight-custom">Email</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Mail adresinizi girin..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isInvalid={error}
                      />
                    </Form.Group>


          <Form.Group controlId="formPassword" className="mb-1" style={{ position: 'relative' }}>
            <Form.Label className="font-wight-custom">Yönetici Şifresi</Form.Label>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Şifrenizi girin..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={error}
              style={{ paddingRight: '2.5rem' }}
              autoFocus
              required
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
                <strong>❗ Yanlış şifre veya mail adresi girdiniz.</strong> Lütfen tekrar deneyin.
              </span>
            </div>
          )}

          <Button type="submit" className="login-btn w-100 mt-3">
            Giriş
          </Button>
        </Form>

        <footer className="text-muted small mt-4 text-center">
          © 2025 Adalet Bakanlığı Yetenek Geliştirme Programı (AYEP)
        </footer>
      </div>
    </div>
  );
}

export default AdminLogin;
