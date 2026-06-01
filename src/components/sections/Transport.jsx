import { useState } from 'react'
import { transportData } from '../../data/transport'

function ProviderCard({ provider }) {
  return (
    <a href={provider.url} target="_blank" rel="noopener noreferrer"
      className="flex items-start gap-3 bg-[#F4F6FB] hover:bg-[#E8ECF5] p-4 rounded-xl transition-colors group">
      <div className="w-10 h-10 rounded-xl bg-[#1B3A8C] flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5 text-[#E8C44A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-[#1B3A8C] group-hover:text-[#0F2460]">{provider.name}</span>
          <svg className="w-3 h-3 text-[#7A82A8] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
        <p className="text-[#3A4260] text-sm leading-relaxed">{provider.description}</p>
      </div>
    </a>
  )
}

export default function Transport() {
  const [activeTab, setActiveTab] = useState(0)
  const mode = transportData[activeTab]

  return (
    <section className="section-container">
      <div className="mb-8">
        <h2 className="text-[#1B3A8C] text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Getting Around Italy</h2>
        <p className="text-[#7A82A8]">Everything you need to know about moving through Italy like a local</p>
      </div>

      {/* Transport Mode Tabs */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-8">
        {transportData.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(i)}
            className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all min-h-[72px] ${
              activeTab === i ? 'bg-[#1B3A8C] text-white' : 'bg-white text-[#3A4260] hover:bg-[#E8ECF5] border border-[#E8ECF5]'
            }`}
          >
            <span className="text-2xl">{t.icon}</span>
            <span className="text-xs font-medium text-center leading-tight">{t.mode}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {mode && (
        <div className="max-w-3xl">
          {/* Intro */}
          <div className="bg-[#1B3A8C] text-white rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">{mode.icon}</span>
              <h3 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{mode.mode}</h3>
            </div>
            <p className="text-[#E8ECF5] leading-relaxed">{mode.intro}</p>
          </div>

          {/* Providers */}
          <h4 className="text-[#1B3A8C] font-bold text-lg mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Recommended Providers
          </h4>
          <div className="space-y-3 mb-8">
            {mode.providers.map((p, i) => (
              <ProviderCard key={i} provider={p} />
            ))}
          </div>

          {/* Steps */}
          <h4 className="text-[#1B3A8C] font-bold text-lg mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            How It Works
          </h4>
          <div className="space-y-3 mb-8">
            {mode.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E8C44A] text-[#1A2240] text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-[#3A4260] text-sm leading-relaxed pt-1">{step}</p>
              </div>
            ))}
          </div>

          {/* Insider tip */}
          <div className="bg-[#E8C44A]/15 border border-[#E8C44A]/40 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">💡</span>
              <span className="text-[#1B3A8C] font-bold">Insider Tip</span>
            </div>
            <p className="text-[#3A4260] text-sm leading-relaxed">{mode.tip}</p>
          </div>
        </div>
      )}
    </section>
  )
}
