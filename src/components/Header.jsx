import { useState } from 'react'

function Header({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-700/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 shadow-inner shadow-emerald-700/30"></div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">FitForge</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-slate-600 dark:text-slate-300">
            <button onClick={() => onNavigate('workouts')} className="hover:text-slate-900 dark:hover:text-white">Workouts</button>
            <button onClick={() => onNavigate('logs')} className="hover:text-slate-900 dark:hover:text-white">Logs</button>
            <a href="/test" className="hover:text-slate-900 dark:hover:text-white">System</a>
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-300/70 dark:border-slate-600 text-slate-700 dark:text-slate-200">
            <span className="sr-only">Menu</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-2">
            <button onClick={() => { onNavigate('workouts'); setMenuOpen(false) }} className="py-2 text-left px-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">Workouts</button>
            <button onClick={() => { onNavigate('logs'); setMenuOpen(false) }} className="py-2 text-left px-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">Logs</button>
            <a href="/test" className="py-2 px-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">System</a>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
