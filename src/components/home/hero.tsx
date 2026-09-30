'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { Magnetic } from '@/components/motion/magnetic'
import { useReduceMotion } from '@/components/motion/use-reduce-motion'
import { PillButton } from '@/components/ui/pill-button'
import { onIntroDone } from '@/lib/intro-state'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const
const CURTAIN = [0.76, 0, 0.24, 1] as const

/** One headline word rising out of its own mask. */
const WORD: Variants = {
  hidden: { y: '130%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 1.25, ease: EASE, opacity: { duration: 0.6 } } },
}

function Word({ children, italic }: { children: ReactNode; italic?: boolean }) {
  return (
    <span className="-mx-[0.06em] -my-[0.12em] inline-block overflow-hidden px-[0.06em] py-[0.12em] align-top">
      <motion.span variants={WORD} className={cn('inline-block', italic && 'italic text-honey')}>
        {children}
      </motion.span>
    </span>
  )
}

/** A photo pill that opens up between the words, nudging them apart. */
function Pill({ src, position }: { src: string; position: string }) {
  const reduce = useReduceMotion()
  const variants: Variants = {
    hidden: { width: '0em', marginRight: '0em' },
    show: {
      width: '1.45em',
      marginRight: '0.22em',
      transition: reduce ? { duration: 0 } : { duration: 1.3, ease: CURTAIN, delay: 0.55 },
    },
  }
  return (
    <motion.span
      variants={variants}
      aria-hidden
      className="relative inline-block h-[0.68em] overflow-hidden rounded-full align-baseline"
    >
      <Image src={src} alt="" fill priority sizes="220px" className={cn('object-cover', position)} />
    </motion.span>
  )
}

export function Hero() {
  const reduce = useReduceMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [ready, setReady] = useState(false)

  // Hold the entrance until the intro curtain has actually lifted.
  useEffect(() => onIntroDone(() => setReady(true)), [])

  // The hero settles back and dims as the About section rises over it.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: 0.25 } },
  }
  const fade: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-cream"
    >
      {/* Soft honey light that breathes with the 4-in / 6-out rhythm. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="breathe-glow absolute left-[62%] top-[48%] h-[110vmax] w-[110vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(221,180,106,0.2)_0%,rgba(221,180,106,0.07)_32%,rgba(221,180,106,0)_62%)]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={ready ? 'show' : 'hidden'}
        style={{ y: reduce ? 0 : contentY, opacity: reduce ? 1 : contentOpacity }}
        className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-between gap-10 px-5 pb-8 pt-28 sm:px-10 sm:pb-10 sm:pt-32"
      >
        <motion.div
          variants={fade}
          className="flex items-center justify-between gap-6 text-[11px] font-medium uppercase tracking-[0.24em] text-khaki"
        >
          <span>Yoga with Elena Collins</span>
          <span className="hidden items-center gap-3 sm:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="pulse-dot absolute inset-0 rounded-full bg-honey" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-honey" />
            </span>
            Radiant Reset presale now open
          </span>
        </motion.div>

        <h1 className="font-display text-[17vw] font-light leading-[0.94] tracking-[-0.04em] sm:text-[11.6vw] lg:text-[11vw] 2xl:text-[11.5rem]">
          <span className="sr-only">Reset, Reconnect, Restore, Thrive.</span>
          <span aria-hidden>
            <Word>Reset</Word> <Word italic>Reconnect</Word>
            <br />
            <Word>Restore</Word>{' '}
            <Pill src="/elena-photo-6.jpg" position="object-[50%_39%]" />
            <br className="sm:hidden" />
            <Word italic>Thrive.</Word>
          </span>
        </h1>

        <div className="grid gap-8 md:grid-cols-[minmax(0,24rem)_auto] md:items-end md:justify-between">
          <motion.p variants={fade} className="text-lg leading-relaxed text-cream/70">
            A daily practice to restore, reconnect, and thrive with Elena Collins.
          </motion.p>
          <motion.div variants={fade} className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <PillButton href="#program" variant="honey" arrow>
                Join the Radiant Reset presale
              </PillButton>
            </Magnetic>
            <Magnetic>
              <PillButton href="#about" variant="outline-light">
                About me
              </PillButton>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
