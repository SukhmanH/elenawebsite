'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/ui/reveal'
import { Sparkles, CheckCircle2, ArrowRight, HeartPulse, ShieldCheck, Sun, MessageSquareQuote, Pencil } from 'lucide-react'
import Image from 'next/image'

const TRANSFORMATIONS = [
  {
    icon: HeartPulse,
    title: 'Release Physical & Mental Tension',
    desc: 'Soften end-of-year stress, chronic tightness, and burnout through daily restorative movement and guided breathwork.',
  },
  {
    icon: ShieldCheck,
    title: 'Cultivate Daily Calming Rituals',
    desc: 'Establish steady, simple habits that help you regulate your nervous system and feel centered every day.',
  },
  {
    icon: Sun,
    title: 'Enter the Holidays Rooted & Rested',
    desc: 'Rather than running on empty when December arrives, step into the season feeling deeply connected, calm, and present.',
  },
]

export function ProgramPresale() {
  const [email, setEmail] = useState('')
  const [userNote, setUserNote] = useState(
    'Hey Elena! Please send me the presale info & early access details for the Radiant Reset program 🤍'
  )
  const [done, setDone] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError('')

    const mailtoSubject = encodeURIComponent('Presale Request: Radiant Reset Program')
    const mailtoBody = encodeURIComponent(`${userNote}\n\nSender Email: ${email}`)
    const mailtoUrl = `mailto:elenacollinsyoga@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`

    try {
      // Send to API route
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, note: userNote }),
      })

      // Launch user's mail client with pre-filled message directly to elenacollinsyoga@gmail.com
      window.location.href = mailtoUrl

      setMessage("Request prepared & recorded! If your email app didn't open automatically, click the button below to send your note directly to elenacollinsyoga@gmail.com 🤍 — Elena")
      setDone(true)
    } catch (err: any) {
      // Even if API fails, trigger mailto directly so email is sent
      window.location.href = mailtoUrl
      setMessage("Request ready! Send your note directly to elenacollinsyoga@gmail.com 🤍 — Elena")
      setDone(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="program" className="bg-char py-28 text-sand sm:py-36 relative overflow-hidden">
      {/* Background radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(198,142,124,0.15),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal>
          {/* Presale Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-gold backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold"></span>
            </span>
            <span>Radiant Reset Presale • Nov 8th – Mid-December</span>
          </div>

          <h2 className="mt-8 font-display text-4xl font-medium leading-[1.05] text-sand sm:text-5xl lg:text-7xl max-w-4xl">
            A Space to Reset &amp; Ground Before the Holidays
          </h2>

          <p className="mt-6 font-display text-xl sm:text-2xl italic text-gold/90 max-w-3xl">
            Starting November 8th and ending mid-December, before the holiday rush hits.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Main Info & Transformation Focus */}
          <Reveal className="lg:col-span-7">
            {/* Elena Program Image Banner */}
            <div className="relative mb-8 aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 shadow-xl">
              <Image
                src="/elena-photo-11.jpg"
                alt="Elena Collins portrait"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-[50%_35%]"
              />
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-char/80 via-char/20 to-transparent" />
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-sand/80">
              <p>
                Before the end-of-year rush sets in, this program gives you dedicated space to pause, release accumulated physical and mental tension, and come back to yourself.
              </p>
              <p>
                Full details and weekly structure will be delivered straight to your welcome email — so right now, all you need to do is reserve your spot on the presale list.
              </p>
            </div>

            {/* What this program does for you */}
            <div className="mt-10">
              <h3 className="text-xs uppercase tracking-[0.3em] font-medium text-gold mb-6">
                What This Program Does For You:
              </h3>

              <div className="grid gap-6 sm:grid-cols-1">
                {TRANSFORMATIONS.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.title}
                      className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-gold/30 hover:bg-white/[0.05]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/20 text-gold">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-display text-xl font-medium text-sand">{item.title}</h4>
                        <p className="mt-1.5 text-sm text-sand/70 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>

          {/* Personalized Message Request Card */}
          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="relative rounded-3xl border border-gold/30 bg-gradient-to-b from-char-2/90 to-char/90 p-8 sm:p-10 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between gap-3 text-gold">
                <div className="flex items-center gap-2.5">
                  <MessageSquareQuote className="h-6 w-6" />
                  <span className="text-xs uppercase tracking-[0.3em] font-medium">Request Presale Info</span>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-gold/80 bg-gold/10 border border-gold/25 px-2.5 py-0.5 rounded-full">
                  <Pencil className="h-3 w-3" /> Click to Edit
                </span>
              </div>

              {done ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 rounded-2xl border border-gold/30 bg-gold/10 p-6 text-center"
                >
                  <CheckCircle2 className="mx-auto h-10 w-10 text-gold" />
                  <p className="mt-4 font-display text-lg italic text-gold leading-relaxed">
                    {message}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                  {/* Editable Note Box */}
                  <div className="group relative rounded-2xl border border-white/20 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-300 focus-within:border-gold focus-within:bg-white/[0.07] focus-within:shadow-[0_0_20px_rgba(198,142,124,0.15)] hover:border-gold/50">
                    <label htmlFor="presale-note" className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] font-medium text-gold/80 mb-2">
                      <span>Your Message to Elena:</span>
                      <span className="text-[10px] text-sand/50 normal-case tracking-normal">Editable note</span>
                    </label>
                    <textarea
                      id="presale-note"
                      rows={3}
                      value={userNote}
                      onChange={(e) => setUserNote(e.target.value)}
                      disabled={loading}
                      placeholder="Write your note to Elena..."
                      className="w-full resize-none bg-transparent font-display text-lg italic leading-relaxed text-sand/90 placeholder:text-sand/40 focus:outline-none disabled:opacity-50"
                    />
                  </div>

                  <p className="text-xs text-sand/65 px-1">
                    Enter your email address below to send this request directly to Elena and receive the full program breakdown in your inbox.
                  </p>

                  <div>
                    <label htmlFor="presale-email" className="sr-only">
                      Your email address
                    </label>
                    <input
                      id="presale-email"
                      type="email"
                      required
                      placeholder="Enter your email address"
                      disabled={loading}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-4 text-sand transition-all duration-300 placeholder:text-sand/40 focus:border-gold focus:bg-white/[0.08] focus:shadow-[0_0_0_4px_rgba(198,142,124,0.15)] focus:outline-none disabled:opacity-50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gold px-6 py-4 font-medium tracking-wide text-char shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-deep hover:shadow-xl active:translate-y-0 disabled:opacity-50"
                  >
                    <span>{loading ? 'Sending request...' : 'Send me the presale info ✦'}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  {error && (
                    <p className="text-center text-xs text-red-400 mt-2">
                      {error}
                    </p>
                  )}
                </form>
              )}

              <div className="mt-8 border-t border-white/10 pt-6 text-center">
                <p className="text-xs text-sand/50">
                  Prefer to send a direct message? Email Elena directly at{' '}
                  <a href="mailto:elenacollinsyoga@gmail.com" className="text-gold underline hover:text-sand">
                    elenacollinsyoga@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
