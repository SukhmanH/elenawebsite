'use client'

import { useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

/**
 * Large blurred gradient blobs that drift toward the cursor with soft spring
 * easing — the hero's living background. Each blob tracks the pointer at a
 * different depth for a gentle parallax. Static (centered) under reduced motion.
 */
export function AuraBackground() {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const spring = { stiffness: 45, damping: 22, mass: 1.1 }
  const sx = useSpring(mx, spring)
  const sy = useSpring(my, spring)

  useEffect(() => {
    if (reduce) return
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce, mx, my])

  // Each blob translates by a different amount of the cursor offset.
  const goldX = useTransform(sx, (v) => v * 90)
  const goldY = useTransform(sy, (v) => v * 90)
  const charX = useTransform(sx, (v) => v * -130)
  const charY = useTransform(sy, (v) => v * -100)
  const warmX = useTransform(sx, (v) => v * 60)
  const warmY = useTransform(sy, (v) => v * 70)

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* amber-olive light, upper-left */}
      <motion.div
        style={{ x: goldX, y: goldY }}
        className="absolute -left-[5%] top-[2%] h-[55vw] w-[55vw] rounded-full bg-[radial-gradient(circle,_rgba(179,161,99,0.8)_0%,_rgba(179,161,99,0)_68%)] blur-3xl"
      />
      {/* moss smudge, right of center */}
      <motion.div
        style={{ x: charX, y: charY }}
        className="absolute right-[6%] top-[18%] h-[48vw] w-[48vw] rounded-full bg-[radial-gradient(circle,_rgba(37,42,25,0.5)_0%,_rgba(37,42,25,0)_66%)] blur-3xl"
      />
      {/* soft meadow-green wash, lower-left */}
      <motion.div
        style={{ x: warmX, y: warmY }}
        className="absolute -bottom-[12%] left-[14%] h-[42vw] w-[42vw] rounded-full bg-[radial-gradient(circle,_rgba(140,152,96,0.5)_0%,_rgba(140,152,96,0)_70%)] blur-3xl"
      />
    </div>
  )
}
