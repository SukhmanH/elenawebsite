'use client'

import { motion, type Variants } from 'framer-motion'
import { Magnetic } from '@/components/motion/magnetic'
import { RiseText } from '@/components/motion/rise-text'
import { useReduceMotion } from '@/components/motion/use-reduce-motion'
import { LogoBadge } from '@/components/ui/logo-badge'
import { PillButton } from '@/components/ui/pill-button'
import { Reveal } from '@/components/ui/reveal'

const INSTAGRAM = [
  { handle: '@elenacollinsyoga', href: 'https://instagram.com/elenacollinsyoga' },
  { handle: '@elena.collinsss', href: 'https://instagram.com/elena.collinsss' },
]

const WORDMARK = 'Breath & Balance'

/** The closing signature: the brand name set huge, letters rising one by one. */
function Wordmark() {
  const reduce = useReduceMotion()
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.035 } },
  }
  const letter: Variants = {
    hidden: { y: '105%', opacity: 0 },
    show: {
      y: '0%',
      opacity: 1,
      transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], opacity: { duration: 0.5 } },
    },
  }

  return (
    <motion.p
      aria-label={WORDMARK}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -5% 0px' }}
      className="flex select-none justify-center overflow-hidden whitespace-nowrap pb-[0.22em] pt-[0.1em] font-display text-[13.6vw] font-light sm:text-[15.4vw] leading-[0.9] tracking-[-0.045em] text-cream 2xl:text-[14.5rem]"
    >
      {WORDMARK.split('').map((char, i) => (
        <motion.span
          key={i}
          aria-hidden
          variants={letter}
          className={`inline-block ${char === '&' ? 'px-[0.08em] italic text-honey' : ''}`}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.p>
  )
}

export function Footer() {
  return (
    <footer id="join" className="overflow-hidden bg-ink text-cream">
      <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-28 text-center sm:px-10 sm:pt-36">
        <Reveal>
          <span className="spin-slow mx-auto block h-16 w-16">
            <LogoBadge withRing={false} title="" className="h-16 w-16 text-honey" />
          </span>
        </Reveal>
        <RiseText
          text="I'm so glad you're *in this space.*"
          accentClassName="italic text-honey"
          className="mx-auto mt-10 max-w-4xl font-display text-[2.9rem] font-light leading-[1] tracking-[-0.035em] sm:text-7xl lg:text-[5.8rem]"
        />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-cream/65">
            Workshops, programs, retreats, and classes are all on their way, designed for your real life, no matter where in the world you&apos;re joining from or what your schedule looks like. Be the first invited.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <Magnetic className="mt-10">
            <PillButton href="#newsletter" variant="honey" arrow>
              Join the mailing list
            </PillButton>
          </Magnetic>
        </Reveal>
      </div>

      <div className="px-2">
        <Wordmark />
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-cream/55 sm:flex-row sm:px-10">
          <p className="flex items-center gap-2 font-display text-cream">
            <LogoBadge withRing={false} title="" strokeWidth={2} className="h-6 w-6 text-honey" />
            Yoga with Elena Collins
          </p>
          <ul className="flex items-center gap-6">
            {INSTAGRAM.map((ig) => (
              <li key={ig.handle}>
                <a
                  href={ig.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-honey"
                >
                  {ig.handle}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-cream/35">© {new Date().getFullYear()} Elena Collins</p>
        </div>
      </div>
    </footer>
  )
}
