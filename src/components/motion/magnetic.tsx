'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReduceMotion } from './use-reduce-motion'

/**
 * Leans its child toward the mouse pointer and springs back on leave.
 * Mouse only: touch and pen, and reduced motion, leave it still.
 */
export function Magnetic({
  children,
  className,
  strength = 0.28,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReduceMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = { stiffness: 200, damping: 16, mass: 0.5 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  function onPointerMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }

  function onPointerLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ x: sx, y: sy }}
      className={cn('inline-flex', className)}
    >
      {children}
    </motion.div>
  )
}
