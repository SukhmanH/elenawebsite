'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/ui/reveal'

const COMING = [
  'New guided practices every week',
  'A full breath, presence & calm library',
  'Morning, restorative & wind-down sessions',
  'A few free practices for early subscribers',
  'First access the moment the doors open',
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
        <div className="relative overflow-hidden rounded-[2rem] bg-char text-sand">
          {/* Soft gold aura so the dark panel doesn't read flat */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(194,168,120,0.16),transparent_55%)]"
          />
          <div className="relative grid gap-12 p-10 sm:p-16 md:grid-cols-2 md:items-center md:gap-20">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.4em] text-gold">
                The membership is coming
              </p>
              <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] text-sand sm:text-5xl lg:text-6xl">
                Be the first on the mat.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-sand/65">
                I&apos;m building a daily membership of breath, presence, and
                calm. Join the mailing list and I&apos;ll let you know the moment
                it opens, with a few free practices along the way.
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
                      disabled={loading}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full rounded-full border border-gold/30 bg-transparent px-6 py-4 text-sand transition-[border-color,box-shadow] duration-300 placeholder:text-sand/40 focus:border-gold focus:shadow-[0_0_0_4px_rgba(194,168,120,0.15)] focus:outline-none disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="shrink-0 rounded-full bg-gold px-8 py-4 text-sm font-medium tracking-wide text-char transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-deep active:translate-y-0 disabled:opacity-50"
                    >
                      {loading ? 'Joining...' : 'Join the mailing list'}
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

            <Reveal delay={0.1}>
              <p className="text-xs uppercase tracking-[0.3em] text-gold/70">
                What&apos;s coming
              </p>
              <ul className="mt-6 space-y-4">
                {COMING.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 border-b border-gold/15 pb-4 text-sand/85"
                  >
                    <span aria-hidden className="mt-1 text-gold">
                      ✦
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
