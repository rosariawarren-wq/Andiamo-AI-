import { useState } from 'react'
import { photoSpots, photographers, italianCreators, events } from '../../data/creators'
import Modal from '../Modal'

const TABS = ['Photo Spots', 'Photographers', 'Italian Creators', 'Events & Festivals']

function PhotoSpotCard({ item, onSave, isSaved, onClick }) {
  const saved = isSaved(item.id, 'creators')
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover cursor-pointer group" onClick={() => onClick(item)}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={item.img} alt={item.name} onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${encodeURIComponent(e.target.alt || "italy")}/800/600` }} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <button
          onClick={e => { e.stopPropagation(); onSave(item, 'creators') }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${saved ? 'bg-[#E8C44A] text-[#1A2240]' : 'bg-white/80 text-[#1A2240] hover:bg-[#E8C44A]'}`}
        >
          <svg className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
        <div className="absolute top-3 left-3">
          <span className="bg-[#E8C44A] text-[#1A2240] font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center">#{item.number}</span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-base line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</h3>
          <p className="text-white/80 text-xs">{item.region}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[#3A4260] text-sm line-clamp-2 mb-3">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-[#7A82A8] text-xs">{item.bestTime}</span>
          <span className="text-[#1B3A8C] text-xs font-medium">{item.hashtag}</span>
        </div>
      </div>
    </div>
  )
}

function PhotographerCard({ item }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover">
      <div className="relative aspect-square overflow-hidden">
        <img src={item.img} alt={item.name} onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${encodeURIComponent(e.target.alt || "italy")}/800/600` }} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3">
          <p className="text-white font-bold text-base">{item.name}</p>
          <p className="text-white/80 text-xs">{item.region}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="bg-[#E8ECF5] text-[#3A4260] text-xs px-2 py-1 rounded-full">{item.specialty}</span>
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-[#E8C44A]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            <span className="text-xs font-semibold text-[#1A2240]">{item.rating}</span>
          </div>
        </div>
        <p className="text-[#7A82A8] text-xs">{item.instagram}</p>
        <p className="text-[#1B3A8C] font-semibold text-sm mt-1">{item.priceRange}</p>
      </div>
    </div>
  )
}

function CreatorCard({ item }) {
  const platformColors = { IG: 'bg-pink-100 text-pink-700', YT: 'bg-red-100 text-red-700', TikTok: 'bg-black text-white' }
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover">
      <div className="relative aspect-square overflow-hidden">
        <img src={item.img} alt={item.name} onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${encodeURIComponent(e.target.alt || "italy")}/800/600` }} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 right-3 flex gap-1">
          {item.platforms.map(p => (
            <span key={p} className={`text-xs font-bold px-1.5 py-0.5 rounded ${platformColors[p] || 'bg-white text-black'}`}>{p}</span>
          ))}
        </div>
        <div className="absolute bottom-3 left-3">
          <p className="text-white font-bold text-base">{item.name}</p>
          <p className="text-white/80 text-xs">{item.followers} followers · {item.region}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[#3A4260] text-sm line-clamp-3">{item.description}</p>
      </div>
    </div>
  )
}

function EventCard({ item }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img src={item.img} alt={item.name} onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${encodeURIComponent(e.target.alt || "italy")}/800/600` }} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="bg-[#E8C44A] text-[#1A2240] text-xs font-semibold px-2 py-1 rounded-full">{item.month}</span>
          <span className="bg-[#1B3A8C] text-white text-xs font-semibold px-2 py-1 rounded-full">{item.eventType}</span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-base" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</h3>
          <p className="text-white/80 text-xs">{item.region}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[#3A4260] text-sm leading-relaxed">{item.description}</p>
      </div>
    </div>
  )
}

export default function Creators({ addItem, removeItem, isSaved }) {
  const [tab, setTab] = useState('Photo Spots')
  const [selectedItem, setSelectedItem] = useState(null)

  const handleSave = (item, btype) => {
    if (isSaved(item.id, btype)) removeItem(item.id, btype)
    else addItem({ ...item, btype })
  }

  return (
    <section className="section-container">
      <div className="mb-8">
        <h2 className="text-[#1B3A8C] text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Creators & Photography</h2>
        <p className="text-[#7A82A8]">Italy's best photo spots, photographers and creators to follow</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] ${tab === t ? 'bg-[#1B3A8C] text-white' : 'bg-white text-[#3A4260] hover:bg-[#E8ECF5] border border-[#E8ECF5]'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Photo Spots' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {photoSpots.map(item => (
            <PhotoSpotCard key={item.id} item={item} onSave={handleSave} isSaved={isSaved} onClick={setSelectedItem} />
          ))}
        </div>
      )}
      {tab === 'Photographers' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {photographers.map(item => <PhotographerCard key={item.id} item={item} />)}
        </div>
      )}
      {tab === 'Italian Creators' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {italianCreators.map(item => <CreatorCard key={item.id} item={item} />)}
        </div>
      )}
      {tab === 'Events & Festivals' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map(item => <EventCard key={item.id} item={item} />)}
        </div>
      )}

      {selectedItem && (
        <Modal item={selectedItem} btype="creators" onClose={() => setSelectedItem(null)} onSave={handleSave} isSaved={isSaved} />
      )}
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </section>
  )
}
