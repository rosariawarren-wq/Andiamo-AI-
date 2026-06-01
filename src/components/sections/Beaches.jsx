import { useState, useMemo } from 'react'
import { beachesData } from '../../data/beaches'
import Modal from '../Modal'

const TABS = ['All', 'Family Friendly', 'Best Nightlife', 'Hidden Spots', 'Beach Clubs']

function ScoreBar({ label, score }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[#7A82A8] text-xs w-16 flex-shrink-0">{label}</span>
      <div className="flex-1 bg-[#E8ECF5] rounded-full h-1.5">
        <div className="bg-[#E8C44A] h-1.5 rounded-full score-bar" style={{ width: `${(score / 5) * 100}%` }} />
      </div>
      <span className="text-[#1A2240] text-xs font-semibold w-4">{score}</span>
    </div>
  )
}

function BeachCard({ item, onSave, isSaved, onClick }) {
  const saved = isSaved(item.id, 'beaches')
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover cursor-pointer group" onClick={() => onClick(item)}>
      <div className="relative aspect-video overflow-hidden">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <button
          onClick={e => { e.stopPropagation(); onSave(item, 'beaches') }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${saved ? 'bg-[#E8C44A] text-[#1A2240]' : 'bg-white/80 text-[#1A2240] hover:bg-[#E8C44A]'}`}
          aria-label={saved ? 'Remove from board' : 'Save to board'}
        >
          <svg className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</h3>
          <p className="text-white/80 text-sm">{item.region}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[#3A4260] text-sm line-clamp-2 mb-4">{item.description}</p>
        <div className="space-y-2">
          <ScoreBar label="Overall" score={item.scores.overall} />
          <ScoreBar label="Family" score={item.scores.family} />
          <ScoreBar label="Nightlife" score={item.scores.nightlife} />
          <ScoreBar label="Safety" score={item.scores.safety} />
        </div>
        {item.tags && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {item.tags.map(t => (
              <span key={t} className="bg-[#E8ECF5] text-[#3A4260] text-xs px-2 py-0.5 rounded-full">{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Beaches({ addItem, removeItem, isSaved }) {
  const [tab, setTab] = useState('All')
  const [selectedItem, setSelectedItem] = useState(null)

  const filtered = useMemo(() => {
    return beachesData.filter(item => {
      if (tab === 'All') return true
      if (tab === 'Family Friendly') return item.scores.family >= 4
      if (tab === 'Best Nightlife') return item.scores.nightlife >= 4
      if (tab === 'Hidden Spots') return item.filter === 'Hidden Spots'
      if (tab === 'Beach Clubs') return item.filter === 'Beach Clubs'
      return true
    })
  }, [tab])

  const handleSave = (item, btype) => {
    if (isSaved(item.id, btype)) removeItem(item.id, btype)
    else addItem({ ...item, btype })
  }

  return (
    <section className="section-container">
      <div className="mb-8">
        <h2 className="text-[#1B3A8C] text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Beaches</h2>
        <p className="text-[#7A82A8]">Italy's finest shores — from Sardinian crystal coves to Amalfi glamour</p>
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
          <BeachCard key={item.id} item={item} onSave={handleSave} isSaved={isSaved} onClick={setSelectedItem} />
        ))}
      </div>

      {selectedItem && (
        <Modal item={selectedItem} btype="beaches" onClose={() => setSelectedItem(null)} onSave={handleSave} isSaved={isSaved} />
      )}
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </section>
  )
}
