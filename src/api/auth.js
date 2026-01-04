// API слой для авторизации
const API_BASE_URL = 'https://gateway.scan-interfax.ru';

export const authAPI = {
  // Авторизация пользователя
  async login(login, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/account/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Ошибка авторизации: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          accessToken: data.accessToken,
          expire: data.expire,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Ошибка при подключении к серверу',
      };
    }
  },

  // Получение информации об аккаунте
  async getAccountInfo() {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Токен авторизации отсутствует');
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/account/info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка получения данных: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          usedCompanyCount: data.eventFiltersInfo.usedCompanyCount,
          companyLimit: data.eventFiltersInfo.companyLimit,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Ошибка при получении информации об аккаунте',
      };
    }
  },

  // Проверка валидности токена
  isTokenValid() {
    const token = localStorage.getItem('accessToken');
    const tokenExpire = localStorage.getItem('tokenExpire');
    
    if (!token || !tokenExpire) {
      return false;
    }
    
    return new Date(tokenExpire) > new Date();
  },

  // Очистка данных авторизации
  clearAuth() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenExpire');
  },
};
