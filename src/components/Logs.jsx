import { useEffect, useState } from 'react'

function Logs() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ date: '', workout_title: '', duration_minutes: '', notes: '' })
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const loadLogs = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${base}/api/logs`)
      const data = await res.json()
      setLogs(data.items || [])
    } catch (e) {
      setError('Could not load logs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadLogs()
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const payload = {
        date: form.date || new Date().toISOString().slice(0, 10),
        workout_title: form.workout_title || 'Untitled Workout',
        notes: form.notes || undefined,
        duration_minutes: form.duration_minutes ? Number(form.duration_minutes) : undefined,
      }
      const res = await fetch(`${base}/api/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to save log')
      setForm({ date: '', workout_title: '', duration_minutes: '', notes: '' })
      loadLogs()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16" id="logs">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Log a session</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">Record what you completed today to keep your streak alive.</p>
          <form onSubmit={submit} className="space-y-4 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-5 rounded-2xl border border-slate-200/70 dark:border-slate-700/60">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Date</label>
                <input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} className="w-full rounded-xl border border-slate-300/70 dark:border-slate-600 bg-white/80 dark:bg-slate-800 px-3 py-2"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Duration (min)</label>
                <input type="number" min="1" value={form.duration_minutes} onChange={e=>setForm({...form, duration_minutes:e.target.value})} className="w-full rounded-xl border border-slate-300/70 dark:border-slate-600 bg-white/80 dark:bg-slate-800 px-3 py-2" placeholder="45"/>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Workout title</label>
              <input value={form.workout_title} onChange={e=>setForm({...form, workout_title:e.target.value})} className="w-full rounded-xl border border-slate-300/70 dark:border-slate-600 bg-white/80 dark:bg-slate-800 px-3 py-2" placeholder="Upper Body Blast"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Notes</label>
              <textarea value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} className="w-full rounded-xl border border-slate-300/70 dark:border-slate-600 bg-white/80 dark:bg-slate-800 px-3 py-2" rows="3" placeholder="Felt strong on the last set..."/>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/20 transition">Save log</button>
          </form>
        </div>
        <div>
          <div className="flex items-end justify-between mb-4">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Recent activity</h3>
            <button onClick={loadLogs} className="text-sm px-3 py-1.5 rounded-lg border border-slate-300/70 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200">Refresh</button>
          </div>
          {loading ? (
            <p className="text-slate-500">Loading logs...</p>
          ) : logs.length === 0 ? (
            <p className="text-slate-500">No logs yet — add your first one!</p>
          ) : (
            <ul className="space-y-3">
              {logs.map((l) => (
                <li key={l.id || l._id} className="rounded-2xl border border-slate-200/70 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{l.workout_title}</p>
                      <p className="text-sm text-slate-500">{l.date} {l.duration_minutes ? `• ${l.duration_minutes} min` : ''}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">Logged</span>
                  </div>
                  {l.notes && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{l.notes}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

export default Logs
