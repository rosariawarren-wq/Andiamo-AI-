// Authentic Vespa GTS silhouette — facing LEFT
// ViewBox: 0 0 300 165
export default function VespaLogo({ size = 'natural', className = '' }) {
  const dims = {
    nav: { width: 48, height: 28 },
    footer: { width: 34, height: 20 },
    transition: { width: 200, height: 116 },
    hero: { width: '100%', height: '100%' },
    natural: { width: 300, height: 165 },
  }
  const d = dims[size] || dims.natural

  return (
    <svg
      width={d.width}
      height={d.height}
      viewBox="0 0 300 165"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Vespa scooter logo"
    >
      {/* ── REAR WHEEL (right side) ── */}
      {/* Tyre */}
      <circle cx="245" cy="120" r="38" stroke="#1B3A8C" strokeWidth="7" fill="#E8ECF5" />
      {/* Inner rim */}
      <circle cx="245" cy="120" r="28" stroke="#1B3A8C" strokeWidth="2" fill="none" />
      {/* Hub */}
      <circle cx="245" cy="120" r="7" fill="#1B3A8C" />
      {/* Spokes — 8 lines through hub */}
      {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        return (
          <line
            key={i}
            x1={245 + Math.cos(rad) * 7}
            y1={120 + Math.sin(rad) * 7}
            x2={245 + Math.cos(rad) * 28}
            y2={120 + Math.sin(rad) * 28}
            stroke="#1B3A8C"
            strokeWidth="1.5"
          />
        )
      })}

      {/* ── FRONT WHEEL (left side) ── */}
      <circle cx="57" cy="120" r="38" stroke="#1B3A8C" strokeWidth="7" fill="#E8ECF5" />
      <circle cx="57" cy="120" r="28" stroke="#1B3A8C" strokeWidth="2" fill="none" />
      <circle cx="57" cy="120" r="7" fill="#1B3A8C" />
      {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        return (
          <line
            key={i}
            x1={57 + Math.cos(rad) * 7}
            y1={120 + Math.sin(rad) * 7}
            x2={57 + Math.cos(rad) * 28}
            y2={120 + Math.sin(rad) * 28}
            stroke="#1B3A8C"
            strokeWidth="1.5"
          />
        )
      })}

      {/* ── FOOTBOARD / STEP PLATFORM ── */}
      <path
        d="M 90,118 Q 150,114 200,116 L 202,124 Q 150,122 90,126 Z"
        fill="#C9A020"
      />

      {/* ── MAIN BODY / MONOCOQUE (bulbous rear, tapers to front) ── */}
      {/* Large organic egg-shaped body — the iconic Vespa hull */}
      <path
        d="
          M 130,115
          C 128,100 124,85 122,72
          C 120,58 128,44 148,40
          C 165,37 188,38 205,42
          C 222,46 240,56 252,70
          C 264,84 268,98 266,112
          C 264,124 255,130 240,130
          C 200,132 160,128 140,120
          Z
        "
        fill="#E8C44A"
      />
      {/* Body highlight — subtle lighter area on upper body */}
      <path
        d="
          M 145,48
          C 160,43 185,42 205,46
          C 220,50 235,58 244,70
          C 250,78 252,88 248,96
          C 240,94 228,88 215,84
          C 198,79 175,75 158,72
          C 145,70 135,65 130,58
          C 130,53 136,50 145,48
          Z
        "
        fill="#EDD068"
        opacity="0.6"
      />

      {/* ── REAR BODY CURVE (connecting rear wheel to body) ── */}
      <path
        d="M 240,130 Q 248,128 255,122 Q 262,116 264,108"
        stroke="#C9A020"
        strokeWidth="3"
        fill="none"
      />

      {/* ── FRONT APRON / LEGSHIELD (iconic Vespa teardrop shield) ── */}
      {/* The signature shape: wide at bottom, tapers to top */}
      <path
        d="
          M 88,122
          C 78,118 72,110 74,96
          C 76,82 82,68 90,58
          C 96,50 106,46 116,48
          C 124,50 128,58 126,70
          C 124,82 118,96 114,108
          C 111,116 104,122 96,124
          Z
        "
        fill="#E8C44A"
      />
      {/* Apron shadow/depth */}
      <path
        d="
          M 88,122
          C 84,116 78,106 80,94
          C 82,82 86,70 92,60
          C 94,56 96,52 100,50
          C 96,52 90,58 86,68
          C 82,78 80,94 82,106
          C 83,114 86,120 88,122
          Z
        "
        fill="#C9A020"
        opacity="0.5"
      />

      {/* ── FRONT FORK (connecting wheel to apron) ── */}
      <line
        x1="57" y1="86"
        x2="88" y2="110"
        stroke="#1B3A8C"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <line
        x1="57" y1="82"
        x2="82" y2="104"
        stroke="#0F2460"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* ── SEAT (long slim bench on top of body) ── */}
      <path
        d="
          M 145,56
          C 155,50 175,46 200,46
          C 218,46 230,50 235,56
          C 236,60 234,65 228,68
          C 215,72 190,72 168,70
          C 152,68 143,64 143,60
          Z
        "
        fill="#8B6F52"
      />
      {/* Seat highlight */}
      <path
        d="M 150,54 C 165,50 190,48 210,50 C 220,51 228,54 230,57 C 220,55 200,52 178,52 C 163,52 152,54 150,54 Z"
        fill="#A08060"
        opacity="0.7"
      />

      {/* ── HANDLEBARS (T-bar) ── */}
      {/* Stem */}
      <line x1="110" y1="72" x2="110" y2="52" stroke="#1B3A8C" strokeWidth="4" strokeLinecap="round" />
      {/* Crossbar */}
      <line x1="98" y1="52" x2="128" y2="52" stroke="#1B3A8C" strokeWidth="4" strokeLinecap="round" />
      {/* Left grip */}
      <rect x="95" y="48" width="8" height="14" rx="3" fill="#0F2460" />
      {/* Right grip */}
      <rect x="125" y="48" width="8" height="14" rx="3" fill="#0F2460" />
      {/* Brake lever */}
      <line x1="103" y1="52" x2="99" y2="58" stroke="#1B3A8C" strokeWidth="2" strokeLinecap="round" />

      {/* ── HEADLIGHT (on apron) ── */}
      <circle cx="90" cy="80" r="11" fill="white" stroke="#1B3A8C" strokeWidth="2" />
      <circle cx="90" cy="80" r="7" fill="#FFF8E1" />
      <circle cx="88" cy="78" r="2" fill="white" opacity="0.8" />

      {/* ── MIRROR (above left handlebar) ── */}
      <ellipse cx="97" cy="44" rx="5" ry="7" fill="#1B3A8C" transform="rotate(-15 97 44)" />
      <line x1="97" y1="50" x2="100" y2="52" stroke="#1B3A8C" strokeWidth="2" />

      {/* ── VENT SLATS (on body left side) ── */}
      <line x1="198" y1="90" x2="215" y2="90" stroke="#C9A020" strokeWidth="2" strokeLinecap="round" />
      <line x1="197" y1="97" x2="214" y2="97" stroke="#C9A020" strokeWidth="2" strokeLinecap="round" />
      <line x1="196" y1="104" x2="213" y2="104" stroke="#C9A020" strokeWidth="2" strokeLinecap="round" />
      <line x1="197" y1="111" x2="214" y2="111" stroke="#C9A020" strokeWidth="2" strokeLinecap="round" />

      {/* ── EXHAUST PIPE ── */}
      <path
        d="M 245,128 Q 250,135 242,138 Q 232,141 218,140 Q 208,139 200,136"
        stroke="#7A82A8"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 245,128 Q 250,135 242,138 Q 232,141 218,140 Q 208,139 200,136"
        stroke="#3A4260"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* ── REAR BADGE (body emblem) ── */}
      <ellipse cx="235" cy="82" rx="10" ry="6" fill="#C9A020" />
      <text x="235" y="85" textAnchor="middle" fontSize="5" fontFamily="serif" fill="#1B3A8C" fontWeight="bold">GTS</text>

      {/* ── ENGINE SIDE PANEL ── */}
      <path
        d="M 218,115 C 222,105 228,98 238,95 C 245,93 252,96 256,104 C 258,109 256,116 252,120"
        stroke="#C9A020"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />

      {/* ── FRONT TYRE GUARD / FENDER ── */}
      <path
        d="M 72,90 Q 60,82 48,86 Q 42,88 40,94"
        stroke="#1B3A8C"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* ── TAIL LIGHT ── */}
      <ellipse cx="260" cy="105" rx="6" ry="4" fill="#E8C44A" opacity="0.8" />
      <ellipse cx="262" cy="105" rx="3" ry="2.5" fill="white" opacity="0.6" />
    </svg>
  )
}
