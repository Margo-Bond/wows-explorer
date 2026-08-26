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

## Features

- Ship catalog loaded from the Vortex API
- Search by ship name
- Filters by nation, ship type, and tier
- Combined filtering and filter reset
- Responsive catalog layout
- Loading and error states
- Retry action for failed API requests
- Lazy loading for ship images

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

- **Native fetch**: I used the build-in fetch API for all requests to avoid heavy libraries like Axios.
- **Vite froxy**: Local requests go through a Vite proxy because the Vortex API doesn't support CORS in the browser.
- **Data-driven filters**: Filter options are based on API data instead of hardcoded ship nations, types, ot tier.
- **Progressive data loading**: The ship catalog and media path are loaded independently from auxiliary nation and ship type metadata, so optional metadata failures don't block the main catalog.
- **Incremental rendering**: the full ship dataset remains available for search and filtering, while only an initial batch of ship cards is rendered. Additional cards are rendered as the user scrolls using <IntersectionObserver>
- **API payload**: The provided vehicles endpoints returns the complete catalog in a single large response. In a production API, server-side pagination, field selection, and response compression would help reduce the initial network payload.
