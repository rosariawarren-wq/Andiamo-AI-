import { emergencyNumbers, safetyCategories } from '../../data/safety'

export default function Safety() {
  return (
    <section className="section-container">
      <div className="mb-8">
        <h2 className="text-[#1B3A8C] text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Safety in Italy</h2>
        <p className="text-[#7A82A8]">Essential safety information for a worry-free Italian adventure</p>
      </div>

      {/* Emergency Numbers — pinned at top */}
      <div className="bg-red-600 rounded-2xl p-5 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🚨</span>
          <h3 className="text-white font-bold text-lg">Emergency Numbers</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {emergencyNumbers.map(n => (
            <a
              key={n.number}
              href={`tel:${n.number}`}
              className="bg-white/15 hover:bg-white/25 rounded-xl p-3 transition-colors text-center"
            >
              <p className="text-white font-bold text-2xl mb-1">{n.number}</p>
              <p className="text-white font-semibold text-sm">{n.label}</p>
              <p className="text-white/80 text-xs mt-1 leading-tight">{n.description}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Safety Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {safetyCategories.map(cat => (
          <div key={cat.id} className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{cat.icon}</span>
              <h3 className="text-[#1B3A8C] font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                {cat.title}
              </h3>
            </div>
            <ul className="space-y-2.5">
              {cat.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#E8C44A]/30 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-[#C9A020]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-[#3A4260] text-sm leading-relaxed">{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom disclaimer */}
      <div className="mt-8 bg-[#E8ECF5] rounded-2xl p-5">
        <p className="text-[#3A4260] text-sm text-center leading-relaxed">
          Italy is generally a very safe country for tourists. Exercise normal caution as you would in any large European city. The information above is provided for guidance — always consult official travel advisories for the most current information.
        </p>
      </div>
    </section>
  )
}
