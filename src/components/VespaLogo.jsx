// Vespa GTS — clean bold flat design, facing LEFT, readable at all sizes
export default function VespaLogo({ size = 'natural', className = '' }) {
  const dims = {
    nav:        { width: 52,     height: 30   },
    footer:     { width: 36,     height: 21   },
    transition: { width: 220,    height: 128  },
    hero:       { width: '100%', height: '100%' },
    natural:    { width: 320,    height: 186  },
  }
  const d = dims[size] || dims.natural

  const Wheel = ({ cx, cy, r }) => {
    const inner = r * 0.62
    const hub   = r * 0.18
    const spokes = [0, 30, 60, 90, 120, 150]
    return (
      <g>
        {/* Tyre */}
        <circle cx={cx} cy={cy} r={r}      fill="#1A2240" />
        <circle cx={cx} cy={cy} r={r - 5}  fill="#F4F6FB" />
        {/* Rim */}
        <circle cx={cx} cy={cy} r={inner}  fill="#E8ECF5" />
        <circle cx={cx} cy={cy} r={inner}  fill="none" stroke="#1B3A8C" strokeWidth="2" />
        {/* Spokes */}
        {spokes.map(deg => {
          const a = (deg * Math.PI) / 180
          return (
            <line key={deg}
              x1={cx + Math.cos(a) * inner} y1={cy + Math.sin(a) * inner}
              x2={cx - Math.cos(a) * inner} y2={cy - Math.sin(a) * inner}
              stroke="#1B3A8C" strokeWidth="1.8" strokeLinecap="round"
            />
          )
        })}
        {/* Hub */}
        <circle cx={cx} cy={cy} r={hub}    fill="#1B3A8C" />
        <circle cx={cx} cy={cy} r={hub * 0.45} fill="#E8C44A" />
      </g>
    )
  }

  return (
    <svg
      width={d.width}
      height={d.height}
      viewBox="0 0 320 186"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Vespa scooter"
    >
      {/* ── REAR WHEEL ── */}
      <Wheel cx={254} cy={136} r={38} />

      {/* ── FRONT WHEEL ── */}
      <Wheel cx={66} cy={136} r={38} />

      {/* ── STEP BOARD ── */}
      <rect x={104} y={126} width={116} height={14} rx={6} fill="#C9A020" />
      <rect x={108} y={128} width={108} height={8}  rx={4} fill="#E8C44A" />

      {/* ── MAIN MONOCOQUE BODY ── */}
      <path d="
        M 148,124
        C 142,106 134,82  136,60
        C 138,44  152,34  176,32
        C 200,30  236,34  256,46
        C 278,58  290,80  288,102
        C 286,120 274,132 258,138
        C 242,144 204,144 172,138
        C 156,134 152,130 148,124 Z
      " fill="#E8C44A" />

      {/* Body highlight */}
      <path d="
        M 176,34 C 204,32 240,38 260,52
        C 278,64 286,82 282,100
        C 276,90 262,74 244,64
        C 222,52 196,46 172,44
        C 158,42 146,46 140,54
        C 140,44 154,36 176,34 Z
      " fill="#F5DC7A" opacity="0.55" />

      {/* Body underside shadow */}
      <path d="
        M 148,124 C 152,130 162,138 180,140 L 258,138
        C 270,134 282,122 286,108
        C 290,120 278,136 258,142
        C 238,148 196,148 170,142 C 158,138 150,130 148,124 Z
      " fill="#C9A020" opacity="0.5" />

      {/* ── LEGSHIELD — the iconic Vespa teardrop ── */}
      <path d="
        M 96,128
        C 86,120 76,106 76,90
        C 76,72  84,56  94,46
        C 100,40  114,36  128,38
        C 142,40  150,54  148,70
        C 146,88  136,108 128,120
        C 120,130 108,134 100,130 Z
      " fill="#E8C44A" />
      {/* Legshield edge shadow */}
      <path d="
        M 96,128 C 86,118 80,106 80,90
        C 80,72 86,56 94,46 L 96,44
        C 86,54 80,70 80,90 C 80,108 88,122 96,128 Z
      " fill="#C9A020" opacity="0.6" />
      {/* Legshield gloss */}
      <path d="M 122,40 C 136,46 144,60 140,74 C 132,66 122,56 116,46 Z"
        fill="#F5DC7A" opacity="0.5" />

      {/* ── FRONT FORK ── */}
      <line x1="66" y1="102" x2="94" y2="124"
        stroke="#1A2240" strokeWidth="7" strokeLinecap="round" />
      <line x1="64" y1="100" x2="92" y2="122"
        stroke="#1B3A8C" strokeWidth="5" strokeLinecap="round" />

      {/* ── REAR FENDER ── */}
      <path d="M 218,112 Q 238,100 258,104 Q 278,108 284,122"
        stroke="#C9A020" strokeWidth="6" fill="none" strokeLinecap="round" />

      {/* ── SEAT ── */}
      <path d="
        M 162,50
        C 180,42 214,40 238,44
        C 256,48 266,58 264,70
        C 262,78 252,84 234,86
        C 212,88 182,86 166,80
        C 152,74 150,64 156,56 Z
      " fill="#5C4235" />
      <path d="
        M 174,44 C 200,40 228,44 246,50
        C 258,56 262,64 256,70
        C 242,62 216,56 190,52 C 176,50 164,52 162,56
        C 162,50 168,46 174,44 Z
      " fill="#7A5C44" opacity="0.65" />
      {/* Seat piping */}
      <path d="M 162,80 C 180,88 214,88 236,86 C 248,84 258,78 262,70"
        stroke="#3E2A1E" strokeWidth="2" fill="none" opacity="0.5" />

      {/* ── HANDLEBARS ── */}
      <line x1="120" y1="84"  x2="120" y2="58"
        stroke="#1B3A8C" strokeWidth="6" strokeLinecap="round" />
      <line x1="100" y1="60"  x2="142" y2="60"
        stroke="#1B3A8C" strokeWidth="6" strokeLinecap="round" />
      {/* Grips */}
      <rect x="94"  y="52" width="12" height="20" rx="5" fill="#0F2460" />
      <rect x="136" y="52" width="12" height="20" rx="5" fill="#0F2460" />
      {/* Grip texture lines */}
      {[56,60,64,68].map(y => (
        <line key={y} x1="136" y1={y} x2="148" y2={y}
          stroke="#2A4FA8" strokeWidth="1" opacity="0.6" />
      ))}

      {/* ── HEADLIGHT ── */}
      <circle cx="90" cy="92" r="15" fill="#1B3A8C" />
      <circle cx="90" cy="92" r="11" fill="white" />
      <circle cx="90" cy="92" r="7"  fill="#FFFCE8" />
      {/* Headlight gloss */}
      <ellipse cx="87" cy="89" rx="3" ry="2" fill="white" opacity="0.8" />

      {/* Headlight rim */}
      <circle cx="90" cy="92" r="15" fill="none" stroke="#0F2460" strokeWidth="1.5" />

      {/* ── MIRROR ── */}
      <line x1="102" y1="60"  x2="98" y2="46"
        stroke="#1B3A8C" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="96" cy="43" rx="8" ry="5"
        fill="#2A4FA8" stroke="#1B3A8C" strokeWidth="1.5" />
      <ellipse cx="95" cy="42" rx="4" ry="2.5"
        fill="#3A5FC0" opacity="0.7" />

      {/* ── VENT LOUVRES ── */}
      {[0, 9, 18, 27].map(o => (
        <line key={o}
          x1={216} y1={100 + o} x2={236} y2={97 + o}
          stroke="#C9A020" strokeWidth="3" strokeLinecap="round" opacity="0.9"
        />
      ))}

      {/* ── EXHAUST ── */}
      <path d="M 260,144 Q 272,154 260,158 Q 242,164 218,162 Q 200,160 190,154"
        stroke="#5A6280" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M 260,144 Q 272,154 260,158 Q 242,164 218,162 Q 200,160 190,154"
        stroke="#3A4260" strokeWidth="5" fill="none" strokeLinecap="round" />

      {/* ── TAIL LIGHT ── */}
      <ellipse cx="282" cy="118" rx="8" ry="5.5" fill="#E8C44A" />
      <ellipse cx="283" cy="118" rx="4.5" ry="3"  fill="white" opacity="0.8" />

      {/* ── INDICATORS ── */}
      <ellipse cx="148" cy="62" rx="4" ry="3" fill="#E8C44A" opacity="0.9" />
      <ellipse cx="268" cy="108" rx="3.5" ry="2.5" fill="#E8C44A" opacity="0.7" />
    </svg>
  )
}
