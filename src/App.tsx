import { useState } from 'react'
import { Rocket, Home, List } from 'lucide-react'
import { Topbar, Footer, Content } from './_my-components/index.ts'
import type { NavItem } from './_my-components/index.ts'
import { HomePage } from './pages/HomePage.tsx'
import { MissionsPage } from './pages/MissionsPage.tsx'

import './assets/css/app.css'

type Page = 'home' | 'missions'

const NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <Home size={14} />
  },
  {
    id: 'missions',
    label: 'Missions',
    icon: <List size={14} />
  },
]

function App() {
  const [page, setPage] = useState<Page>('home')

  return (
    <div className="app-shell">
      <Topbar
        appName="Space Explorer"
        appNameClassName="main-title-font"
        logo={<Rocket size={18} strokeWidth={1.6} />}
        items={NAV_ITEMS}
        currentItem={page}
        onNavigate={id => setPage(id as Page)}
        color="rgba(14, 17, 23, 0.85)"
      />
      <main className="app-content">
        <Content className="app-content__inner">
          {page === 'home' && <HomePage />}
          {page === 'missions' && <MissionsPage />}
          <Footer
            appName="Space Explorer"
            notes={['Data & imagery sourced from NASA', 'Built with React + WebGL']}
          />
        </Content>
      </main>
    </div>
  )
}

export default App
