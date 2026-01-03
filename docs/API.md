# API: используемые эндпоинты

Базовый URL: `https://gateway.scan-interfax.ru`

## Авторизация

- `POST /api/v1/account/login`
  - Вход:
    ```json
    { "login": "string", "password": "string" }
    ```
  - Выход (успех):
    ```json
    { "accessToken": "string", "expire": "ISODateTime" }
    ```
  - Примечания: при ошибке — сообщение в `message`.

- `GET /api/v1/account/info` (требует авторизации)
  - Заголовки: `Authorization: Bearer <accessToken>`
  - Возвращает: данные об аккаунте (часть полей может отсутствовать — см. ограничения в README).

## Поиск (в проекте используются компоненты `Search` и `SearchResults`)

- `POST /api/v1/objectsearch/histograms` (требует авторизации)
  - Назначение: сводка по количеству публикаций на даты.
  - Тело запроса: объект фильтров (см. README/документацию API «СКАН»).

- `POST /api/v1/objectsearch` (требует авторизации)
  - Назначение: поиск публикаций, возвращает список ID.

- `POST /api/v1/documents` (требует авторизации)
  - Назначение: получить тексты и метаданные публикаций по их ID.

## Заголовки

- Для всех JSON-запросов:
  - `Content-Type: application/json`
  - `Accept: application/json`
- Для авторизованных запросов:
  - `Authorization: Bearer <accessToken>`

## Ограничения/особенности (важно)

- По README:
  - Фото и имя пользователя в API могут отсутствовать (используются заглушки на фронтенде).
  - Фактическое максимальное число документов в выборке меньше заявленного.
  - Возможности пагинации могут быть ограничены.

## Примеры

- Пример логина (успех):
  ```http
  POST /api/v1/account/login
  Content-Type: application/json
  Accept: application/json

  {"login":"sf_student1","password":"4i2385j"}
  ```
  Ответ:
  ```json
  {"accessToken":"<token>","expire":"2025-12-31T23:59:59Z"}
  ```
