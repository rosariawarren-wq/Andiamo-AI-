import { useState, useEffect, useRef, useCallback } from 'react'

const FALLBACK_TOWNS = [
  { name: "Palermo", region: "Palermo" },
  { name: "Catania", region: "Catania" },
  { name: "Taormina", region: "Messina" },
  { name: "Siracusa", region: "Siracusa" },
  { name: "Noto", region: "Siracusa" },
  { name: "Ragusa", region: "Ragusa" },
  { name: "Agrigento", region: "Agrigento" },
  { name: "Trapani", region: "Trapani" },
  { name: "Cefalù", region: "Palermo" },
  { name: "Modica", region: "Ragusa" },
  { name: "Marsala", region: "Trapani" },
  { name: "Erice", region: "Trapani" },
  { name: "Bagheria", region: "Palermo" },
  { name: "Savoca", region: "Messina" },
  { name: "Castelmola", region: "Messina" },
  { name: "Marzamemi", region: "Siracusa" },
  { name: "Scopello", region: "Trapani" },
  { name: "San Vito Lo Capo", region: "Trapani" },
  { name: "Mondello", region: "Palermo" },
  { name: "Giardini Naxos", region: "Messina" },
  { name: "Castelbuono", region: "Palermo" },
  { name: "Gangi", region: "Palermo" },
  { name: "Petralia Soprana", region: "Palermo" },
  { name: "Piazza Armerina", region: "Enna" },
  { name: "Caltagirone", region: "Catania" },
  { name: "Rome", region: "Lazio" },
  { name: "Florence", region: "Toscana" },
  { name: "Venice", region: "Veneto" },
  { name: "Milan", region: "Lombardia" },
  { name: "Naples", region: "Campania" },
  { name: "Bologna", region: "Emilia-Romagna" },
  { name: "Turin", region: "Piemonte" },
  { name: "Genoa", region: "Liguria" },
  { name: "Siena", region: "Toscana" },
  { name: "Pisa", region: "Toscana" },
  { name: "Lucca", region: "Toscana" },
  { name: "Arezzo", region: "Toscana" },
  { name: "San Gimignano", region: "Toscana" },
  { name: "Montepulciano", region: "Toscana" },
  { name: "Montalcino", region: "Toscana" },
  { name: "Pienza", region: "Toscana" },
  { name: "Positano", region: "Salerno" },
  { name: "Amalfi", region: "Salerno" },
  { name: "Ravello", region: "Salerno" },
  { name: "Sorrento", region: "Napoli" },
  { name: "Capri", region: "Napoli" },
  { name: "Pompeii", region: "Napoli" },
  { name: "Alberobello", region: "Bari" },
  { name: "Matera", region: "Basilicata" },
  { name: "Lecce", region: "Lecce" },
  { name: "Ostuni", region: "Brindisi" },
  { name: "Tropea", region: "Vibo Valentia" },
  { name: "Cagliari", region: "Sardegna" },
  { name: "Alghero", region: "Sassari" },
  { name: "Verona", region: "Veneto" },
  { name: "Padua", region: "Veneto" },
  { name: "Cortina d'Ampezzo", region: "Belluno" },
  { name: "Portofino", region: "Genova" },
  { name: "Cinque Terre", region: "La Spezia" },
  { name: "Bellagio", region: "Como" },
  { name: "Perugia", region: "Umbria" },
  { name: "Assisi", region: "Perugia" },
  { name: "Orvieto", region: "Terni" },
  { name: "Spoleto", region: "Perugia" },
  { name: "Ravenna", region: "Ravenna" },
  { name: "Modena", region: "Modena" },
  { name: "Parma", region: "Parma" },
  { name: "Rimini", region: "Rimini" },
  { name: "Trieste", region: "Friuli-Venezia Giulia" },
  { name: "Bolzano", region: "Alto Adige" },
  { name: "Trento", region: "Trentino" },
  { name: "Burano", region: "Venezia" },
  { name: "Murano", region: "Venezia" }
]

