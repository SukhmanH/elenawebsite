'use client'

import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'

/**
 * Stillness Moment — A single quiet, editorial landscape image
 * offering a moment of breath and calm on the page.
 */
export function Meadow() {
  return (
    <section id="stillness" className="bg-sand py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal>
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-[2.5rem] border border-char/10 bg-sand-2 shadow-2xl">
            <Image
              src="/elena-photo-19.jpg"
              alt="Elena Collins resting peacefully in nature"
              fill
              sizes="100vw"
              className="object-cover object-[50%_35%] transition-transform duration-[1600ms] ease-out hover:scale-[1.02]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
