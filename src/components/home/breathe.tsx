'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { RiseText } from '@/components/motion/rise-text'
import { useReduceMotion } from '@/components/motion/use-reduce-motion'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Reveal } from '@/components/ui/reveal'

/** 4s in, 6s out: the longer exhale is the calming one. */
const PHASES = {
  in: { label: 'Breathe in', seconds: 4, scale: 1 },
  out: { label: 'Breathe out', seconds: 6, scale: 0.62 },
} as const
type Phase = keyof typeof PHASES

const REST_SCALE = 0.8
const BREATH_EASE = [0.45, 0, 0.55, 1] as const
type Breath = { phase: Phase; left: number }
const START: Breath = { phase: 'in', left: PHASES.in.seconds }

/**
 * The stillness moment, and the site's signature: a breathe-along guide.
 * Elena's portrait sits in a circle that swells on the inhale and softens on
 * the exhale, with ripples trailing behind and the cue + count beneath.
 * It only runs while on screen, can be paused, and under reduced motion it
 * waits for "Begin" and then guides with the words alone.
 */
export function Breathe() {
  const reduce = useReduceMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0.35 })
  const [paused, setPaused] = useState(false)
  const [started, setStarted] = useState(false)
  const [breath, setBreath] = useState<Breath>(START)

  const running = inView && !paused && (!reduce || started)
  const phase = PHASES[breath.phase]

  // One tick a second; roll into the next phase when the count runs out.
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setBreath(({ phase, left }) => {
        if (left > 1) return { phase, left: left - 1 }
        const next: Phase = phase === 'in' ? 'out' : 'in'
        return { phase: next, left: PHASES[next].seconds }
      })
    }, 1000)
    return () => {
      clearInterval(id)
      // Every fresh start begins on an inhale.
      setBreath(START)
    }
  }, [running])

  const target = reduce ? 1 : running ? phase.scale : REST_SCALE
  const transition = running
    ? { duration: phase.seconds, ease: BREATH_EASE }
    : { duration: 1.2, ease: BREATH_EASE }

  const needsStart = reduce && !started
  const cue = running ? phase.label : needsStart ? 'Press begin when ready' : 'Breathe with me'

  function onControl() {
    if (needsStart) setStarted(true)
    else setPaused((p) => !p)
  }

  return (
    <section
      ref={ref}
      id="stillness"
      className="relative overflow-hidden bg-blush py-28 text-ink sm:py-36"
    >
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-5 sm:px-10 lg:grid-cols-2 lg:gap-10">
        <div>
          <Eyebrow className="text-ink">A moment of stillness</Eyebrow>
          <RiseText
            text="Take one breath *with me.*"
            accentClassName="italic text-bronze"
            className="mt-8 font-display text-[3.2rem] font-light leading-[0.98] tracking-[-0.035em] sm:text-7xl lg:text-[6.2rem]"
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/75">
              In for four, out for six. A longer exhale tells your body it&apos;s safe to slow down.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <button
              type="button"
              onClick={onControl}
              className="mt-10 inline-flex items-center gap-3 rounded-full border border-ink/25 px-6 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-blush"
            >
              <span aria-hidden className="relative flex h-2 w-2">
                {running && <span className="pulse-dot absolute inset-0 rounded-full bg-bronze" />}
                <span className="relative h-2 w-2 rounded-full bg-bronze" />
              </span>
              {needsStart ? 'Begin' : paused ? 'Resume' : 'Pause'}
            </button>
          </Reveal>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative grid aspect-square w-[min(80vw,460px)] place-items-center">
            {/* Ripples trail the breath, a beat behind. */}
            {[1.22, 1.1].map((ring, i) => (
              <motion.span
                key={ring}
                aria-hidden
                className="absolute inset-0 rounded-full border border-ink/15"
                initial={false}
                animate={{ scale: target * ring, opacity: running ? 1 - i * 0.2 : 0.5 }}
                transition={{ ...transition, delay: running ? 0.25 - i * 0.12 : 0 }}
              />
            ))}
            <motion.div
              className="relative h-full w-full overflow-hidden rounded-full bg-olive shadow-[0_40px_80px_-40px_rgba(28,26,15,0.55)]"
              initial={false}
              animate={{ scale: target }}
              transition={transition}
            >
              <Image
                src="/elena-photo-19.jpg"
                alt="Elena Collins resting peacefully in the grass, eyes closed"
                fill
                sizes="(max-width: 1024px) 80vw, 460px"
                className="object-cover object-[50%_52%]"
              />
            </motion.div>
          </div>

          <div className="mt-12 text-center" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={cue}
                initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl font-light italic text-ink sm:text-5xl"
              >
                {cue}
              </motion.p>
            </AnimatePresence>
            <p aria-hidden className="mt-3 h-5 text-sm tabular-nums tracking-[0.3em] text-ink/55">
              {running ? breath.left : ''}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
