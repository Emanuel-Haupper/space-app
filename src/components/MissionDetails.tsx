import { useEffect, useRef, useState } from 'react'
import { X, ExternalLink, Rocket, Globe, Users, Calendar, MapPin } from 'lucide-react'
import './css/mission-details.css'

type Mission = {
    name: string
    year: number
    country: string
    crew: number
    status: string
    destination: string
}

type NasaImage = { href: string; title: string }

function useMissionPhotos(searchTerm: string) {
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
            .then(r => r.json())
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

const MISSION_FACTS: Record<string, string> = {
    'Sputnik 1': 'The first artificial Earth satellite, it transmitted a simple radio beep that the whole world could hear, triggering the Space Race.',
    'Vostok 1': 'Yuri Gagarin became the first human in space, completing one orbit in 108 minutes. He ejected and parachuted separately from the capsule.',
    'Apollo 11': 'Neil Armstrong and Buzz Aldrin spent 21.5 hours on the lunar surface, collecting 47.5 lbs of samples. "One small step for man..."',
    'Apollo 13': 'An oxygen tank explosion forced a dramatic abort. The crew used the Lunar Module as a lifeboat, returning safely after 87 hours adrift.',
    'Viking 1': 'First successful Mars lander. Operated for over 6 years, far exceeding its 90-day design life, and found no definitive signs of life.',
    'STS-1 Columbia': 'The first orbital test of the Space Shuttle. Astronauts John Young and Robert Crippen flew it like a test aircraft with no prior unmanned flights.',
    'Mir Station': 'Mir was continuously inhabited for almost 10 years — a record at the time. It hosted astronauts from 12 countries over its 15-year life.',
    'Hubble Space Telescope': 'After a flawed mirror was discovered, a 1993 servicing mission installed corrective optics. Hubble has since made over 1.5 million observations.',
    'Mars Pathfinder': 'Delivered the Sojourner rover — the first wheeled vehicle on another planet. Its airbag landing system weighed just 65 kg.',
    'ISS Assembly': 'The ISS has been continuously inhabited since November 2000, making it the longest continuous human presence in space.',
    'Mars Curiosity': 'The size of a small car, Curiosity is nuclear-powered and has driven over 30 km on Mars, discovering ancient lake beds.',
    'Crew Dragon Demo-2': 'SpaceX became the first private company to launch NASA astronauts to the ISS, ending a 9-year reliance on Russian Soyuz rockets.',
    'Tianwen-1': "China's first independent Mars mission successfully deployed the Zhurong rover, making China the second country to operate a Mars rover.",
    'JWST': 'With a 6.5m gold mirror and positioned 1.5 million km from Earth, JWST can see light from the first galaxies formed after the Big Bang.',
    'Artemis I': "An uncrewed test of the Orion capsule and SLS rocket, traveling 40,000 miles beyond the Moon — farther than any crewed spacecraft in 50 years.",
    'Artemis II': 'The first crewed mission to lunar orbit since Apollo 17 in 1972, setting the stage for the first Moon landing in over half a century.',
    'Mars Perseverance': 'Perseverance is caching rock samples for a future return mission and carried Ingenuity — the first powered aircraft to fly on another planet.',
    'Luna-25': "Russia's first lunar mission in 47 years ended when the spacecraft crashed during its pre-landing orbit maneuver.",
    'Chandrayaan-3': "India's Vikram lander successfully touched down near the Moon's south pole, making India the fourth nation to achieve a soft lunar landing.",
    'Europa Clipper': "NASA's largest planetary science spacecraft ever, it will make 49 close flybys of Europa to determine if its subsurface ocean could support life.",
}

type MissionDetailProps = {
    mission: Mission
    onClose: () => void
}

export function MissionDetail({ mission, onClose }: MissionDetailProps) {
    const overlayRef = useRef<HTMLDivElement>(null)
    const { photos, loading } = useMissionPhotos(mission.name)
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (lightboxIndex !== null) {
                if (e.key === 'Escape') { setLightboxIndex(null); return }
                if (e.key === 'ArrowRight') setLightboxIndex(i => i !== null ? (i + 1) % photos.length : null)
                if (e.key === 'ArrowLeft') setLightboxIndex(i => i !== null ? (i - 1 + photos.length) % photos.length : null)
                return
            }
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [onClose, lightboxIndex, photos.length])

    function handleOverlayClick(e: React.MouseEvent) {
        if (e.target === overlayRef.current) onClose()
    }

    const fact = MISSION_FACTS[mission.name]

    const statusColor = mission.status === 'Active' ? 'var(--success, #7ec9a3)' : mission.status === 'planned' ? 'var(--warning, #e4c87a)' : 'var(--text-dim)'

    return (
        <>
            <div className="mission-overlay" ref={overlayRef} onClick={handleOverlayClick}>
                <div className="mission-detail">
                    <button className="mission-detail__close" onClick={onClose} type="button" aria-label="Close">
                        <X size={18} />
                    </button>

                    <div className="mission-detail__hero">
                        {!loading && photos[0] && (
                            <img src={photos[0].href} alt={mission.name} className="mission-detail__hero-img" />
                        )}
                        <div className="mission-detail__hero-overlay" />
                        <div className="mission-detail__hero-content">
                            <span className="mission-detail__destination-tag">
                                <MapPin size={11} /> {mission.destination}
                            </span>
                            <h2 className="mission-detail__name">{mission.name}</h2>
                            <span className="mission-detail__status" style={{ color: statusColor }}>
                                ● {mission.status}
                            </span>
                        </div>
                    </div>

                    <div className="mission-detail__content">
                        <div className="mission-detail__meta-grid">
                            <div className="mission-detail__meta-item">
                                <Calendar size={14} className="mission-detail__meta-icon" />
                                <div>
                                    <p className="mission-detail__meta-label">Year</p>
                                    <p className="mission-detail__meta-value">{mission.year}</p>
                                </div>
                            </div>
                            <div className="mission-detail__meta-item">
                                <Globe size={14} className="mission-detail__meta-icon" />
                                <div>
                                    <p className="mission-detail__meta-label">Country</p>
                                    <p className="mission-detail__meta-value">{mission.country}</p>
                                </div>
                            </div>
                            <div className="mission-detail__meta-item">
                                <Rocket size={14} className="mission-detail__meta-icon" />
                                <div>
                                    <p className="mission-detail__meta-label">Destination</p>
                                    <p className="mission-detail__meta-value">{mission.destination}</p>
                                </div>
                            </div>
                            <div className="mission-detail__meta-item">
                                <Users size={14} className="mission-detail__meta-icon" />
                                <div>
                                    <p className="mission-detail__meta-label">Crew</p>
                                    <p className="mission-detail__meta-value">
                                        {mission.crew === 0 ? 'Unmanned' : `${mission.crew} astronaut${mission.crew > 1 ? 's' : ''}`}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {fact && (
                            <div className="mission-detail__fact">
                                <p className="mission-detail__fact-label">Mission Highlight</p>
                                <p className="mission-detail__fact-text">{fact}</p>
                            </div>
                        )}

                        <div className="mission-detail__photos-section">
                            <h3 className="mission-detail__section-title">
                                NASA Imagery
                                <a
                                    href={`https://images.nasa.gov/search?q=${encodeURIComponent(mission.name)}&media=image`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mission-detail__nasa-link"
                                >
                                    View all <ExternalLink size={12} />
                                </a>
                            </h3>
                            {loading ? (
                                <p className="mission-detail__loading">Loading images…</p>
                            ) : photos.length === 0 ? (
                                <p className="mission-detail__loading">No images found</p>
                            ) : (
                                <div className="mission-detail__photos">
                                    {photos.map((photo, i) => (
                                        <img
                                            key={i}
                                            src={photo.href}
                                            alt={photo.title}
                                            className="mission-detail__photo"
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
                    <div className="mission-lightbox" onClick={() => setLightboxIndex(null)}>
                        <button className="mission-lightbox__close" onClick={() => setLightboxIndex(null)} aria-label="Close"><X size={20} /></button>
                        <button
                            className="mission-lightbox__nav mission-lightbox__nav--prev"
                            onClick={e => { e.stopPropagation(); setLightboxIndex(i => i !== null ? (i - 1 + photos.length) % photos.length : null) }}
                            aria-label="Previous"
                        >‹</button>
                        <img
                            className="mission-lightbox__img"
                            src={photos[idx].href}
                            alt={photos[idx].title}
                            onClick={e => e.stopPropagation()}
                        />
                        <button
                            className="mission-lightbox__nav mission-lightbox__nav--next"
                            onClick={e => { e.stopPropagation(); setLightboxIndex(i => i !== null ? (i + 1) % photos.length : null) }}
                            aria-label="Next"
                        >›</button>
                        <div className="mission-lightbox__counter">{idx + 1} / {photos.length}</div>
                        <p className="mission-lightbox__caption">{photos[idx].title}</p>
                    </div>
                )
            })()}
        </>
    )
}
