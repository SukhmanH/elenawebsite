import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'honey' | 'ink' | 'outline-light' | 'outline-dark'

const VARIANTS: Record<Variant, { base: string; fill: string }> = {
  honey: { base: 'bg-honey text-ink', fill: 'bg-cream' },
  ink: { base: 'bg-ink text-cream', fill: 'bg-olive' },
  'outline-light': {
    base: 'border border-cream/30 text-cream hover:border-cream hover:text-ink',
    fill: 'bg-cream',
  },
  'outline-dark': {
    base: 'border border-ink/25 text-ink hover:border-ink hover:text-cream',
    fill: 'bg-ink',
  },
}

type PillButtonProps = {
  children: ReactNode
  variant?: Variant
  className?: string
  /** Show a trailing arrow that nudges forward on hover. */
  arrow?: boolean
  href?: string
  external?: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}

/**
 * The site's one button. On hover a soft wash rises from below and the label
 * rolls up to a fresh copy of itself.
 */
export function PillButton({
  children,
  variant = 'honey',
  className,
  arrow,
  href,
  external,
  type = 'button',
  disabled,
  onClick,
}: PillButtonProps) {
  const v = VARIANTS[variant]
  const classes = cn(
    'group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-4 text-sm font-medium tracking-[0.01em] transition-[color,border-color] duration-500 disabled:pointer-events-none disabled:opacity-50',
    v.base,
    className,
  )

  const inner = (
    <>
      <span
        aria-hidden
        className={cn(
          'absolute -inset-x-[12%] top-full h-[220%] rounded-[50%] transition-transform duration-700 ease-soft group-hover:-translate-y-[72%] motion-reduce:transition-none',
          v.fill,
        )}
      />
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-soft group-hover:-translate-y-full motion-reduce:transition-none">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-soft group-hover:translate-y-0 motion-reduce:transition-none"
        >
          {children}
        </span>
      </span>
      {arrow && (
        <ArrowRight
          aria-hidden
          className="relative h-4 w-4 transition-transform duration-500 ease-soft group-hover:translate-x-1"
        />
      )}
    </>
  )

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    )
  }
  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {inner}
      </Link>
    )
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {inner}
    </button>
  )
}
