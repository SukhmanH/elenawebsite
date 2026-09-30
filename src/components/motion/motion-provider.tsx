'use client'

import type { ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'

/**
 * Site-wide motion settings: for visitors who ask for reduced motion, framer
 * applies transform animations (rises, slides, zooms) instantly and keeps only
 * gentle fades.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
