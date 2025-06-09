
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './StepTwo.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

function StepTwo() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const registry = '123456';

  const rules = {
    minLength: password.length >= 6,
    maxLength: password.length <= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasDigit: /\d/.test(password),
    hasSymbol: /[^A-Za-z0-9]/.test(password),
    notRepeat: !/(.)\1{2,}/.test(password),
    notRegistry: !password.includes(registry),
  };

  const isValid =
    Object.values(rules).every(Boolean) && password === confirm;

  const handleReset = (e) => {
    e.preventDefault();
    if (!isValid) {
      toast.error('Lütfen tüm kuralları sağlayan bir şifre girin.');
      return;
    }
    toast.success('Şifreniz başarıyla güncellendi!');
    window.location.href = '/'; // Giriş sayfasına yönlendirme
  };

  return (
    <div className="step-two-container">
      <img src="/logo513.png" alt="Logo" className="reset-logo" />

      <h5 className="reset-title">Yeni şifreniz</h5>
      <p className="reset-subtext">
        Yeni şifreniz min 6 max 8 karakter uzunluğunda olabilir ve tekrar eden sayılar, doğum
        tarihi, sicil bilgisi içeremez, en az bir büyük ve bir küçük harf, rakam ile sembol
        içermelidir.
      </p>

      <Form className="step-two-form" onSubmit={handleReset}>
        <Form.Group className="mb-3 position-relative">
          <Form.Label>Yeni şifre</Form.Label>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Yeni şifre girin"
          />
          <span
            className="toggle-visibility"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </Form.Group>

        <ul className="rules-list mb-4 grid-custom two-column-list">
          <li className={rules.minLength ? 'valid' : 'invalid'}>
            <img src={rules.minLength ? '/src/assets/iconpack/check-circle-true.svg' : '/src/assets/iconpack/none-cricle-false.svg'} alt="" style={{height: '1em', marginRight: '0.5em', verticalAlign: 'middle'}} />
            En az 6 karakter
          </li>
          <li className={rules.maxLength ? 'valid' : 'invalid'}>
            <img src={rules.maxLength ? '/src/assets/iconpack/check-circle-true.svg' : '/src/assets/iconpack/none-cricle-false.svg'} alt="" style={{height: '1em', marginRight: '0.5em', verticalAlign: 'middle'}} />
            En fazla 8 karakter
          </li>
          <li className={rules.hasUpper ? 'valid' : 'invalid'}>
            <img src={rules.hasUpper ? '/src/assets/iconpack/check-circle-true.svg' : '/src/assets/iconpack/none-cricle-false.svg'} alt="" style={{height: '1em', marginRight: '0.5em', verticalAlign: 'middle'}} />
            Bir büyük harf
          </li>
          <li className={rules.hasLower ? 'valid' : 'invalid'}>
            <img src={rules.hasLower ? '/src/assets/iconpack/check-circle-true.svg' : '/src/assets/iconpack/none-cricle-false.svg'} alt="" style={{height: '1em', marginRight: '0.5em', verticalAlign: 'middle'}} />
            Bir küçük harf
          </li>
          <li className={rules.hasDigit ? 'valid' : 'invalid'}>
            <img src={rules.hasDigit ? '/src/assets/iconpack/check-circle-true.svg' : '/src/assets/iconpack/none-cricle-false.svg'} alt="" style={{height: '1em', marginRight: '0.5em', verticalAlign: 'middle'}} />
            Bir rakam
          </li>
          <li className={rules.hasSymbol ? 'valid' : 'invalid'}>
            <img src={rules.hasSymbol ? '/src/assets/iconpack/check-circle-true.svg' : '/src/assets/iconpack/none-cricle-false.svg'} alt="" style={{height: '1em', marginRight: '0.5em', verticalAlign: 'middle'}} />
            Bir sembol
          </li>
          <li className={rules.notRepeat ? 'valid' : 'invalid'}>
            <img src={rules.notRepeat ? '/src/assets/iconpack/check-circle-true.svg' : '/src/assets/iconpack/none-cricle-false.svg'} alt="" style={{height: '1em', marginRight: '0.5em', verticalAlign: 'middle'}} />
            Tekrar eden karakter bulunmamalı
          </li>
          <li className={rules.notRegistry ? 'valid' : 'invalid'}>
            <img src={rules.notRegistry ? '/src/assets/iconpack/check-circle-true.svg' : '/src/assets/iconpack/none-cricle-false.svg'} alt="" style={{height: '1em', marginRight: '0.5em', verticalAlign: 'middle'}} />
            Sicil numarası şifre olarak belirlenemez
          </li>
        </ul>

        <Form.Group className="mb-3 position-relative">
          <Form.Label>Yeni şifre tekrar girin</Form.Label>
          <Form.Control
            type={showConfirm ? 'text' : 'password'}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Yeni şifrenizi tekrar giriniz"
          />
          <span
            className="toggle-visibility"
            onClick={() => setShowConfirm((prev) => !prev)}
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </span>
        </Form.Group>

        <Button type="submit" className="w-100 reset-btn" disabled={!isValid}>
          Şifremi yenile
        </Button>
      </Form>

      <footer className="reset-footer mt-4 text-muted small">
        © 2025 Adalet Bakanlığı Yetenek Geliştirme Programı (AYEP)
      </footer>
    </div>
  );
}

export default StepTwo;
