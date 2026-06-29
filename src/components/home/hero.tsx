'use client'

import Link from 'next/link'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { AuraBackground } from '@/components/ui/aura-background'

const WORDS = [
  { text: 'Breath', shift: 'ml-0' },
  { text: 'Presence', shift: 'md:ml-[14%]' },
  { text: 'Calm', shift: 'md:ml-[5%]' },
]

export function Hero() {
  const reduce = useReducedMotion()

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.15 } },
  }
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center overflow-hidden">
      <AuraBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-[1600px] px-6 pt-36 pb-20 sm:px-10 sm:pt-32"
      >
        <h1 className="font-display font-medium leading-[0.85] tracking-[-0.02em] text-char">
          {WORDS.map((w) => (
            <motion.span
              key={w.text}
              variants={item}
              className={`block text-[17vw] sm:text-[13vw] lg:text-[10rem] xl:text-[11rem] ${w.shift}`}
            >
              {w.text}
            </motion.span>
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
            className="rounded-full border border-char/30 px-8 py-4 text-sm font-medium tracking-wide text-char transition-colors hover:bg-char hover:text-sand"
          >
            About me
          </Link>
          <Link
            href="#newsletter"
            className="rounded-full bg-char px-8 py-4 text-sm font-medium tracking-wide text-sand transition-colors hover:bg-char-2"
          >
            Join the mailing list
          </Link>
        </motion.div>

        <motion.p variants={item} className="mantra mt-14 text-2xl text-gold-deep md:ml-[6%]">
          Let all that you do be done in love.
        </motion.p>
      </motion.div>
    </section>
  )
}
