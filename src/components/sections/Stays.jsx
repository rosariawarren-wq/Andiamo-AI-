import { useState, useMemo } from 'react'
import { staysData } from '../../data/stays'
import TownSearch from '../TownSearch'
import Modal from '../Modal'

const TYPES = ['All', 'Hotels', 'Boutique', 'Villas', 'Airbnb-Style', 'Resorts']
const ATTRIBUTES = ['All', 'Luxury', 'Budget-Friendly', 'Family', 'Highly Walkable']

function ScoreBar({ label, score }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[#7A82A8] text-xs w-20 flex-shrink-0">{label}</span>
      <div className="flex-1 bg-[#E8ECF5] rounded-full h-1.5">
        <div className="bg-[#E8C44A] h-1.5 rounded-full score-bar" style={{ width: `${(score / 5) * 100}%` }} />
      </div>
      <span className="text-[#1A2240] text-xs font-semibold w-4">{score}</span>
    </div>
  )
}

function StayCard({ item, onSave, isSaved, onClick }) {
  const saved = isSaved(item.id, 'stays')
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover cursor-pointer group" onClick={() => onClick(item)}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={item.img} alt={item.name} onError={e => { e.target.onerror = null; e.target.src = "https://source.unsplash.com/800x600/?italy,travel" }} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <button
          onClick={e => { e.stopPropagation(); onSave(item, 'stays') }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${saved ? 'bg-[#E8C44A] text-[#1A2240]' : 'bg-white/80 text-[#1A2240] hover:bg-[#E8C44A]'}`}
          aria-label={saved ? 'Remove from board' : 'Save to board'}
        >
          <svg className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          <span className="bg-[#E8C44A] text-[#1A2240] text-xs font-semibold px-2 py-0.5 rounded-full">{item.type}</span>
          <span className="bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">{item.attribute}</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[#7A82A8] text-xs mb-1">{item.town}, {item.region}</p>
        <h3 className="text-[#1B3A8C] font-bold text-base mb-2 line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</h3>
        <p className="text-[#3A4260] text-sm line-clamp-2 mb-3">{item.description}</p>
        <div className="space-y-1.5 mb-3">
          <ScoreBar label="Walkability" score={item.scores.walkability} />
          <ScoreBar label="Safety" score={item.scores.safety} />
          <ScoreBar label="Family" score={item.scores.family} />
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-[#E8ECF5]">
          <span className="text-[#7A82A8] text-sm">from</span>
          <span className="text-[#1B3A8C] font-bold text-lg">{item.price}<span className="text-[#7A82A8] text-xs font-normal">/night</span></span>
        </div>
      </div>
    </div>
  )
}

export default function Stays({ addItem, removeItem, isSaved }) {
  const [type, setType] = useState('All')
  const [attribute, setAttribute] = useState('All')
  const [search, setSearch] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)

  const filtered = useMemo(() => {
    return staysData.filter(item => {
      const matchType = type === 'All' || item.type === type
      const matchAttr = attribute === 'All' || item.attribute === attribute
      const matchSearch = !search || item.town?.toLowerCase().includes(search.toLowerCase()) || item.name?.toLowerCase().includes(search.toLowerCase()) || item.region?.toLowerCase().includes(search.toLowerCase())
      return matchType && matchAttr && matchSearch
    })
  }, [type, attribute, search])

  const handleSave = (item, btype) => {
    if (isSaved(item.id, btype)) removeItem(item.id, btype)
    else addItem({ ...item, btype })
  }

  return (
    <section className="section-container">
      <div className="mb-8">
        <h2 className="text-[#1B3A8C] text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Where to Stay</h2>
        <p className="text-[#7A82A8]">From trullo sleeps to Michelin-starred hotel retreats</p>
      </div>

      <div className="mb-6">
        <TownSearch placeholder="Search accommodations by city..." onSelect={setSearch} onChange={setSearch} />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-3 no-scrollbar">
        {TYPES.map(t => (
          <button key={t} onClick={() => setType(t)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] ${type === t ? 'bg-[#1B3A8C] text-white' : 'bg-white text-[#3A4260] hover:bg-[#E8ECF5] border border-[#E8ECF5]'}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
        {ATTRIBUTES.map(a => (
          <button key={a} onClick={() => setAttribute(a)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] ${attribute === a ? 'bg-[#E8C44A] text-[#1A2240]' : 'bg-white text-[#3A4260] hover:bg-[#E8ECF5] border border-[#E8ECF5]'}`}>
            {a}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[#7A82A8]">
          <div className="text-4xl mb-3">🏨</div>
          <p className="text-lg font-medium">No stays found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => (
            <StayCard key={item.id} item={item} onSave={handleSave} isSaved={isSaved} onClick={setSelectedItem} />
          ))}
        </div>
      )}

      {selectedItem && (
        <Modal item={selectedItem} btype="stays" onClose={() => setSelectedItem(null)} onSave={handleSave} isSaved={isSaved} />
      )}
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </section>
  )
}
