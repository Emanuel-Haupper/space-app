import { useState } from 'react'
import './App.css'
import { Topbar } from './components/Topbar.tsx'
import { Footer } from './components/Footer.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { MissionsPage } from './pages/MissionsPage.tsx'

type Page = 'home' | 'missions'

function App() {
  const [page, setPage] = useState<Page>('home')

  return (
    <div className="app-shell">
      <Topbar
        color="rgba(14, 17, 23, 0.85)"
        label="Space Explorer"
        currentPage={page}
        onNavigate={setPage}
      />
      <main className="app-content">
        <div className="app-content__inner">
          {page === 'home' && <HomePage />}
          {page === 'missions' && <MissionsPage />}
          <Footer />
        </div>
      </main>
    </div>
  )
}

export default App
