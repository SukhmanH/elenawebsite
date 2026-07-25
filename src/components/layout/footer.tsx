import Link from 'next/link'
import { Reveal } from '@/components/ui/reveal'
import { LogoBadge } from '@/components/ui/logo-badge'

const INSTAGRAM = [
  { handle: '@elenacollinsyoga', href: 'https://instagram.com/elenacollinsyoga' },
]

export function Footer() {
  return (
    <footer id="join" className="bg-char text-sand border-t border-gold/15">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-6 py-12 text-sm text-sand/55 sm:flex-row sm:px-10">
        <p className="flex items-center gap-2 font-display text-sand text-base">
          <LogoBadge className="h-7 w-7 text-gold" /> Breath &amp; Balance
        </p>
        <ul className="flex items-center gap-6">
          {INSTAGRAM.map((ig) => (
            <li key={ig.handle}>
              <Link href={ig.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                {ig.handle}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-sand/35">© {new Date().getFullYear()} Elena Collins</p>
      </div>
    </footer>
  )
}
