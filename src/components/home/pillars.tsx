import { Reveal } from '@/components/ui/reveal'

const PILLARS = [
  {
    name: 'Upcoming 6-Week Online Program',
    body: 'Guided, immersive programs designed to ground your daily breath and movement, building a steady practice week by week.',
  },
  {
    name: 'In-Person Retreats & Events',
    body: 'Intimate, slow-paced gatherings to unwind, reset, and share quiet practice in beautiful spaces together.',
  },
  {
    name: 'Online Workshops & Calls',
    body: 'Live wellness calls, breathwork deep-dives, and interactive sessions to support your practice wherever you are.',
  },
]

export function Pillars() {
  return (
    <section id="pillars" className="bg-char py-28 text-sand sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-gold">
            What&apos;s coming
          </p>
          <h2 className="mt-6 max-w-4xl font-display text-3xl font-medium leading-[1.1] text-sand sm:text-4xl lg:text-5xl">
            Elevate your practice with exclusive upcoming programs, retreats, and workshops. Your next step toward presence, strength, and ease.
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-12 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.name} delay={i * 0.1}>
              <div className="group border-t border-gold/30 pt-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/80">
                <span className="font-display text-2xl italic text-gold/70 transition-colors duration-500 group-hover:text-gold">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-3xl font-medium text-sand">
                  {pillar.name}
                </h3>
                <p className="mt-5 leading-relaxed text-sand/60 transition-colors duration-500 group-hover:text-sand/80">
                  {pillar.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
