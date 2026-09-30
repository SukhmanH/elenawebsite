'use client'

import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { LogoBadge } from '@/components/ui/logo-badge'
import { useReduceMotion } from '@/components/motion/use-reduce-motion'

const ITEMS = ['Reset', 'Reconnect', 'Restore', 'Thrive']
/** Drift speed at rest, in % of the track per second. */
const BASE_SPEED = 2.2

/** Wrap v into [min, max) so the track loops seamlessly. */
function wrap(min: number, max: number, v: number) {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

/**
 * A honey ribbon of the four words drifting past. Scrolling pushes it faster,
 * turns it to follow your direction, and leans the type into the motion.
 * Decorative only (aria-hidden); still under reduced motion.
 */
export function Marquee() {
  const reduce = useReduceMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const boost = useTransform(velocity, [0, 1000], [0, 4], { clamp: false })
  const skewX = useTransform(velocity, [-2500, 2500], [9, -9])
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const direction = useRef(-1)

  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return
    const b = boost.get()
    if (b < 0) direction.current = 1
    else if (b > 0) direction.current = -1
    const step = direction.current * BASE_SPEED * (delta / 1000)
    baseX.set(baseX.get() + step + step * Math.abs(b))
  })

  return (
    <div ref={ref} aria-hidden className="overflow-hidden bg-honey py-6 text-ink sm:py-8">
      <motion.div style={{ x: reduce ? '0%' : x, skewX: reduce ? 0 : skewX }} className="flex w-max items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {[...ITEMS, ...ITEMS].map((text, i) => (
              <span
                key={i}
                className="flex items-center whitespace-nowrap font-display text-[15vw] font-light leading-none tracking-[-0.03em] sm:text-[8.5rem]"
              >
                <span className={i % 2 === 1 ? 'italic' : ''}>{text}</span>
                <LogoBadge
                  withRing={false}
                  strokeWidth={2.2}
                  title=""
                  className="mx-[0.3em] h-[0.42em] w-[0.42em] shrink-0 text-ink/70"
                />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
