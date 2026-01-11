import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
export default function ArtistsListPage() {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        fetchArtists();
    }, []);
    const fetchArtists = async () => {
        try {
            setLoading(true);
            setError(null);
            // Fetch artworks which have artist_display info
            const response = await fetch('/api/artworks/public-domain?limit=50');
            if (!response.ok) {
                throw new Error('Failed to fetch artists');
            }
            const data = await response.json();
            console.log('Fetched artists:', data);
            // Extract unique artists from artworks
            const uniqueArtists = {};
            const artworksData = Array.isArray(data.data) ? data.data : [];
            artworksData.forEach((artwork, index) => {
                if (artwork.artist_display && !uniqueArtists[artwork.artist_display]) {
                    uniqueArtists[artwork.artist_display] = {
                        id: artwork.id || index,
                        title: artwork.artist_display,
                    };
                }
            });
            setArtists(Object.values(uniqueArtists).slice(0, 20));
        }
        catch (err) {
            console.error('Fetch error:', err);
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        }
        finally {
            setLoading(false);
        }
    };
    const filteredArtists = artists.filter((artist) => artist.title.toLowerCase().includes(searchTerm.toLowerCase()));
    if (loading) {
        return (_jsx(Layout, { children: _jsx("div", { className: "text-center py-12", children: "Loading artists..." }) }));
    }
    return (_jsx(Layout, { children: _jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold mb-8", children: "Artists" }), error && (_jsxs("div", { className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6", children: ["Error: ", error] })), _jsx("div", { className: "mb-8", children: _jsx("input", { type: "text", placeholder: "Search artists...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" }) }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 py-4", children: filteredArtists.map((artist) => (_jsxs(Link, { to: `/artist/${artist.id}?name=${encodeURIComponent(artist.title)}`, className: "bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4 text-blue-600 hover:text-blue-800", children: artist.title }), _jsx("div", { className: "mt-4 text-blue-500 font-semibold", children: "View Artworks \u2192" })] }, artist.id))) }), filteredArtists.length === 0 && (_jsx("div", { className: "text-center py-12 text-gray-500", children: "No artists found matching your search." }))] }) }));
}
