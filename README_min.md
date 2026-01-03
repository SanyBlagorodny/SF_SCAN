# СКАН — клиент для поиска публикаций (Front-end)

Клиентское приложение на React для работы с API сервиса «СКАН» (Interfax):
авторизация по токену → параметры поиска → результаты.

## Установка и запуск

```
git clone https://github.com/albinadesign/SCAN_SkillFactory.git
cd SCAN_SkillFactory
npm install
npm start
# сборка
npm run build
```

## Авторизация

Базовый URL API: https://gateway.scan-interfax.ru

Для авторизации можно использовать любой из доступных аккаунтов:

Логин / Пароль:
- sf_student1 — 4i2385j
- sf_student2 — lV8xjCH
- sf_student3 — 6z9ZFRs
- sf_student4 — Br1+tbG
- sf_student5 — LuwAwJf
- sf_student6 — eczpWCB
- sf_student7 — P6VcKNf
- sf_student8 — 5QB0KM/
- sf_student9 — DTdEwAn
- sf_student10 — KHKfTXb

## Маршруты

- / — главная
- /auth — авторизация
- /search — поиск (требует авторизации)
- /results — результаты (требует авторизации)

## Документация

- docs/ARCHITECTURE.md — структура проекта и маршрутизация
- docs/AUTH.md — флоу авторизации и токены
- docs/API.md — используемые эндпоинты и примеры
- docs/DEVELOPMENT.md — запуск, .env, мок-режим, отладка

## Известные ограничения API (кратко)

- В API может отсутствовать фото/имя пользователя (используются заглушки).
- Фактический лимит количества документов в выборке ниже заявленного.
- Пагинация может быть ограничена.
