import { useEffect } from 'react'

function Stars({ rating }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} className={`w-4 h-4 ${i <= full ? 'text-[#E8C44A]' : i === full + 1 && half ? 'text-[#E8C44A]' : 'text-[#E8ECF5]'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-[#3A4260] font-medium ml-1">{rating}</span>
    </div>
  )
}

export default function Modal({ item, onClose, onSave, isSaved, btype }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!item) return null

  const saved = isSaved && isSaved(item.id, btype)

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
        <div
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in"
          onClick={e => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={item.name}
        >
          {/* Hero Image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-t-3xl">
            <img
              src={item.img || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80'}
              alt={item.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Save button */}
            <button
              onClick={() => onSave && onSave(item, btype)}
              className={`absolute top-4 left-4 p-2 rounded-full transition-colors ${
                saved ? 'bg-[#E8C44A] text-[#1A2240]' : 'bg-black/50 hover:bg-black/70 text-white'
              }`}
              aria-label={saved ? 'Saved to board' : 'Save to board'}
            >
              <svg className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            {/* Category badge */}
            {(item.type || item.category || btype) && (
              <div className="absolute bottom-4 left-4">
                <span className="bg-[#E8C44A] text-[#1A2240] text-xs font-semibold px-3 py-1 rounded-full">
                  {item.type || item.category || btype}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Town / region */}
            <p className="text-[#7A82A8] text-sm mb-1">{[item.town, item.region].filter(Boolean).join(', ')}</p>
            {/* Name */}
            <h2 className="text-[#1B3A8C] text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              {item.name}
            </h2>

            {/* Rating */}
            {item.rating && (
              <div className="flex items-center gap-3 mb-4">
                <Stars rating={item.rating} />
                {item.reviewCount && (
                  <span className="text-[#7A82A8] text-sm">{item.reviewCount.toLocaleString()} reviews</span>
                )}
                {item.price && (
                  <span className="text-[#3A4260] font-medium text-sm ml-auto">{item.price}</span>
                )}
              </div>
            )}

            {/* Description */}
            {item.description && (
              <p className="text-[#3A4260] leading-relaxed mb-5">{item.description}</p>
            )}

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {item.tags.map(tag => (
                  <span key={tag} className="bg-[#E8ECF5] text-[#3A4260] text-xs px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {item.specialty && (
                <div className="bg-[#F4F6FB] rounded-xl p-3">
                  <p className="text-[#7A82A8] text-xs mb-1">Specialty</p>
                  <p className="text-[#1A2240] text-sm font-medium">{item.specialty}</p>
                </div>
              )}
              {item.duration && (
                <div className="bg-[#F4F6FB] rounded-xl p-3">
                  <p className="text-[#7A82A8] text-xs mb-1">Duration</p>
                  <p className="text-[#1A2240] text-sm font-medium">{item.duration}</p>
                </div>
              )}
              {item.priceNote && (
                <div className="bg-[#F4F6FB] rounded-xl p-3">
                  <p className="text-[#7A82A8] text-xs mb-1">Price</p>
                  <p className="text-[#1A2240] text-sm font-medium">{item.price} {item.priceNote}</p>
                </div>
              )}
              {item.bestTime && (
                <div className="bg-[#F4F6FB] rounded-xl p-3">
                  <p className="text-[#7A82A8] text-xs mb-1">Best Time</p>
                  <p className="text-[#1A2240] text-sm font-medium">{item.bestTime}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {item.website && item.website !== '#' && (
                <a href={item.website} target="_blank" rel="noopener noreferrer"
                  className="flex-1 min-w-[120px] flex items-center justify-center gap-2 border-2 border-[#1B3A8C] text-[#1B3A8C] hover:bg-[#1B3A8C] hover:text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Website
                </a>
              )}
              {item.bookingUrl && item.bookingUrl !== '#' && (
                <a href={item.bookingUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-[#E8C44A] hover:bg-[#C9A020] text-[#1A2240] px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors">
                  Book Now
                </a>
              )}
              <button
                onClick={() => onSave && onSave(item, btype)}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors min-w-[120px] ${
                  saved
                    ? 'bg-[#E8C44A] text-[#1A2240]'
                    : 'bg-[#F4F6FB] text-[#1B3A8C] hover:bg-[#E8ECF5]'
                }`}
              >
                <svg className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                {saved ? 'Saved' : 'Save to Board'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
