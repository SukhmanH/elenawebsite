'use client'

import { useRef, type ElementType } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'
import { splitWords } from './split'
import { useReduceMotion } from './use-reduce-motion'

type ScrollHighlightProps = {
  /** Words wrapped in *asterisks* get `accentClassName`. */
  text: string
  as?: ElementType
  className?: string
  accentClassName?: string
}

function Word({
  children,
  progress,
  range,
  className,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  className?: string
}) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <motion.span style={{ opacity }} className={className}>
      {children}
    </motion.span>
  )
}

/**
 * A statement that reads itself in as you scroll: each word brightens from a
 * faint ghost to full ink as the paragraph moves up the screen. The text is
 * real, selectable copy throughout; reduced motion shows it at full strength.
 */
export function ScrollHighlight({
  text,
  as: Tag = 'p',
  className,
  accentClassName = 'italic',
}: ScrollHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReduceMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.88', 'end 0.5'] })
  const words = splitWords(text)

  return (
    <Tag className={className}>
      <span ref={ref} className="block">
        {words.map((w, i) => {
          const cls = cn(w.accent && accentClassName)
          const content = i < words.length - 1 ? `${w.word} ` : w.word
          if (reduce) {
            return (
              <span key={i} className={cls}>
                {content}
              </span>
            )
          }
          const start = i / words.length
          return (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[start, start + 1 / words.length]}
              className={cls}
            >
              {content}
            </Word>
          )
        })}
      </span>
    </Tag>
  )
}
