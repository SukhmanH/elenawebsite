'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Stagger delay in seconds for siblings. */
  delay?: number
  /** Travel distance in px before settling. */
  y?: number
  as?: 'div' | 'section' | 'li' | 'span'
}

/**
 * Quiet scroll-reveal: a short fade + lift that fires once when the element
 * enters the viewport. Collapses to a plain fade (no transform) under
 * prefers-reduced-motion so nothing slides.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  as = 'div',
}: RevealProps) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
    },
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      variants={variants}
    >
      {children}
    </MotionTag>
  )
}
