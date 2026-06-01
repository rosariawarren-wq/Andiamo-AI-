// Vespa GTS — facing LEFT, bold flat-design silhouette readable at all sizes
export default function VespaLogo({ size = 'natural', className = '' }) {
  const dims = {
    nav:        { width: 48,     height: 28   },
    footer:     { width: 34,     height: 20   },
    transition: { width: 200,    height: 116  },
    hero:       { width: '100%', height: '100%' },
    natural:    { width: 300,    height: 165  },
  }
  const d = dims[size] || dims.natural

  // Wheel with bold spokes — clear at small sizes
  const Wheel = ({ cx, cy, r }) => (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#1B3A8C" />
      <circle cx={cx} cy={cy} r={r - 6} fill="#E8ECF5" />
      {/* 8 spokes as white lines crossing through center */}
      {[0, 22.5, 45, 67.5].map(deg => {
        const a = deg * Math.PI / 180
        return (
          <g key={deg}>
            <line x1={cx + Math.cos(a)*(r-6)} y1={cy + Math.sin(a)*(r-6)}
                  x2={cx - Math.cos(a)*(r-6)} y2={cy - Math.sin(a)*(r-6)}
                  stroke="#1B3A8C" strokeWidth="2" />
          </g>
        )
      })}
      <circle cx={cx} cy={cy} r={r - 6} fill="none" stroke="#1B3A8C" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={4} fill="#1B3A8C" />
    </g>
  )

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
      {/* ── REAR WHEEL ── */}
      <Wheel cx={238} cy={122} r={34} />

      {/* ── FRONT WHEEL ── */}
      <Wheel cx={62} cy={122} r={34} />

      {/* ── STEP PLATFORM ── */}
      <rect x={94} y={116} width={112} height={10} rx={4} fill="#C9A020" />

      {/* ── MAIN BODY — the signature Vespa egg/monocoque ── */}
      <path
        d="
          M 136,114
          C 132,96  126,74  128,56
          C 130,42  142,34  162,32
          C 182,30  214,32  236,40
          C 258,48  274,66  274,86
          C 274,104 264,118 250,124
          C 236,130 200,130 168,124
          C 152,120 140,118 136,114
          Z
        "
        fill="#E8C44A"
      />

      {/* Body gloss — upper highlight */}
      <path
        d="
          M 162,34
          C 188,31  220,35  242,46
          C 260,55  272,70  270,86
          C 264,80  252,68  236,60
          C 216,50  188,44  162,42
          C 148,40  138,42  132,48
          C 132,40  144,35  162,34
          Z
        "
        fill="#F5DC7A"
        opacity="0.6"
      />

      {/* ── REAR FENDER ── */}
      <path
        d="M 206,102 Q 224,90 244,92 Q 264,94 270,108"
        stroke="#C9A020" strokeWidth="5" fill="none" strokeLinecap="round"
      />

      {/* ── FRONT LEGSHIELD — the most iconic Vespa element ── */}
      <path
        d="
          M 90,118
          C 80,112 72,100 72,86
          C 72,70  78,56  86,48
          C 92,42  104,38  116,40
          C 128,42  134,54  132,68
          C 130,84  122,100 116,110
          C 110,118 100,122 94,120
          Z
        "
        fill="#E8C44A"
      />
      {/* Legshield left shadow */}
      <path
        d="
          M 90,118
          C 82,110 76,98 76,86
          C 76,70  80,56  88,48
          L 86,48
          C 78,56  72,70  72,86
          C 72,100 80,112 90,118 Z
        "
        fill="#C9A020"
        opacity="0.5"
      />
      {/* Legshield gloss */}
      <path
        d="M 112,42 C 124,46 130,58 126,70 C 120,64 112,56 108,48 Z"
        fill="#F5DC7A" opacity="0.55"
      />

      {/* ── FRONT FORK ── */}
      <line x1="62" y1="92" x2="86" y2="114"
            stroke="#1B3A8C" strokeWidth="6" strokeLinecap="round" />

      {/* ── SEAT ── */}
      <path
        d="
          M 152,46
          C 168,38  198,36  220,40
          C 236,44  244,52  242,62
          C 240,68  232,72  216,74
          C 196,76  168,74  154,68
          C 142,64  140,56  144,50
          Z
        "
        fill="#6B5240"
      />
      {/* Seat highlight */}
      <path
        d="M 160,40 C 182,36 210,38 226,44 C 234,48 238,54 234,58 C 222,52 198,46 172,44 C 160,43 152,44 152,44 Z"
        fill="#8B6F52" opacity="0.7"
      />

      {/* ── HANDLEBARS ── */}
      <line x1="114" y1="72" x2="114" y2="50"
            stroke="#1B3A8C" strokeWidth="5" strokeLinecap="round" />
      <line x1="96"  y1="52" x2="134" y2="52"
            stroke="#1B3A8C" strokeWidth="5" strokeLinecap="round" />
      <rect x="92"  y="45" width="10" height="18" rx="4" fill="#0F2460" />
      <rect x="130" y="45" width="10" height="18" rx="4" fill="#0F2460" />

      {/* ── HEADLIGHT ── */}
      <circle cx="88" cy="84" r="13" fill="#1B3A8C" />
      <circle cx="88" cy="84" r="10" fill="white" />
      <circle cx="88" cy="84" r="7"  fill="#FFFDE7" />
      <circle cx="85" cy="81" r="2"  fill="white" opacity="0.9" />

      {/* ── MIRROR ── */}
      <line x1="98" y1="52" x2="95" y2="40"
            stroke="#1B3A8C" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="93" cy="37" rx="7" ry="4.5"
               fill="#2A4FA8" stroke="#1B3A8C" strokeWidth="1" />

      {/* ── VENT SLATS ── */}
      {[0, 8, 16, 24].map(o => (
        <line key={o} x1={202} y1={90+o} x2={220} y2={88+o}
              stroke="#C9A020" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
      ))}

      {/* ── EXHAUST ── */}
      <path
        d="M 244,130 Q 254,138 244,142 Q 228,146 206,144 Q 190,142 182,138"
        stroke="#5A6280" strokeWidth="7" fill="none" strokeLinecap="round"
      />
      <path
        d="M 244,130 Q 254,138 244,142 Q 228,146 206,144 Q 190,142 182,138"
        stroke="#3A4260" strokeWidth="4" fill="none" strokeLinecap="round"
      />

      {/* ── TAIL LIGHT ── */}
      <ellipse cx="266" cy="108" rx="7" ry="5" fill="#E8C44A" />
      <ellipse cx="267" cy="108" rx="4" ry="3" fill="white" opacity="0.75" />
    </svg>
  )
}
