'use client'

import { useState } from 'react'
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
        <div className="overflow-hidden rounded-[2rem] bg-char text-sand">
          <div className="grid gap-12 p-10 sm:p-16 md:grid-cols-2 md:items-center md:gap-20">
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
                <p className="mt-8 font-display text-2xl italic text-gold">
                  {message}
                </p>
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
                      className="w-full rounded-full border border-gold/30 bg-transparent px-6 py-4 text-sand placeholder:text-sand/40 focus:border-gold focus:outline-none disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="shrink-0 rounded-full bg-gold px-8 py-4 text-sm font-medium tracking-wide text-char transition-colors hover:bg-gold-deep disabled:opacity-50"
                    >
                      {loading ? 'Joining...' : 'Join the mailing list'}
                    </button>
                  </div>
                  {error && (
                    <p className="mt-3 text-sm text-red-400">
                      {error}
                    </p>
                  )}
                  <p className="mt-3 text-sm text-sand/40">
                    No spam, just a note when there&apos;s something to share.
                  </p>
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
