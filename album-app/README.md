# Album App

A modern Vue.js application for browsing and managing music albums. Built with Vue 3, TypeScript, and Vite.

## Features

- 🎵 **Album Browsing**: View a curated collection of music albums
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🍔 **Mobile Navigation**: Burger menu for mobile-friendly navigation
- ⚡ **Splash Screen**: Engaging loading screen with animations
- 🔍 **Album Details**: Detailed view for each album with purchase options
- 🌐 **API Integration**: Connects to existing albums-api backend
- ♿ **Accessibility**: ARIA-compliant and keyboard navigation support
- 🧪 **Testing**: Unit tests with Vitest and Vue Test Utils
- 🎨 **Modern UI**: Clean, modern design with smooth transitions

## Tech Stack

- **Frontend**: Vue 3 with Composition API
- **Language**: TypeScript
- **Build Tool**: Vite
- **Router**: Vue Router 4
- **State Management**: Pinia
- **HTTP Client**: Axios
- **Testing**: Vitest + Vue Test Utils + Playwright
- **Linting**: ESLint + Prettier
- **Styling**: CSS3 with CSS Variables

## Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── SplashScreen.vue    # Loading splash screen
│   ├── BurgerMenu.vue      # Mobile navigation menu
│   └── __tests__/          # Component unit tests
├── views/               # Page-level components
│   ├── HomeView.vue        # Home page with featured albums
│   ├── AlbumsView.vue      # All albums listing
│   ├── AlbumDetailView.vue # Individual album details
│   ├── AboutView.vue       # About page
│   └── NotFoundView.vue    # 404 error page
├── services/            # API service layer
│   ├── albumService.ts     # Album API integration
│   └── __tests__/          # Service unit tests
├── types/               # TypeScript type definitions
│   └── Album.ts            # Album interface
├── router/              # Vue Router configuration
├── stores/              # Pinia state management
└── assets/              # Static assets
```

## API Integration

The app connects to the existing `albums-api` (.NET Core Web API) that provides:

- `GET /albums` - Retrieve all albums
- `GET /albums/{id}` - Retrieve specific album by ID

API configuration is managed through environment variables:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Project Setup

```sh
npm install
```

### Environment Configuration
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:3000
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Format with Prettier

```sh
npm run format
```

## Routing

The application includes the following routes:

- `/` - Home page with featured albums
- `/albums` - All albums listing
- `/album/:id` - Individual album details
- `/about` - About page
- `/*` - 404 Not Found page (catch-all)

## Features in Detail

### Splash Screen
- Displays on app startup with Vue logo
- Shows loading animation and text
- Auto-hides after 3 seconds
- Smooth fade transition

### Burger Menu
- Mobile-responsive navigation (hidden on desktop)
- Slide-in/out animation
- Keyboard accessible (ESC to close)
- Overlay click to close
- Contains all main navigation links

### Album Management
- Grid-based album display
- Loading states with spinners
- Error handling with retry options
- Responsive card design
- Image fallbacks for broken links
- Click to view album details

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px and 1024px
- Flexible grid layouts
- Touch-friendly interactions

## Deployment

### Prerequisites
1. Ensure the `albums-api` is running and accessible
2. Update `VITE_API_BASE_URL` in `.env` to point to your API endpoint

### Build and Deploy
```bash
npm run build
```

The `dist/` folder contains the production-ready files that can be served by any static file server.

## IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).
