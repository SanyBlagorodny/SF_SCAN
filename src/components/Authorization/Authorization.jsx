import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../api/auth';

import './Authorization.css';
import authorization_icon_facebook from "../../assets/authorization_icon_facebook.svg";
import authorization_icon_google from "../../assets/authorization_icon_google.svg";
import authorization_icon_yandex from "../../assets/authorization_icon_yandex.svg";
import authorization_large_picture from "../../assets/authorization_large_picture.svg";

const Authorization = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    
    // Сброс ошибок
    setUsernameError(false);
    setPasswordError(false);
    setServerError('');
    
    // Валидация
    if (!username.trim()) {
      setUsernameError(true);
      return;
    }
    if (!password.trim()) {
      setPasswordError(true);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await authAPI.login(username, password);
      
      if (result.success) {
        localStorage.setItem('accessToken', result.data.accessToken);
        localStorage.setItem('tokenExpire', result.data.expire);
        setIsLoggedIn(true);
        navigate('/');
      } else {
        setServerError(result.error);
      }
    } catch (error) {
      setServerError('Произошла непредвиденная ошибка. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameError(false);
    setServerError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
    setServerError('');
  };

  const isFormValid = username.trim() && password.trim() && !isLoading;

  return (
    <div className="auth-content">
      <div className="text-and-picture">
        <h1 className="h1-auth-page">Для оформления подписки <br />на тариф, необходимо <br />авторизоваться.</h1>
        <img className="auth-large-image-desktop" src={authorization_large_picture} alt="People with key" />
      </div>

      <div className="auth-form-container">
        <div className="auth-form">
          <div className="auth-tabs">
            <div className="auth-tab active">Войти</div>
            <div className="auth-tab">Зарегистрироваться</div>
          </div>

          <form onSubmit={handleLogin}>
            <div className="input">
              <label htmlFor="username">Логин или номер телефона:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                autoComplete="username"
                required
                style={{ borderColor: usernameError ? 'red' : '' }}
              />
              {usernameError && <div className="auth-form-error">Введите логин</div>}
            </div>

            <div className="input">
              <label htmlFor="password">Пароль:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="current-password"
                required
                style={{ borderColor: passwordError ? 'red' : '' }}
              />
              {passwordError && <div className="auth-form-error">Введите пароль</div>}
            </div>

            {serverError && (
              <div className="auth-form-error server-error">
                {serverError}
              </div>
            )}

            <div className="auth-button-div">
              <button 
                className="button auth-button" 
                type="submit" 
                disabled={!isFormValid}
              >
                {isLoading ? 'Вход...' : 'Войти'}
              </button>
            </div>

            <button type="button" className="reset-password" onClick={(e) => e.preventDefault()}>Восстановить пароль</button>
          </form>

          <div className="auth-divider">
            <span>Или войдите через</span>
          </div>

          <div className="social-login">
            <button className="social-button google">
              <img src={authorization_icon_google} alt="Google" />
            </button>
            <button className="social-button facebook">
              <img src={authorization_icon_facebook} alt="Facebook" />
            </button>
            <button className="social-button yandex">
              <img src={authorization_icon_yandex} alt="Yandex" />
            </button>
          </div>
        </div>
      </div>
      <img className="auth-large-image-mobile" src={authorization_large_picture} alt="People with key" />
    </div>
  );
};

export default Authorization;
