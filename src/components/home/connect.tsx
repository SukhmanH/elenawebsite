'use client'

import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { RiseText } from '@/components/motion/rise-text'
import { Eyebrow, Rule } from '@/components/ui/eyebrow'
import { Reveal } from '@/components/ui/reveal'

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
    <section id="connect" className="bg-cream py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow className="text-bronze">Reach out</Eyebrow>
            <RiseText
              text="Let's stay *in touch.*"
              accentClassName="italic text-bronze"
              className="mt-8 font-display text-[3.2rem] font-light leading-[0.98] tracking-[-0.035em] text-ink sm:text-7xl lg:text-[6.5rem]"
            />
          </div>
          <Reveal className="md:col-span-5 md:pb-3">
            <p className="max-w-md text-lg leading-relaxed text-ink/70">
              A question about upcoming offerings, a quick hello, or early access to what&apos;s next. I read every message.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 sm:mt-20">
          {CONNECT_LINKS.map((item, i) => {
            const external = !item.isInternal && item.href.startsWith('http')
            const Arrow = item.isInternal ? ArrowDown : ArrowUpRight
            return (
              <li key={item.handle}>
                <Rule className="bg-ink/15" delay={i * 0.08} />
                <Reveal delay={i * 0.08}>
                  <a
                    href={item.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="group relative grid items-center gap-2 overflow-hidden rounded-2xl py-7 pl-2 pr-16 sm:pl-5 md:grid-cols-[1.1fr_1.1fr_1.5fr_auto] md:gap-8 md:py-9 md:pr-5"
                  >
                    {/* Ink wash that rises behind the row on hover */}
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-bottom scale-y-0 rounded-2xl bg-ink transition-transform duration-500 ease-soft group-hover:scale-y-100 motion-reduce:transition-none"
                    />
                    <h3 className="relative font-display text-3xl font-light text-ink transition-[color,transform] duration-500 ease-soft group-hover:translate-x-2 group-hover:text-cream sm:text-4xl">
                      {item.title}
                    </h3>
                    <p className="relative break-words text-base font-medium text-bronze transition-colors duration-500 group-hover:text-honey">
                      {item.handle}
                    </p>
                    <p className="relative text-[15px] leading-relaxed text-ink/60 transition-colors duration-500 group-hover:text-cream/70">
                      {item.description}
                    </p>
                    <span
                      aria-hidden
                      className={`absolute right-2 top-7 grid h-11 w-11 place-items-center rounded-full border border-ink/20 text-ink transition-all duration-500 ease-soft group-hover:border-honey group-hover:bg-honey group-hover:text-ink md:relative md:right-auto md:top-auto md:h-12 md:w-12 ${
                        item.isInternal ? 'group-hover:translate-y-1' : 'group-hover:rotate-45'
                      }`}
                    >
                      <Arrow className="h-5 w-5" />
                    </span>
                  </a>
                </Reveal>
              </li>
            )
          })}
        </ul>
        <Rule className="bg-ink/15" delay={0.3} />
      </div>
    </section>
  )
}
