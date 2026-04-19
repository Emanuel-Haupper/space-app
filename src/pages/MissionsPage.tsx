import { useState } from 'react'
import { DataTable, Badge, PageHeader } from '../_my-components/index.ts'
import { MissionDetail } from '../components/MissionDetails.tsx'
import './../assets/css/missions-page.css'

type Mission = {
  name: string
  year: number
  country: string
  crew: number
  status: string
  destination: string
}

const MISSIONS: Mission[] = [
  { name: 'Sputnik 1', year: 1957, country: 'USSR', crew: 0, status: 'Completed', destination: 'Earth Orbit' },
  { name: 'Vostok 1', year: 1961, country: 'USSR', crew: 1, status: 'Completed', destination: 'Earth Orbit' },
  { name: 'Apollo 11', year: 1969, country: 'USA', crew: 3, status: 'Completed', destination: 'Moon' },
  { name: 'Apollo 13', year: 1970, country: 'USA', crew: 3, status: 'Completed', destination: 'Moon' },
  { name: 'Viking 1', year: 1975, country: 'USA', crew: 0, status: 'Completed', destination: 'Mars' },
  { name: 'STS-1 Columbia', year: 1981, country: 'USA', crew: 2, status: 'Completed', destination: 'Earth Orbit' },
  { name: 'Mir Station', year: 1986, country: 'USSR', crew: 0, status: 'Completed', destination: 'Earth Orbit' },
  { name: 'Hubble Space Telescope', year: 1990, country: 'USA', crew: 0, status: 'Active', destination: 'Earth Orbit' },
  { name: 'Mars Pathfinder', year: 1996, country: 'USA', crew: 0, status: 'Completed', destination: 'Mars' },
  { name: 'ISS Assembly', year: 1998, country: 'International', crew: 0, status: 'Active', destination: 'ISS' },
  { name: 'Mars Curiosity', year: 2011, country: 'USA', crew: 0, status: 'Active', destination: 'Mars' },
  { name: 'Crew Dragon Demo-2', year: 2020, country: 'USA', crew: 2, status: 'Completed', destination: 'ISS' },
  { name: 'Tianwen-1', year: 2020, country: 'China', crew: 0, status: 'Completed', destination: 'Mars' },
  { name: 'JWST', year: 2021, country: 'International', crew: 0, status: 'Active', destination: 'L2 Point' },
  { name: 'Artemis I', year: 2022, country: 'USA', crew: 0, status: 'Completed', destination: 'Moon' },
  { name: 'Artemis II', year: 2025, country: 'USA', crew: 4, status: 'Active', destination: 'Moon' },
  { name: 'Mars Perseverance', year: 2021, country: 'USA', crew: 0, status: 'Active', destination: 'Mars' },
  { name: 'Luna-25', year: 2023, country: 'Russia', crew: 0, status: 'Completed', destination: 'Moon' },
  { name: 'Chandrayaan-3', year: 2023, country: 'India', crew: 0, status: 'Completed', destination: 'Moon' },
  { name: 'Europa Clipper', year: 2024, country: 'USA', crew: 0, status: 'Active', destination: 'Jupiter' },
]

function statusVariant(status: string) {
  if (status === 'Active') return 'success'
  if (status === 'planned') return 'warning'
  return 'default'
}

const COLUMNS = [
  { key: 'name', label: 'Mission', minWidth: '200px' },
  { key: 'year', label: 'Year', minWidth: '72px' },
  { key: 'destination', label: 'Destination', minWidth: '120px' },
  { key: 'country', label: 'Country', minWidth: '120px' },
  {
    key: 'crew',
    label: 'Crew',
    minWidth: '130px',
    render: (v: number) => (v === 0 ? 'Unmanned' : `${v} astronaut${v > 1 ? 's' : ''}`),
  },
  {
    key: 'status',
    label: 'Status',
    minWidth: '105px',
    render: (v: string) => <Badge label={v} variant={statusVariant(v)} />,
  },
]

export function MissionsPage() {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null)

  return (
    <div className="missions-page page-transition">
      <PageHeader
        title="Space Missions"
        subtitle="Landmark missions across the history of space exploration — sort, filter and paginate below"
      />
      <DataTable
        data={MISSIONS}
        columns={COLUMNS}
        filterKey="name"
        filters={[
          { key: 'destination', label: 'Destination', type: 'select', options: Array.from(new Set(MISSIONS.map(m => m.destination))) },
          { key: 'country', label: 'Country', type: 'select', options: Array.from(new Set(MISSIONS.map(m => m.country))) },
          { key: 'status', label: 'Status', type: 'select', options: Array.from(new Set(MISSIONS.map(m => m.status))) },
          { key: 'year', label: 'Year', type: 'range', min: Math.min(...MISSIONS.map(m => m.year)), max: Math.max(...MISSIONS.map(m => m.year)) },
        ]}
        onRowClick={row => setSelectedMission(row as Mission)}
      />
      {selectedMission && (
        <MissionDetail
          mission={selectedMission}
          onClose={() => setSelectedMission(null)}
        />
      )}
    </div>
  )
}
