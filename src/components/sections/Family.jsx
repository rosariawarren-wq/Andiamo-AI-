import { useState } from 'react'
import { familyActivities, familyRentals, familyStays, familyTips } from '../../data/family'
import Modal from '../Modal'

const TABS = ['Kid-Friendly Activities', 'Equipment Rentals', 'Family Stays', 'Tips & Insights']

function ActivityCard({ item, onSave, isSaved, onClick }) {
  const saved = isSaved(item.id, 'family')
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover cursor-pointer group" onClick={() => onClick(item)}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <button
          onClick={e => { e.stopPropagation(); onSave(item, 'family') }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${saved ? 'bg-[#E8C44A] text-[#1A2240]' : 'bg-white/80 text-[#1A2240] hover:bg-[#E8C44A]'}`}
        >
          <svg className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
        <span className="absolute top-3 left-3 bg-[#E8C44A] text-[#1A2240] text-xs font-bold px-2 py-1 rounded-full">Age {item.ageRange}</span>
      </div>
      <div className="p-4">
        <p className="text-[#7A82A8] text-xs mb-1">{item.region}</p>
        <h3 className="text-[#1B3A8C] font-bold text-base mb-2 line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</h3>
        <p className="text-[#3A4260] text-sm line-clamp-2 mb-3">{item.description}</p>
        <p className="text-[#1B3A8C] font-semibold">{item.price}</p>
      </div>
    </div>
  )
}

function RentalCard({ item }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[#1B3A8C] font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</h3>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-[#E8C44A]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          <span className="font-semibold text-sm text-[#1A2240]">{item.rating}</span>
        </div>
      </div>
      <p className="text-[#7A82A8] text-xs mb-2">{item.coverage}</p>
      <p className="text-[#3A4260] text-sm mb-3">{item.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {item.items.map(i => (
          <span key={i} className="bg-[#E8ECF5] text-[#3A4260] text-xs px-2 py-1 rounded-full">{i}</span>
        ))}
      </div>
      <a href={`https://${item.website}`} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 border-2 border-[#1B3A8C] text-[#1B3A8C] hover:bg-[#1B3A8C] hover:text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors w-full">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        Visit Website
      </a>
    </div>
  )
}

function StayCard({ item }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 bg-[#E8C44A] text-[#1A2240] text-xs font-semibold px-2 py-1 rounded-full">{item.type}</span>
      </div>
      <div className="p-4">
        <p className="text-[#7A82A8] text-xs mb-1">{item.region}</p>
        <h3 className="text-[#1B3A8C] font-bold text-base mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</h3>
        <p className="text-[#3A4260] text-sm line-clamp-2 mb-3">{item.description}</p>
        <p className="text-[#1B3A8C] font-semibold">from {item.price}<span className="text-[#7A82A8] text-xs font-normal">/night</span></p>
      </div>
    </div>
  )
}

function TipCard({ item }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-[#E8C44A]">
      <h4 className="text-[#1B3A8C] font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</h4>
      <p className="text-[#3A4260] text-sm leading-relaxed">{item.description}</p>
    </div>
  )
}

export default function Family({ addItem, removeItem, isSaved }) {
  const [tab, setTab] = useState('Kid-Friendly Activities')
  const [selectedItem, setSelectedItem] = useState(null)

  const handleSave = (item, btype) => {
    if (isSaved(item.id, btype)) removeItem(item.id, btype)
    else addItem({ ...item, btype })
  }

  return (
    <section className="section-container">
      <div className="mb-8">
        <h2 className="text-[#1B3A8C] text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Family Travel</h2>
        <p className="text-[#7A82A8]">Italy with children — activities, stays, rentals and essential tips</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] ${tab === t ? 'bg-[#1B3A8C] text-white' : 'bg-white text-[#3A4260] hover:bg-[#E8ECF5] border border-[#E8ECF5]'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Kid-Friendly Activities' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {familyActivities.map(item => (
            <ActivityCard key={item.id} item={item} onSave={handleSave} isSaved={isSaved} onClick={setSelectedItem} />
          ))}
        </div>
      )}
      {tab === 'Equipment Rentals' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {familyRentals.map(item => <RentalCard key={item.id} item={item} />)}
        </div>
      )}
      {tab === 'Family Stays' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {familyStays.map(item => <StayCard key={item.id} item={item} />)}
        </div>
      )}
      {tab === 'Tips & Insights' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {familyTips.map((item, i) => <TipCard key={i} item={item} />)}
        </div>
      )}

      {selectedItem && (
        <Modal item={selectedItem} btype="family" onClose={() => setSelectedItem(null)} onSave={handleSave} isSaved={isSaved} />
      )}
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </section>
  )
}
