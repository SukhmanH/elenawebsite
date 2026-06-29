'use client'

import { Reveal } from '@/components/ui/reveal'
import VideoPlayer from '@/components/ui/video-player'

const CLIPS = [
  { src: '/practice-3.mp4', caption: 'Breath' },
  { src: '/practice-2.mp4', caption: 'Presence' },
  { src: '/practice-1.mp4', caption: 'Calm' },
]

export function Moments() {
  return (
    <section id="moments" className="bg-char py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-gold">In motion</p>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] text-sand sm:text-5xl lg:text-6xl">
            A glimpse of the practice.
          </h2>
          <p className="mt-5 max-w-xl text-sand/55">
            Moments from the mat, breath, presence, and calm in motion.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {CLIPS.map((clip, i) => (
            <Reveal key={clip.src} delay={i * 0.08}>
              <figure className="mx-auto w-full max-w-[300px]">
                <VideoPlayer src={clip.src} />
                <figcaption className="mt-5 text-center font-display text-xl italic text-gold">
                  {clip.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
