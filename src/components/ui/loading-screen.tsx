'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { PETAL, PETAL_ANGLES, PETAL_INNER, STAMENS } from '@/components/ui/logo-badge'
import { markIntroDone } from '@/lib/intro-state'

/** Heavy assets to warm into the browser cache while the intro plays. */
const PRELOAD = ['/practice-3.mp4', '/practice-2.mp4', '/practice-1.mp4']

/** Floor so the blossom can finish drawing, and a cap so a stalled asset can't trap the user. */
const MIN_MS = 1700
const MAX_MS = 3200

const DRAW = [0.65, 0, 0.35, 1] as const
const CURTAIN = [0.76, 0, 0.24, 1] as const

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

/** The brand blossom drawing itself stroke by stroke: petals, then stamens, then the heart. */
function BlossomDraw({ className }: { className?: string }) {
  const stroke = (delay: number, duration = 1.1) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: {
      pathLength: { duration, ease: DRAW, delay },
      opacity: { duration: 0.2, delay },
    },
  })
  const dot = (delay: number) => ({
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, delay },
  })

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden
    >
      {PETAL_ANGLES.map((a, i) => (
        <g key={`p${a}`} transform={`rotate(${a} 50 50)`}>
          <motion.path d={PETAL} {...stroke(i * 0.09)} />
          <motion.path d={PETAL_INNER} {...stroke(0.5 + i * 0.06, 0.6)} />
        </g>
      ))}
      {STAMENS.map(({ a, long }, i) => (
        <g key={`s${i}`} transform={`rotate(${a} 50 50)`}>
          <motion.line x1="50" y1="47" x2="50" y2={long ? 31 : 35} {...stroke(0.75 + i * 0.03, 0.45)} />
          <motion.circle
            cx="50"
            cy={long ? 29.5 : 33.5}
            r={long ? 1.5 : 1.3}
            fill="currentColor"
            stroke="none"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            {...dot(1.05 + i * 0.03)}
          />
        </g>
      ))}
      <motion.circle cx="50" cy="50" r="3.2" {...stroke(1.1, 0.5)} />
    </svg>
  )
}

/**
 * Entry curtain: on the dark olive stage the blossom draws itself while a large
 * counter climbs to 100. Then the whole stage lifts away like a curtain, its
 * curved hem sweeping up past the hero. The idle time does real work: it
 * preloads the practice videos. Completion waits for both a minimum on-screen
 * time and the preloads (capped). Scroll stays locked while it's up; reduced
 * motion gets a quick fade instead.
 */
export function LoadingScreen() {
  const reduce = useReducedMotion()
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)
  const doneTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (reduce) {
      setCount(100)
      // Still warm the cache, just without the visible drawing.
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
      doneTimer.current = setTimeout(() => setDone(true), wait + 150)
    }

    const controls = animate(0, 100, {
      duration: MIN_MS / 1000,
      ease: [0.5, 0, 0.2, 1],
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

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] bg-ink text-honey"
          initial={{ y: '0%' }}
          exit={reduce ? { opacity: 0 } : { y: '-118%' }}
          transition={{ duration: reduce ? 0.4 : 1.15, ease: CURTAIN }}
          aria-hidden
        >
          {/* The curved hem that trails the curtain as it lifts. */}
          <span className="absolute inset-x-[-10%] top-full h-[14vh] rounded-b-[50%] bg-ink" />

          <div className="flex h-full flex-col items-center justify-center">
            <BlossomDraw className="h-24 w-24 sm:h-28 sm:w-28" />
            <motion.p
              className="mt-8 font-display text-2xl font-light italic text-cream sm:text-3xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
            >
              Breath &amp; Balance
            </motion.p>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-6 sm:px-10 sm:pb-8">
            <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-khaki">
              Yoga with Elena Collins
            </span>
            <span className="font-display text-7xl font-light leading-[0.8] tabular-nums text-cream/15 sm:text-[9rem]">
              {count}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
