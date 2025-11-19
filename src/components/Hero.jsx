function Hero({ onGetStarted }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -inset-[10rem] bg-gradient-to-tr from-emerald-400/30 via-cyan-400/20 to-indigo-400/20 blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Build your strongest self with FitForge
            </h1>
            <p className="mt-5 text-lg text-slate-600 dark:text-slate-300">
              Plan sessions, follow curated workouts, and track your progress — all in one clean, fast experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={onGetStarted} className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/20 transition">Get started</button>
              <a href="#workouts" className="px-5 py-3 rounded-xl border border-slate-300/70 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition">Browse workouts</a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 p-6 shadow-2xl">
              <div className="grid grid-cols-3 gap-3 h-full">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center justify-center text-slate-300 text-sm">{i % 3 === 0 ? 'Push' : i % 3 === 1 ? 'Core' : 'Legs'}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
