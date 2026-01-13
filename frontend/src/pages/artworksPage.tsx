import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

interface Artwork {
  id: number
  title: string
  artist_display?: string
  date_display?: string
  image_id?: string
  is_public_domain?: boolean
}

interface Pagination {
  total: number
  limit: number
  offset: number
  current_page: number
  total_pages: number
}

export default function ArtworksPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const LIMIT = 12

  useEffect(() => {
    setCurrentPage(1)
    fetchArtworks()
  }, [debouncedSearchTerm])

  useEffect(() => {
    fetchArtworks()
  }, [currentPage])

  const fetchArtworks = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // If there's a search term, use the search API, otherwise use public domain
      let url: string
      if (debouncedSearchTerm) {
        url = `/api/artworks/search?q=${encodeURIComponent(debouncedSearchTerm)}&limit=${LIMIT}&page=${currentPage}`
      } else {
        url = `/api/artworks/public-domain?limit=${LIMIT}&page=${currentPage}`
      }
      
      const response = await fetch(url)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error:', response.status, errorText)
        throw new Error(`API Error: ${response.status} ${errorText}`)
      }
      
      const data = await response.json()
      console.log('Fetched artworks data:', data)
      // Set artworks from the response
      setArtworks(data.data || [])
      setPagination(data.pagination || null)
    } catch (err) {
      console.error('Fetch error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  const filteredArtworks = artworks

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">Loading artworks...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="bg-white dark:bg-dark-bg">
        {/* Page Header */}
        <section className="bg-white dark:bg-dark-bg">
          <div className="page-container py-3 md:py-6">
            <div className="space-y-4 max-w-2xl">
              <h1 className="heading-lg text-5xl md:text-6xl text-gallery-text dark:text-dark-text">
                Artworks
              </h1>
              <p className="text-base md:text-lg text-gallery-muted dark:text-dark-muted font-light">
                Explore our curated selection from master artists around the world.
              </p>
            </div>
          </div>
        </section>

        {/* Search Bar */}
          <div className="page-container">
            <input
              type="text"
              placeholder="Search artworks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setCurrentPage(1)
                  setDebouncedSearchTerm(searchTerm)
                }
              }}
              className="form-input w-full"
              aria-label="Search artworks"
            />
          </div>


        {/* Main Content */}
        <section className="bg-white dark:bg-dark-bg py-12 md:py-16">
          <div className="page-container">
            {/* Error State */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-6 py-4 rounded-none mb-8">
                {error}
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-24">
                <div className="loading-spinner"></div>
              </div>
            ) : filteredArtworks.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-gallery-muted dark:text-dark-muted text-lg font-light">
                  No artworks found matching your search.
                </p>
              </div>
            ) : (
              <>
                {/* Gallery Grid */}
                <div className="grid-gallery">
                  {filteredArtworks.map((artwork) => (
                    <article key={artwork.id} className="artwork-card">
                      {artwork.image_id && (
                        <div className="artwork-card-image">
                          <img
                            src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`}
                            alt={artwork.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="artwork-card-content">
                        <h3 className="artwork-card-title">
                          {artwork.title}
                        </h3>
                        {artwork.artist_display && (
                          <p className="artwork-card-meta hover:text-accent transition-colors duration-150">
                            <Link to={`/artist/${artwork.id}?name=${encodeURIComponent(artwork.artist_display)}`}>
                              {artwork.artist_display}
                            </Link>
                          </p>
                        )}
                        {artwork.date_display && (
                          <p className="text-caption mt-2">
                            {artwork.date_display}
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.total_pages > 1 && (
                  <div className="flex items-center justify-center gap-6 mt-12 md:mt-16 py-6">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="btn-secondary btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Previous page"
                    >
                      Previous
                    </button>
                    
                    <span className="text-sm text-gallery-muted dark:text-dark-muted font-light">
                      Page <strong className="font-medium text-gallery-text dark:text-dark-text">{pagination.current_page}</strong> of <strong className="font-medium text-gallery-text dark:text-dark-text">{pagination.total_pages}</strong>
                    </span>
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(pagination.total_pages, currentPage + 1))}
                      disabled={currentPage === pagination.total_pages}
                      className="btn-secondary btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Next page"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </Layout>
  )
}


