# WoWS Explorer

A frontend test project for browsing ships available in World of WarShips.

## Tech Stack

- Vue 3
- TypeScript
- Vite
- SCSS
- Vitest

## Code Quality

- EsLint
- Prettier

## Requirements

- Node.js 22+
- npm

## Setup

- Install dependencies:

```bash
npm install
```

- Run the development server:

```bash
npm run dev
```

- build for production:

```bash
npm run build
```

- Run linting:

```bash
npm run lint
```

- Check formatting:

```bash
npm run format:check
```

## Notes

- **CORS & PROXY:** The public API lacks CORS headers for browser requests. A local proxy is configured via Vite (`vite.config.ts`) using the `/api` prefix. The app must be run via `npm run dev` to make network request work.
- **Code Quality:** ESLint handles logic, TypeScript typing and Prettier manages code formatting.
