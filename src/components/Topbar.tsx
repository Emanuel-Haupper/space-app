import { Rocket, Home, List } from 'lucide-react'
import './Topbar.css'

type Page = 'home' | 'missions'

type TopbarProps = {
  color: string
  label: string
  currentPage: Page
  onNavigate: (page: Page) => void
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function Topbar({ color, label, currentPage, onNavigate }: TopbarProps) {
  return (
    <header className="topbar" style={{ background: color }}>
      <span onClick={() => { onNavigate('home'); scrollToTop(); }} className="topbar__label">
        <Rocket size={18} strokeWidth={1.6} />
        {label}
      </span>
      <nav className="topbar__nav">
        <button
          className={`topbar__link${currentPage === 'home' ? ' topbar__link--active' : ''}`}
          onClick={() => { onNavigate('home'); scrollToTop(); }}
        >
          <Home size={14} />
          Home
        </button>
        <button
          className={`topbar__link${currentPage === 'missions' ? ' topbar__link--active' : ''}`}
          onClick={() => { onNavigate('missions'); scrollToTop(); }}
        >
          <List size={14} />
          Missions
        </button>
      </nav>
    </header>
  )
}
