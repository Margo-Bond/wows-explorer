# WoWS Explorer

A frontend test project for browsing ships available in World of Warships.

## Tech Stack

- Vue 3
- TypeScript
- Vite
- SCSS

## Code Quality

- ESLint
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

## Technical Notes

- **Native Fetch**: I used the build-in fetch API for all requests to avoid heavy libraries like Axios.
- **Vite Proxy**: Local requests go through a Vite proxy because the Vortex API doesn't support CORS in the browser/
