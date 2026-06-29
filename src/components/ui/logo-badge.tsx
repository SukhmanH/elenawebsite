type LogoBadgeProps = {
  className?: string
  /** Draw the enclosing circle. */
  withRing?: boolean
  strokeWidth?: number
  title?: string
}

const PETAL =
  'M50 41 C40 39 34 30 38 20 C39.5 16.5 43 15.5 46 17.5 L50 21 L54 17.5 C57 15.5 60.5 16.5 62 20 C66 30 60 39 50 41 Z'
const PETAL_INNER =
  'M50 36 C47.5 34 47.5 29 50 27 C52.5 29 52.5 34 50 36 Z'

const PETAL_ANGLES = [0, 72, 144, 216, 288]
// Long stamens sit over each petal; short ones fill the gaps — a soft spray.
const STAMENS = [
  ...PETAL_ANGLES.map((a) => ({ a, long: true })),
  ...[36, 108, 180, 252, 324].map((a) => ({ a, long: false })),
]

/**
 * Breath & Balance brand mark: a five-petal blossom (plum / sakura) with a
 * spray of stamens, optionally enclosed in a ring. Inherits `currentColor`.
 */
export function LogoBadge({
  className,
  withRing = true,
  strokeWidth = 1.6,
  title = 'Breath & Balance',
}: LogoBadgeProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      strokeLinecap="round"
      role="img"
      aria-label={title}
    >
      {withRing && <circle cx="50" cy="50" r="47.5" />}

      {PETAL_ANGLES.map((a) => (
        <g key={`p${a}`} transform={`rotate(${a} 50 50)`}>
          <path d={PETAL} />
          <path d={PETAL_INNER} />
        </g>
      ))}

      {STAMENS.map(({ a, long }, i) => (
        <g key={`s${i}`} transform={`rotate(${a} 50 50)`}>
          <line x1="50" y1="47" x2="50" y2={long ? 31 : 35} />
          <circle
            cx="50"
            cy={long ? 29.5 : 33.5}
            r={long ? 1.5 : 1.3}
            fill="currentColor"
            stroke="none"
          />
        </g>
      ))}

      <circle cx="50" cy="50" r="3.2" />
      <circle cx="50" cy="50" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  )
}
