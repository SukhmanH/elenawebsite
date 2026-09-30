'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { RevealImage } from '@/components/motion/clip-reveal'
import { RiseText } from '@/components/motion/rise-text'
import { Eyebrow, Rule } from '@/components/ui/eyebrow'
import { PillButton } from '@/components/ui/pill-button'
import { Reveal } from '@/components/ui/reveal'

const TRANSFORMATIONS = [
  {
    title: 'Release Physical & Mental Tension',
    desc: 'Soften end-of-year stress, chronic tightness, and burnout through daily restorative movement and guided breathwork.',
  },
  {
    title: 'Cultivate Daily Calming Rituals',
    desc: 'Establish steady, simple habits that help you regulate your nervous system and feel centered every day.',
  },
  {
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

      setMessage("Thank you! Your email app should open with your note ready to send. If it doesn't, write to elenacollinsyoga@gmail.com and I'll get back to you. 🤍 Elena")
      setDone(true)
    } catch (err: any) {
      // Even if API fails, trigger mailto directly so email is sent
      window.location.href = mailtoUrl
      setMessage("Almost there. Send your note to elenacollinsyoga@gmail.com and I'll get back to you. 🤍 Elena")
      setDone(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="program" className="relative overflow-clip bg-ink py-28 text-cream sm:py-36">
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Eyebrow className="text-honey">Radiant Reset presale</Eyebrow>
          <Reveal>
            <p className="flex items-center gap-3 rounded-full border border-cream/15 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-cream/75">
              <span className="relative flex h-1.5 w-1.5">
                <span className="pulse-dot absolute inset-0 rounded-full bg-honey" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-honey" />
              </span>
              Nov 8 to mid-December
            </p>
          </Reveal>
        </div>

        <RiseText
          text="A space to reset and *ground* before the holidays"
          accentClassName="italic text-honey"
          className="mt-10 max-w-5xl font-display text-[2.9rem] font-light leading-[1] tracking-[-0.035em] sm:text-7xl lg:text-[6.2rem]"
        />

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl font-display text-xl font-light italic text-khaki sm:text-2xl">
            Starting November 8th and ending mid-December, before the holiday rush hits.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-7">
            <RevealImage
              src="/elena-photo-11.jpg"
              alt="Elena Collins portrait"
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="aspect-[4/3] w-full rounded-[2rem] sm:aspect-[16/10]"
              imgClassName="object-[50%_35%]"
            />

            <div className="mt-12 space-y-6 text-lg leading-relaxed text-cream/75">
              <Reveal>
                <p>
                  Before the end-of-year rush sets in, this program gives you dedicated space to pause, release accumulated physical and mental tension, and come back to yourself.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p>
                  Full details and weekly structure will be delivered straight to your welcome email, so right now, all you need to do is reserve your spot on the presale list.
                </p>
              </Reveal>
            </div>

            <div className="mt-16">
              <Eyebrow className="text-honey">What the program does for you</Eyebrow>

              <ol className="mt-8">
                {TRANSFORMATIONS.map((item, i) => (
                  <li key={item.title}>
                    <Rule className="bg-cream/15" delay={i * 0.1} />
                    <Reveal delay={i * 0.1}>
                      <div className="group grid grid-cols-[3rem_1fr] gap-4 py-8 sm:grid-cols-[5rem_1fr]">
                        <span className="font-display text-3xl font-light italic text-honey/80 transition-colors duration-500 group-hover:text-honey sm:text-4xl">
                          0{i + 1}
                        </span>
                        <div>
                          <h3 className="font-display text-2xl font-light text-cream transition-transform duration-500 ease-soft group-hover:translate-x-1 sm:text-3xl">
                            {item.title}
                          </h3>
                          <p className="mt-3 max-w-xl leading-relaxed text-cream/65">{item.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
              <Rule className="bg-cream/15" delay={0.3} />
            </div>
          </div>

          {/* Personalized request card */}
          <Reveal delay={0.1} className="lg:sticky lg:top-24 lg:col-span-5">
            <div className="relative overflow-hidden rounded-[2rem] border border-cream/10 bg-olive p-7 sm:p-10">
              {/* Slow honey light pooling in the corner of the card */}
              <div
                aria-hidden
                className="breathe-glow pointer-events-none absolute -right-1/3 -top-1/3 aspect-square w-[120%] rounded-full bg-[radial-gradient(closest-side,rgba(221,180,106,0.18)_0%,rgba(221,180,106,0)_100%)]"
              />

              <div className="relative">
                <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-honey">
                  Request presale info
                </p>
                <p className="mt-4 font-display text-3xl font-light leading-tight text-cream sm:text-4xl">
                  Reserve your <span className="italic text-honey">spot.</span>
                </p>

                {done ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8 rounded-2xl border border-cream/10 bg-ink/40 p-6 text-center"
                  >
                    <CheckCircle2 className="mx-auto h-10 w-10 text-honey" />
                    <p className="mt-4 font-display text-lg italic leading-relaxed text-cream">
                      {message}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={onSubmit} className="mt-7 space-y-4">
                    {/* Editable Note Box */}
                    <div className="rounded-2xl border border-cream/15 bg-ink/30 p-5 transition-colors duration-300 focus-within:border-honey hover:border-cream/30">
                      <label
                        htmlFor="presale-note"
                        className="mb-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[11px] font-medium uppercase tracking-[0.2em] text-honey/90"
                      >
                        <span>Your message to Elena</span>
                        <span className="text-[10px] normal-case tracking-normal text-cream/45">Feel free to edit</span>
                      </label>
                      <textarea
                        id="presale-note"
                        rows={3}
                        value={userNote}
                        onChange={(e) => setUserNote(e.target.value)}
                        disabled={loading}
                        placeholder="Write your note to Elena..."
                        className="w-full resize-none bg-transparent font-display text-lg font-light italic leading-relaxed text-cream placeholder:text-cream/40 focus:outline-none disabled:opacity-50"
                      />
                    </div>

                    <p className="px-1 text-xs leading-relaxed text-cream/60">
                      Add your email and I will send the full program breakdown straight to your inbox.
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
                        className="w-full rounded-full border border-cream/15 bg-ink/30 px-6 py-4 text-cream transition-colors duration-300 placeholder:text-cream/40 focus:border-honey focus:outline-none disabled:opacity-50"
                      />
                    </div>

                    <PillButton type="submit" disabled={loading} variant="honey" arrow className="w-full">
                      {loading ? 'Sending request...' : 'Send me the presale info'}
                    </PillButton>

                    {error && (
                      <p className="mt-2 text-center text-xs text-red-300">
                        {error}
                      </p>
                    )}
                  </form>
                )}

                <div className="mt-8 border-t border-cream/10 pt-6 text-center">
                  <p className="text-xs text-cream/55">
                    Prefer to write directly?{' '}
                    <a
                      href="mailto:elenacollinsyoga@gmail.com"
                      className="text-honey underline decoration-honey/40 underline-offset-4 transition-colors hover:text-cream"
                    >
                      elenacollinsyoga@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
