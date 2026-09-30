'use client'

import { Reveal } from '@/components/ui/reveal'
import { ArrowUpRight, ArrowDown } from 'lucide-react'

const CONNECT_LINKS = [
  {
    title: 'Email me directly',
    handle: 'elenacollinsyoga@gmail.com',
    href: 'mailto:elenacollinsyoga@gmail.com',
    description: 'For inquiries about upcoming programs, retreats, or private sessions.',
    isInternal: false,
  },
  {
    title: 'Yoga & Practice',
    handle: '@elenacollinsyoga',
    href: 'https://instagram.com/elenacollinsyoga',
    description: 'Daily practice clips, breathwork techniques, and program updates.',
    isInternal: false,
  },
  {
    title: 'Personal Journal',
    handle: '@elena.collinsss',
    href: 'https://instagram.com/elena.collinsss',
    description: 'Life behind the scenes, travel, and personal reflections.',
    isInternal: false,
  },
  {
    title: 'Mailing List',
    handle: 'Get early access',
    href: '#newsletter',
    description: 'Be the first invited when new programs, retreats, and workshops open.',
    isInternal: true,
  },
]

export function Connect() {
  return (
    <section id="connect" className="bg-sand py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.24em] text-gold-deep">
            Reach out
          </p>
          <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] text-char sm:text-5xl lg:text-6xl">
            Let&apos;s stay in touch.
          </h2>
          <p className="mt-5 max-w-xl text-lg text-char/70">
            A question about upcoming offerings, a quick hello, or early access to what's next. I read every message.
          </p>
        </Reveal>

        <ul className="mt-14 divide-y divide-char/10 border-y border-char/10">
          {CONNECT_LINKS.map((item, i) => {
            const external = !item.isInternal && item.href.startsWith('http')
            return (
              <Reveal key={item.handle} delay={i * 0.06}>
                <li>
                  <a
                    href={item.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="group grid items-baseline gap-2 py-8 transition-colors duration-300 md:grid-cols-[1fr_1.3fr_1.6fr_auto] md:gap-10"
                  >
                    <h3 className="font-display text-2xl font-medium text-char sm:text-3xl">{item.title}</h3>
                    <p className="text-base font-medium text-gold-deep break-words">{item.handle}</p>
                    <p className="text-[15px] leading-relaxed text-char/60">{item.description}</p>
                    <span aria-hidden className="hidden text-char/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold-deep md:block">
                      {item.isInternal ? <ArrowDown className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                    </span>
                  </a>
                </li>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
