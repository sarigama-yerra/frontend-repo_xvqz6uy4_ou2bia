import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Workouts from './components/Workouts'
import Logs from './components/Logs'

function App() {
  const [section, setSection] = useState('home')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Header onNavigate={setSection} />
      {section === 'home' && (
        <>
          <Hero onGetStarted={() => setSection('workouts')} />
          <Workouts />
          <Logs />
          <footer className="py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-slate-500">
              Built with care — Track. Train. Transform.
            </div>
          </footer>
        </>
      )}
      {section === 'workouts' && (
        <>
          <Hero onGetStarted={() => setSection('logs')} />
          <Workouts />
        </>
      )}
      {section === 'logs' && (
        <>
          <Hero onGetStarted={() => setSection('workouts')} />
          <Logs />
        </>
      )}
    </div>
  )
}

export default App
