import { useState, useMemo } from 'react'
import { beachesData } from '../../data/beaches'
import TownSearch from '../TownSearch'
import PlacesResults from '../PlacesResults'
import Modal from '../Modal'
import { usePlacesSearch } from '../../hooks/usePlacesSearch'

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
        <img
          src={item.img}
          alt={item.name}
          onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${encodeURIComponent(item.name)}/800/600` }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <button
          onClick={e => { e.stopPropagation(); onSave(item, 'beaches') }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all shadow-md ${saved ? 'bg-[#E8C44A] text-[#1A2240]' : 'bg-white/90 text-[#1A2240] hover:bg-[#E8C44A]'}`}
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
  const [search, setSearch] = useState('')
  const [selectedTown, setSelectedTown] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)

  const { results: placesResults, loading: placesLoading } = usePlacesSearch(selectedTown, 'beach spiaggia')

  const filtered = useMemo(() => {
    if (selectedTown) return []
    return beachesData.filter(item => {
      if (tab === 'All') return true
      if (tab === 'Family Friendly') return item.scores.family >= 4
      if (tab === 'Best Nightlife') return item.scores.nightlife >= 4
      if (tab === 'Hidden Spots') return item.filter === 'Hidden Spots'
      if (tab === 'Beach Clubs') return item.filter === 'Beach Clubs'
      return true
    })
  }, [tab, selectedTown])

  const handleSave = (item, btype) => {
    if (isSaved(item.id, btype)) removeItem(item.id, btype)
    else addItem({ ...item, btype })
  }

  const handlePlacesSave = (place) => {
    const item = {
      id: place.place_id,
      name: place.name,
      description: place.formatted_address,
      img: place.photos?.[0]?.photo_reference
        ? `/api/places-photo?ref=${encodeURIComponent(place.photos[0].photo_reference)}&maxWidth=800`
        : `https://picsum.photos/seed/${encodeURIComponent(place.name)}/800/600`,
      rating: place.rating,
      btype: 'beaches'
    }
    if (isSaved(item.id, 'beaches')) removeItem(item.id, 'beaches')
    else addItem(item)
  }

  return (
    <section className="section-container">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#1B3A8C]/10">
            <svg className="w-5 h-5 text-[#1B3A8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </span>
          <div>
            <h2 className="text-[#1B3A8C] text-3xl font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Beaches</h2>
            <p className="text-[#7A82A8] text-sm mt-0.5">Search any coastal town for beaches, or browse curated shores</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <TownSearch
          placeholder="Search beaches near any Italian town..."
          onSelect={(t) => { setSelectedTown(t); setSearch(t) }}
          onChange={(v) => { setSearch(v); if (!v) setSelectedTown('') }}
          value={search}
        />
      </div>

      {selectedTown ? (
        <PlacesResults
          town={selectedTown}
          results={placesResults}
          loading={placesLoading}
          onSave={handlePlacesSave}
          isSaved={isSaved}
          onClear={() => { setSelectedTown(''); setSearch('') }}
        />
      ) : (
        <>
          <div className="flex gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px] ${tab === t ? 'bg-[#1B3A8C] text-white shadow-md' : 'bg-white text-[#3A4260] hover:bg-[#E8ECF5] border border-[#E8ECF5]'}`}>
                {t}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(item => (
              <BeachCard key={item.id} item={item} onSave={handleSave} isSaved={isSaved} onClick={setSelectedItem} />
            ))}
          </div>
        </>
      )}

      {selectedItem && (
        <Modal item={selectedItem} btype="beaches" onClose={() => setSelectedItem(null)} onSave={handleSave} isSaved={isSaved} />
      )}
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </section>
  )
}
