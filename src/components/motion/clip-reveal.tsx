'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReduceMotion } from './use-reduce-motion'

const CURTAIN = [0.76, 0, 0.24, 1] as const
const SETTLE = [0.22, 1, 0.36, 1] as const
const HIDDEN = 'inset(100% 0% 0% 0%)'
const SHOWN = 'inset(0% 0% 0% 0%)'
const VIEW = { once: true, margin: '0px 0px -8% 0px' } as const

type ClipRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

/**
 * Unveils its content bottom-up, like a curtain lifting, the first time it
 * scrolls into view. Visibility is measured on an unclipped wrapper: Chrome
 * reports a fully clipped element as out of view inside scroll containers.
 * Under reduced motion the content is simply there.
 */
export function ClipReveal({ children, className, delay = 0 }: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReduceMotion()
  const inView = useInView(ref, VIEW)
  const shown = inView || reduce

  return (
    <div ref={ref}>
      <motion.div
        className={className}
        initial={{ clipPath: HIDDEN }}
        animate={{ clipPath: shown ? SHOWN : HIDDEN }}
        transition={reduce ? { duration: 0 } : { duration: 1.3, ease: CURTAIN, delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

type RevealImageProps = {
  src: string
  alt: string
  sizes: string
  /** Sizing + shape of the frame (aspect ratio, radius…). */
  className?: string
  imgClassName?: string
  priority?: boolean
  quality?: number
  delay?: number
  /** Parallax travel as a % of the frame; 0 disables. Max ~8. */
  parallax?: number
  children?: ReactNode
}

/**
 * A photo that lifts into view (clip reveal), settles from a slight zoom, then
 * drifts against the scroll for depth. The frame itself is never clipped (so
 * it can be observed); the curtain runs on the layer inside it, and the drift
 * layer is oversized so its edges never show.
 */
export function RevealImage({
  src,
  alt,
  sizes,
  className,
  imgClassName,
  priority,
  quality,
  delay = 0,
  parallax = 6,
  children,
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReduceMotion()
  const inView = useInView(ref, VIEW)
  const shown = inView || reduce
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`])

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: HIDDEN }}
        animate={{ clipPath: shown ? SHOWN : HIDDEN }}
        transition={reduce ? { duration: 0 } : { duration: 1.3, ease: CURTAIN, delay }}
      >
        <motion.div
          style={{ y: reduce || !parallax ? 0 : y }}
          className="absolute inset-x-0 -inset-y-[10%]"
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.2 }}
            animate={{ scale: shown ? 1 : 1.2 }}
            transition={{ duration: 1.9, ease: SETTLE, delay }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              priority={priority}
              quality={quality}
              className={cn('object-cover', imgClassName)}
            />
          </motion.div>
        </motion.div>
      </motion.div>
      {children}
    </div>
  )
}

/** True once the viewport is at least `px` wide (false during SSR and on smaller screens). */
function useMinWidth(px: number) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${px}px)`)
    const update = () => setMatches(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [px])
  return matches
}

/**
 * Drift children against the scroll by `amount` px in each direction.
 * `minWidth` limits the drift to wider screens (e.g. when the item sits in a
 * horizontal scroller on phones, where a vertical offset would be clipped).
 */
export function Parallax({
  children,
  className,
  amount = 60,
  minWidth = 0,
}: {
  children: ReactNode
  className?: string
  amount?: number
  minWidth?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReduceMotion()
  const wide = useMinWidth(minWidth)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount])

  return (
    <motion.div ref={ref} style={{ y: reduce || !wide ? 0 : y }} className={className}>
      {children}
    </motion.div>
  )
}
