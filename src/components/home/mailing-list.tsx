'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/ui/reveal'

const COMING = [
  '6-Week Self-Care Programs',
  'Flexible Monthly Membership',
  'In-Person Retreats & Gatherings',
  'Live Workshops & Wellness Calls',
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
    <section id="newsletter" className="bg-sand py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-char/95 text-sand shadow-2xl backdrop-blur-md">
          {/* Soft aura gradient so the dark panel feels living */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(121,148,126,0.22),transparent_60%)]"
          />
          <div className="relative grid gap-12 p-10 sm:p-16 md:grid-cols-2 md:items-center md:gap-20">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.4em] text-gold">
                New offerings are coming
              </p>
              <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] text-sand sm:text-5xl lg:text-6xl">
                Be the first on the mat.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-sand/65">
                Join the mailing list to be the first to hear the moment new
                programs drop, receive exclusive details about upcoming events
                and retreats, and get early access before doors open.
              </p>

              {done ? (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 font-display text-2xl italic text-gold"
                >
                  {message}
                </motion.p>
              ) : (
                <form onSubmit={onSubmit} className="mt-8">
                  <label htmlFor="ml-email" className="sr-only">
                    Email address
                  </label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      id="ml-email"
                      type="email"
                      required
                      placeholder="Your email address"
                      disabled={loading}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-full border border-white/10 bg-white/[0.03] px-6 py-4 text-sand transition-[border-color,box-shadow] duration-300 placeholder:text-sand/35 focus:border-gold focus:shadow-[0_0_0_4px_rgba(121,148,126,0.18)] focus:outline-none disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="shrink-0 rounded-full bg-gold px-8 py-4 text-sm font-medium tracking-wide text-char shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-deep hover:shadow-[0_8px_20px_rgba(121,148,126,0.25)] active:translate-y-0 disabled:opacity-50"
                    >
                      {loading ? 'Joining...' : 'Keep me updated'}
                    </button>
                  </div>
                  {error && (
                    <p className="mt-3 text-sm text-red-400">
                      {error}
                    </p>
                  )}
                </form>
              )}
            </Reveal>

            {/* Right side: What's coming list */}
            <Reveal delay={0.1}>
              <div className="space-y-8 md:pl-6 border-t border-white/10 pt-10 md:border-t-0 md:border-l md:pt-0">
                <p className="text-xs uppercase tracking-[0.3em] text-gold/70">
                  What&apos;s coming:
                </p>
                <ul className="space-y-6">
                  {COMING.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-4 border-b border-white/10 pb-4 text-sand/85"
                    >
                      <span aria-hidden className="text-gold">
                        ✦
                      </span>
                      <h3 className="font-display text-xl font-medium text-sand leading-none">
                        {item}
                      </h3>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
