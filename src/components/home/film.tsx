'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReduceMotion } from '@/components/motion/use-reduce-motion'

/**
 * The cinematic beat after the hero: Elena in the meadow starts as a small
 * framed photo and, as you scroll, opens out to fill the whole screen while
 * the picture itself eases back from a close zoom. A single line of copy
 * rises in once the frame is full. Under reduced motion it is simply a
 * full-screen photo.
 */
export function Film() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReduceMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const frameScale = useTransform(scrollYProgress, [0, 0.72], [0.5, 1])
  const radius = useTransform(scrollYProgress, [0, 0.72], [48, 0])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.35, 1])
  const lineOpacity = useTransform(scrollYProgress, [0.62, 0.86], [0, 1])
  const lineY = useTransform(scrollYProgress, [0.62, 0.86], [40, 0])

  return (
    <section
      ref={ref}
      aria-label="Elena in the meadow"
      className="relative h-[210vh] bg-ink motion-reduce:h-[100svh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          style={{ scale: reduce ? 1 : frameScale, borderRadius: reduce ? 0 : radius }}
          className="relative h-full w-full overflow-hidden"
        >
          <motion.div style={{ scale: reduce ? 1 : imageScale }} className="absolute inset-0">
            <Image
              src="/elena-photo-5.jpg"
              alt="Elena Collins smiling softly while resting in the meadow grass"
              fill
              sizes="100vw"
              quality={90}
              className="object-cover object-[40%_45%] md:object-[60%_42%]"
            />
          </motion.div>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-ink/20"
          />

          <motion.div
            style={{ opacity: reduce ? 1 : lineOpacity, y: reduce ? 0 : lineY }}
            className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[1600px] flex-col gap-4 px-5 pb-12 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:pb-14"
          >
            <p className="font-display text-[11vw] font-light italic leading-[0.95] tracking-[-0.03em] text-cream sm:text-7xl lg:text-8xl">
              Come home
              <br />
              to your breath.
            </p>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-cream/70">
              Reset · Reconnect · Restore · Thrive
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
