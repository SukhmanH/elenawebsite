'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/** Small uppercase section label with a short rule that draws itself in. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.24em]',
        className,
      )}
    >
      <motion.span
        aria-hidden
        className="block h-px w-10 origin-left bg-current"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      {children}
    </p>
  )
}

/** A hairline that draws from left to right when it enters the viewport. */
export function Rule({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      aria-hidden
      className={cn('block h-px w-full origin-left', className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
    />
  )
}
