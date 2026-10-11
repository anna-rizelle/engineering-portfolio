// Decorative hero illustration: a NACA 0012 airfoil outline (a standard,
// symmetric shape, drawn from its published thickness formula) with coordinate
// axes and dimension marks. It is NOT simulation output and is labeled that way.

const CHORD = 360
const ORIGIN_X = 110
const ORIGIN_Y = 205
const PITCH_DEG = 6 // purely visual tilt

// Half-thickness of a NACA 4-digit symmetric airfoil at fraction x of the chord
function halfThickness(x: number, t = 0.12) {
  return (
    5 * t * (0.2969 * Math.sqrt(x) - 0.126 * x - 0.3516 * x ** 2 + 0.2843 * x ** 3 - 0.1015 * x ** 4)
  )
}

// Points spaced closer together near the leading edge, where the curve bends most
const xs = Array.from({ length: 61 }, (_, i) => (1 - Math.cos((i / 60) * Math.PI)) / 2)
const upper = xs.map((x) => [ORIGIN_X + x * CHORD, ORIGIN_Y - halfThickness(x) * CHORD])
const lower = xs.map((x) => [ORIGIN_X + x * CHORD, ORIGIN_Y + halfThickness(x) * CHORD]).reverse()

const toPath = (pts: number[][]) =>
  'M' + pts.map(([px, py]) => `${px.toFixed(1)} ${py.toFixed(1)}`).join(' L')
const outline = toPath([...upper, ...lower]) + ' Z'

const stations = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]

export function HeroGraphic() {
  return (
    <figure className="w-full">
      <svg
        viewBox="0 0 560 400"
        className="h-auto w-full rounded-sm border border-line bg-surface/60"
        role="img"
        aria-label="Decorative illustration of an airfoil outline with coordinate axes and dimension marks"
      >
        {/* Contour-inspired rings (decorative) */}
        <g
          transform={`rotate(${PITCH_DEG} ${ORIGIN_X} ${ORIGIN_Y})`}
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1"
        >
          {[1, 2, 3, 4].map((k) => (
            <ellipse
              key={k}
              cx={ORIGIN_X + CHORD * 0.45}
              cy={ORIGIN_Y}
              rx={200 + k * 16}
              ry={40 + k * 26}
              opacity={0.3 - k * 0.05}
            />
          ))}
        </g>

        {/* Airfoil: wireframe stations, chord line, outline */}
        <g transform={`rotate(${PITCH_DEG} ${ORIGIN_X} ${ORIGIN_Y})`}>
          {stations.map((x) => (
            <line
              key={x}
              x1={ORIGIN_X + x * CHORD}
              x2={ORIGIN_X + x * CHORD}
              y1={ORIGIN_Y - halfThickness(x) * CHORD}
              y2={ORIGIN_Y + halfThickness(x) * CHORD}
              stroke="#93a1b3"
              strokeWidth="0.75"
              opacity="0.45"
            />
          ))}
          <line
            x1={ORIGIN_X - 20}
            x2={ORIGIN_X + CHORD + 20}
            y1={ORIGIN_Y}
            y2={ORIGIN_Y}
            stroke="#93a1b3"
            strokeWidth="0.75"
            strokeDasharray="6 4"
            opacity="0.6"
          />
          <path
            d={outline}
            pathLength={1}
            className="draw"
            fill="rgba(56,189,248,0.07)"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>

        {/* Freestream direction arrows */}
        <g stroke="#93a1b3" strokeWidth="1" fill="#93a1b3" opacity="0.8">
          {[160, 205, 250].map((y) => (
            <g key={y}>
              <line x1="18" y1={y} x2="62" y2={y} />
              <path d={`M62 ${y - 4} L70 ${y} L62 ${y + 4} Z`} stroke="none" />
            </g>
          ))}
        </g>
        <text x="18" y="142" fill="#93a1b3" fontSize="10" fontFamily="monospace">FREESTREAM</text>

        {/* Dimension line for the chord, c */}
        <g stroke="#ff8a3d" strokeWidth="1" fill="#ff8a3d">
          <line x1={ORIGIN_X} x2={ORIGIN_X + CHORD} y1="318" y2="318" />
          <line x1={ORIGIN_X} x2={ORIGIN_X} y1="310" y2="326" />
          <line x1={ORIGIN_X + CHORD} x2={ORIGIN_X + CHORD} y1="310" y2="326" />
          <text
            x={ORIGIN_X + CHORD / 2}
            y="338"
            textAnchor="middle"
            fontSize="12"
            fontFamily="monospace"
            stroke="none"
          >
            c (chord)
          </text>
        </g>

        {/* Coordinate axes */}
        <g stroke="#e8edf2" strokeWidth="1.25" fill="#e8edf2">
          <line x1="30" y1="375" x2="90" y2="375" />
          <line x1="30" y1="375" x2="30" y2="335" />
          <path d="M90 371 L98 375 L90 379 Z" stroke="none" />
          <path d="M26 335 L30 327 L34 335 Z" stroke="none" />
          <text x="102" y="379" fontSize="11" fontFamily="monospace" stroke="none">x</text>
          <text x="36" y="332" fontSize="11" fontFamily="monospace" stroke="none">y</text>
        </g>

        <text x="540" y="22" textAnchor="end" fill="#93a1b3" fontSize="10" fontFamily="monospace">
          FIG. 01
        </text>
      </svg>
      <figcaption className="mt-2 font-mono text-[11px] leading-relaxed text-muted">
        FIG. 01: Illustrative NACA 0012 outline. Decorative graphic, not simulation or analysis output.
      </figcaption>
    </figure>
  )
}
