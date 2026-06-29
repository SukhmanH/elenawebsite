'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { LogoBadge } from '@/components/ui/logo-badge'

const R = 46
const CIRCUMFERENCE = 2 * Math.PI * R

/**
 * Entry loading screen: a dark stage with a gold progress ring filling around
 * the blossom mark while a counter climbs to 100, then it fades into the page.
 * Locks scroll while visible; collapses to a quick fade under reduced motion.
 */
export function LoadingScreen() {
  const reduce = useReducedMotion()
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)
  const doneTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (reduce) {
      setCount(100)
      doneTimer.current = setTimeout(() => setDone(true), 550)
      return () => {
        if (doneTimer.current) clearTimeout(doneTimer.current)
      }
    }
    const controls = animate(0, 100, {
      duration: 1.8,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        doneTimer.current = setTimeout(() => setDone(true), 380)
      },
    })
    return () => {
      controls.stop()
      if (doneTimer.current) clearTimeout(doneTimer.current)
    }
  }, [reduce])

  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [done])

  const dashoffset = CIRCUMFERENCE * (1 - count / 100)

  return (
    <AnimatePresence>
      {/* Centered loader while loading */}
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-char text-gold"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          aria-hidden
        >
          <span className="absolute top-[14%] text-sm tabular-nums tracking-[0.35em] text-gold/70">
            {count}
          </span>
          <div className="relative h-[152px] w-[152px]">
            <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" fill="none">
              <circle cx="50" cy="50" r={R} stroke="currentColor" strokeOpacity={0.18} strokeWidth={1} />
              <circle cx="50" cy="50" r={R} stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeDasharray={CIRCUMFERENCE} strokeDashoffset={dashoffset} />
            </svg>
            <motion.div layoutId="logo" className="absolute inset-0 grid place-items-center">
              <LogoBadge withRing={false} strokeWidth={1.5} className="h-[78px] w-[78px] text-gold" />
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Logo after loading, positioned top‑left */}
      {done && (
        <motion.div
          key="logo"
          className="fixed left-6 top-6 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div layoutId="logo" className="h-10 w-10">
            <LogoBadge withRing={false} strokeWidth={1.5} className="h-10 w-10 text-gold" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
