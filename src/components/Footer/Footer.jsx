import React from 'react';
import './Footer.css';
import scan_logo_white from '../../assets/scan_logo_white.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-brand">
          <img className="scan-logo" src={scan_logo_white} alt="СКАН" />
          <div className="brand-info">
            <h3>СКАН</h3>
            <p>Сервис поиска публикаций о компаниях</p>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Контакты</h4>
          <div className="contact-info">
            <p className="contact-item">
              <span className="contact-icon">📍</span>
              г. Москва, Цветной б-р, 40
            </p>
            <p className="contact-item">
              <span className="contact-icon">📞</span>
              +7 495 771 21 11
            </p>
            <p className="contact-item">
              <span className="contact-icon">✉</span>
              info@skan.ru
            </p>
          </div>
        </div>

        <div className="footer-section">
          <h4>Навигация</h4>
          <div className="footer-nav">
            <a href="/" className="footer-link">Главная</a>
            <a href="/tariffs" className="footer-link">Тарифы</a>
            <a href="/faq" className="footer-link">FAQ</a>
            <a href="/auth" className="footer-link">Авторизация</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Социальные сети</h4>
          <div className="social-links">
            <div className="social-link">
              <span className="social-icon">📱</span>
            </div>
            <div className="social-link">
              <span className="social-icon">💬</span>
            </div>
            <div className="social-link">
              <span className="social-icon">💻</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            &copy; {currentYear} СКАН. Все права защищены.
          </p>
          <div className="footer-bottom-links">
            <a href="/privacy" className="bottom-link">Политика конфиденциальности</a>
            <a href="/terms" className="bottom-link">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;