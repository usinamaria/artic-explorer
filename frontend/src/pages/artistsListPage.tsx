import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

interface Artist {
  id: number
  title: string
  birth_date?: string
  death_date?: string
  artist_id?: number
}

export default function ArtistsListPage() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchArtists()
  }, [])

  const fetchArtists = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch artworks which have artist_display info
      const response = await fetch('/api/artworks/public-domain?limit=50')

      if (!response.ok) {
        throw new Error('Failed to fetch artists')
      }

      const data = await response.json()
      console.log('Fetched artists:', data)

      // Extract unique artists from artworks
      const uniqueArtists: { [key: string]: Artist } = {}
      const artworksData = Array.isArray(data.data) ? data.data : []

      artworksData.forEach((artwork: any, index: number) => {
        if (artwork.artist_display && !uniqueArtists[artwork.artist_display]) {
          uniqueArtists[artwork.artist_display] = {
            id: artwork.id || index,
            title: artwork.artist_display,
          }
        }
      })

      setArtists(Object.values(uniqueArtists).slice(0, 20))
    } catch (err) {
      console.error('Fetch error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  const filteredArtists = artists.filter((artist) =>
    artist.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">Loading artists...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="bg-white dark:bg-dark-bg">
        <div className="page-container py-6 md:py-16">
          <h1 className="text-5xl mb-6">Artists</h1>
          <p className="text-base md:text-lg text-gallery-muted dark:text-dark-muted font-light">
              Discover and search master artists from around the world.
          </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            Error: {error}
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search artists..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none "
          />
        </div>

        {/* Artists List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 py-4">
          {filteredArtists.map((artist) => (
            <Link
              key={artist.id}
              to={`/artist/${artist.id}?name=${encodeURIComponent(artist.title)}`}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <h2 className="text-2xl font-semibold mb-4 text-blue-600 hover:text-blue-800">
                {artist.title}
              </h2>
              <div className="mt-4 text-blue-500 font-semibold">
                View Artworks →
              </div>
            </Link>
          ))}
        </div>

        {filteredArtists.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No artists found matching your search.
          </div>
        )}
        </div>
      </div>
    </Layout>
  )
}
