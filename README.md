# Artic Explorer

A web application that allows users to explore artworks and artists from the Art Institute of Chicago's public collection. Built with React + TypeScript for the frontend and NestJS for the backend.

## Features

- **Browse Artworks**: Explore thousands of artworks from the Art Institute of Chicago collection
- **Search Functionality**: Search for artworks by title, artist, or keywords
- **Public Domain Artworks**: Filter and view artworks in the public domain
- **Artist Profiles**: View detailed information about artists and their works
- **Responsive Design**: Mobile-friendly interface built with React and Tailwind CSS

## Project Structure

This project is split into two folders:
- `frontend/` — React + Vite + TypeScript client
- `backend/` — NestJS API server

## Technology Stack

**Frontend:**
- React 18+ with TypeScript
- Vite for fast development and building
- React Router for navigation
- Tailwind CSS for styling
- Axios for HTTP requests

**Backend:**
- NestJS framework
- TypeScript
- Axios for external API calls (Art Institute of Chicago API)
- CORS enabled for frontend communication

## API Integration

The backend integrates with the **Art Institute of Chicago API** (`https://api.artic.edu/api/v1/`) to fetch:
- Artist information and metadata
- Artwork collections, details, and images
- Search capabilities across the museum's database

## Getting Started

### 1. Install Dependencies

```bash
# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install
```

### 2. Start the Development Servers

From the project root:

```bash
# Start the backend (NestJS) - runs on http://localhost:3000
npm run dev:backend

# In another terminal, start the frontend (Vite) - runs on http://localhost:5173
npm run dev:frontend
```

Or navigate to each folder and run `npm run dev` individually.

### 3. Access the Application

- **Frontend**: Open http://localhost:5173 in your browser
- **Backend API**: http://localhost:3000

## Available Routes

### Frontend Pages
- `/` - Home page with statistics and featured artworks
- `/artworks` - Browse and search all artworks
- `/artists` - View list of artists
- `/artist/:id` - View artist details and their artworks

### Backend API Endpoints
- `GET /` - Welcome message with API endpoints
- `GET /artists/:id` - Get artist information
- `GET /artists/:id/artworks` - Get artworks by a specific artist
- `GET /artworks` - List artworks with pagination
- `GET /artworks/search` - Search artworks
- `GET /artworks/public-domain` - Get public domain artworks

## Development Notes

- The frontend proxies API requests to the backend automatically
- The backend includes error handling with fallback mock data for development
- All endpoints support filtering, pagination, and search queries
- Images are served through the Art Institute of Chicago's CDN
