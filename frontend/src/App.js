import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import ArtistsListPage from './pages/artistsListPage';
import ArtistDetailPage from './pages/artistDetailPage';
import ArtistsPage from './pages/artistsPage';
import './App.css';
function App() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/artists", element: _jsx(ArtistsListPage, {}) }), _jsx(Route, { path: "/artist/:id", element: _jsx(ArtistDetailPage, {}) }), _jsx(Route, { path: "/artworks", element: _jsx(ArtistsPage, {}) })] }) }));
}
export default App;
