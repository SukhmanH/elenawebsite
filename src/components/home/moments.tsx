'use client'

import { ClipReveal, Parallax } from '@/components/motion/clip-reveal'
import { RiseText } from '@/components/motion/rise-text'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Reveal } from '@/components/ui/reveal'
import VideoPlayer from '@/components/ui/video-player'

const CLIPS = [
  { src: '/practice-3.mp4', caption: 'Reset', drift: 30 },
  { src: '/practice-2.mp4', caption: 'Restore', drift: 90 },
  { src: '/practice-1.mp4', caption: 'Thrive', drift: 50 },
]

export function Moments() {
  return (
    <section id="moments" className="overflow-hidden bg-ink py-28 text-cream sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow className="text-honey">In motion</Eyebrow>
            <RiseText
              text="A glimpse of *the practice.*"
              accentClassName="italic text-honey"
              className="mt-8 font-display text-[3.2rem] font-light leading-[0.98] tracking-[-0.035em] sm:text-7xl lg:text-[6.2rem]"
            />
          </div>
          <Reveal className="md:col-span-4 md:pb-3">
            <p className="max-w-sm text-lg leading-relaxed text-cream/60">
              Moments from the mat: reset, reconnect, restore, and thrive in motion.
            </p>
          </Reveal>
        </div>

        {/* Phones: a swipeable row that snaps clip to clip. Larger screens: three drifting columns. */}
        <div className="-mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-24 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 lg:gap-10 [&::-webkit-scrollbar]:hidden">
          {CLIPS.map((clip, i) => (
            <Parallax
              key={clip.src}
              amount={clip.drift}
              minWidth={640}
              className={`w-[72vw] max-w-[340px] shrink-0 snap-center sm:w-auto sm:max-w-none ${i === 1 ? 'sm:mt-24' : ''}`}
            >
              <figure className="group mx-auto w-full sm:max-w-[340px]">
                <ClipReveal delay={i * 0.12} className="overflow-hidden rounded-[1.75rem]">
                  <div className="aspect-[9/16] w-full bg-olive transition-transform duration-700 ease-soft group-hover:scale-[1.02]">
                    <VideoPlayer src={clip.src} className="h-full w-full" />
                  </div>
                </ClipReveal>
                <figcaption className="mt-6 flex items-baseline justify-between border-t border-cream/15 pt-4">
                  <span className="font-display text-2xl font-light italic text-honey">{clip.caption}</span>
                  <span className="text-xs font-medium tabular-nums tracking-[0.2em] text-cream/40">
                    0{i + 1}
                  </span>
                </figcaption>
              </figure>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  )
}
