import { useCallback, useEffect, useRef, useState } from 'react'
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Planet } from '../data/planets.ts'
import './PlanetDetail.css'

type NasaImage = { href: string; title: string }

type PlanetDetailProps = {
    planet: Planet
    onClose: () => void
}

function usePlanetPhotos(searchTerm: string) {
    const [photos, setPhotos] = useState<NasaImage[]>([])
    const [loading, setLoading] = useState(true)
    const cache = useRef<Record<string, NasaImage[]>>({})

    useEffect(() => {
        if (cache.current[searchTerm]) {
            setPhotos(cache.current[searchTerm])
            setLoading(false)
            return
        }

        setLoading(true)
        const controller = new AbortController()

        const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(searchTerm)}&media_type=image&page_size=6`

        fetch(url, { signal: controller.signal })
            .then(res => res.json())
            .then(data => {
                const items = (data?.collection?.items ?? [])
                    .slice(0, 6)
                    .map((item: { links?: { href: string }[]; data?: { title: string }[] }) => ({
                        href: item.links?.[0]?.href ?? '',
                        title: item.data?.[0]?.title ?? '',
                    }))
                    .filter((img: NasaImage) => img.href)
                cache.current[searchTerm] = items
                setPhotos(items)
            })
            .catch(() => setPhotos([]))
            .finally(() => setLoading(false))

        return () => controller.abort()
    }, [searchTerm])

    return { photos, loading }
}

const STAT_LABELS: Record<string, string> = {
    mass: 'Mass',
    radius: 'Radius',
    orbitalPeriod: 'Orbital Period',
    distanceFromSun: 'Distance from Sun',
    moons: 'Moons',
    temperature: 'Temperature',
}

export function PlanetDetails({ planet, onClose }: PlanetDetailProps) {
    const overlayRef = useRef<HTMLDivElement>(null)
    const { photos, loading } = usePlanetPhotos(planet.nasaSearchTerm)
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    const closeLightbox = useCallback(() => setLightboxIndex(null), [])

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (lightboxIndex !== null) {
                if (e.key === 'Escape') { closeLightbox(); return }
                if (e.key === 'ArrowRight') setLightboxIndex(i => i !== null ? (i + 1) % photos.length : null)
                if (e.key === 'ArrowLeft') setLightboxIndex(i => i !== null ? (i - 1 + photos.length) % photos.length : null)
                return
            }
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKey)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', handleKey)
            document.body.style.overflow = ''
        }
    }, [onClose, lightboxIndex, closeLightbox, photos.length])

    function handleOverlayClick(e: React.MouseEvent) {
        if (e.target === overlayRef.current) onClose()
    }

    const statsEntries = Object.entries(planet.stats) as [keyof typeof planet.stats, string | number][]

    return (
        <>
            <div className="planet-overlay" ref={overlayRef} onClick={handleOverlayClick}>
                <div className="planet-detail">
                    <button className="planet-detail__close" onClick={onClose} type="button" aria-label="Close">
                        <X size={18} />
                    </button>

                    <div className="planet-detail__hero">
                        <img src={planet.image} alt={planet.name} className="planet-detail__hero-img" />
                        <div className="planet-detail__hero-overlay" />
                        <div className="planet-detail__hero-text">
                            <span className="planet-detail__type">{planet.type}</span>
                            <h2 className="planet-detail__name">{planet.name}</h2>
                            <p className="planet-detail__tagline">{planet.tagline}</p>
                        </div>
                    </div>

                    <div className="planet-detail__content">
                        <p className="planet-detail__desc">{planet.description}</p>

                        <div className="planet-detail__stats">
                            {statsEntries.map(([key, val]) => (
                                <div className="planet-detail__stat" key={key}>
                                    <span className="planet-detail__stat-label">{STAT_LABELS[key]}</span>
                                    <span className="planet-detail__stat-value">{val}</span>
                                </div>
                            ))}
                        </div>

                        <div className="planet-detail__photos-section">
                            <h3 className="planet-detail__section-title">
                                NASA Imagery
                                <a
                                    href={`https://images.nasa.gov/search?q=${encodeURIComponent(planet.nasaSearchTerm)}&media=image`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="planet-detail__nasa-link"
                                >
                                    View all <ExternalLink size={12} />
                                </a>
                            </h3>
                            {loading ? (
                                <p className="planet-detail__loading">Loading images…</p>
                            ) : photos.length === 0 ? (
                                <p className="planet-detail__loading">No images found</p>
                            ) : (
                                <div className="planet-detail__photos">
                                    {photos.map((photo, i) => (
                                        <img
                                            key={i}
                                            src={photo.href}
                                            alt={photo.title}
                                            className="planet-detail__photo"
                                            loading="lazy"
                                            onClick={() => setLightboxIndex(i)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {lightboxIndex !== null && (() => {
                const idx = lightboxIndex
                return (
                    <div className="photo-lightbox" onClick={closeLightbox}>
                        <button className="photo-lightbox__close" onClick={closeLightbox} aria-label="Close">
                            <X size={20} />
                        </button>
                        <button
                            className="photo-lightbox__nav photo-lightbox__nav--prev"
                            onClick={e => { e.stopPropagation(); setLightboxIndex(i => i !== null ? (i - 1 + photos.length) % photos.length : null) }}
                            aria-label="Previous"
                        >
                            <ChevronLeft size={28} />
                        </button>
                        <img
                            className="photo-lightbox__img"
                            src={photos[idx].href}
                            alt={photos[idx].title}
                            onClick={e => e.stopPropagation()}
                        />
                        <button
                            className="photo-lightbox__nav photo-lightbox__nav--next"
                            onClick={e => { e.stopPropagation(); setLightboxIndex(i => i !== null ? (i + 1) % photos.length : null) }}
                            aria-label="Next"
                        >
                            <ChevronRight size={28} />
                        </button>
                        <div className="photo-lightbox__counter">{idx + 1} / {photos.length}</div>
                        <p className="photo-lightbox__caption">{photos[idx].title}</p>
                    </div>
                )
            })()}
        </>
    )
}
