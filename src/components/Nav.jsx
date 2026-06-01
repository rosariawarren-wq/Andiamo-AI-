import { useState } from 'react'
import VespaLogo from './VespaLogo'

const NAV_LINKS = [
  { id: 'explore', label: 'Explore' },
  { id: 'activities', label: 'Activities' },
  { id: 'food', label: 'Food' },
  { id: 'beaches', label: 'Beaches' },
  { id: 'stays', label: 'Stays' },
  { id: 'neighborhoods', label: 'Areas' },
  { id: 'transport', label: 'Getting Around' },
  { id: 'creators', label: 'Creators' },
  { id: 'family', label: 'Family' },
  { id: 'weather', label: 'Weather' },
  { id: 'safety', label: 'Safety' },
]

export default function Nav({ activeSection, onSectionChange, boardCount = 0, onBoardOpen, onAIOpen }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (id) => {
    onSectionChange(id)
    setMenuOpen(false)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E8ECF5] shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 h-14 flex items-center gap-4">
          {/* Logo */}
          <button
            onClick={() => { onSectionChange(null); setMenuOpen(false) }}
            className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity"
            aria-label="Go to home"
          >
            <VespaLogo size="nav" />
            <span className="font-playfair text-[#1B3A8C] font-bold text-lg leading-none hidden sm:block" style={{ fontFamily: "'Playfair Display', serif" }}>
              Andiamo AI
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-1 flex-1 justify-center overflow-x-auto no-scrollbar">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`relative px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors rounded-lg ${
                  activeSection === link.id
                    ? 'text-[#1B3A8C]'
                    : 'text-[#3A4260] hover:text-[#1B3A8C] hover:bg-[#F4F6FB]'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#E8C44A] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            {/* Board Button */}
            <button
              onClick={onBoardOpen}
              className="relative flex items-center gap-1.5 bg-[#E8C44A] text-[#1A2240] px-3 py-2 rounded-xl text-sm font-semibold hover:bg-[#C9A020] transition-colors min-h-[44px]"
              aria-label={`Open board (${boardCount} items)`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span className="hidden sm:inline">Board</span>
              {boardCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#1B3A8C] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {boardCount > 99 ? '99+' : boardCount}
                </span>
              )}
            </button>

            {/* AI Button */}
            <button
              onClick={onAIOpen}
              className="flex items-center gap-1.5 bg-[#1B3A8C] text-white px-3 py-2 rounded-xl text-sm font-semibold hover:bg-[#0F2460] transition-colors min-h-[44px]"
              aria-label="Open AI chat"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="hidden sm:inline">Ask AI</span>
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="xl:hidden p-2 rounded-lg text-[#1B3A8C] hover:bg-[#F4F6FB] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 xl:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="fixed inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
          <div className="fixed top-14 left-0 right-0 bg-white shadow-xl max-h-[calc(100vh-56px)] overflow-y-auto animate-slide-up">
            <div className="p-4 grid grid-cols-2 gap-2">
              {NAV_LINKS.map(link => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left min-h-[44px] ${
                    activeSection === link.id
                      ? 'bg-[#1B3A8C] text-white'
                      : 'bg-[#F4F6FB] text-[#1A2240] hover:bg-[#E8ECF5]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="px-4 pb-4 flex gap-2">
              <button
                onClick={() => { onBoardOpen(); setMenuOpen(false) }}
                className="flex-1 flex items-center justify-center gap-2 bg-[#E8C44A] text-[#1A2240] px-4 py-3 rounded-xl text-sm font-semibold min-h-[44px]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                My Board {boardCount > 0 && `(${boardCount})`}
              </button>
              <button
                onClick={() => { onAIOpen(); setMenuOpen(false) }}
                className="flex-1 flex items-center justify-center gap-2 bg-[#1B3A8C] text-white px-4 py-3 rounded-xl text-sm font-semibold min-h-[44px]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Ask AI
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  )
}
