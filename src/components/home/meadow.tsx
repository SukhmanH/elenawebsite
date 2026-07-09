'use client'

import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'

/*
  Editorial photo grid from the meadow shoot. Portraits hold their tall
  crop; landscapes sit centered beside them so the uneven edges read as
  breathing room, not misalignment.
*/
const SIZES_PORTRAIT = '(max-width: 768px) 100vw, 40vw'
const SIZES_LANDSCAPE = '(max-width: 768px) 100vw, 55vw'

function Photo({
  src,
  alt,
  aspect,
  sizes,
  position = 'object-center',
}: {
  src: string
  alt: string
  aspect: string
  sizes: string
  position?: string
}) {
  return (
    <div
      className={`group relative w-full overflow-hidden rounded-[1.75rem] bg-char-2 ${aspect}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover ${position} transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]`}
      />
      {/* Faint vignette so the mossy frames sit into the cream page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-char/10"
      />
    </div>
  )
}

export function Meadow() {
  return (
    <section id="stillness" className="bg-cream py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-gold-deep">In stillness</p>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] text-char sm:text-5xl lg:text-6xl">
            The quiet between breaths.
          </h2>
          <p className="mt-5 max-w-xl text-char/60">
            A spring afternoon in the meadow — where most of this practice was
            found, and where it always returns.
          </p>
        </Reveal>

        <div className="mt-16 space-y-6 md:space-y-10">
          {/* Row one — tall portrait leads, landscape rests beside it */}
          <div className="grid gap-6 md:grid-cols-12 md:items-center md:gap-10">
            <Reveal className="md:col-span-5">
              <Photo
                src="/meadow-2.jpg"
                alt="Elena standing in a white dress among spring trees"
                aspect="aspect-[3/4]"
                sizes={SIZES_PORTRAIT}
                position="object-[50%_35%]"
              />
            </Reveal>
            <Reveal delay={0.12} className="md:col-span-7">
              <Photo
                src="/meadow-1.jpg"
                alt="Elena resting in tall grass, head on her hand, smiling softly"
                aspect="aspect-[3/2]"
                sizes={SIZES_LANDSCAPE}
              />
            </Reveal>
          </div>

          {/* Row two — mirrored: landscape settles first, portrait closes */}
          <div className="grid gap-6 md:grid-cols-12 md:items-center md:gap-10">
            <Reveal className="order-last md:order-first md:col-span-7">
              <Photo
                src="/meadow-4.jpg"
                alt="Elena lying in the meadow grass with her eyes closed"
                aspect="aspect-[3/2]"
                sizes={SIZES_LANDSCAPE}
              />
            </Reveal>
            <Reveal delay={0.12} className="md:col-span-5">
              <Photo
                src="/meadow-3.jpg"
                alt="Elena seated with her arms wrapped around her knees, gazing aside"
                aspect="aspect-[3/4]"
                sizes={SIZES_PORTRAIT}
                position="object-[50%_30%]"
              />
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <p className="mantra mt-14 text-center text-2xl text-gold-deep">
            Stillness is also practice.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
