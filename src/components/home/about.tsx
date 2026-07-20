'use client'

import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const IMAGES = [
  { src: '/portrait-1.jpg', alt: 'Elena Collins seated on a yoga mat in a rose garden' },
  { src: '/portrait-2.jpg', alt: 'Elena Collins practicing yoga outdoors' },
  { src: '/portrait-3.jpg', alt: 'Elena Collins teaching a yoga pose' },
]

export function About() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)

  // Re-created whenever index changes, so a manual dot click resets the clock.
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % IMAGES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [index])

  return (
    <section id="about" className="bg-sand py-28 sm:py-36">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 sm:px-10 md:grid-cols-2 md:gap-20">
        <Reveal>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-char">
            <AnimatePresence>
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: reduce ? 1 : 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 1.2, ease: 'easeInOut' },
                  // Ken Burns — the settle outlasts the 5s slot so it never sits still.
                  scale: { duration: 6.5, ease: 'easeOut' },
                }}
                className="absolute inset-0"
              >
                <Image
                  src={IMAGES[index].src}
                  alt={IMAGES[index].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-[50%_30%]"
                  priority={index === 0}
                />
              </motion.div>
            </AnimatePresence>
            {/* Soft charcoal vignette at the base for grounding */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-char/40 to-transparent"
            />
            <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {IMAGES.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show photo ${i + 1} of ${IMAGES.length}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === index ? 'w-7 bg-gold' : 'w-1.5 bg-sand/60 hover:bg-sand'
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-xs uppercase tracking-[0.4em] text-gold-deep">
            About me
          </p>
          <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] text-char sm:text-5xl lg:text-6xl">
            A small, unhurried practice.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-char/70">
            <p>
              Hi, I&apos;m Elena. I&apos;ve been practicing yoga for over 5 years
              and did my first teacher training in Mexico when I was 18. As
              someone experiencing chronic illness and persistent pain, yoga became
              a way I could reshape my life.
            </p>
            <p>
              Through movement, breathwork, meditation, and other wellness
              techniques, I&apos;ve gone from struggling to attend school or work
              consistently to traveling the world, feeling connected to my mind
              and body, and living with less pain and more joy.
            </p>
            <p>
              If you&apos;re struggling with pain, stress, or feeling that
              disconnect, pushing through or dreaming of your next vacation
              isn&apos;t the solution. A practice that works for{' '}
              <span className="font-semibold text-gold-deep">you</span> and your
              life is.
            </p>
            <p className="font-medium text-char">
              This is where you start.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
