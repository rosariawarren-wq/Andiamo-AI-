import { useEffect, useState } from 'react'
import VespaLogo from './VespaLogo'

export default function VespaTransition({ active }) {
  const [visible, setVisible] = useState(false)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (active) {
      setVisible(true)
      setAnimating(true)
      const timer = setTimeout(() => {
        setAnimating(false)
        setTimeout(() => setVisible(false), 200)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [active])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] flex items-center"
      aria-hidden="true"
    >
      {/* Background flash */}
      <div
        className="absolute inset-0 transition-opacity duration-200"
        style={{
          background: 'linear-gradient(90deg, rgba(27,58,140,0.05) 0%, rgba(27,58,140,0.08) 50%, rgba(27,58,140,0.05) 100%)',
          opacity: animating ? 1 : 0,
        }}
      />
      {/* Vespa sliding across */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          animation: animating ? 'vespaSlide 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards' : 'none',
        }}
      >
        <VespaLogo size="transition" />
      </div>
      <style>{`
        @keyframes vespaSlide {
          0%   { left: -220px; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: calc(100vw + 20px); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
