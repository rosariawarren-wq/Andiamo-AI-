import VespaLogo from './VespaLogo'
import TownSearch from './TownSearch'

const QUICK_ACCESS = [
  { label: '✦ Explore', section: 'explore' },
  { label: '🍝 Food', section: 'food' },
  { label: '🏖 Beaches', section: 'beaches' },
  { label: '🏨 Stays', section: 'stays' },
  { label: '🛵 Activities', section: 'activities' },
  { label: '🎨 Culture', section: 'explore' },
]

export default function Hero({ onSectionChange }) {
  return (
    <section className="relative min-h-screen hero-bg flex items-center justify-center overflow-hidden pt-14">
      {/* Vespa watermark */}
      <div
        className="absolute inset-0 flex items-end justify-end overflow-hidden pointer-events-none"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        <div style={{ opacity: 0.06, width: '90%', maxWidth: '900px', transform: 'translateX(10%) translateY(10%)' }}>
          <VespaLogo size="hero" className="w-full" />
        </div>
      </div>

      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 25% 75%, #E8C44A 0%, transparent 50%), radial-gradient(circle at 75% 25%, #2A4FA8 0%, transparent 50%)'
        }} />
      </div>

      {/* Content */}
      <div className="relative section-container text-center" style={{ zIndex: 10, paddingTop: '3rem', paddingBottom: '4rem' }}>
        {/* Country pill */}
        <div className="inline-flex items-center gap-2 bg-[#E8C44A]/20 border border-[#E8C44A]/40 text-[#E8C44A] rounded-full px-4 py-1.5 text-sm font-medium mb-8">
          <span>🇮🇹</span>
          <span>Italy's Most Complete Travel Guide</span>
        </div>

        {/* Main heading */}
        <h1 className="text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          <span className="block text-5xl sm:text-7xl md:text-8xl font-black italic" style={{ letterSpacing: '-0.02em' }}>
            La Dolce Vita
          </span>
          <span className="block text-4xl sm:text-6xl md:text-7xl font-bold italic" style={{ letterSpacing: '-0.01em', color: '#E8C44A' }}>
            Begins Here
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-[#E8ECF5] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Discover every corner of Italy — from ancient ruins to secret beaches,
          Michelin stars to local trattorias
        </p>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <TownSearch
            placeholder="Search by city, region or landmark..."
            size="large"
            onSelect={(town) => {
              if (town) onSectionChange('explore')
            }}
          />
        </div>

        {/* Quick access pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {QUICK_ACCESS.map(({ label, section }) => (
            <button
              key={label}
              onClick={() => onSectionChange(section)}
              className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#E8C44A]/60 text-white hover:text-[#E8C44A] rounded-full px-5 py-2 text-sm font-medium transition-all min-h-[44px]"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 opacity-60">
          <span className="text-[#E8ECF5] text-xs tracking-widest uppercase">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#E8C44A] to-transparent" />
        </div>
      </div>
    </section>
  )
}
