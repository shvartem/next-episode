# React + TypeScript + Vite

Описание структуры и слоёв проекта: [архитектура](docs/architecture.md).

This template provides a minimal setup to get React working in Vite with HMR and ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).


## Запуск API и фронтенда

Используйте Node.js 26 из `.nvmrc` и установите зависимости командой `npm ci`.
Запустите `npm run start:api` и `npm start` в разных терминалах.
Vite пересылает запросы `/api` на порт 3001.

API запускается отдельно командой `npm run start:api` и принимает порт из
`PORT`. Для сборок GitHub Pages и PR-превью задайте переменную репозитория
`VITE_API_BASE_URL` с HTTPS-адресом API, включая путь `/api` без завершающего
слеша, и запустите сборку заново.

`GET /api/shows?q=girls&genre=Drama&page=2` возвращает страницу результатов.
Параметры `genre` и `page` необязательны. Кеш успешных поисков TVmaze живёт
пять минут в памяти процесса API. Проверки запускаются командой `npm run test:api`.
