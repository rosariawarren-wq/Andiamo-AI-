import { useState } from 'react'
import { months, packingLists, proTip } from '../../data/weather'

const SEASONS = [
  { key: 'winter', label: 'Winter', months: ['December', 'January', 'February'], icon: '❄️' },
  { key: 'spring', label: 'Spring', months: ['March', 'April', 'May'], icon: '🌸' },
  { key: 'summer', label: 'Summer', months: ['June', 'July', 'August'], icon: '☀️' },
  { key: 'autumn', label: 'Autumn', months: ['September', 'October', 'November'], icon: '🍂' },
]

export default function Weather() {
  const [activeSeason, setActiveSeason] = useState('summer')

  const season = SEASONS.find(s => s.key === activeSeason)
  const packingList = packingLists[activeSeason] || []

  return (
    <section className="section-container">
      <div className="mb-8">
        <h2 className="text-[#1B3A8C] text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Weather & When to Go</h2>
        <p className="text-[#7A82A8]">Month-by-month guide to Italy's climate — and what to pack</p>
      </div>

      {/* Pro Tip */}
      <div className="bg-[#1B3A8C] rounded-2xl p-5 mb-8 flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🌡️</span>
        <div>
          <p className="text-[#E8C44A] font-semibold mb-1">Climate Tip</p>
          <p className="text-[#E8ECF5] text-sm leading-relaxed">{proTip}</p>
        </div>
      </div>

      {/* Monthly Grid */}
      <h3 className="text-[#1B3A8C] text-xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Month by Month</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
        {months.map(m => (
          <div key={m.month} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#1B3A8C]" style={{ fontFamily: "'Playfair Display', serif" }}>{m.month}</span>
              <span className="text-2xl">{m.emoji}</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="text-center">
                <p className="text-[#7A82A8] text-xs">High</p>
                <p className="text-[#1A2240] font-bold text-lg">{m.high}°</p>
              </div>
              <div className="w-px h-8 bg-[#E8ECF5]" />
              <div className="text-center">
                <p className="text-[#7A82A8] text-xs">Low</p>
                <p className="text-[#1A2240] font-bold text-lg">{m.low}°</p>
              </div>
              <div className="flex-1">
                <div className="bg-[#E8ECF5] rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#1B3A8C] to-[#E8C44A] h-2 rounded-full"
                    style={{ width: `${Math.max(15, ((m.high - 5) / 35) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
            <p className="text-[#3A4260] text-xs leading-relaxed line-clamp-3">{m.description}</p>
          </div>
        ))}
      </div>

      {/* Packing Lists */}
      <h3 className="text-[#1B3A8C] text-xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Packing Lists by Season</h3>
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
        {SEASONS.map(s => (
          <button key={s.key} onClick={() => setActiveSeason(s.key)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors min-h-[44px] ${activeSeason === s.key ? 'bg-[#1B3A8C] text-white' : 'bg-white text-[#3A4260] hover:bg-[#E8ECF5] border border-[#E8ECF5]'}`}>
            <span>{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {season && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{season.icon}</span>
            <h4 className="text-[#1B3A8C] font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
              {season.label} ({season.months.join(', ')})
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {packingList.map(item => (
              <span key={item} className="bg-[#E8ECF5] text-[#1A2240] text-sm px-3 py-1.5 rounded-full font-medium">
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </section>
  )
}
