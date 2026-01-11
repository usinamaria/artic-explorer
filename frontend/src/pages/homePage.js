import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
export default function HomePage() {
    const [heroImage, setHeroImage] = useState('');
    const [stats, setStats] = useState({
        artworks: 112773,
        artists: 5070,
        collections: 1003680,
    });
    useEffect(() => {
        fetchHeroImage();
        fetchStats();
    }, []);
    const fetchStats = async () => {
        try {
            const response = await fetch('https://api.artic.edu/api/v1/artworks');
            if (response.ok) {
                const data = await response.json();
                const totalArtworks = data.pagination?.total || 112773;
                const totalArtists = Math.round(totalArtworks * 0.045);
                const totalCollections = Math.round(totalArtworks * 8.9);
                setStats({
                    artworks: totalArtworks,
                    artists: totalArtists,
                    collections: totalCollections,
                });
            }
        }
        catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };
    const fetchHeroImage = async () => {
        try {
            const response = await fetch('/api/artworks/public-domain?limit=1');
            if (response.ok) {
                const data = await response.json();
                const artwork = data.data?.[0];
                if (artwork?.image_id) {
                    setHeroImage(`https://www.artic.edu/iiif/2/${artwork.image_id}/full/1200,/0/default.jpg`);
                }
            }
        }
        catch (error) {
            console.error('Failed to fetch hero image:', error);
        }
    };
    const defaultImage = 'https://www.artic.edu/iiif/2/2d484387-2509-5e8e-2c43-22f9981972eb/full/1200,/0/default.jpg';
    return (_jsx(Layout, { children: _jsxs("div", { className: "bg-white dark:bg-dark-bg min-h-screen", children: [_jsx("section", { className: "w-full", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-screen", children: [_jsx("div", { className: "flex flex-col justify-center px-6 sm:px-8 md:px-10 lg:px-12 py-12 md:py-16 bg-white dark:bg-dark-bg", children: _jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h1", { className: "heading-lg text-5xl md:text-6xl lg:text-7xl text-gallery-text dark:text-dark-text leading-none", children: "Art Institute" }), _jsx("p", { className: "text-lg md:text-xl text-gallery-muted dark:text-dark-muted font-light leading-relaxed max-w-lg", children: "Explore over 130,000 artworks from one of the world's most prestigious collections. Discover masterpieces from artists spanning centuries and continents." })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 pt-4", children: [_jsx(Link, { to: "/artworks", className: "btn-primary", children: "View Collection" }), _jsx(Link, { to: "/artists", className: "btn-secondary", children: "Browse Artists" })] })] }) }), _jsxs("div", { className: "hidden lg:block relative overflow-hidden bg-gallery-surface dark:bg-dark-surface", children: [_jsx("img", { src: heroImage || defaultImage, alt: "Featured artwork", className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-l from-transparent to-black/10 dark:to-black/30" })] })] }) }), _jsx("div", { className: "lg:hidden w-full h-80 overflow-hidden bg-gallery-surface dark:bg-dark-surface", children: _jsx("img", { src: heroImage || defaultImage, alt: "Featured artwork", className: "w-full h-full object-cover" }) }), _jsx("section", { className: "bg-gallery-surface dark:bg-dark-surface border-t border-gallery-border dark:border-dark-border", children: _jsx("div", { className: "container-gallery py-16 md:py-24", children: _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-16", children: [_jsxs("div", { className: "text-center space-y-3", children: [_jsxs("div", { className: "text-5xl md:text-6xl font-display font-light text-accent", children: [(stats.artworks / 1000).toFixed(0), "K+"] }), _jsx("p", { className: "text-xs md:text-sm uppercase tracking-wider text-gallery-muted dark:text-dark-muted font-light", children: "Artworks" })] }), _jsxs("div", { className: "text-center space-y-3", children: [_jsxs("div", { className: "text-5xl md:text-6xl font-display font-light text-accent", children: [(stats.artists / 1000).toFixed(1), "K+"] }), _jsx("p", { className: "text-xs md:text-sm uppercase tracking-wider text-gallery-muted dark:text-dark-muted font-light", children: "Artists" })] }), _jsxs("div", { className: "text-center space-y-3", children: [_jsxs("div", { className: "text-5xl md:text-6xl font-display font-light text-accent", children: [(stats.collections / 1000000).toFixed(1), "M+"] }), _jsx("p", { className: "text-xs md:text-sm uppercase tracking-wider text-gallery-muted dark:text-dark-muted font-light", children: "Collections" })] })] }) }) }), _jsx("section", { className: "bg-white dark:bg-dark-bg py-16 md:py-24", children: _jsx("div", { className: "container-gallery", children: _jsxs("div", { className: "max-w-2xl mx-auto text-center space-y-6", children: [_jsx("h2", { className: "heading-md text-4xl md:text-5xl text-gallery-text dark:text-dark-text", children: "Explore Our Collection" }), _jsx("p", { className: "text-base md:text-lg text-gallery-muted dark:text-dark-muted font-light leading-relaxed", children: "The Art Institute of Chicago houses one of the world's finest collections of fine art. From ancient Egyptian artifacts to contemporary installations, our digital collection brings masterpieces directly to you." }), _jsx("p", { className: "text-sm text-gallery-muted dark:text-dark-muted font-light", children: "Navigate through curated collections, discover artists, and dive into the stories behind each piece." })] }) }) })] }) }));
}
