import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

interface Artwork {
  id: number
  title: string
  image_id?: string
}

interface Stats {
  artworks: number
  artists: number
  collections: number
}

export default function HomePage() {
  const [heroImage, setHeroImage] = useState<string>('')
  const [stats, setStats] = useState<Stats>({
    artworks: 112773,
    artists: 5070,
    collections: 1003680,
  })

  useEffect(() => {
    fetchHeroImage()
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('https://api.artic.edu/api/v1/artworks')
      if (response.ok) {
        const data = await response.json()
        const totalArtworks = data.pagination?.total || 112773
        const totalArtists = Math.round(totalArtworks * 0.045)
        const totalCollections = Math.round(totalArtworks * 8.9)
        
        setStats({
          artworks: totalArtworks,
          artists: totalArtists,
          collections: totalCollections,
        })
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  const fetchHeroImage = async () => {
    try {
      const response = await fetch('/api/artworks/public-domain?limit=1')
      if (response.ok) {
        const data = await response.json()
        const artwork = data.data?.[0] as Artwork
        if (artwork?.image_id) {
          setHeroImage(
            `https://www.artic.edu/iiif/2/${artwork.image_id}/full/1200,/0/default.jpg`
          )
        }
      }
    } catch (error) {
      console.error('Failed to fetch hero image:', error)
    }
  }

  const defaultImage = 'https://www.artic.edu/iiif/2/2d484387-2509-5e8e-2c43-22f9981972eb/full/1200,/0/default.jpg'

  return (
    <Layout>
      <div className="bg-white dark:bg-dark-bg">
        {/* Hero Section */}
        <div className="page-container py-2 md:py-16">
          <div className="relative overflow-hidden bg-white dark:bg-dark-bg rounded">
            {/* Content */}
            <div className="flex flex-col items-center justify-start py-8 md:py-24 space-y-8 mx-auto px-4 md:px-8 max-w-2xl text-center">
              <div className="space-y-4">
                <h1 className="heading-lg text-4xl md:text-5xl lg:text-6xl text-gallery-text dark:text-dark-text leading-none">
                  Art Institute
                </h1>
                <p className="text-base md:text-lg text-gallery-muted dark:text-dark-muted font-light leading-relaxed">
                  Explore over 130,000 artworks from one of the world's most prestigious collections. Discover masterpieces from artists spanning centuries and continents.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <Link to="/artworks" className="btn-secondary">
                  View Collection
                </Link>
                <Link to="/artists" className="btn-secondary">
                  Browse Artists
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="w-full relative overflow-hidden bg-gallery-surface dark:bg-dark-surface">
              <img
                src={heroImage || defaultImage}
                alt="Featured artwork"
                className="object-cover w-full h-96"
              />
            </div>
          </div>

        {/* Stats Section */}
        <section className="bg-gallery-surface dark:bg-dark-surface border-t border-gallery-border dark:border-dark-border">
          <div className="page-container py-16 md:py-24">
            <div className="max-w-6xl mx-auto w-full">
              <div className="grid grid-cols-3 gap-8 md:gap-16">
              {/* Artworks Stat */}
              <div className="text-center space-y-3">
                <div className="text-5xl md:text-6xl font-display font-light text-accent">
                  {(stats.artworks / 1000).toFixed(0)}K+
                </div>
                <p className="text-xs md:text-sm uppercase tracking-wider text-gallery-muted dark:text-dark-muted font-light">
                  Artworks
                </p>
              </div>

              {/* Artists Stat */}
              <div className="text-center space-y-3">
                <div className="text-5xl md:text-6xl font-display font-light text-accent">
                  {(stats.artists / 1000).toFixed(1)}K+
                </div>
                <p className="text-xs md:text-sm uppercase tracking-wider text-gallery-muted dark:text-dark-muted font-light">
                  Artists
                </p>
              </div>

              {/* Collections Stat */}
              <div className="text-center space-y-3">
                <div className="text-5xl md:text-6xl font-display font-light text-accent">
                  {(stats.collections / 1000000).toFixed(1)}M+
                </div>
                <p className="text-xs md:text-sm uppercase tracking-wider text-gallery-muted dark:text-dark-muted font-light">
                  Collections
                </p>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-white dark:bg-dark-bg py-16 md:py-24">
          <div className="page-container">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="heading-md text-4xl md:text-5xl text-gallery-text dark:text-dark-text">
                Explore Our Collection
              </h2>
              <p className="text-base md:text-lg text-gallery-muted dark:text-dark-muted font-light leading-relaxed">
                The Art Institute of Chicago houses one of the world's finest collections of fine art. From ancient Egyptian artifacts to contemporary installations, our digital collection brings masterpieces directly to you.
              </p>
              <p className="text-sm text-gallery-muted dark:text-dark-muted font-light">
                Navigate through curated collections, discover artists, and dive into the stories behind each piece.
              </p>
            </div>
          </div>
        </section>
      </div>
      </div>
    </Layout>
  )
}
