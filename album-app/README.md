# Album App

A modern Vue.js 3 web application for browsing and exploring music albums. This application integrates with the existing `album-api` to provide a seamless music discovery experience.

## Features

- 🎵 **Splash Screen**: Beautiful loading screen with smooth transitions
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🍔 **Burger Menu Navigation**: Collapsible navigation menu for mobile
- 🎧 **Album Browse**: View all albums in an elegant grid layout
- 🔍 **Album Details**: Detailed view for individual albums
- ℹ️ **About Page**: Information about the application
- 🚫 **404 Handling**: Custom not found page
- ⚡ **Fast Loading**: Optimized performance with loading indicators
- 🛡️ **Error Handling**: Graceful error handling for API failures

## Tech Stack

- **Frontend**: Vue.js 3 with TypeScript
- **Routing**: Vue Router 4
- **State Management**: Pinia
- **Build Tool**: Vite
- **Styling**: Scoped CSS with modern design
- **API Integration**: Axios for HTTP requests
- **Code Quality**: ESLint + Prettier

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SplashScreen.vue
│   ├── BurgerMenu.vue
│   ├── AlbumCard.vue
│   ├── LoadingSpinner.vue
│   └── ErrorMessage.vue
├── views/               # Route views
│   ├── SplashView.vue
│   ├── AlbumsView.vue
│   ├── AlbumDetailView.vue
│   ├── AboutView.vue
│   └── NotFoundView.vue
├── services/            # API services
│   └── albumApi.ts
├── stores/              # Pinia stores
│   └── albums.ts
├── router/              # Vue Router configuration
│   └── index.ts
└── App.vue              # Main application component
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Running `album-api` service

### Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd album-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Copy `.env.example` to `.env` and update the API URL:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Routes

- `/` - Splash screen (redirects to `/albums` after loading)
- `/albums` - Browse all albums
- `/album/:id` - View album details
- `/about` - About page
- `/404` - Not found page
- Any invalid route redirects to `/404`

## API Integration

The application integrates with the `album-api` service which should provide:

- `GET /albums` - List all albums
- `GET /albums/:id` - Get album by ID

### Album Data Structure

```typescript
interface Album {
  id: number
  title: string
  artist: string
  price: number
  image_url: string
}
```

## Development

### Code Formatting

```bash
npm run format
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## Troubleshooting

### API Connection Issues

1. Ensure the `album-api` service is running on the configured port
2. Check the `VITE_API_URL` in your `.env` file
3. Verify CORS settings in the API service

### Build Issues

1. Run `npm run type-check` to identify TypeScript errors
2. Run `npm run lint` to check for linting issues
3. Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## Contributing

1. Follow the existing code style and component structure
2. Add TypeScript types for new features
3. Test on both desktop and mobile devices
4. Ensure all builds pass before submitting changes

## License

This project is part of the GitHub Copilot demo repository.
