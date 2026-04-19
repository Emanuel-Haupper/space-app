import { useState } from 'react'
import { Rocket, Activity, Globe, Users } from 'lucide-react'
import { PageHeader } from '../components/PageHeader.tsx'
import { StatCard } from '../components/StatCard.tsx'
import { PlanetCard } from '../components/PlanetCard.tsx'
import { PlanetDetails } from '../components/PlanetDetail.tsx'
import { PLANETS } from '../data/planets.ts'
import type { Planet } from '../data/planets.ts'
import './HomePage.css'
import Galaxy from '../components/Galaxy.tsx'

export function HomePage() {
    const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null)

    const cardsInfo = [
        { label: 'Total Missions', value: '580+', icon: <Rocket size={20} />, accent: '#a78bfa' },
        { label: 'Active Missions', value: '42', icon: <Activity size={20} />, accent: '#60a5fa' },
        { label: 'Countries', value: '32', icon: <Globe size={20} />, accent: '#818cf8' },
        { label: 'Astronauts', value: '700+', icon: <Users size={20} />, accent: '#c4b5fd' },
    ]

    return (
        <div className="home-page page-transition">
            <div className="galaxy-bg">
                <Galaxy
                    mouseInteraction={false}
                    density={2}
                    glowIntensity={0.1}
                    saturation={0}
                    hueShift={260}
                    twinkleIntensity={0.6}
                    rotationSpeed={0.05}
                    starSpeed={0.4}
                    speed={0.6}
                />
            </div>

            <div className="home-hero">
                <div className="home-hero__content">
                    <p className="home-hero__eyebrow">Welcome to</p>
                    <h1 className="home-hero__title">Space Explorer</h1>
                    <p className="home-hero__tagline">
                        Discover humanity's journey into the cosmos — from the first satellite to the edges of the solar system
                    </p>
                </div>
            </div>

            <div>
                <PageHeader
                    title="By the Numbers"
                    subtitle="Key statistics from decades of space exploration"
                />
                <div className="home-stats">
                    {cardsInfo.map((card, i) => (
                        <StatCard
                            key={i}
                            index={i}
                            label={card.label}
                            value={card.value}
                            icon={card.icon}
                            accent={card.accent}
                        />
                    ))}
                </div>
            </div>

            <div>
                <PageHeader
                    title="The Solar System"
                    subtitle="Click a planet to explore its stats and NASA imagery"
                />
                <div className="home-planets">
                    {PLANETS.map((planet, i) => (
                        <PlanetCard
                            key={planet.id}
                            planet={planet}
                            index={i}
                            onClick={() => setSelectedPlanet(planet)}
                        />
                    ))}
                </div>
            </div>

            {selectedPlanet && (
                <PlanetDetails
                    planet={selectedPlanet}
                    onClose={() => setSelectedPlanet(null)}
                />
            )}
        </div>
    )
}
