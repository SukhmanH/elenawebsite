import Link from 'next/link'
import { Reveal } from '@/components/ui/reveal'
import { LogoBadge } from '@/components/ui/logo-badge'

const INSTAGRAM = [
  { handle: '@elenacollinsyoga', href: 'https://instagram.com/elenacollinsyoga' },
]

export function Footer() {
  return (
    <footer id="join" className="bg-char text-sand">
      <div className="mx-auto max-w-[1400px] px-6 py-28 text-center sm:px-10 sm:py-36">
        <Reveal>
          <span className="spin-slow mx-auto block h-16 w-16">
            <LogoBadge withRing={false} className="h-16 w-16 text-gold" />
          </span>
          <h2 className="mx-auto mt-10 max-w-3xl font-display text-5xl font-medium leading-[1.02] text-sand sm:text-6xl lg:text-7xl">
            Come home to your breath.
          </h2>
          <p className="mx-auto mt-8 max-w-md text-lg leading-relaxed text-sand/65">
            New offerings and events are on the way. Join the mailing list and
            I&apos;ll let you know the moment doors open.
          </p>

          <Link
            href="#newsletter"
            className="mt-10 inline-flex rounded-full bg-gold px-10 py-4 text-sm font-medium tracking-wide text-char transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-deep active:translate-y-0"
          >
            Join the mailing list
          </Link>
          <p className="mt-4 text-sm text-sand/40">
            Or say hello on Instagram.
          </p>
        </Reveal>
      </div>

      <div className="border-t border-gold/15">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-sand/55 sm:flex-row sm:px-10">
          <p className="flex items-center gap-2 font-display text-sand">
            <LogoBadge className="h-7 w-7 text-gold" /> Breath &amp; Balance
          </p>
          <ul className="flex items-center gap-6">
            {INSTAGRAM.map((ig) => (
              <li key={ig.handle}>
                <Link href={ig.href} className="transition-colors hover:text-gold">
                  {ig.handle}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-sand/35">© {new Date().getFullYear()} Elena Collins</p>
        </div>
      </div>
    </footer>
  )
}