export default function TownSearch({ placeholder = "Search Italian cities & regions...", onSelect, value = '', onChange, size = 'normal' }) {
  const [query, setQuery] = useState(value)
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const debounceRef = useRef(null)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => { setQuery(value) }, [value])

  const fetchSuggestions = useCallback(async (input) => {
    if (!input || input.length < 2) {
      setSuggestions([])
      setOpen(false)
      return
    }
    // Try API first
    try {
      const res = await fetch('/api/places-autocomplete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
      })
      if (res.ok) {
        const data = await res.json()
        if (data.predictions && data.predictions.length > 0) {
          const mapped = data.predictions.map(p => ({
            name: p.structured_formatting?.main_text || p.description,
            region: p.structured_formatting?.secondary_text || ''
          }))
          setSuggestions(mapped)
          setOpen(true)
          return
        }
      }
    } catch (e) {}
    // Fallback to local list
    const q = input.toLowerCase()
    const filtered = FALLBACK_TOWNS.filter(t =>
      t.name.toLowerCase().startsWith(q) || t.region.toLowerCase().startsWith(q)
    ).slice(0, 8)
    setSuggestions(filtered)
    setOpen(filtered.length > 0)
  }, [])

  const handleChange = (e) => {
    const v = e.target.value
    setQuery(v)
    onChange && onChange(v)
    setActiveIdx(-1)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchSuggestions(v), 300)
  }

  const handleSelect = (town) => {
    const display = `${town.name}${town.region ? ', ' + town.region : ''}`
    setQuery(town.name)
    setSuggestions([])
    setOpen(false)
    onChange && onChange(town.name)
    onSelect && onSelect(town.name)
    inputRef.current?.blur()
  }

  const handleClear = () => {
    setQuery('')
    setSuggestions([])
    setOpen(false)
    onChange && onChange('')
    onSelect && onSelect('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx(i => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx(i => Math.max(i - 1, -1))
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault()
      handleSelect(suggestions[activeIdx])
    } else if (e.key === 'Escape') {
      setOpen(false)
      setActiveIdx(-1)
    }
  }

  const isLarge = size === 'large'

  return (
    <div className="relative w-full" role="combobox" aria-expanded={open} aria-haspopup="listbox">
      <div className={`flex items-center bg-white rounded-2xl shadow-lg border-2 border-transparent focus-within:border-[#E8C44A] transition-all ${isLarge ? 'px-5 py-4' : 'px-4 py-3'}`}>
        <svg className={`flex-shrink-0 text-[#7A82A8] ${isLarge ? 'w-6 h-6 mr-4' : 'w-5 h-5 mr-3'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setOpen(suggestions.length > 0)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          placeholder={placeholder}
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls="town-search-list"
          className={`flex-1 bg-transparent outline-none text-[#1A2240] placeholder-[#7A82A8] ${isLarge ? 'text-lg' : 'text-base'}`}
          style={{ fontSize: isLarge ? '18px' : '16px' }}
        />
        {query && (
          <button
            onClick={handleClear}
            className="flex-shrink-0 ml-2 p-1 rounded-full text-[#7A82A8] hover:text-[#1A2240] hover:bg-[#E8ECF5] transition-colors"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      {open && suggestions.length > 0 && (
        <ul
          id="town-search-list"
          ref={listRef}
          role="listbox"
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-[#E8ECF5] z-50 overflow-hidden"
        >
          {suggestions.map((town, i) => (
            <li
              key={`${town.name}-${i}`}
              role="option"
              aria-selected={i === activeIdx}
              onMouseDown={() => handleSelect(town)}
              className={`flex items-center px-4 py-3 cursor-pointer transition-colors ${
                i === activeIdx ? 'bg-[#E8ECF5]' : 'hover:bg-[#F4F6FB]'
              }`}
            >
              <svg className="w-4 h-4 text-[#E8C44A] mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <span className="font-medium text-[#1A2240]">{town.name}</span>
                {town.region && <span className="text-sm text-[#7A82A8] ml-2">{town.region}</span>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
