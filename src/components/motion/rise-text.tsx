'use client'

import { Fragment, type ElementType } from 'react'
import { motion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { plainText, splitWords } from './split'
import { useReduceMotion } from './use-reduce-motion'

type RiseTextProps = {
  /** Words wrapped in *asterisks* get `accentClassName`. */
  text: string
  as?: ElementType
  className?: string
  accentClassName?: string
  delay?: number
  stagger?: number
  /** Drive the reveal by hand (e.g. after the intro); otherwise it fires in view. */
  play?: boolean
}

/**
 * Editorial headline reveal: every word rises out of its own mask, one after
 * another. Screen readers get the plain sentence; the animated copy is hidden
 * from them. Under reduced motion the words simply fade in.
 */
export function RiseText({
  text,
  as: Tag = 'h2',
  className,
  accentClassName = 'italic',
  delay = 0,
  stagger = 0.055,
  play,
}: RiseTextProps) {
  const reduce = useReduceMotion()
  const words = splitWords(text)

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay } },
  }
  // Same starting state on server and client; under reduced motion the rise
  // is applied instantly and only the fade plays.
  const word: Variants = {
    hidden: { y: '140%', opacity: 0 },
    show: {
      y: '0%',
      opacity: 1,
      transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], opacity: { duration: 0.5 } },
    },
  }

  const trigger =
    play === undefined
      ? { whileInView: 'show', viewport: { once: true, margin: '0px 0px -8% 0px' } }
      : { animate: play ? 'show' : 'hidden' }

  return (
    <Tag className={className}>
      <span className="sr-only">{plainText(text)}</span>
      <motion.span aria-hidden className="block" variants={container} initial="hidden" {...trigger}>
        {words.map((w, i) => (
          <Fragment key={i}>
            {/* Padding widens the mask so ascenders, descenders and italic overhangs aren't clipped. */}
            <span className="-mx-[0.08em] -my-[0.14em] inline-block overflow-hidden px-[0.08em] py-[0.14em] align-top">
              <motion.span variants={word} className={cn('inline-block', w.accent && accentClassName)}>
                {w.word}
              </motion.span>
            </span>
            {i < words.length - 1 && ' '}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  )
}
