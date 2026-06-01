import { useState, useEffect } from 'react'

function PlacesCard({ place, onSave, isSaved }) {
  const photoRef = place.photos?.[0]?.photo_reference
  const photoUrl = photoRef
    ? `/api/places-photo?ref=${encodeURIComponent(photoRef)}&maxWidth=800`
    : `https://picsum.photos/seed/${encodeURIComponent(place.name)}/800/600`

  const saved = isSaved && isSaved(place.place_id, 'places')
  const priceLevel = place.price_level ? '€'.repeat(place.price_level) : ''
  const types = (place.types || [])
    .filter(t => !['point_of_interest', 'establishment', 'food'].includes(t))
    .slice(0, 1)
    .map(t => t.replace(/_/g, ' '))

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md card-hover group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={photoUrl}
          alt={place.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={e => {
            e.target.onerror = null
            e.target.src = `https://picsum.photos/seed/${encodeURIComponent(place.name)}/800/600`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        {onSave && (
          <button
            onClick={() => onSave(place)}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all shadow-md ${saved ? 'bg-[#E8C44A] text-[#1A2240]' : 'bg-white/90 text-[#1A2240] hover:bg-[#E8C44A]'}`}
            aria-label={saved ? 'Remove from board' : 'Save to board'}
          >
            <svg className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        )}
        {types[0] && (
          <span className="absolute bottom-3 left-3 bg-[#E8C44A] text-[#1A2240] text-xs font-semibold px-2.5 py-1 rounded-full capitalize shadow">
            {types[0]}
          </span>
        )}
        {priceLevel && (
          <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-medium px-2 py-0.5 rounded-full">
            {priceLevel}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-[#1B3A8C] font-bold text-base mb-1 line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>
          {place.name}
        </h3>
        <p className="text-[#7A82A8] text-xs mb-2 line-clamp-1">{place.formatted_address}</p>
        {place.rating && (
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-[#E8C44A]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold text-[#1A2240] text-sm">{place.rating}</span>
            {place.user_ratings_total && (
              <span className="text-[#7A82A8] text-xs">({place.user_ratings_total.toLocaleString()})</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function PlacesResults({ town, results, loading, onSave, isSaved, onClear }) {
  if (!town) return null

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#E8C44A] animate-pulse" />
            <h3 className="text-[#1B3A8C] font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
              Live results for <span className="italic">{town}</span>
            </h3>
          </div>
          {!loading && results.length > 0 && (
            <span className="bg-[#E8ECF5] text-[#7A82A8] text-xs px-2 py-0.5 rounded-full font-medium">
              {results.length} places
            </span>
          )}
        </div>
        <button
          onClick={onClear}
          className="text-xs text-[#7A82A8] hover:text-[#1B3A8C] transition-colors flex items-center gap-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear
        </button>
      </div>

      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
              <div className="aspect-[4/3] bg-[#E8ECF5]" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-[#E8ECF5] rounded w-3/4" />
                <div className="h-3 bg-[#E8ECF5] rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && results.length === 0 && (
        <div className="bg-white rounded-2xl p-8 text-center border border-[#E8ECF5]">
          <div className="text-3xl mb-2">🗺️</div>
          <p className="text-[#7A82A8] text-sm">No places found for <strong>{town}</strong>. Try a larger city or different spelling.</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {results.map((place, i) => (
            <PlacesCard
              key={place.place_id || i}
              place={place}
              onSave={onSave}
              isSaved={isSaved}
            />
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-[#E8ECF5] flex items-center gap-2 text-xs text-[#7A82A8]">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
        Live data from Google Places
      </div>
    </div>
  )
}
