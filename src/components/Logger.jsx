import { useEffect, useState } from 'react'

function Logger() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ date: '', workout_title: '', notes: '', duration_minutes: '' })
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchLogs = async () => {
    try {
      const res = await fetch(`${base}/api/logs`)
      const data = await res.json()
      setLogs(data.items || [])
    } catch (e) {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchLogs() }, [])

  const submit = async (e) => {
    e.preventDefault()
    const payload = {
      date: form.date,
      workout_title: form.workout_title,
      notes: form.notes || undefined,
      duration_minutes: form.duration_minutes ? Number(form.duration_minutes) : undefined,
    }
    const res = await fetch(`${base}/api/logs`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (res.ok) {
      setForm({ date: '', workout_title: '', notes: '', duration_minutes: '' })
      fetchLogs()
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Quick Log</h2>
          <form onSubmit={submit} className="space-y-4 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-5 rounded-2xl border border-slate-200/70 dark:border-slate-700/60">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-300 mb-1">Date</label>
                <input type="date" required value={form.date} onChange={(e)=>setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-300/70 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80"/>
              </div>
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-300 mb-1">Workout</label>
                <input placeholder="e.g., Upper Body Blast" required value={form.workout_title} onChange={(e)=>setForm({ ...form, workout_title: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-300/70 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80"/>
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-600 dark:text-slate-300 mb-1">Duration (min)</label>
              <input type="number" min="1" placeholder="45" value={form.duration_minutes} onChange={(e)=>setForm({ ...form, duration_minutes: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-300/70 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80"/>
            </div>
            <div>
              <label className="block text-sm text-slate-600 dark:text-slate-300 mb-1">Notes</label>
              <textarea rows="3" placeholder="How did it feel?" value={form.notes} onChange={(e)=>setForm({ ...form, notes: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-slate-300/70 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80"/>
            </div>
            <button className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">Save Log</button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Recent Logs</h2>
          <div className="space-y-3">
            {loading ? (
              <p className="text-slate-500">Loading logs...</p>
            ) : logs.length === 0 ? (
              <p className="text-slate-500">No logs yet. Add your first one!</p>
            ) : (
              logs.map((l) => (
                <div key={l.id || l._id} className="rounded-xl border border-slate-200/70 dark:border-slate-700/60 p-4 bg-white/70 dark:bg-slate-900/60">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-slate-900 dark:text-white">{l.workout_title}</div>
                    <div className="text-sm text-slate-500">{l.date}</div>
                  </div>
                  {l.duration_minutes && (
                    <div className="text-sm text-slate-600 dark:text-slate-300">Duration: {l.duration_minutes} min</div>
                  )}
                  {l.notes && (
                    <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">{l.notes}</div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Logger
