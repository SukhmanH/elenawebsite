'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RiseText } from '@/components/motion/rise-text'
import { Eyebrow, Rule } from '@/components/ui/eyebrow'
import { PillButton } from '@/components/ui/pill-button'
import { Reveal } from '@/components/ui/reveal'

const COMING = [
  'Radiant Reset Program, Nov 8 to mid-December',
  'In-Person Retreats & Events',
  'Online Workshops & Calls',
]

export function MailingList() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      setMessage(data.message || "You're on the list 🤍 I'll be in touch.")
      setDone(true)
    } catch (err: any) {
      setError(err.message || 'Unable to subscribe right now. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="newsletter" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-3 sm:px-10">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-olive text-cream">
          {/* Honey light breathing in the corner so the panel feels alive */}
          <div
            aria-hidden
            className="breathe-glow pointer-events-none absolute -left-1/4 -top-1/4 aspect-square w-[110%] max-w-[1100px] rounded-full bg-[radial-gradient(closest-side,rgba(221,180,106,0.22)_0%,rgba(221,180,106,0)_100%)]"
          />
          <div className="relative grid gap-14 px-6 py-14 sm:p-16 md:grid-cols-2 md:items-center md:gap-20 lg:p-20">
            <div>
              <Eyebrow className="text-honey">New offerings are coming</Eyebrow>
              <RiseText
                text="Be the first *invited.*"
                accentClassName="italic text-honey"
                className="mt-8 font-display text-[3.2rem] font-light leading-[0.98] tracking-[-0.035em] sm:text-7xl lg:text-[5.6rem]"
              />
              <Reveal delay={0.1}>
                <p className="mt-8 max-w-md text-lg leading-relaxed text-cream/70">
                  Join the mailing list to be the first to hear the moment new
                  programs drop, receive exclusive details about upcoming events
                  and retreats, and get early access before doors open.
                </p>
              </Reveal>

              {done ? (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-10 font-display text-2xl italic text-honey"
                >
                  {message}
                </motion.p>
              ) : (
                <Reveal delay={0.15}>
                  <form onSubmit={onSubmit} className="mt-10">
                    <label htmlFor="ml-email" className="sr-only">
                      Email address
                    </label>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <input
                        id="ml-email"
                        type="email"
                        required
                        placeholder="Your email address"
                        disabled={loading}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border-b border-cream/25 bg-transparent py-4 text-lg text-cream transition-colors duration-300 placeholder:text-cream/40 focus:border-honey focus:outline-none disabled:opacity-50"
                      />
                      <PillButton type="submit" disabled={loading} variant="honey" arrow className="shrink-0">
                        {loading ? 'Joining...' : 'Keep me updated'}
                      </PillButton>
                    </div>
                    {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
                  </form>
                </Reveal>
              )}
            </div>

            {/* What's coming */}
            <div>
              <Reveal>
                <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-honey/80">
                  What&apos;s coming
                </p>
              </Reveal>
              <ul className="mt-6">
                {COMING.map((item, i) => (
                  <li key={item}>
                    <Rule className="bg-cream/15" delay={i * 0.1} />
                    <Reveal delay={i * 0.1}>
                      <div className="group flex items-baseline gap-5 py-6">
                        <span className="font-display text-lg font-light italic text-honey/80">
                          0{i + 1}
                        </span>
                        <h3 className="font-display text-2xl font-light leading-snug text-cream transition-transform duration-500 ease-soft group-hover:translate-x-1 sm:text-3xl">
                          {item}
                        </h3>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
              <Rule className="bg-cream/15" delay={0.3} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
