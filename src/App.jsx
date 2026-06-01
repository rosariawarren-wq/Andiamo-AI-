import React, { useState, Suspense, lazy } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Board from './components/Board'
import AIChat from './components/AIChat'
import VespaTransition from './components/VespaTransition'
import { useBoard } from './hooks/useBoard'

const Explore = lazy(() => import('./components/sections/Explore'))
const Activities = lazy(() => import('./components/sections/Activities'))
const Food = lazy(() => import('./components/sections/Food'))
const Beaches = lazy(() => import('./components/sections/Beaches'))
const Stays = lazy(() => import('./components/sections/Stays'))
const Neighborhoods = lazy(() => import('./components/sections/Neighborhoods'))
const Transport = lazy(() => import('./components/sections/Transport'))
const Creators = lazy(() => import('./components/sections/Creators'))
const Family = lazy(() => import('./components/sections/Family'))
const Weather = lazy(() => import('./components/sections/Weather'))
const Safety = lazy(() => import('./components/sections/Safety'))

const SECTION_TITLES = {
  explore: 'Explore Italy',
  activities: 'Activities & Experiences',
  food: 'Food & Drink',
  beaches: 'Beaches',
  stays: 'Where to Stay',
  neighborhoods: 'Neighborhoods',
  transport: 'Getting Around',
  creators: 'Creators & Photography',
  family: 'Family Travel',
  weather: 'Weather & When to Go',
  safety: 'Safety in Italy',
}

function SectionFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1B3A8C]" />
        <p className="text-[#7A82A8] text-sm">Loading...</p>
      </div>
    </div>
  )
}

class SectionErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) {
      return (
        <div className="section-container text-center py-16">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-[#1B3A8C] font-bold text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Something went wrong
          </h3>
          <p className="text-[#7A82A8] mb-4">This section encountered an error. Please try refreshing.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="bg-[#1B3A8C] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#0F2460] transition-colors"
          >
            Try Again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

function ActiveSection({ section, ...props }) {
  const sectionMap = {
    explore: <Explore {...props} />,
    activities: <Activities {...props} />,
    food: <Food {...props} />,
    beaches: <Beaches {...props} />,
    stays: <Stays {...props} />,
    neighborhoods: <Neighborhoods {...props} />,
    transport: <Transport {...props} />,
    creators: <Creators {...props} />,
    family: <Family {...props} />,
    weather: <Weather {...props} />,
    safety: <Safety {...props} />,
  }
  return sectionMap[section] || (
    <div className="section-container text-center py-16">
      <p className="text-[#7A82A8]">Section not found</p>
    </div>
  )
}

export default function App() {
  const [activeSection, setActiveSection] = useState(null)
  const [boardOpen, setBoardOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const { board, addItem, removeItem, clearBoard, isSaved } = useBoard()

  const navigateTo = (section) => {
    if (section === activeSection) return
    setTransitioning(true)
    setTimeout(() => {
      setActiveSection(section)
      setTransitioning(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 800)
  }

  const sectionProps = { addItem, removeItem, isSaved }

  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      <Nav
        activeSection={activeSection}
        onSectionChange={navigateTo}
        boardCount={board.length}
        onBoardOpen={() => setBoardOpen(true)}
        onAIOpen={() => setAiOpen(true)}
      />

      <VespaTransition active={transitioning} />

      <main>
        {!activeSection ? (
          <Hero onSectionChange={navigateTo} />
        ) : (
          <div className="pt-14">
            {/* Section breadcrumb */}
            <div className="bg-white border-b border-[#E8ECF5]">
              <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-[#7A82A8]">
                <button onClick={() => navigateTo(null)} className="hover:text-[#1B3A8C] transition-colors">Home</button>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-[#1B3A8C] font-medium">{SECTION_TITLES[activeSection] || activeSection}</span>
              </div>
            </div>

            <SectionErrorBoundary>
              <Suspense fallback={<SectionFallback />}>
                <ActiveSection section={activeSection} {...sectionProps} />
              </Suspense>
            </SectionErrorBoundary>
          </div>
        )}
      </main>

      {/* Footer */}
      {!activeSection && (
        <footer className="bg-[#0F2460] text-white py-12 px-4 mt-0">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Andiamo AI</h3>
                <p className="text-[#7A82A8] text-sm max-w-xs">Italy's most complete luxury travel guide — powered by Anthropic Claude AI.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(SECTION_TITLES).map(([id, label]) => (
                  <button key={id} onClick={() => navigateTo(id)}
                    className="text-[#7A82A8] hover:text-[#E8C44A] text-sm text-left transition-colors px-1 py-0.5">
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-6 border-t border-white/10 text-center text-[#7A82A8] text-xs">
              © 2025 Andiamo AI. La Dolce Vita Begins Here.
            </div>
          </div>
        </footer>
      )}

      {boardOpen && (
        <Board
          board={board}
          onRemove={removeItem}
          onClear={clearBoard}
          onClose={() => setBoardOpen(false)}
        />
      )}

      {aiOpen && (
        <AIChat onClose={() => setAiOpen(false)} />
      )}
    </div>
  )
}
