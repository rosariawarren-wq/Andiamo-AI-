import { useState, useMemo } from 'react'
import { foodData } from '../../data/food'
import TownSearch from '../TownSearch'
import Modal from '../Modal'

const TYPES = ['All', 'Restaurants', 'Coffee & Bars', 'Bakeries', 'Wine Bars', 'Gelato', 'Street Food', 'Markets']
const ATTRIBUTES = ['All', 'Fine Dining', 'Casual', 'Local Favourite', 'Reservation Needed']

function FoodCard({ item, onSave, isSaved, onClick }) {
  const saved = isSaved(item.id, 'food')
  const priceColor = { '€': 'text-green-600', '€€': 'text-[#C9A020]', '€€€': 'text-orange-500', '€€€€': 'text-red-500' }
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover cursor-pointer group" onClick={() => onClick(item)}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <button
          onClick={e => { e.stopPropagation(); onSave(item, 'food') }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${saved ? 'bg-[#E8C44A] text-[#1A2240]' : 'bg-white/80 text-[#1A2240] hover:bg-[#E8C44A]'}`}
          aria-label={saved ? 'Remove from board' : 'Save to board'}
        >
          <svg className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          <span className="bg-[#E8C44A] text-[#1A2240] text-xs font-semibold px-2 py-0.5 rounded-full">{item.type}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-[#7A82A8] text-xs">{item.town}, {item.region}</p>
          <span className={`font-bold text-sm flex-shrink-0 ${priceColor[item.price] || 'text-[#3A4260]'}`}>{item.price}</span>
        </div>
        <h3 className="text-[#1B3A8C] font-bold text-base mb-1 line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</h3>
        <p className="text-[#7A82A8] text-xs italic mb-2">{item.specialty}</p>
        <p className="text-[#3A4260] text-sm line-clamp-2 mb-3">{item.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-[#E8C44A]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            <span className="font-semibold text-[#1A2240] text-sm">{item.rating}</span>
          </div>
          <span className="bg-[#E8ECF5] text-[#3A4260] text-xs px-2 py-0.5 rounded-full">{item.attribute}</span>
        </div>
      </div>
    </div>
  )
}

export default function Food({ addItem, removeItem, isSaved }) {
  const [type, setType] = useState('All')
  const [attribute, setAttribute] = useState('All')
  const [search, setSearch] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)

  const filtered = useMemo(() => {
    return foodData.filter(item => {
      const matchType = type === 'All' || item.type === type
      const matchAttr = attribute === 'All' || item.attribute === attribute
      const matchSearch = !search || item.town?.toLowerCase().includes(search.toLowerCase()) || item.name?.toLowerCase().includes(search.toLowerCase())
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
        <h2 className="text-[#1B3A8C] text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Food & Drink</h2>
        <p className="text-[#7A82A8]">From Michelin-starred temples to 80-year-old street food stalls</p>
      </div>

      <div className="mb-6">
        <TownSearch placeholder="Search restaurants by city..." onSelect={setSearch} onChange={setSearch} />
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
          <div className="text-4xl mb-3">🍝</div>
          <p className="text-lg font-medium">No results found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(item => (
            <FoodCard key={item.id} item={item} onSave={handleSave} isSaved={isSaved} onClick={setSelectedItem} />
          ))}
        </div>
      )}

      {selectedItem && (
        <Modal item={selectedItem} btype="food" onClose={() => setSelectedItem(null)} onSave={handleSave} isSaved={isSaved} />
      )}
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </section>
  )
}
