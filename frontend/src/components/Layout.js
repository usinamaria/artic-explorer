import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
export default function Layout({ children }) {
    const [darkMode, setDarkMode] = useState(typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);
    return (_jsxs("div", { className: "flex flex-col h-screen bg-white dark:bg-dark-bg", children: [_jsxs("header", { className: "bg-white dark:bg-dark-surface border-b border-gallery-border dark:border-dark-border", children: [_jsxs("div", { className: "page-container py-6 flex items-center justify-between", children: [_jsx(Link, { to: "/", className: "flex items-center gap-3 hover:opacity-80 transition-opacity", children: _jsx("h1", { className: "heading-sm text-2xl text-gallery-text dark:text-dark-text tracking-tight", children: "ART INSTITUTE" }) }), _jsx("button", { onClick: () => setDarkMode(!darkMode), className: "p-2 hover:bg-gallery-surface dark:hover:bg-dark-border rounded-none transition-colors text-gallery-text dark:text-dark-text text-lg", "aria-label": "Toggle dark mode", children: darkMode ? '☀️' : '🌙' })] }), _jsx("nav", { className: "border-t border-gallery-border dark:border-dark-border", children: _jsxs("div", { className: "page-container flex gap-8 py-4", children: [_jsx(Link, { to: "/", className: `nav-link ${isActive('/') && 'nav-link-active'}`, children: "Welcome" }), _jsx(Link, { to: "/artworks", className: `nav-link ${isActive('/artworks') && 'nav-link-active'}`, children: "Collection" }), _jsx(Link, { to: "/artists", className: `nav-link ${isActive('/artists') && 'nav-link-active'}`, children: "Browse" })] }) })] }), _jsx("main", { className: "flex-1 overflow-y-auto", children: children }), _jsx("footer", { className: "bg-gallery-surface dark:bg-dark-surface border-t border-gallery-border dark:border-dark-border", children: _jsx("div", { className: "container-gallery py-8", children: _jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-6", children: [_jsxs("p", { className: "text-sm text-gallery-muted dark:text-dark-muted font-light", children: ["\u00A9 ", new Date().getFullYear(), " Art Institute of Chicago. All rights reserved."] }), _jsx("p", { className: "text-sm text-gallery-muted dark:text-dark-muted font-light", children: "Digital Collection Explorer" })] }) }) })] }));
}
