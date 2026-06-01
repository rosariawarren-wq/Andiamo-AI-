import { useEffect, useRef, useState } from 'react'
import { useAI } from '../hooks/useAI'

const SUGGESTED_PROMPTS = [
  "Plan 5 days in Sicily",
  "Best hidden restaurants in Rome",
  "What to pack for Amalfi in July",
  "How to get from Florence to Cinque Terre",
  "Find things to do in Bagheria"
]

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-white rounded-2xl rounded-tl-sm w-fit shadow-sm">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="typing-dot w-2 h-2 bg-[#7A82A8] rounded-full"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  )
}

function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#1B3A8C] flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
          <span className="text-[#E8C44A] text-sm font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>A</span>
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-[#1B3A8C] text-white rounded-tr-sm'
            : 'bg-white text-[#1A2240] rounded-tl-sm shadow-sm'
        }`}
      >
        {msg.content}
      </div>
    </div>
  )
}

export default function AIChat({ onClose }) {
  const { messages, sendMessage, loading } = useAI()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    sendMessage(text)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[60]" onClick={onClose} aria-hidden="true" />
      <div
        className="fixed bottom-0 left-0 right-0 z-[61] flex flex-col bg-[#F4F6FB] rounded-t-3xl shadow-2xl"
        style={{ height: '65vh', maxHeight: '700px' }}
        role="dialog"
        aria-modal="true"
        aria-label="Andiamo AI Chat"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-white rounded-t-3xl border-b border-[#E8ECF5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1B3A8C] flex items-center justify-center">
              <span className="text-[#E8C44A] font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>A</span>
            </div>
            <div>
              <h2 className="text-[#1B3A8C] font-bold text-base" style={{ fontFamily: "'Playfair Display', serif" }}>
                Andiamo AI
              </h2>
              <p className="text-[#7A82A8] text-xs">Your Italian Travel Expert</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-[#F4F6FB] text-[#3A4260] transition-colors"
            aria-label="Close AI chat"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {messages.length === 0 ? (
            <div>
              <div className="flex justify-start mb-4">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#1B3A8C] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#E8C44A] text-sm font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>A</span>
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm max-w-sm">
                    <p className="text-[#1A2240] text-sm leading-relaxed">
                      <em>Benvenuto!</em> I'm Andiamo AI — your personal Italian travel expert. Ask me anything about Italy: hidden gems, food recommendations, itineraries, transport tips and more. <em>Andiamo!</em> 🇮🇹
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-[#7A82A8] text-xs mb-3 text-center">Try asking...</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {SUGGESTED_PROMPTS.map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    disabled={loading}
                    className="bg-[#E8C44A]/20 hover:bg-[#E8C44A]/40 border border-[#E8C44A]/50 text-[#1A2240] rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => <Message key={i} msg={msg} />)
          )}
          {loading && (
            <div className="flex justify-start mb-3">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-[#1B3A8C] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#E8C44A] text-sm font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>A</span>
                </div>
                <TypingIndicator />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 bg-white border-t border-[#E8ECF5]">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Italy..."
              rows={1}
              disabled={loading}
              className="flex-1 resize-none bg-[#F4F6FB] rounded-xl px-4 py-3 text-[#1A2240] placeholder-[#7A82A8] outline-none focus:ring-2 focus:ring-[#E8C44A] transition-all text-sm max-h-32"
              style={{ fontSize: '16px' }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#E8C44A] hover:bg-[#C9A020] disabled:opacity-40 disabled:cursor-not-allowed text-[#1A2240] flex items-center justify-center transition-colors"
              aria-label="Send message"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-center text-[#7A82A8] text-xs mt-2">Powered by Claude AI</p>
        </div>
      </div>
    </>
  )
}
