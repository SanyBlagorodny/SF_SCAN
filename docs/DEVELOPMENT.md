# Руководство для разработки

## Быстрый старт

```bash
npm install
npm start
# сборка
npm run build
```

## Переменные окружения (рекомендуется добавить)

Создайте `.env` в корне проекта и при необходимости определите:

```
REACT_APP_API_BASE=https://gateway.scan-interfax.ru
REACT_APP_DEFAULT_LOGIN=
REACT_APP_DEFAULT_PASSWORD=
REACT_APP_USE_MOCK=false
```

Использование в коде:
- Базовый URL: `process.env.REACT_APP_API_BASE || 'https://gateway.scan-interfax.ru'`.
- Автозаполнение формы логина значениями `REACT_APP_DEFAULT_LOGIN`/`REACT_APP_DEFAULT_PASSWORD` только в dev.

## Мок-режим (опционально для изоляции от внешнего API)

- Идея: при `REACT_APP_USE_MOCK=true` вместо реального `/api/v1/account/login` и других эндпоинтов обращаемся к локальному мок-серверу.
- Варианты реализации:
  - Лёгкий: перехват `fetch`/axios в dev и возврат фиктивных данных.
  - Локальный сервер (например, `json-server`/Express) с ручками `/login`, `/account/info`, `/objectsearch`, `/documents`.
- Возвращайте структуру ответов, совместимую с реальным API, чтобы UI работал без изменений.

## Проверка запросов

- Используйте DevTools → Network, чтобы видеть фактические запросы.
- Тест логина в терминале (пример):
  ```bash
  curl -X POST %REACT_APP_API_BASE%/api/v1/account/login \
    -H "Content-Type: application/json" -H "Accept: application/json" \
    -d '{"login":"sf_student1","password":"4i2385j"}'
  ```

## Отладка авторизации

- При проблемах:
  - Убедитесь, что в `localStorage` после логина появляются `accessToken` и `tokenExpire`.
  - Проверьте время истечения токена (`AuthContext.checkAuthStatus`).
  - Для повторного входа очистите `localStorage`.

## Стиль и соглашения

- Функциональные компоненты, хуки.
- Именование компонентов и папок — по назначению (`Authorization`, `SearchResults`).
- Валидация полей форм и обработка ошибок — локальный `useState`.

## Roadmap (идеи улучшений)

- Добавить Logout и очистку токена по кнопке.
- Централизовать базовый URL API и перехват ошибок.
- Добавить поддержку `.env` и мок-режима из коробки.
- Реализовать пагинацию/ленивую загрузку результатов (если появится поддержка в API).
