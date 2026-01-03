# Авторизация и управление токеном

## Поток авторизации

1. Пользователь вводит логин и пароль на странице `/auth` (компонент `Authorization`).
2. Отправляется запрос:
   - Метод: `POST`
   - URL: `https://gateway.scan-interfax.ru/api/v1/account/login`
   - Заголовки: `Content-Type: application/json`, `Accept: application/json`
   - Тело: `{ "login": "<логин>", "password": "<пароль>" }`
3. При `response.ok === true`:
   - Ответ содержит `accessToken` и `expire` (дата/время истечения).
   - Значения сохраняются в `localStorage`:
     - `accessToken`
     - `tokenExpire`
   - В контексте `AuthContext` выставляется `isLoggedIn = true`.
4. При ошибке — поля ввода подсвечиваются, показываются сообщения об ошибке.

## Хранение и проверка токена

- `AuthContext.checkAuthStatus()` вызывается при монтировании приложения.
- Логика:
  - Считывает `accessToken` и `tokenExpire` из `localStorage`.
  - Если токена нет, либо `new Date(tokenExpire) <= now` — токен считается невалидным:
    - Очищаются `accessToken`, `tokenExpire` из `localStorage`.
    - `isLoggedIn = false`.
  - Иначе: `isLoggedIn = true`.

## Использование токена в запросах

- Во все запросы, требующие авторизации, необходимо добавлять заголовок:
  - `Authorization: Bearer <accessToken>`
- При получении 401/403 необходимо:
  - Очистить токен, перевести пользователя на `/auth` (или показать диалог повторного входа).

## Безопасность и рекомендации

- Не хранить токен дольше необходимого (использовать срок `expire`).
- При выходе (если добавите кнопку Logout):
  - Удалить `accessToken`, `tokenExpire` из `localStorage`.
  - Сбросить `isLoggedIn=false` в контексте.
- Для разработки можно добавить автозаполнение логина/пароля через `.env` (см. DEVELOPMENT.md).

## Тестовые аккаунты (из README)

- Примеры: `sf_student1 / 4i2385j`, `sf_student2 / lV8xjCH`, … `sf_student10 / KHKfTXb`.
- Это аккаунты внешнего сервиса — изменить их из кода нельзя.
