'use client'

import { Reveal } from '@/components/ui/reveal'
import { Mail, Instagram, ArrowUpRight } from 'lucide-react'

const CONNECT_LINKS = [
  {
    title: 'Email me directly',
    handle: 'hello@elenacollinsyoga.com',
    href: 'mailto:hello@elenacollinsyoga.com',
    icon: Mail,
    description: 'For inquiries about upcoming programs, retreats, or private sessions.',
  },
  {
    title: 'Yoga & Practice',
    handle: '@elenacollinsyoga',
    href: 'https://instagram.com/elenacollinsyoga',
    icon: Instagram,
    description: 'Daily practice clips, breathwork techniques, and program updates.',
  },
  {
    title: 'Personal Journal',
    handle: '@elena.collinsss',
    href: 'https://instagram.com/elena.collinsss',
    icon: Instagram,
    description: 'Life behind the scenes, travel, and personal reflections.',
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
            Whether you have a question about upcoming offerings, want to inquire about retreats, or simply want to say hello.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {CONNECT_LINKS.map((item, i) => {
            const Icon = item.icon
            return (
              <Reveal key={item.handle} delay={i * 0.1}>
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group relative flex flex-col justify-between rounded-[2rem] border border-char/10 bg-white/60 p-8 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-xl active:translate-y-0"
                >
                  <div>
                    <div className="flex items-center justify-between text-gold-deep">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 transition-colors duration-500 group-hover:bg-gold-deep group-hover:text-sand">
                        <Icon className="h-5 w-5" />
                      </span>
                      <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
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
