import { useEffect } from 'react'

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(s => (
        <svg key={s} className={`w-3 h-3 ${s <= Math.round(rating) ? 'text-[#E8C44A]' : 'text-[#E8ECF5]'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-[#7A82A8] ml-1">{rating}</span>
    </div>
  )
}

export default function Board({ board, onRemove, onClear, onClose }) {
  // Prevent body scroll when board is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleCopyBoard = () => {
    const text = board.map(item =>
      `${item.name || 'Item'} — ${item.town || item.region || ''} ${item.rating ? `(★ ${item.rating})` : ''}`
    ).join('\n')
    navigator.clipboard.writeText(`My Italy Board:\n\n${text}`)
      .then(() => alert('Board copied to clipboard!'))
      .catch(() => alert('Copy failed — please manually select and copy.'))
  }

  const categoryColors = {
    explore: 'bg-[#1B3A8C] text-white',
    activities: 'bg-[#2A4FA8] text-white',
    food: 'bg-orange-500 text-white',
    beaches: 'bg-cyan-500 text-white',
    stays: 'bg-purple-500 text-white',
    neighborhoods: 'bg-green-600 text-white',
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[60]" onClick={onClose} aria-hidden="true" />
      <div
        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#F4F6FB] z-[61] flex flex-col shadow-2xl animate-slide-in-right"
        role="dialog"
        aria-modal="true"
        aria-label="My Italy Board"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-[#E8ECF5]">
          <div>
            <h2 className="text-[#1B3A8C] font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              My Italy Board
            </h2>
            <p className="text-[#7A82A8] text-sm">{board.length} saved {board.length === 1 ? 'place' : 'places'}</p>
          </div>
          <div className="flex items-center gap-2">
            {board.length > 0 && (
              <button
                onClick={onClear}
                className="text-xs text-[#7A82A8] hover:text-red-500 px-2 py-1 rounded transition-colors"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-[#F4F6FB] text-[#3A4260] transition-colors"
              aria-label="Close board"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {board.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="text-5xl mb-4">🗺️</div>
              <h3 className="text-[#1B3A8C] font-semibold text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your board is empty
              </h3>
              <p className="text-[#7A82A8] text-sm max-w-xs">
                Save places as you explore — tap the heart icon on any card to add it here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {board.map(item => (
                <div key={`${item.btype}-${item.id}`} className="bg-white rounded-xl overflow-hidden shadow-sm card-hover group relative">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.img || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80'}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <button
                      onClick={() => onRemove(item.id, item.btype)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-[#1B3A8C] hover:bg-red-50 hover:text-red-500 transition-colors"
                      aria-label={`Remove ${item.name}`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    {item.btype && (
                      <span className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[item.btype] || 'bg-[#1B3A8C] text-white'}`}>
                        {item.btype}
                      </span>
                    )}
                  </div>
                  <div className="p-2.5">
                    <h4 className="text-[#1A2240] font-semibold text-xs leading-tight mb-0.5 line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-[#7A82A8] text-xs">{item.town || item.region}</p>
                    {item.rating && <StarRating rating={item.rating} />}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {board.length > 0 && (
          <div className="p-4 bg-white border-t border-[#E8ECF5]">
            <button
              onClick={handleCopyBoard}
              className="w-full flex items-center justify-center gap-2 bg-[#E8C44A] hover:bg-[#C9A020] text-[#1A2240] font-semibold py-3 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Board to Clipboard
            </button>
          </div>
        )}
      </div>
    </>
  )
}
