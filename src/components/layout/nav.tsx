'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion'
import { LogoBadge } from '@/components/ui/logo-badge'
import { LiquidButton } from '@/components/ui/liquid-glass-button'

const PRIMARY = [
  { href: '#about', label: 'About' },
  { href: '#practices', label: 'Practices' },
  { href: '#newsletter', label: 'Mailing list' },
  { href: '#join', label: 'Contact' },
]

const SOCIAL = [
  { href: 'https://instagram.com/elenacollinsyoga', label: '@elenacollinsyoga' },
]

export function Nav() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const overlay: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1], staggerChildren: reduce ? 0 : 0.07, delayChildren: 0.12 },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  }
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 sm:px-10">
          <Link href="#top" aria-label="Breath & Balance home" className="text-char">
            <LogoBadge className="h-14 w-14" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label="Open menu"
            className="group flex h-12 w-12 flex-col items-center justify-center gap-[6px] text-char"
          >
            <span className="block h-px w-8 bg-char transition-all group-hover:w-6" />
            <span className="block h-px w-8 bg-char transition-all group-hover:w-10" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] bg-char text-gold"
            variants={overlay}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <div className="mx-auto flex h-full max-w-[1600px] flex-col px-6 sm:px-10">
              <div className="flex items-center justify-between py-6">
                <LogoBadge className="h-14 w-14 text-gold" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-12 w-12 place-items-center text-gold transition-opacity hover:opacity-70"
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                    <path d="M5 5l14 14M19 5L5 19" />
                  </svg>
                </button>
              </div>

              <div className="grid flex-1 items-center gap-12 pb-16 md:grid-cols-[1.4fr_1fr]">
                <nav aria-label="Primary">
                  <ul className="space-y-1">
                    {PRIMARY.map((link) => (
                      <motion.li key={link.href} variants={item}>
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="block font-display text-6xl font-medium leading-[1.05] text-gold transition-colors hover:text-cream sm:text-7xl lg:text-8xl"
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <motion.div variants={item} className="md:pl-8">
                  {/*
                  <Link
                    href="#newsletter"
                    onClick={() => setOpen(false)}
                    className="inline-flex rounded-full bg-gold px-9 py-4 text-sm font-medium tracking-wide text-char transition-colors hover:bg-gold-deep"
                  >
                    Join the mailing list
                  </Link>
                  */}
                  <Link
                    href="#newsletter"
                    onClick={() => setOpen(false)}
                  >
                    <LiquidButton className="px-9 py-4">
                      Join the mailing list
                    </LiquidButton>
                  </Link>

                  <ul className="mt-12 space-y-3 text-gold/70">
                    {SOCIAL.map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} className="transition-colors hover:text-gold">
                          {s.label}
                        </Link>
                      </li>
                    ))}
                    <li className="pt-4 text-sm text-gold/40">
                      Membership platform (link to be confirmed)
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
