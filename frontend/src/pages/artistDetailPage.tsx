import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Layout from '../components/Layout'

interface Artwork {
  id: number
  title: string
  artist_display?: string
  date_display?: string
  image_id?: string
}

interface Pagination {
  total: number
  limit: number
  offset: number
  current_page: number
  total_pages: number
}

export default function ArtistDetailPage() {
  const [searchParams] = useSearchParams()
  const artistName = searchParams.get('name') || 'Artist'

  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const LIMIT = 10

  useEffect(() => {
    fetchArtistArtworks()
  }, [currentPage, artistName])

  const fetchArtistArtworks = async () => {
    try {
      setLoading(true)
      setError(null)

      // Search for artworks by this artist with pagination
      const response = await fetch(
        `/api/artworks/search?q=${encodeURIComponent(artistName)}&limit=${LIMIT}&page=${currentPage}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch artworks')
      }

      const data = await response.json()
      console.log('Fetched artworks:', data)
      setArtworks(Array.isArray(data.data) ? data.data : [])
      setPagination(data.pagination || null)
    } catch (err) {
      console.error('Fetch error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">Loading artworks...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="bg-gallery-bg dark:bg-dark-bg">
        <div className="page-container py-16 space-y-12">
          {/* Back Link */}
          <Link
            to="/artists"
            className="nav-link hover:text-accent transition-colors inline-flex items-center gap-2"
          >
            ← Back to Collection
          </Link>

          {/* Artist Header */}
          <div className="space-y-3 border-b border-gallery-border dark:border-dark-border pb-8">
            <h1 className="heading-lg text-4xl md:text-5xl text-gallery-text dark:text-dark-text">
              {artistName}
            </h1>
            <p className="text-lg text-gallery-muted dark:text-dark-muted font-light">
              Artworks by this artist in our collection
            </p>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-6 py-4 rounded-lg">
              {error}
            </div>
          )}

          {/* Gallery Grid */}
          {artworks.length > 0 ? (
            <>
              <div className="grid-gallery">
                {artworks.map((artwork) => (
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
                      {artwork.date_display && (
                        <p className="text-caption">
                          {artwork.date_display}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.total_pages > 1 && (
                <div className="flex items-center justify-center gap-8 pt-12 border-t border-gallery-border dark:border-dark-border">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  
                  <span className="text-sm text-gallery-muted dark:text-dark-muted font-light">
                    Page <strong className="font-medium">{pagination.current_page}</strong> of <strong className="font-medium">{pagination.total_pages}</strong>
                  </span>
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(pagination.total_pages, currentPage + 1))}
                    disabled={currentPage === pagination.total_pages}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-gallery-muted dark:text-dark-muted font-light text-lg">
                No artworks found for this artist in our collection.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
