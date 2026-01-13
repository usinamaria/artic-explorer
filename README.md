# Artic Explorer

A modern web application for exploring artworks and discovering artists from the Art Institute of Chicago's public collection. Built with React and TypeScript for the frontend, and NestJS for the backend.

## Features

- **Browse Artworks** - Explore thousands of artworks from the Art Institute collection
- **Search Artworks** - Find artworks by title, artist, or keywords with pagination
- **Discover Artists** - Browse and filter artists represented in the collection
- **Artist Profiles** - View all artworks by a specific artist with pagination
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Mobile-friendly interface that works on all devices
- **Fast Performance** - Built with Vite for instant development and optimized builds

## Tech Stack

**Frontend:**
- React 19 with TypeScript
- Vite (build tool with HMR support)
- React Router DOM (navigation)
- Custom CSS with CSS variables (dark mode support)

**Backend:**
- NestJS (Node.js framework)
- TypeScript
- Axios (HTTP client)
- CORS enabled for frontend communication

**Testing:**
- Jest (testing framework)
- @nestjs/testing (NestJS testing utilities)

**External API:**
- Art Institute of Chicago API (`https://api.artic.edu/api/v1/`)

## Project Structure

```
artic-explorer/
├── frontend/                          # React + Vite + TypeScript SPA
│   ├── src/
│   │   ├── pages/                     # Page components (home, artworks, artists, artist detail)
│   │   ├── components/                # Shared components (Layout)
│   │   ├── styles/                    # CSS files
│   │   ├── static/                    # Static assets
│   │   ├── App.tsx                    # Main app component with routing
│   │   ├── main.tsx                   # Vite entry point
│   │   └── index.css                  # Global styles
│   ├── index.html                     # HTML template
│   ├── vite.config.ts                 # Vite configuration with API proxy
│   ├── tsconfig.json                  # TypeScript config
│   └── package.json
├── backend/                           # NestJS API server
│   ├── src/
│   │   ├── artworks/                  # Artworks module (controller, service, spec)
│   │   ├── artists/                   # Artists module (controller, service, spec)
│   │   ├── app.module.ts              # Root module
│   │   └── main.ts                    # App bootstrap
│   ├── jest.config.js                 # Jest test configuration
│   ├── tsconfig.json                  # TypeScript config
│   ├── nest-cli.json                  # NestJS CLI config
│   └── package.json
├── .gitignore
├── package.json                       # Root scripts
└── README.md
```

## Quick Start

### Prerequisites
- **Node.js 18+** and npm 9+ (check with `node -v` and `npm -v`)
- Git (for cloning the repository)

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd artic-explorer

# Install dependencies for both frontend and backend
npm install
```

This single command installs dependencies in both the root, frontend, and backend folders.

### 2. Start Development Servers

You need to run two servers simultaneously (open two terminal windows):

**Terminal 1 - Start Backend (NestJS API)**
```bash
npm run dev:backend
```
- Runs on `http://localhost:3000`
- Watches for file changes and auto-reloads
- API is ready when you see: "Application is running on: http://localhost:3000"

**Terminal 2 - Start Frontend (Vite React)**
```bash
npm run dev:frontend
```
- Runs on `http://localhost:5173`
- Frontend automatically proxies API calls to backend (`/api/*` → `http://localhost:3000`)
- Browser will open automatically or navigate to `http://localhost:5173`

### 3. Access the Application

Open your browser and visit: **http://localhost:5173**

You should see the Artic Explorer home page with all features working (search, pagination, dark mode, etc.)

## Available Commands

### Frontend (from `frontend/` or using root scripts)
```bash
npm run dev:frontend      # Start development server
npm run build:frontend    # Build for production
cd frontend && npm run preview  # Preview production build locally
cd frontend && npm run lint     # Run ESLint
```

### Backend (from `backend/` or using root scripts)
```bash
npm run dev:backend       # Start development server with watch mode
npm run build:backend     # Build for production
npm run test              # Run test suite
npm run test:watch       # Run tests in watch mode
npm run test:cov         # Generate coverage report
cd backend && npm run start    # Run production build
cd backend && npm run lint     # Run ESLint
```

## Features & Routes

### Frontend Pages
- **Home** (`/`) - Landing page with collection statistics and featured artworks
- **Artworks** (`/artworks`) - Browse and search the collection with pagination
- **Artists** (`/artists`) - Browse artists with real-time search filtering
- **Artist Detail** (`/artist?name=Name`) - View all artworks by a specific artist with pagination

