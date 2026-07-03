'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { LogoBadge } from '@/components/ui/logo-badge'
import { markIntroDone } from '@/lib/intro-state'

const R = 46
const CIRCUMFERENCE = 2 * Math.PI * R

/** Heavy assets to warm into the browser cache while the intro plays. */
const PRELOAD = ['/practice-3.mp4', '/practice-2.mp4', '/practice-1.mp4']

/** Floor so the intro never flickers, and a cap so a stalled asset can't trap the user. */
const MIN_MS = 1100
const MAX_MS = 3000

/** Kick off a video download and resolve once it has enough to play (or errors out). */
function preloadVideo(src: string): Promise<void> {
  return new Promise((resolve) => {
    const v = document.createElement('video')
    v.preload = 'auto'
    v.muted = true
    const finish = () => resolve()
    v.addEventListener('canplaythrough', finish, { once: true })
    v.addEventListener('error', finish, { once: true })
    v.src = src
    v.load()
  })
}

/**
 * Entry loading screen: a dark stage with a gold progress ring filling around
 * the blossom mark while a counter climbs to 100, then it fades into the page.
 * The intro is brief and the idle time does real work — it preloads the heavy
 * practice videos so they're warm by the time the visitor scrolls to them.
 * Completion waits for both a minimum on-screen time and the preloads (capped),
 * so it never feels jumpy and never hangs on a slow network.
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
      // Still warm the cache, just without the visible ring animation.
      PRELOAD.forEach(preloadVideo)
      doneTimer.current = setTimeout(() => setDone(true), 400)
      return () => {
        if (doneTimer.current) clearTimeout(doneTimer.current)
      }
    }

    const start = Date.now()
    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      const elapsed = Date.now() - start
      const wait = Math.max(0, MIN_MS - elapsed)
      doneTimer.current = setTimeout(() => setDone(true), wait + 220)
    }

    const controls = animate(0, 100, {
      duration: MIN_MS / 1000,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    })

    // Race the real preloads against a hard cap so we never wait forever.
    const cap = setTimeout(finish, MAX_MS)
    Promise.all(PRELOAD.map(preloadVideo)).then(finish)

    return () => {
      controls.stop()
      clearTimeout(cap)
      if (doneTimer.current) clearTimeout(doneTimer.current)
    }
  }, [reduce])

  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden'
    if (done) {
      window.__lenis?.start()
      markIntroDone()
    } else {
      window.__lenis?.stop()
    }
    return () => {
      document.body.style.overflow = ''
      window.__lenis?.start()
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
