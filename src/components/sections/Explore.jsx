import { useState, useMemo } from 'react'
import { exploreData } from '../../data/explore'
import TownSearch from '../TownSearch'
import PlacesResults from '../PlacesResults'
import Modal from '../Modal'
import { usePlacesSearch } from '../../hooks/usePlacesSearch'

const REGIONS = ['All', 'Sicily', 'Tuscany', 'Rome', 'Venice', 'Amalfi', 'Milan', 'Cinque Terre', 'Puglia', 'Sardinia']
const TYPES = ['All', 'Popular', 'Hidden Gems', 'Nature', 'Culture', 'Food & Wine', 'Adventure']

function ExploreCard({ item, onSave, isSaved, onClick }) {
  const saved = isSaved(item.id, 'explore')
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover cursor-pointer group" onClick={() => onClick(item)}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.img}
          alt={item.name}
          onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${encodeURIComponent(item.name)}/800/600` }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <button
          onClick={e => { e.stopPropagation(); onSave(item, 'explore') }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all shadow-md ${saved ? 'bg-[#E8C44A] text-[#1A2240]' : 'bg-white/90 text-[#1A2240] hover:bg-[#E8C44A]'}`}
          aria-label={saved ? 'Remove from board' : 'Save to board'}
        >
          <svg className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          <span className="bg-[#E8C44A] text-[#1A2240] text-xs font-semibold px-2.5 py-1 rounded-full shadow">{item.type}</span>
          {item.price && <span className="bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">{item.price}</span>}
        </div>
      </div>
      <div className="p-4">
        <p className="text-[#7A82A8] text-xs mb-1">{item.town}, {item.region}</p>
        <h3 className="text-[#1B3A8C] font-bold text-base mb-2 line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</h3>
        <p className="text-[#3A4260] text-sm line-clamp-2 mb-3">{item.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-[#E8C44A]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold text-[#1A2240] text-sm">{item.rating}</span>
            <span className="text-[#7A82A8] text-xs">({item.reviewCount?.toLocaleString()})</span>
          </div>
          <div className="flex gap-1">
            {item.tags?.slice(0, 2).map(t => (
              <span key={t} className="bg-[#E8ECF5] text-[#3A4260] text-xs px-2 py-0.5 rounded-full">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Explore({ addItem, removeItem, isSaved }) {
  const [region, setRegion] = useState('All')
  const [type, setType] = useState('All')
  const [search, setSearch] = useState('')
  const [selectedTown, setSelectedTown] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)

  const { results: placesResults, loading: placesLoading } = usePlacesSearch(selectedTown, 'tourist attractions')

  const filtered = useMemo(() => {
    if (selectedTown) return []
    return exploreData.filter(item => {
      const matchRegion = region === 'All' || item.region === region
      const matchType = type === 'All' || item.type === type || item.popularity === type
      const matchSearch = !search || item.town?.toLowerCase().includes(search.toLowerCase()) || item.name?.toLowerCase().includes(search.toLowerCase()) || item.region?.toLowerCase().includes(search.toLowerCase())
      return matchRegion && matchType && matchSearch
    })
  }, [region, type, search, selectedTown])

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
      btype: 'explore'
    }
    if (isSaved(item.id, 'explore')) removeItem(item.id, 'explore')
    else addItem(item)
  }

  const handleTownSelect = (town) => {
    setSelectedTown(town)
    setSearch(town)
  }

  const handleSearchChange = (val) => {
    setSearch(val)
    if (!val) setSelectedTown('')
  }

  const handleClearPlaces = () => {
    setSelectedTown('')
    setSearch('')
  }

  return (
    <section className="section-container">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#1B3A8C]/10">
            <svg className="w-5 h-5 text-[#1B3A8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
            </svg>
          </span>
          <div>
            <h2 className="text-[#1B3A8C] text-3xl font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Explore Italy</h2>
            <p className="text-[#7A82A8] text-sm mt-0.5">Search any Italian city for live results, or browse our curated picks</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <TownSearch
          placeholder="Search any city in Italy for live results..."
          onSelect={handleTownSelect}
          onChange={handleSearchChange}
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
          onClear={handleClearPlaces}
        />
      ) : (
        <>
          <div className="flex gap-2 overflow-x-auto pb-2 mb-3 no-scrollbar">
            {REGIONS.map(r => (
              <button key={r} onClick={() => setRegion(r)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px] ${region === r ? 'bg-[#1B3A8C] text-white shadow-md' : 'bg-white text-[#3A4260] hover:bg-[#E8ECF5] border border-[#E8ECF5]'}`}>
                {r}
              </button>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
            {TYPES.map(t => (
              <button key={t} onClick={() => setType(t)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px] ${type === t ? 'bg-[#E8C44A] text-[#1A2240] shadow-md' : 'bg-white text-[#3A4260] hover:bg-[#E8ECF5] border border-[#E8ECF5]'}`}>
                {t}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-[#7A82A8]">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-lg font-medium">No results found</p>
              <p className="text-sm mt-1">Try adjusting your filters or search a specific city above</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map(item => (
                <ExploreCard key={item.id} item={item} onSave={handleSave} isSaved={isSaved} onClick={setSelectedItem} />
              ))}
            </div>
          )}
        </>
      )}

      {selectedItem && (
        <Modal item={selectedItem} btype="explore" onClose={() => setSelectedItem(null)} onSave={handleSave} isSaved={isSaved} />
      )}
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </section>
  )
}
