import type { Planet } from '../data/planets.ts'
import BorderGlow from './BorderGlow.tsx'
import './PlanetCard.css'

type PlanetCardProps = {
    planet: Planet
    index?: number
    onClick: () => void
}

export function PlanetCard({ planet, index = 0, onClick }: PlanetCardProps) {
    return (
        <div className="planet-card-entry" style={{ '--card-index': index } as React.CSSProperties}>
            <BorderGlow
                edgeSensitivity={30}
                animated={true}
                animationDelay={index * 100}
                glowColor="260 75 72"
                backgroundColor="rgba(22, 27, 34)"
                borderRadius={8}
                glowRadius={30}
                glowIntensity={0.8}
                coneSpread={25}
                colors={['#a78bfa', '#60a5fa', '#c4b5fd']}
                className="planet-card-glow"
            >
                <button className="planet-card" onClick={onClick} type="button">
                    <div className="planet-card__img-wrap">
                        <img
                            className="planet-card__img"
                            src={planet.image}
                            alt={planet.name}
                            loading="lazy"
                        />
                    </div>
                    <div className="planet-card__body">
                        <h3 className="planet-card__name">{planet.name}</h3>
                        <p className="planet-card__type">{planet.type}</p>
                        <p className="planet-card__tagline">{planet.tagline}</p>
                    </div>
                </button>
            </BorderGlow>
        </div>
    )
}
