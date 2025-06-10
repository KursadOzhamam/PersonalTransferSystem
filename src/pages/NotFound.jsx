import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './login.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notFound-wrapper" style={{ height: '100vh' }}>
      <div className="notFound" style={{ 
        width: '100%', 
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '1rem'
      }}>
        <img 
          src="/logo512.png" 
          alt="Logo" 
          className="welcome-logo" 
          style={{
            maxWidth: '100%',
            height: 'auto',
            width: 'min(400px, 80vw)',
            marginBottom: '2rem'
          }}
        />
        <h2 className="welcome-title" style={{
          fontSize: 'clamp(1.5rem, 5vw, 2rem)',
          textAlign: 'center',
          marginBottom: '1rem'
        }}>404 - Sayfa Bulunamadı</h2>
        <p className="welcome-desc" style={{
          fontSize: 'clamp(0.9rem, 3vw, 1rem)',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto'
        }}>Aradığınız sayfa taşınmış, silinmiş ya da hiç var olmamış olabilir.</p>
        
        <div style={{ 
          position: 'absolute', 
          bottom: '10rem', 
          left: '50%', 
          transform: 'translateX(-50%)',
          width: 'min(200px, 80%)'
        }}>
          <Button 
            variant="light" 
            className="w-100"
            onClick={() => navigate('/')}
            style={{ 
              background: 'rgba(255, 255, 255, 0.81)', 
              border: '1px solid rgba(255, 255, 255, 0.4)',
              color: 'black'
            }}
          >
            Ana Sayfaya Dön
          </Button>
        </div>

        <footer className="text-white small" style={{ 
          position: 'absolute', 
          bottom: '1rem', 
          left: '50%', 
          transform: 'translateX(-50%)',
          color: 'rgba(255, 255, 255, 0.96) !important',
          textAlign: 'center',
          width: '100%',
          padding: '0 1rem',
          fontSize: 'clamp(0.7rem, 2vw, 0.875rem)'
        }}>
          © 2025 Adalet Bakanlığı Yetenek Geliştirme Programı (AYEP)
        </footer>
      </div>
    </div>
  );
}

export default NotFound; 