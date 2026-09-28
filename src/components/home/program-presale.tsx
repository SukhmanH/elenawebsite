'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/ui/reveal'
import { Calendar, Sparkles, CheckCircle2, ArrowRight, Mail, Video, BookOpen, HeartPulse, Users } from 'lucide-react'

const INCLUDED_ITEMS = [
  {
    icon: Video,
    title: 'Weekly Yoga Videos',
    desc: 'At-your-own-pace guided practice videos to flow whenever your schedule allows.',
  },
  {
    icon: Users,
    title: 'Live Calls',
    desc: 'Interactive group calls to move together, ask questions, and stay connected.',
  },
  {
    icon: BookOpen,
    title: 'Journaling Prompts',
    desc: 'Thoughtful weekly prompts designed to foster self-reflection and mental space.',
  },
  {
    icon: HeartPulse,
    title: 'Habits Built to Reset',
    desc: 'Daily grounding rituals and sustainable habits to help you reset before the holidays.',
  },
]

import Image from 'next/image'

export function ProgramPresale() {
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

      setMessage(data.message || "You're on the presale list 🤍 Full program details will be sent to your inbox shortly.")
      setDone(true)
    } catch (err: any) {
      setError(err.message || 'Unable to sign up right now. Please try again.')
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
            <span>Presale Open • Nov 8th – Mid-December</span>
          </div>

          <h2 className="mt-8 font-display text-4xl font-medium leading-[1.05] text-sand sm:text-5xl lg:text-7xl max-w-4xl">
            Upcoming Reset Program
          </h2>

          <p className="mt-6 font-display text-xl sm:text-2xl italic text-gold/90 max-w-3xl">
            Starting November 8th and ending mid-December, before the holidays hit.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Main Info Box */}
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
                Our upcoming program begins on <strong className="text-gold font-semibold">November 8th</strong> and wraps up in <strong className="text-gold font-semibold">mid-December</strong> — intentionally timed so you can ground yourself, establish restorative habits, and reset before the holiday season begins.
              </p>
              <p>
                Presale enrollment is currently open! Join the presale list to receive early access, exclusive pricing, and full program details sent directly to your email.
              </p>
            </div>

            {/* What's Included Grid */}
            <div className="mt-10">
              <h3 className="text-xs uppercase tracking-[0.3em] font-medium text-gold mb-6">
                What&apos;s Included in the Program:
              </h3>

              <div className="grid gap-6 sm:grid-cols-2">
                {INCLUDED_ITEMS.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-gold/30 hover:bg-white/[0.05]"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/20 text-gold">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="mt-4 font-display text-xl font-medium text-sand">{item.title}</h4>
                      <p className="mt-2 text-sm text-sand/65 leading-relaxed">{item.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>

          {/* Email Access Card */}
          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="relative rounded-3xl border border-gold/30 bg-gradient-to-b from-char-2/90 to-char/90 p-8 sm:p-10 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-3 text-gold">
                <Mail className="h-6 w-6" />
                <span className="text-xs uppercase tracking-[0.3em] font-medium">Get Presale Details</span>
              </div>

              <h3 className="mt-4 font-display text-2xl font-medium text-sand sm:text-3xl">
                Receive Details &amp; Presale Access
              </h3>
              <p className="mt-3 text-sm text-sand/70 leading-relaxed">
                Enter your email address to get an email with the complete program breakdown, live call schedule, and presale access code.
              </p>

              {done ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 rounded-2xl border border-gold/30 bg-gold/10 p-6 text-center"
                >
                  <CheckCircle2 className="mx-auto h-10 w-10 text-gold" />
                  <p className="mt-4 font-display text-xl italic text-gold">
                    {message}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="mt-8 space-y-4">
                  <div>
                    <label htmlFor="presale-email" className="sr-only">
                      Email address
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
                    <span>{loading ? 'Sending details...' : 'Get Presale Info via Email'}</span>
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
                  Have questions? Email directly at{' '}
                  <a href="mailto:hello@elenacollinsyoga.com" className="text-gold underline hover:text-sand">
                    hello@elenacollinsyoga.com
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
