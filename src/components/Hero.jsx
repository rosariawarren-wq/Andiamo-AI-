import { useState } from 'react'
import VespaLogo from './VespaLogo'
import TownSearch from './TownSearch'

const QUICK_ACCESS = [
  { label: 'Explore', emoji: '🗺', section: 'explore' },
  { label: 'Food', emoji: '🍝', section: 'food' },
  { label: 'Beaches', emoji: '🏖', section: 'beaches' },
  { label: 'Stays', emoji: '🏨', section: 'stays' },
  { label: 'Activities', emoji: '🎭', section: 'activities' },
  { label: 'Neighborhoods', emoji: '🏛', section: 'neighborhoods' },
]

const STATS = [
  { value: '11', label: 'Sections' },
  { value: '134+', label: 'Curated places' },
  { value: '20', label: 'Regions' },
]

export default function Hero({ onSectionChange }) {
  const [searchValue, setSearchValue] = useState('')

  return (
    <section className="relative min-h-screen hero-bg flex items-center justify-center overflow-hidden pt-14">

      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #E8C44A 0%, transparent 70%)', filter: 'blur(40px)', animation: 'pulse 8s ease-in-out infinite' }} />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #2A4FA8 0%, transparent 70%)', filter: 'blur(50px)', animation: 'pulse 10s ease-in-out infinite 2s' }} />
      </div>

      {/* Vespa watermark — large, right side */}
      <div className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none" aria-hidden="true">
        <div style={{ opacity: 0.055, width: '55%', maxWidth: '700px', transform: 'translateX(8%) translateY(5%)' }}>
          <VespaLogo size="hero" className="w-full drop-shadow-2xl" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative section-container text-center" style={{ zIndex: 10, paddingTop: '4rem', paddingBottom: '5rem', maxWidth: '900px' }}>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass text-[#E8C44A] rounded-full px-5 py-2 text-sm font-medium mb-10 fade-up" style={{ animationDelay: '0.1s' }}>
          <span className="text-base">🇮🇹</span>
          <span>Italy's Most Complete AI Travel Guide</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8C44A] animate-pulse" />
        </div>

        {/* Main heading */}
        <div className="fade-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-white mb-4 leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="block font-black italic" style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              letterSpacing: '-0.02em',
              textShadow: '0 4px 40px rgba(0,0,0,0.3)'
            }}>
              La Dolce Vita
            </span>
            <span className="block font-bold italic gradient-text" style={{
              fontSize: 'clamp(2.2rem, 7.5vw, 5.5rem)',
              letterSpacing: '-0.01em'
            }}>
              Begins Here
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-[#C8D0E8] text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed fade-up" style={{ animationDelay: '0.3s', fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
          From ancient ruins to secret beaches, Michelin stars to local trattorias — powered by Anthropic Claude AI
        </p>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8 fade-up" style={{ animationDelay: '0.4s' }}>
          <TownSearch
            placeholder="Search any Italian city or region..."
            size="large"
            value={searchValue}
            onChange={setSearchValue}
            onSelect={(town) => {
              if (town) onSectionChange('explore')
            }}
          />
        </div>

        {/* Quick access */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12 fade-up" style={{ animationDelay: '0.5s' }}>
          {QUICK_ACCESS.map(({ label, emoji, section }) => (
            <button
              key={label}
              onClick={() => onSectionChange(section)}
              className="group flex items-center gap-2 glass hover:bg-white/20 border-white/20 hover:border-[#E8C44A]/50 text-white hover:text-[#E8C44A] rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 min-h-[44px]"
            >
              <span className="text-base group-hover:scale-110 transition-transform">{emoji}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex justify-center gap-8 sm:gap-12 fade-up" style={{ animationDelay: '0.6s' }}>
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#E8C44A]" style={{ fontFamily: "'Playfair Display', serif" }}>{value}</div>
              <div className="text-[#7A82A8] text-xs sm:text-sm mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-14 flex flex-col items-center gap-2 opacity-40 fade-up" style={{ animationDelay: '0.8s' }}>
          <span className="text-[#E8ECF5] text-xs tracking-[0.2em] uppercase">Scroll to explore</span>
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-6 bg-gradient-to-b from-[#E8C44A] to-transparent" />
            <svg className="w-4 h-4 text-[#E8C44A] animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 sm:h-14">
          <path d="M0,60 C360,0 1080,0 1440,60 L1440,60 L0,60 Z" fill="#F4F6FB" />
        </svg>
      </div>
    </section>
  )
}
