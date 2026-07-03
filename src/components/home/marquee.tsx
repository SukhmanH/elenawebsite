const ITEMS = ['Breath', 'Presence', 'Calm', 'Let all that you do be done in love']

/**
 * Editorial marquee — the three pillars and the mantra drifting by in large
 * serif type. Decorative only (aria-hidden); pauses on hover; frozen under
 * prefers-reduced-motion via CSS.
 */
export function Marquee() {
  return (
    <div
      aria-hidden
      className="marquee overflow-hidden border-y border-char/10 bg-sand py-7 sm:py-9"
    >
      <div className="marquee-track flex w-max items-baseline">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-baseline">
            {ITEMS.map((text, i) => (
              <span
                key={i}
                className={`flex items-baseline whitespace-nowrap font-display text-4xl text-char/25 sm:text-5xl ${
                  i % 2 === 1 ? 'italic' : ''
                }`}
              >
                <span className="mx-8 text-lg text-gold-deep/70 sm:mx-10">✦</span>
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
