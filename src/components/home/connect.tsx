'use client'

import { Reveal } from '@/components/ui/reveal'
import { Mail, Instagram, Sparkles, ArrowUpRight, ArrowDown } from 'lucide-react'

const CONNECT_LINKS = [
  {
    title: 'Email me directly',
    handle: 'hello@elenacollinsyoga.com',
    href: 'mailto:hello@elenacollinsyoga.com',
    icon: Mail,
    description: 'For inquiries about upcoming programs, retreats, or private sessions.',
    isInternal: false,
  },
  {
    title: 'Yoga & Practice',
    handle: '@elenacollinsyoga',
    href: 'https://instagram.com/elenacollinsyoga',
    icon: Instagram,
    description: 'Daily practice clips, breathwork techniques, and program updates.',
    isInternal: false,
  },
  {
    title: 'Personal Journal',
    handle: '@elena.collinsss',
    href: 'https://instagram.com/elena.collinsss',
    icon: Instagram,
    description: 'Life behind the scenes, travel, and personal reflections.',
    isInternal: false,
  },
  {
    title: 'Mailing List',
    handle: 'Get early access ✦',
    href: '#newsletter',
    icon: Sparkles,
    description: 'Be the first invited when new programs, retreats, and workshops open.',
    isInternal: true,
  },
]

export function Connect() {
  return (
    <section id="connect" className="bg-sand py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-gold-deep">
            Reach out
          </p>
          <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] text-char sm:text-5xl lg:text-6xl">
            Let&apos;s connect.
          </h2>
          <p className="mt-5 max-w-xl text-lg text-char/70">
            Whether you have a question about upcoming offerings, want to say hello, or want to join the list for early access.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CONNECT_LINKS.map((item, i) => {
            const Icon = item.icon
            return (
              <Reveal key={item.handle} delay={i * 0.08}>
                <a
                  href={item.href}
                  target={!item.isInternal && item.href.startsWith('http') ? '_blank' : undefined}
                  rel={!item.isInternal && item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`group relative flex h-full flex-col justify-between rounded-[2rem] border p-8 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl active:translate-y-0 ${
                    item.isInternal
                      ? 'border-gold-deep/40 bg-gold/15 hover:bg-gold/25'
                      : 'border-char/10 bg-white/60 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-gold-deep">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 transition-colors duration-500 group-hover:bg-gold-deep group-hover:text-sand">
                        <Icon className="h-5 w-5" />
                      </span>
                      {item.isInternal ? (
                        <ArrowDown className="h-5 w-5 transition-transform duration-500 group-hover:translate-y-1 text-gold-deep" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      )}
                    </div>
                    <h3 className="mt-8 font-display text-2xl font-medium text-char">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium tracking-wide text-gold-deep">
                      {item.handle}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-char/65">
                      {item.description}
                    </p>
                  </div>
                </a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
