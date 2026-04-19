import { Rocket, Home, List } from 'lucide-react'
import './Topbar.css'

type Page = 'home' | 'missions'

type TopbarProps = {
  color: string
  label: string
  currentPage: Page
  onNavigate: (page: Page) => void
}

export function Topbar({ color, label, currentPage, onNavigate }: TopbarProps) {
  return (
    <header className="topbar" style={{ background: color }}>
      <span onClick={() => onNavigate('home')} className="topbar__label">
        <Rocket size={16} strokeWidth={2.5} />
        {label}
      </span>
      <nav className="topbar__nav">
        <button
          className={`topbar__link${currentPage === 'home' ? ' topbar__link--active' : ''}`}
          onClick={() => onNavigate('home')}
        >
          <Home size={14} />
          Home
        </button>
        <button
          className={`topbar__link${currentPage === 'missions' ? ' topbar__link--active' : ''}`}
          onClick={() => onNavigate('missions')}
        >
          <List size={14} />
          Missions
        </button>
      </nav>
    </header>
  )
}
