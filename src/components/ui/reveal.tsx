'use client'

import { motion, type Variants } from 'framer-motion'
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
 * enters the viewport. Under reduced motion the lift is skipped (MotionConfig)
 * and only the fade remains.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = 'div',
}: RevealProps) {
  const MotionTag = motion[as]

  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
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
