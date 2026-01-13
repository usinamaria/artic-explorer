import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [darkMode, setDarkMode] = useState(
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-dark-bg">
      {/* Header */}
      <header className="bg-white dark:bg-dark-surface border-b border-gallery-border dark:border-dark-border">
        <div className="page-container py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <h1 className="heading-sm text-2xl text-gallery-text dark:text-dark-text tracking-tight">
              ART INSTITUTE
            </h1>
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 hover:bg-gallery-surface dark:hover:bg-dark-border rounded-none transition-colors text-gallery-text dark:text-dark-text text-lg"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Navigation */}
        <nav className="border-t border-gallery-border dark:border-dark-border">
          <div className="page-container flex gap-12 py-4">
            <Link
              to="/"
              className={`nav-link inline-flex ${isActive('/') && 'nav-link-active'}`}
            >
              Welcome
            </Link>
            <Link
              to="/artworks"
              className={`nav-link inline-flex ${isActive('/artworks') && 'nav-link-active'}`}
            >
              Artworks
            </Link>
            <Link
              to="/artists"
              className={`nav-link inline-flex ${isActive('/artists') && 'nav-link-active'}`}
            >
              Artists
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gallery-surface dark:bg-dark-surface border-t border-gallery-border dark:border-dark-border">
        <div className="page-container py-4 flex items-center justify-center min-h-[60px]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-1 w-full">
            <p className="text-sm text-gallery-muted dark:text-dark-muted font-light">
              © {new Date().getFullYear()} Art Institute of Chicago. All rights reserved.
            </p>
            <p className="text-sm text-gallery-muted dark:text-dark-muted font-light">
              Digital Collection Explorer
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

