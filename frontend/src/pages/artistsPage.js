import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
export default function ArtworksPage() {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState(null);
    const LIMIT = 10;
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);
    useEffect(() => {
        fetchArtworks();
    }, [currentPage, searchTerm]);
    const fetchArtworks = async () => {
        try {
            setLoading(true);
            setError(null);
            // If there's a search term, use the search API, otherwise use public domain
            let url;
            if (searchTerm) {
                url = `/api/artworks/search?q=${encodeURIComponent(searchTerm)}&limit=${LIMIT}&page=${currentPage}`;
            }
            else {
                url = `/api/artworks/public-domain?limit=${LIMIT}&page=${currentPage}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error:', response.status, errorText);
                throw new Error(`API Error: ${response.status} ${errorText}`);
            }
            const data = await response.json();
            console.log('Fetched artworks data:', data);
            // Set artworks from the response
            setArtworks(data.data || []);
            setPagination(data.pagination || null);
        }
        catch (err) {
            console.error('Fetch error:', err);
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
        }
        finally {
            setLoading(false);
        }
    };
    const filteredArtworks = artworks;
    if (loading) {
        return (_jsx(Layout, { children: _jsx("div", { className: "text-center py-12", children: "Loading artworks..." }) }));
    }
    return (_jsx(Layout, { children: _jsxs("div", { className: "bg-white dark:bg-dark-bg min-h-screen", children: [_jsx("section", { className: "bg-white dark:bg-dark-bg border-b border-gallery-border dark:border-dark-border", children: _jsx("div", { className: "container-gallery py-12 md:py-16", children: _jsxs("div", { className: "space-y-4 max-w-2xl", children: [_jsx("h1", { className: "heading-lg text-5xl md:text-6xl text-gallery-text dark:text-dark-text", children: "Collection" }), _jsx("p", { className: "text-base md:text-lg text-gallery-muted dark:text-dark-muted font-light", children: "Explore our curated selection from master artists around the world." })] }) }) }), _jsx("section", { className: "bg-gallery-surface dark:bg-dark-surface border-b border-gallery-border dark:border-dark-border sticky top-0 z-10", children: _jsx("div", { className: "container-gallery py-6", children: _jsx("input", { type: "search", placeholder: "Search artworks...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "form-input w-full md:max-w-lg", "aria-label": "Search artworks" }) }) }), _jsx("section", { className: "bg-white dark:bg-dark-bg py-12 md:py-16", children: _jsxs("div", { className: "container-gallery", children: [error && (_jsx("div", { className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-6 py-4 rounded-none mb-8", children: error })), loading ? (_jsx("div", { className: "flex justify-center items-center py-24", children: _jsx("div", { className: "loading-spinner" }) })) : filteredArtworks.length === 0 ? (_jsx("div", { className: "text-center py-24", children: _jsx("p", { className: "text-gallery-muted dark:text-dark-muted text-lg font-light", children: "No artworks found matching your search." }) })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "grid-gallery", children: filteredArtworks.map((artwork) => (_jsxs("article", { className: "artwork-card", children: [artwork.image_id && (_jsx("div", { className: "artwork-card-image", children: _jsx("img", { src: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`, alt: artwork.title, loading: "lazy", className: "w-full h-full object-cover" }) })), _jsxs("div", { className: "artwork-card-content", children: [_jsx("h3", { className: "artwork-card-title", children: artwork.title }), artwork.artist_display && (_jsx("p", { className: "artwork-card-meta hover:text-accent transition-colors duration-150", children: _jsx(Link, { to: `/artist/${artwork.id}?name=${encodeURIComponent(artwork.artist_display)}`, children: artwork.artist_display }) })), artwork.date_display && (_jsx("p", { className: "text-caption mt-2", children: artwork.date_display }))] })] }, artwork.id))) }), pagination && pagination.total_pages > 1 && (_jsxs("div", { className: "flex items-center justify-center gap-6 mt-12 md:mt-16 pt-12 border-t border-gallery-border dark:border-dark-border", children: [_jsx("button", { onClick: () => setCurrentPage(Math.max(1, currentPage - 1)), disabled: currentPage === 1, className: "btn-secondary btn-sm disabled:opacity-50 disabled:cursor-not-allowed", "aria-label": "Previous page", children: "Previous" }), _jsxs("span", { className: "text-sm text-gallery-muted dark:text-dark-muted font-light", children: ["Page ", _jsx("strong", { className: "font-medium text-gallery-text dark:text-dark-text", children: pagination.current_page }), " of ", _jsx("strong", { className: "font-medium text-gallery-text dark:text-dark-text", children: pagination.total_pages })] }), _jsx("button", { onClick: () => setCurrentPage(Math.min(pagination.total_pages, currentPage + 1)), disabled: currentPage === pagination.total_pages, className: "btn-secondary btn-sm disabled:opacity-50 disabled:cursor-not-allowed", "aria-label": "Next page", children: "Next" })] }))] }))] }) })] }) }));
}
