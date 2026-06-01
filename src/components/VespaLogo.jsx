// Authentic Vespa GTS silhouette — facing LEFT
// ViewBox: 0 0 300 165
export default function VespaLogo({ size = 'natural', className = '' }) {
  const dims = {
    nav:        { width: 48,    height: 28  },
    footer:     { width: 34,    height: 20  },
    transition: { width: 200,   height: 116 },
    hero:       { width: '100%',height: '100%' },
    natural:    { width: 300,   height: 165 },
  }
  const d = dims[size] || dims.natural

  const Wheel = ({ cx, cy, r }) => {
    const spokes = [0, 45, 90, 135]
    return (
      <g>
        {/* Tyre */}
        <circle cx={cx} cy={cy} r={r} fill="#E8ECF5" stroke="#1B3A8C" strokeWidth="6" />
        {/* Rim */}
        <circle cx={cx} cy={cy} r={r - 8} fill="none" stroke="#2A4FA8" strokeWidth="1.5" />
        {/* Spokes — hub to rim */}
        {spokes.map(angle => {
          const a = (angle * Math.PI) / 180
          return (
            <g key={angle}>
              <line
                x1={cx + Math.cos(a) * 5}  y1={cy + Math.sin(a) * 5}
                x2={cx + Math.cos(a) * (r - 9)} y2={cy + Math.sin(a) * (r - 9)}
                stroke="#1B3A8C" strokeWidth="1.5"
              />
              <line
                x1={cx - Math.cos(a) * 5}  y1={cy - Math.sin(a) * 5}
                x2={cx - Math.cos(a) * (r - 9)} y2={cy - Math.sin(a) * (r - 9)}
                stroke="#1B3A8C" strokeWidth="1.5"
              />
            </g>
          )
        })}
        {/* Hub */}
        <circle cx={cx} cy={cy} r={5} fill="#1B3A8C" />
        <circle cx={cx} cy={cy} r={2.5} fill="#2A4FA8" />
      </g>
    )
  }

  return (
    <svg
      width={d.width}
      height={d.height}
      viewBox="0 0 300 165"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Vespa scooter"
    >
      {/* ── REAR WHEEL (right) ── */}
      <Wheel cx={240} cy={122} r={36} />

      {/* ── FRONT WHEEL (left) ── */}
      <Wheel cx={60} cy={122} r={36} />

      {/* ── FOOTBOARD PLATFORM ── */}
      <path
        d="M 96,116 L 200,116 L 200,124 Q 150,126 96,124 Z"
        fill="#C9A020"
      />

      {/* ── MAIN BODY — large organic egg-shaped monocoque ── */}
      <path
        d="
          M 134,118
          C 130,104 124,86  124,68
          C 124,54  132,42  150,38
          C 168,34  195,35  216,40
          C 237,45  256,56  264,72
          C 271,86  271,102 266,114
          C 262,122 254,128 244,129
          C 216,131 172,128 148,122
          C 140,120 136,119 134,118
          Z
        "
        fill="#E8C44A"
      />
      {/* Body gloss highlight */}
      <path
        d="
          M 148,42
          C 168,37  196,38  216,44
          C 234,49  250,60  258,74
          C 262,82  262,92  258,100
          C 248,96  234,88  218,82
          C 198,75  172,70  154,68
          C 140,66  130,60  128,52
          C 131,46  138,43  148,42
          Z
        "
        fill="#F2D060"
        opacity="0.55"
      />

      {/* ── REAR FENDER (hugs top of rear wheel) ── */}
      <path
        d="M 210,100 Q 228,88 248,90 Q 262,92 266,104"
        stroke="#C9A020"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* ── FRONT LEGSHIELD / APRON — signature Vespa teardrop ── */}
      <path
        d="
          M 92,120
          C 84,116 78,108 78,96
          C 78,82  82,68  88,58
          C 92,50  100,44  112,44
          C 122,44  128,50  128,62
          C 128,74  122,90  116,104
          C 112,114 104,120  96,122
          Z
        "
        fill="#E8C44A"
      />
      {/* Legshield shadow/depth */}
      <path
        d="
          M 92,120
          C 86,114  82,106  82,96
          C 82,82   86,68   92,58
          L 88,58
          C 82,68   78,82   78,96
          C 78,108  84,116  92,120
          Z
        "
        fill="#C9A020"
        opacity="0.45"
      />
      {/* Legshield gloss */}
      <path
        d="M 110,48 C 120,50 126,58 124,68 C 118,64 110,58 106,52 Z"
        fill="#F2D060"
        opacity="0.5"
      />

      {/* ── FRONT FORK (wheel hub → legshield bottom) ── */}
      <line
        x1="60" y1="90"
        x2="90" y2="116"
        stroke="#1B3A8C" strokeWidth="5" strokeLinecap="round"
      />
      <line
        x1="62" y1="88"
        x2="90" y2="112"
        stroke="#2A4FA8" strokeWidth="2.5" strokeLinecap="round"
      />

      {/* ── SEAT (long slim bench on body top) ── */}
      <path
        d="
          M 148,52
          C 160,44  184,40  208,42
          C 224,43  236,48  238,56
          C 238,62  234,68  224,70
          C 206,74  178,74  158,70
          C 146,68  142,62  144,56
          C 145,54  146,52  148,52
          Z
        "
        fill="#8B6F52"
      />
      {/* Seat gloss */}
      <path
        d="M 156,46 C 174,42 202,42 218,46 C 228,49 234,54 232,58 C 222,54 202,50 180,50 C 164,50 152,52 152,52 C 152,50 154,47 156,46 Z"
        fill="#A88060"
        opacity="0.6"
      />

      {/* ── HANDLEBARS ── */}
      {/* Stem from apron top */}
      <line x1="112" y1="68" x2="112" y2="48" stroke="#1B3A8C" strokeWidth="4" strokeLinecap="round" />
      {/* Crossbar */}
      <line x1="96" y1="50" x2="132" y2="50" stroke="#1B3A8C" strokeWidth="4" strokeLinecap="round" />
      {/* Left grip */}
      <rect x="93" y="44" width="9" height="16" rx="4" fill="#0F2460" />
      {/* Right grip */}
      <rect x="128" y="44" width="9" height="16" rx="4" fill="#0F2460" />
      {/* Brake lever left */}
      <line x1="100" y1="50" x2="95" y2="58" stroke="#2A4FA8" strokeWidth="1.5" strokeLinecap="round" />

      {/* ── HEADLIGHT ── */}
      <circle cx="88" cy="82" r="12" fill="white" stroke="#1B3A8C" strokeWidth="2" />
      <circle cx="88" cy="82" r="8"  fill="#FFFDE0" />
      <circle cx="85" cy="79" r="2.5" fill="white" opacity="0.9" />

      {/* ── MIRROR (left handlebar) ── */}
      <line x1="97" y1="50" x2="94" y2="40" stroke="#1B3A8C" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="92" cy="37" rx="6" ry="4" fill="#2A4FA8" opacity="0.9" />

      {/* ── VENT SLATS (side panel on body) ── */}
      {[0,7,14,21].map(offset => (
        <line
          key={offset}
          x1={200} y1={92 + offset}
          x2={217} y2={90 + offset}
          stroke="#C9A020" strokeWidth="2" strokeLinecap="round"
          opacity="0.8"
        />
      ))}

      {/* ── EXHAUST PIPE ── */}
      <path
        d="M 244,130 Q 252,136 244,140 Q 230,143 210,142 Q 196,141 188,138"
        stroke="#7A82A8" strokeWidth="6" fill="none" strokeLinecap="round"
      />
      <path
        d="M 244,130 Q 252,136 244,140 Q 230,143 210,142 Q 196,141 188,138"
        stroke="#3A4260" strokeWidth="3" fill="none" strokeLinecap="round"
      />

      {/* ── TAIL LIGHT ── */}
      <ellipse cx="263" cy="108" rx="6" ry="4" fill="#E8C44A" />
      <ellipse cx="264" cy="108" rx="3" ry="2" fill="white" opacity="0.7" />

      {/* ── GTS BADGE ── */}
      <ellipse cx="232" cy="82" rx="11" ry="6" fill="#C9A020" />
      <text x="232" y="85" textAnchor="middle" fontSize="5.5" fontFamily="Georgia, serif" fill="#1B3A8C" fontWeight="bold" letterSpacing="0.5">GTS</text>
    </svg>
  )
}
