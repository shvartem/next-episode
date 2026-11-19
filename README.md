# React + TypeScript + Vite

Описание структуры и слоёв проекта: [архитектура](docs/architecture.md).

This template provides a minimal setup to get React working in Vite with HMR and ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).


## Локальный запуск поиска

Используйте версию Node.js из `.nvmrc`. После `npm ci` запустите в отдельных терминалах:

- `npm run start:server` — сервер API на порту 3001.
- `npm start` — фронтенд Vite. Запросы к API проходят через прокси Vite.

Пример запроса к серверу:

```sh
curl 'http://localhost:3001/api/shows?q=office&genre=Comedy&page=1'
```

## Публикация

Запустите `npm run start:server` на хостинге с Node.js. Сервер читает порт из
`PORT`. Для запросов с GitHub Pages задайте на сервере
`FRONTEND_ORIGIN=https://shvartem.github.io`.

Перед сборкой фронтенда задайте `VITE_API_URL` с публичным адресом API, включая
`/api` и без завершающего слеша, например `https://api.example.com/api`.
Сборки GitHub Pages и PR preview используют одноимённую переменную репозитория
в GitHub Actions.