### Backend API Endpoints
- `GET /` - Welcome message with available endpoints
- `GET /artworks` - Get artworks with page-based pagination
- `GET /artworks/search?q=query&limit=12&offset=0` - Search artworks with offset-based pagination
- `GET /artworks/public-domain` - Get public domain artworks
- `GET /artworks/:id` - Get single artwork by ID
- `GET /artists/:id` - Get artist information
- `GET /artists/:id/artworks` - Get all artworks by artist ID

## How It Works

### API Communication Flow
1. **Frontend** makes HTTP requests to `/api/artworks` and `/api/artists`
2. **Vite proxy** (configured in `vite.config.ts`) forwards requests to `http://localhost:3000`
3. **NestJS Backend** handles the requests and calls the Art Institute API
4. Response is returned to frontend and displayed

### Search Functionality
- **Artworks Page**: Type your search query and press **Enter** (debounced to prevent excessive API calls)
- **Artists Page**: Real-time search that filters artists locally (no API calls)
- **Artist Detail**: Navigate through paginated results of artworks by artist

### Pagination
- **Search endpoint** uses offset-based pagination (combines offset + limit parameters)
- **Default pages** use page-based pagination
- Backend automatically converts between offset and page parameters for API compatibility

### Dark Mode
- Click the sun/moon icon in the header to toggle themes
- Preference persists during the session
- All colors use CSS variables for seamless switching between light and dark modes

## Testing

The backend includes comprehensive test coverage for API controllers using Jest.

### Running Tests

```bash
# Run all tests once
npm run test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Generate coverage report
npm run test:cov
```

### Test Files Location
- `backend/src/artworks/artworks.controller.spec.ts` - Artworks controller tests
- `backend/src/artists/artists.controller.spec.ts` - Artists controller tests

### Test Coverage

**Artworks Controller:**
- Get artworks with pagination
- Search artworks by query with offset handling
- Get public domain artworks
- Get single artwork by ID
- Parameter parsing and validation

**Artists Controller:**
- Welcome endpoint information
- Test endpoint validation
- Get artist by ID
- Get artworks by artist ID
- Pagination response structure

## Production Build

### Build Both Frontend & Backend
```bash
npm run build:frontend
npm run build:backend
```

### Run Production Build Locally
```bash
# Terminal 1: Start backend
cd backend && npm run start

# Terminal 2: Serve frontend build
cd frontend && npm run preview
```

## Troubleshooting

### Port Already in Use
- **Backend (3000)**: `npx lsof -i :3000` and kill the process, or change port in `backend/src/main.ts`
- **Frontend (5173)**: Vite will automatically use the next available port

### API Calls Failing
- Ensure backend is running on `http://localhost:3000`
- Check that the proxy in `frontend/vite.config.ts` is correctly configured
- Check browser DevTools Network tab to see actual requests

### Frontend Can't Find Backend
- Make sure both servers are running in separate terminals
- Check console for CORS errors
- Verify `http://localhost:3000` is accessible

### Tests Failing
- Ensure all dependencies are installed: `npm install`
- Run `npm run test` from the `backend/` directory or root
- Check that `@nestjs/testing` and Jest are installed

### Build Errors
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf frontend/.vite`
- Clear NestJS dist: `rm -rf backend/dist`

## Development Workflow

1. **Make changes** to either frontend or backend code
2. **Frontend** automatically reloads (HMR) when you save files
3. **Backend** automatically restarts when you save files (watch mode)
4. **Tests** can run in watch mode for TDD: `npm run test:watch`
5. **Open DevTools** (F12) to see console logs and network requests

## Environment & Configuration

- **Node.js**: 18+ required (LTS recommended)
- **Package Manager**: npm (included with Node.js)
- **Frontend Port**: 5173 (configurable in `frontend/vite.config.ts`)
- **Backend Port**: 3000 (configurable in `backend/src/main.ts`)

## Key Implementation Details

- **Type Safety**: Full TypeScript throughout (frontend and backend)
- **API Proxy**: Vite proxy eliminates CORS issues in development
- **Offset Pagination**: Backend converts offset/limit to page parameters for Artic API
- **CSS Variables**: Custom CSS with light/dark mode using CSS variables
- **Error Handling**: Backend includes try-catch blocks and CORS error handling
- **Lazy Loading**: Images use lazy loading for performance

## Next Steps / Contributing

- Run `npm run test` to verify all tests pass
- Run `npm run lint` to check code quality
- Review the code in `frontend/src/pages/` and `backend/src/` modules
- Check out the API responses in browser DevTools Network tab

