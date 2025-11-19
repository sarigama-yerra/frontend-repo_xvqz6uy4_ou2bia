import { useEffect, useState } from 'react'

function Workouts() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/workouts`)
        const data = await res.json()
        setWorkouts(data.items || [])
      } catch (e) {
        setError('Could not load workouts')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <p className="text-slate-500">Loading workouts...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <section id="workouts" className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Featured Workouts</h2>
        <span className="text-sm text-slate-500">{workouts.length} plans</span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((w) => (
          <div key={w.id || w.title} className="rounded-2xl border border-slate-200/70 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-5 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{w.title}</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">{w.difficulty || 'Beginner'}</span>
            </div>
            <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
              {w.exercises?.slice(0, 4).map((ex, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"/> {ex.name} — {ex.sets} x {ex.reps}
                </li>
              ))}
              {!w.exercises?.length && (
                <li className="text-slate-500">No exercises listed</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Workouts
