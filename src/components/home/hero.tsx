'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { Magnetic } from '@/components/motion/magnetic'
import { useReduceMotion } from '@/components/motion/use-reduce-motion'
import { LogoBadge } from '@/components/ui/logo-badge'
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

function Word({
  children,
  italic,
  className,
}: {
  children: ReactNode
  italic?: boolean
  className?: string
}) {
  return (
    <span className={cn('block', className)}>
      <span className="-mx-[0.06em] -my-[0.12em] inline-block overflow-hidden px-[0.06em] py-[0.12em] align-top">
        <motion.span variants={WORD} className={cn('inline-block', italic && 'italic text-honey')}>
          {children}
        </motion.span>
      </span>
    </span>
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
  // The portrait unveils bottom-up like a curtain, then settles from a slight zoom.
  const arch: Variants = {
    hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
    show: {
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: { duration: 1.5, ease: CURTAIN, delay: 0.2 },
    },
  }
  const settle: Variants = {
    hidden: { scale: 1.25 },
    show: { scale: 1, transition: { duration: 2.2, ease: EASE, delay: 0.2 } },
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-cream"
    >
      {/* Soft honey light that breathes with the 4-in / 6-out rhythm. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="breathe-glow absolute left-[72%] top-[50%] h-[110vmax] w-[110vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(221,180,106,0.2)_0%,rgba(221,180,106,0.07)_32%,rgba(221,180,106,0)_62%)]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={ready ? 'show' : 'hidden'}
        style={{ y: reduce ? 0 : contentY, opacity: reduce ? 1 : contentOpacity }}
        className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-5 pb-16 pt-28 sm:px-10 sm:pb-14 sm:pt-32"
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

        <div className="mt-8 grid gap-14 lg:mt-6 lg:grid-cols-12 lg:items-center lg:gap-6">
          <div className="lg:col-span-7">
            <h1 className="font-display text-[19vw] font-light leading-[0.92] tracking-[-0.04em] sm:text-[15vw] lg:text-[8.4vw] 2xl:text-[8.6rem]">
              <span className="sr-only">Reset, Reconnect, Restore, Thrive.</span>
              <span aria-hidden>
                <Word>Reset</Word>
                <Word italic className="lg:ml-[0.45em]">
                  Reconnect
                </Word>
                <Word>Restore</Word>
                <Word italic className="lg:ml-[0.9em]">
                  Thrive.
                </Word>
              </span>
            </h1>

            <motion.p variants={fade} className="mt-10 max-w-sm text-lg leading-relaxed text-cream/70">
              A daily practice to restore, reconnect, and thrive with Elena Collins.
            </motion.p>

            <motion.div variants={fade} className="mt-8 flex flex-wrap items-center gap-3">
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

          {/* Tall arched portrait with an offset outline and a turning blossom. */}
          <div className="relative mx-auto w-full max-w-[420px] lg:col-span-5 lg:mx-0 lg:ml-auto lg:max-w-[440px]">
            <span
              aria-hidden
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[999px] rounded-b-[1.75rem] border border-honey/40 sm:translate-x-5 sm:translate-y-5"
            />
            <motion.div
              variants={arch}
              className="relative aspect-[4/5.2] w-full overflow-hidden rounded-t-[999px] rounded-b-[1.75rem] bg-olive lg:aspect-[4/5.4]"
            >
              <motion.div variants={settle} className="absolute inset-0">
                <Image
                  src="/elena-photo-3.jpg"
                  alt="Elena Collins seated in her white dress, resting her cheek on her arm"
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 440px"
                  className="object-cover object-[50%_32%]"
                />
              </motion.div>
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent"
              />
            </motion.div>
            <motion.span
              variants={fade}
              aria-hidden
              className="absolute -bottom-6 -left-5 grid h-[5.5rem] w-[5.5rem] place-items-center rounded-full bg-honey text-ink shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)] sm:-left-8 sm:h-28 sm:w-28"
            >
              <span className="spin-slow block h-14 w-14 sm:h-[4.5rem] sm:w-[4.5rem]">
                <LogoBadge withRing={false} title="" strokeWidth={2.2} className="h-full w-full" />
              </span>
            </motion.span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
