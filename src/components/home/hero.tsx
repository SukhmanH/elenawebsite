'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import { AuraBackground } from '@/components/ui/aura-background'
import { onIntroDone } from '@/lib/intro-state'

const WORDS = [
  { text: 'Breath', shift: 'ml-0', italic: false },
  { text: 'Presence', shift: 'md:ml-[14%]', italic: true },
  { text: 'Calm', shift: 'md:ml-[5%]', italic: false },
]

export function Hero() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [ready, setReady] = useState(false)

  // Hold the entrance until the intro overlay has actually left the screen,
  // so nobody pays for an animation they never saw.
  useEffect(() => onIntroDone(() => setReady(true)), [])

  // Gentle parallax exit — the hero settles back and dims as you scroll past.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0.1])

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.13, delayChildren: 0.1 } },
  }
  // Headline words rise out of an overflow mask — an editorial line reveal.
  const word: Variants = {
    hidden: reduce ? { opacity: 0 } : { y: '112%' },
    show: reduce
      ? { opacity: 1, transition: { duration: 0.8 } }
      : { y: '0%', transition: { duration: 1.15, ease: [0.22, 1, 0.36, 1] } },
  }
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
    >
      <AuraBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate={ready ? 'show' : 'hidden'}
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto w-full max-w-[1600px] px-6 pt-36 pb-20 sm:px-10 sm:pt-32"
      >
        <h1 className="font-display font-medium leading-[0.85] tracking-[-0.02em] text-char">
          {WORDS.map((w) => (
            <span key={w.text} className={`block overflow-hidden pb-[0.06em] ${w.shift}`}>
              <motion.span
                variants={word}
                className={`block pr-[0.08em] text-[17vw] sm:text-[13vw] lg:text-[10rem] xl:text-[11rem] ${
                  w.italic ? 'italic text-gold-deep' : ''
                }`}
              >
                {w.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-md text-lg text-char/70 md:ml-[6%]"
        >
          Yoga &amp; daily breath with{' '}
          <Link href="#about" className="text-char underline decoration-gold decoration-2 underline-offset-4 hover:decoration-gold-deep">
            Elena Collins
          </Link>
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4 md:ml-[6%]">
          <Link
            href="#about"
            className="rounded-full border border-char/30 px-8 py-4 text-sm font-medium tracking-wide text-char transition-all duration-300 hover:-translate-y-0.5 hover:bg-char hover:text-sand active:translate-y-0"
          >
            About me
          </Link>
          <Link
            href="#newsletter"
            className="rounded-full bg-char px-8 py-4 text-sm font-medium tracking-wide text-sand transition-all duration-300 hover:-translate-y-0.5 hover:bg-char-2 active:translate-y-0"
          >
            Join the mailing list
          </Link>
        </motion.div>

        <motion.p variants={item} className="mantra mt-14 text-2xl text-gold-deep md:ml-[6%]">
          Let all that you do be done in love.
        </motion.p>
      </motion.div>

      {/* Scroll cue — outside the parallax layer so it stays pinned to the fold. */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-char/45">Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-char/15">
          <span className="cue-dot absolute left-0 top-0 h-4 w-px bg-gold-deep" />
        </span>
      </motion.div>
    </section>
  )
}
