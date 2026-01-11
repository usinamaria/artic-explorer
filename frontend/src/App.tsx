import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homePage'
import ArtistsListPage from './pages/artistsListPage'
import ArtistDetailPage from './pages/artistDetailPage'
import ArtistsPage from './pages/artistsPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/artists" element={<ArtistsListPage />} />
        <Route path="/artist/:id" element={<ArtistDetailPage />} />
        <Route path="/artworks" element={<ArtistsPage />} />
      </Routes>
    </Router>
  )
}

export default App
