'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  type Variants,
} from 'framer-motion'
import { LogoBadge } from '@/components/ui/logo-badge'
import { useReduceMotion } from '@/components/motion/use-reduce-motion'
import { PillButton } from '@/components/ui/pill-button'
import { onIntroDone } from '@/lib/intro-state'

const PRIMARY = [
  { href: '#program', label: 'Radiant Reset', image: '/elena-photo-11.jpg' },
  { href: '#about', label: 'About', image: '/elena-photo-8.jpg' },
  { href: '#stillness', label: 'Breathe', image: '/elena-photo-19.jpg' },
  { href: '#newsletter', label: 'Mailing list', image: '/elena-photo-6.jpg' },
  { href: '#connect', label: 'Connect', image: '/elena-photo-1.jpg' },
]

const SOCIAL = [
  { href: 'https://instagram.com/elenacollinsyoga', label: '@elenacollinsyoga' },
  { href: 'https://instagram.com/elena.collinsss', label: '@elena.collinsss' },
]

const EASE = [0.22, 1, 0.36, 1] as const
const CURTAIN = [0.76, 0, 0.24, 1] as const

export function Nav() {
  const reduce = useReduceMotion()
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState(0)
  const menuButton = useRef<HTMLButtonElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const { scrollY } = useScroll()

  useEffect(() => onIntroDone(() => setReady(true)), [])

  // Tuck the bar away while reading down the page; bring it back on any scroll up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 240)
  })

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    window.__lenis?.stop()
    closeButton.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const trigger = menuButton.current
    return () => {
      document.body.style.overflow = ''
      window.__lenis?.start()
      window.removeEventListener('keydown', onKey)
      trigger?.focus({ preventScroll: true })
    }
  }, [open])

  const overlay: Variants = reduce
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.2 } },
      }
    : {
        hidden: { clipPath: 'circle(0% at 92% 5%)' },
        show: {
          clipPath: 'circle(150% at 92% 5%)',
          transition: { duration: 0.95, ease: CURTAIN, staggerChildren: 0.06, delayChildren: 0.3 },
        },
        exit: { clipPath: 'circle(0% at 92% 5%)', transition: { duration: 0.7, ease: CURTAIN } },
      }
  const rise: Variants = {
    hidden: reduce ? { opacity: 0 } : { y: '110%' },
    show: reduce ? { opacity: 1 } : { y: '0%', transition: { duration: 0.9, ease: EASE } },
  }
  const fade: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  }

  return (
    <>
      <motion.header
        className="pointer-events-none fixed inset-x-0 top-0 z-50"
        initial={{ y: '-120%' }}
        animate={{ y: ready && !(hidden && !open) ? '0%' : '-120%' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 sm:px-8 sm:py-5">
          <Link
            href="#top"
            aria-label="Breath & Balance, back to top"
            className="group pointer-events-auto flex items-center gap-2.5 rounded-full bg-ink/80 py-2 pl-2 pr-4 text-cream shadow-[0_10px_30px_-12px_rgba(28,26,15,0.6)] backdrop-blur-md"
          >
            <LogoBadge
              withRing={false}
              title=""
              strokeWidth={2}
              className="h-7 w-7 text-honey transition-transform duration-700 ease-soft group-hover:rotate-[72deg]"
            />
            <span className="font-display text-[15px] leading-none">Breath &amp; Balance</span>
          </Link>

          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label="Open menu"
            className="group pointer-events-auto flex items-center gap-3 rounded-full bg-ink/80 py-3 pl-5 pr-4 text-cream shadow-[0_10px_30px_-12px_rgba(28,26,15,0.6)] backdrop-blur-md transition-colors duration-300 hover:bg-ink"
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.22em]">Menu</span>
            <span className="flex flex-col items-end gap-[5px]">
              <span className="block h-px w-5 bg-cream transition-all duration-300 group-hover:w-3" />
              <span className="block h-px w-5 bg-cream" />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] overflow-y-auto bg-ink text-cream"
            variants={overlay}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <div className="mx-auto flex min-h-full max-w-[1600px] flex-col px-4 sm:px-8">
              <div className="flex items-center justify-between py-4 sm:py-5">
                <span className="flex items-center gap-2.5 py-2 pl-2">
                  <LogoBadge withRing={false} title="" strokeWidth={2} className="h-7 w-7 text-honey" />
                  <span className="font-display text-[15px] leading-none">Breath &amp; Balance</span>
                </span>
                <button
                  ref={closeButton}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="group flex items-center gap-3 rounded-full border border-cream/20 py-3 pl-5 pr-4 transition-colors duration-300 hover:border-cream/60"
                >
                  <span className="text-[11px] font-medium uppercase tracking-[0.22em]">Close</span>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 transition-transform duration-500 ease-soft group-hover:rotate-90"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <path d="M5 5l14 14M19 5L5 19" />
                  </svg>
                </button>
              </div>

              <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
                <nav aria-label="Primary">
                  <ul>
                    {PRIMARY.map((link, i) => (
                      <li key={link.href} className="overflow-hidden">
                        <motion.div variants={rise}>
                          <Link
                            href={link.href}
                            onClick={() => setOpen(false)}
                            onMouseEnter={() => setActive(i)}
                            onFocus={() => setActive(i)}
                            className="group flex items-baseline gap-5 py-1 font-display text-[13vw] font-light leading-[1.02] tracking-[-0.03em] sm:text-7xl lg:text-[5.6rem]"
                          >
                            <span aria-hidden className="font-body text-xs font-medium tracking-[0.2em] text-khaki tabular-nums">
                              0{i + 1}
                            </span>
                            <span className="transition-[color,transform] duration-500 ease-soft group-hover:translate-x-3 group-hover:italic group-hover:text-honey">
                              {link.label}
                            </span>
                          </Link>
                        </motion.div>
                      </li>
                    ))}
                  </ul>
                </nav>

                <motion.div variants={fade} className="hidden lg:block">
                  <div className="relative ml-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[1.75rem] bg-olive">
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={PRIMARY[active].image}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: EASE }}
                      >
                        <Image
                          src={PRIMARY[active].image}
                          alt=""
                          fill
                          sizes="420px"
                          className="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>

              <motion.div
                variants={fade}
                className="flex flex-col gap-6 border-t border-cream/10 py-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <PillButton href="#newsletter" onClick={() => setOpen(false)} variant="honey" arrow>
                  Join the mailing list
                </PillButton>
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/60">
                  {SOCIAL.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-honey"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href="mailto:elenacollinsyoga@gmail.com" className="transition-colors hover:text-honey">
                      elenacollinsyoga@gmail.com
                    </a>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
