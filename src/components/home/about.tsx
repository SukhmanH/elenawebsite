'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ClipReveal, Parallax } from '@/components/motion/clip-reveal'
import { ScrollHighlight } from '@/components/motion/scroll-highlight'
import { useReduceMotion } from '@/components/motion/use-reduce-motion'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Reveal } from '@/components/ui/reveal'

const IMAGES = [
  { src: '/elena-photo-8.jpg', alt: 'Elena Collins portrait in nature' },
  { src: '/elena-photo-3.jpg', alt: 'Elena Collins seated portrait in white dress' },
  { src: '/elena-photo-14.jpg', alt: 'Elena Collins standing portrait in nature' },
]

export function About() {
  const reduce = useReduceMotion()
  const [index, setIndex] = useState(0)

  // Re-created whenever index changes, so a manual dot click resets the clock.
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % IMAGES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [index])

  return (
    <section
      id="about"
      className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-cream pb-28 pt-24 sm:pb-36 sm:pt-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
        <Eyebrow className="text-bronze">About me</Eyebrow>

        <ScrollHighlight
          as="h2"
          text="From living in pain to learning that healing isn't pushing through, it's taking the time for *yourself.*"
          accentClassName="italic text-bronze"
          className="mt-8 max-w-[22ch] font-display text-[2.4rem] font-light leading-[1.04] tracking-[-0.03em] text-ink sm:text-6xl lg:text-[5.2rem]"
        />

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-8">
          <Parallax amount={40} className="md:col-span-5">
            <ClipReveal className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-olive">
              <AnimatePresence>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 1.2, ease: 'easeInOut' },
                    // Ken Burns: the settle outlasts the 5s slot so it never sits still.
                    scale: { duration: 6.5, ease: 'easeOut' },
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={IMAGES[index].src}
                    alt={IMAGES[index].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 42vw"
                    className="object-cover object-[50%_25%]"
                    priority={index === 0}
                  />
                </motion.div>
              </AnimatePresence>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-ink/50 to-transparent"
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
                      i === index ? 'w-8 bg-honey' : 'w-1.5 bg-cream/60 hover:bg-cream'
                    }`}
                  />
                ))}
              </div>
            </ClipReveal>
          </Parallax>

          <div className="md:col-span-6 md:col-start-7 md:self-center lg:col-span-5 lg:col-start-8">
            <div className="space-y-6 text-lg leading-relaxed text-ink/75">
              <Reveal>
                <p className="font-display text-3xl font-light leading-snug text-ink">
                  Hi, I&apos;m Elena!
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <p>
                  I&apos;ve been practicing yoga for over 5 years and did my first teacher
                  training in Mexico when I was 18. As someone experiencing chronic illness
                  and persistent pain, yoga became a way I could reshape my life.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  Through movement, breathwork, meditation, and other wellness techniques,
                  I&apos;ve gone from struggling to attend school or work consistently to
                  traveling the world, feeling connected to my mind and body, and living
                  with less pain and more joy.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p>
                  If you&apos;re struggling with pain, stress, or feeling that disconnect,
                  pushing through or dreaming of your next vacation isn&apos;t the solution.
                  A practice that works for{' '}
                  <em className="font-display text-[1.15em] italic text-bronze">you</em> and
                  your life is.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="border-t border-ink/15 pt-6 font-display text-2xl font-light italic text-ink">
                  This is where you start.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
