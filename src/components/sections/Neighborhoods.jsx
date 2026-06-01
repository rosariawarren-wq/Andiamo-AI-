import { useState, useMemo } from 'react'
import { neighborhoodsData } from '../../data/neighborhoods'
import TownSearch from '../TownSearch'
import Modal from '../Modal'

const TABS = ['All', 'Luxury', 'Local & Authentic', 'Lively & Social', 'Quiet & Calm']

const VIBE_COLORS = {
  'Luxury': 'bg-purple-100 text-purple-700',
  'Local & Authentic': 'bg-green-100 text-green-700',
  'Lively & Social': 'bg-orange-100 text-orange-700',
  'Quiet & Calm': 'bg-blue-100 text-blue-700',
}

function ScoreBar({ label, score }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[#7A82A8] text-xs w-16 flex-shrink-0">{label}</span>
      <div className="flex-1 bg-[#E8ECF5] rounded-full h-1.5">
        <div className="bg-[#E8C44A] h-1.5 rounded-full" style={{ width: `${(score / 5) * 100}%` }} />
      </div>
      <span className="text-[#1A2240] text-xs font-semibold w-4">{score}</span>
    </div>
  )
}

function NeighborhoodCard({ item, onSave, isSaved, onClick }) {
  const saved = isSaved(item.id, 'neighborhoods')
  const vibeClass = VIBE_COLORS[item.vibe] || 'bg-[#E8ECF5] text-[#3A4260]'
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover cursor-pointer group" onClick={() => onClick(item)}>
      <div className="relative aspect-[16/9] overflow-hidden">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <button
          onClick={e => { e.stopPropagation(); onSave(item, 'neighborhoods') }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${saved ? 'bg-[#E8C44A] text-[#1A2240]' : 'bg-white/80 text-[#1A2240] hover:bg-[#E8C44A]'}`}
          aria-label={saved ? 'Remove from board' : 'Save to board'}
        >
          <svg className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
        <div className="absolute bottom-3 left-3">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${vibeClass}`}>{item.vibe}</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[#7A82A8] text-xs mb-1">{item.city}</p>
        <h3 className="text-[#1B3A8C] font-bold text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</h3>
        <p className="text-[#3A4260] text-sm line-clamp-2 mb-3">{item.description}</p>
        <div className="bg-[#F4F6FB] rounded-xl p-3 mb-3">
          <p className="text-[#7A82A8] text-xs mb-1">Best for</p>
          <p className="text-[#1A2240] text-sm">{item.bestFor}</p>
        </div>
        <div className="space-y-1.5">
          <ScoreBar label="Location" score={item.scores.location} />
          <ScoreBar label="Value" score={item.scores.value} />
          <ScoreBar label="Safety" score={item.scores.safety} />
        </div>
      </div>
    </div>
  )
}

export default function Neighborhoods({ addItem, removeItem, isSaved }) {
  const [tab, setTab] = useState('All')
  const [search, setSearch] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)

  const filtered = useMemo(() => {
    return neighborhoodsData.filter(item => {
      const matchTab = tab === 'All' || item.vibe === tab
      const matchSearch = !search || item.city?.toLowerCase().includes(search.toLowerCase()) || item.name?.toLowerCase().includes(search.toLowerCase())
      return matchTab && matchSearch
    })
  }, [tab, search])

  const handleSave = (item, btype) => {
    if (isSaved(item.id, btype)) removeItem(item.id, btype)
    else addItem({ ...item, btype })
  }

  return (
    <section className="section-container">
      <div className="mb-8">
        <h2 className="text-[#1B3A8C] text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Neighborhoods</h2>
        <p className="text-[#7A82A8]">Where to stay — the city guide beyond the tourist map</p>
      </div>

      <div className="mb-6">
        <TownSearch placeholder="Search by city..." onSelect={setSearch} onChange={setSearch} />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] ${tab === t ? 'bg-[#1B3A8C] text-white' : 'bg-white text-[#3A4260] hover:bg-[#E8ECF5] border border-[#E8ECF5]'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <NeighborhoodCard key={item.id} item={item} onSave={handleSave} isSaved={isSaved} onClick={setSelectedItem} />
        ))}
      </div>

      {selectedItem && (
        <Modal item={selectedItem} btype="neighborhoods" onClose={() => setSelectedItem(null)} onSave={handleSave} isSaved={isSaved} />
      )}
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </section>
  )
}
