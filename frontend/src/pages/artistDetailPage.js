import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
export default function ArtistDetailPage() {
    const [searchParams] = useSearchParams();
    const artistName = searchParams.get('name') || 'Artist';
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState(null);
    const LIMIT = 10;
    useEffect(() => {
        fetchArtistArtworks();
    }, [currentPage, artistName]);
    const fetchArtistArtworks = async () => {
        try {
            setLoading(true);
            setError(null);
            // Search for artworks by this artist with pagination
            const response = await fetch(`/api/artworks/search?q=${encodeURIComponent(artistName)}&limit=${LIMIT}&page=${currentPage}`);
            if (!response.ok) {
                throw new Error('Failed to fetch artworks');
            }
            const data = await response.json();
            console.log('Fetched artworks:', data);
            setArtworks(Array.isArray(data.data) ? data.data : []);
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
    if (loading) {
        return (_jsx(Layout, { children: _jsx("div", { className: "text-center py-12", children: "Loading artworks..." }) }));
    }
    return (_jsx(Layout, { children: _jsx("div", { className: "bg-gallery-bg dark:bg-dark-bg min-h-screen py-16 px-4", children: _jsxs("div", { className: "container-gallery-lg space-y-12", children: [_jsx(Link, { to: "/artists", className: "nav-link hover:text-accent transition-colors inline-flex items-center gap-2", children: "\u2190 Back to Collection" }), _jsxs("div", { className: "space-y-3 border-b border-gallery-border dark:border-dark-border pb-8", children: [_jsx("h1", { className: "heading-lg text-4xl md:text-5xl text-gallery-text dark:text-dark-text", children: artistName }), _jsx("p", { className: "text-lg text-gallery-muted dark:text-dark-muted font-light", children: "Artworks by this artist in our collection" })] }), error && (_jsx("div", { className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-6 py-4 rounded-lg", children: error })), artworks.length > 0 ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "grid-gallery", children: artworks.map((artwork) => (_jsx("article", { className: "artwork-card", children: _jsxs("div", { className: "artwork-card-content flex flex-col h-full", children: [artwork.image_id && (_jsx("img", { src: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`, alt: artwork.title, loading: "lazy", className: "artwork-card-image mb-4" })), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "artwork-card-title mb-2", children: artwork.title }), artwork.date_display && (_jsx("p", { className: "text-caption", children: artwork.date_display }))] })] }) }, artwork.id))) }), pagination && pagination.total_pages > 1 && (_jsxs("div", { className: "flex items-center justify-center gap-8 pt-12 border-t border-gallery-border dark:border-dark-border", children: [_jsx("button", { onClick: () => setCurrentPage(Math.max(1, currentPage - 1)), disabled: currentPage === 1, className: "btn-primary disabled:opacity-50 disabled:cursor-not-allowed", "aria-label": "Previous page", children: "Previous" }), _jsxs("span", { className: "text-sm text-gallery-muted dark:text-dark-muted font-light", children: ["Page ", _jsx("strong", { className: "font-medium", children: pagination.current_page }), " of ", _jsx("strong", { className: "font-medium", children: pagination.total_pages })] }), _jsx("button", { onClick: () => setCurrentPage(Math.min(pagination.total_pages, currentPage + 1)), disabled: currentPage === pagination.total_pages, className: "btn-primary disabled:opacity-50 disabled:cursor-not-allowed", "aria-label": "Next page", children: "Next" })] }))] })) : (_jsx("div", { className: "text-center py-16", children: _jsx("p", { className: "text-gallery-muted dark:text-dark-muted font-light text-lg", children: "No artworks found for this artist in our collection." }) }))] }) }) }));
}
