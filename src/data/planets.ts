export type Planet = {
    id: string
    name: string
    type: string
    tagline: string
    description: string
    image: string
    stats: {
        mass: string
        radius: string
        orbitalPeriod: string
        distanceFromSun: string
        moons: number
        temperature: string
    }
    nasaSearchTerm: string
}

export const PLANETS: Planet[] = [
    {
        id: "sun",
        name: "Sun",
        type: "Star",
        tagline: "The Solar Dynamo",
        description:
            "The Sun is the heart of our solar system, a massive ball of glowing plasma that provides the light and heat necessary for life on Earth. It generates energy through nuclear fusion, converting hydrogen into helium in its core. The Sun's magnetic activity drives solar flares and sunspots, influencing space weather and Earth's climate.",
        image: "https://images-assets.nasa.gov/image/PIA17669/PIA17669~small.jpg",
        stats: {
            mass: "1.989 × 10³⁰ kg",
            radius: "696,340 km",
            orbitalPeriod: "N/A",
            distanceFromSun: "0 km",
            moons: 0,
            temperature: "~5,500 °C (surface)",
        },
        nasaSearchTerm: "sun",
    },
    {
        id: "mercury",
        name: "Mercury",
        type: "Terrestrial",
        tagline: "The Swift Planet",
        description:
            "Mercury is the smallest and fastest planet in our solar system. It zips around the Sun every 88 days — a year on Mercury is shorter than its own day. Despite being closest to the Sun, it has virtually no atmosphere, meaning temperatures swing from 430°C during the day to –180°C at night.",
        image: "https://images-assets.nasa.gov/image/PIA11245/PIA11245~small.jpg",
        stats: {
            mass: "3.30 × 10²³ kg",
            radius: "2,439.7 km",
            orbitalPeriod: "88 days",
            distanceFromSun: "57.9 million km",
            moons: 0,
            temperature: "–180 to 430 °C",
        },
        nasaSearchTerm: "mercury planet",
    },
    {
        id: "venus",
        name: "Venus",
        type: "Terrestrial",
        tagline: "Earth's Evil Twin",
        description:
            "Venus is sometimes called Earth's twin because of their similar size, but the resemblance ends there. A thick atmosphere of carbon dioxide traps heat in a runaway greenhouse effect, making it the hottest planet in the solar system at 465°C — hot enough to melt lead.",
        image: "https://images-assets.nasa.gov/image/PIA00271/PIA00271~small.jpg",
        stats: {
            mass: "4.87 × 10²⁴ kg",
            radius: "6,051.8 km",
            orbitalPeriod: "225 days",
            distanceFromSun: "108.2 million km",
            moons: 0,
            temperature: "~465 °C",
        },
        nasaSearchTerm: "venus planet",
    },
    {
        id: "earth",
        name: "Earth",
        type: "Terrestrial",
        tagline: "The Blue Marble",
        description:
            "Earth is the only known planet to harbor life. Its liquid water oceans, protective magnetic field, and oxygen-rich atmosphere make it uniquely suited for complex organisms. From space, the swirling cloud patterns and blue oceans give it the iconic \"Blue Marble\" appearance.",
        image: "https://images-assets.nasa.gov/image/PIA18033/PIA18033~small.jpg",
        stats: {
            mass: "5.97 × 10²⁴ kg",
            radius: "6,371 km",
            orbitalPeriod: "365.25 days",
            distanceFromSun: "149.6 million km",
            moons: 1,
            temperature: "–89 to 57 °C",
        },
        nasaSearchTerm: "earth blue marble",
    },
    {
        id: "mars",
        name: "Mars",
        type: "Terrestrial",
        tagline: "The Red Planet",
        description:
            "Mars has fascinated humanity for centuries. Its rusty-red color comes from iron oxide in its soil. It hosts the tallest volcano (Olympus Mons) and the deepest canyon (Valles Marineris) in the solar system. Evidence of ancient riverbeds suggests it once had liquid water on its surface.",
        image: "https://images-assets.nasa.gov/image/PIA01253/PIA01253~small.jpg",
        stats: {
            mass: "6.42 × 10²³ kg",
            radius: "3,389.5 km",
            orbitalPeriod: "687 days",
            distanceFromSun: "227.9 million km",
            moons: 2,
            temperature: "–140 to 20 °C",
        },
        nasaSearchTerm: "mars planet",
    },
    {
        id: "jupiter",
        name: "Jupiter",
        type: "Gas Giant",
        tagline: "King of the Planets",
        description:
            "Jupiter is the largest planet in the solar system — more than 1,300 Earths could fit inside. Its Great Red Spot is a storm larger than Earth that has raged for over 300 years. Jupiter\"s powerful gravity has shaped the solar system, acting as a cosmic vacuum cleaner for asteroids and comets.",
        image: "https://images-assets.nasa.gov/image/PIA22946/PIA22946~small.jpg",
        stats: {
            mass: "1.90 × 10²⁷ kg",
            radius: "69,911 km",
            orbitalPeriod: "11.86 years",
            distanceFromSun: "778.5 million km",
            moons: 95,
            temperature: "–110 °C (cloud tops)",
        },
        nasaSearchTerm: "jupiter planet",
    },
    {
        id: "saturn",
        name: "Saturn",
        type: "Gas Giant",
        tagline: "The Ringed Wonder",
        description:
            "Saturn\"s spectacular ring system is made of billions of chunks of ice and rock, ranging from tiny grains to house-sized boulders. Despite its enormous size, Saturn is less dense than water — it would theoretically float in a giant bathtub. Its moon Titan has a thick atmosphere and liquid methane lakes.",
        image: "https://images-assets.nasa.gov/image/PIA12567/PIA12567~small.jpg",
        stats: {
            mass: "5.68 × 10²⁶ kg",
            radius: "58,232 km",
            orbitalPeriod: "29.46 years",
            distanceFromSun: "1.43 billion km",
            moons: 146,
            temperature: "–140 °C (cloud tops)",
        },
        nasaSearchTerm: "saturn planet",
    },
    {
        id: "uranus",
        name: "Uranus",
        type: "Ice Giant",
        tagline: "The Tilted Planet",
        description:
            "Uranus is unique among the planets — it rotates on its side, likely due to an ancient collision with an Earth-sized object. This extreme tilt means its poles face the Sun for 42 years at a time. Its pale blue-green color comes from methane in its atmosphere absorbing red light.",
        image: "https://images-assets.nasa.gov/image/PIA18182/PIA18182~small.jpg",
        stats: {
            mass: "8.68 × 10²⁵ kg",
            radius: "25,362 km",
            orbitalPeriod: "84 years",
            distanceFromSun: "2.87 billion km",
            moons: 28,
            temperature: "–224 °C",
        },
        nasaSearchTerm: "uranus planet",
    },
    {
        id: "neptune",
        name: "Neptune",
        type: "Ice Giant",
        tagline: "The Windiest World",
        description:
            "Neptune is the most distant planet from the Sun, orbiting in near-total darkness. Despite its distance, it has the most violent weather in the solar system with winds reaching 2,100 km/h. Its vivid blue color, like Uranus, comes from atmospheric methane, but its deeper blue suggests additional unknown compounds.",
        image: "https://images-assets.nasa.gov/image/PIA01492/PIA01492~small.jpg",
        stats: {
            mass: "1.02 × 10²⁶ kg",
            radius: "24,622 km",
            orbitalPeriod: "164.8 years",
            distanceFromSun: "4.50 billion km",
            moons: 16,
            temperature: "–214 °C",
        },
        nasaSearchTerm: "neptune planet",
    },
    {
        id: "pluto",
        name: "Pluto",
        type: "Dwarf Planet",
        tagline: "The Icy Outcast",
        description:
            "Once considered the ninth planet, Pluto was reclassified as a dwarf planet in 2006. It resides in the Kuiper Belt, a region of icy bodies beyond Neptune. Pluto has a heart-shaped glacier larger than Texas and a thin atmosphere that expands when it approaches the Sun.",
        image: "https://images-assets.nasa.gov/image/PIA20742/PIA20742~small.jpg",
        stats: {
            mass: "1.31 × 10²² kg",
            radius: "1,188.3 km",
            orbitalPeriod: "248 years",
            distanceFromSun: "5.91 billion km",
            moons: 5,
            temperature: "–229 °C",
        },
        nasaSearchTerm: "pluto dwarf planet",
    }
]
