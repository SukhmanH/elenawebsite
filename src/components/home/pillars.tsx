import { Reveal } from '@/components/ui/reveal'

const PILLARS = [
  {
    name: 'Breath',
    body: 'Simple breathwork to steady the nervous system: extended exhales, soft holds, the work you can feel in minutes.',
  },
  {
    name: 'Presence',
    body: 'Short, grounding movement to arrive in the body and out of the day’s noise. Slow flows, no rush, no performance.',
  },
  {
    name: 'Calm',
    body: 'Restorative practices and wind-downs to carry the quiet with you into sleep, into work, and into the next breath.',
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
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] text-sand sm:text-5xl lg:text-6xl">
            Three threads, woven through every practice.
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
