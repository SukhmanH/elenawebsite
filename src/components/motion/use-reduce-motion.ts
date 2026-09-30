'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * The visitor's reduced-motion preference, reported only after hydration.
 * The server can't know it, so the first client render has to match the
 * server's full-motion markup; components then re-render with the real value.
 * (Timed animations are also covered globally by MotionConfig reducedMotion="user".)
 */
export function useReduceMotion() {
  const prefers = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted && !!prefers
}
