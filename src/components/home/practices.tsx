import { Reveal } from '@/components/ui/reveal'

const PRACTICES = [
  { title: 'Morning practice', length: '10–15 min', body: 'A gentle wake-up for breath and body, the one to start the day with.' },
  { title: 'Breathwork', length: '5–10 min', body: 'Focused breathing sessions to settle, steady, or soften, whatever the moment asks.' },
  { title: 'Restorative', length: '20–30 min', body: 'Slow, supported shapes held long enough to truly let go. For tired days.' },
  { title: 'Wind-down', length: '10 min', body: 'An evening practice to loosen the day and carry calm into sleep.' },
]

export function Practices() {
  return (
    <section id="practices" className="bg-sand py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-gold-deep">Practices</p>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] text-char sm:text-5xl lg:text-6xl">
            Short sessions for wherever the day finds you.
          </h2>
          <p className="mt-5 max-w-xl text-char/55">
            A growing library, with something new added each week. (Placeholder
            session types, Elena to confirm.)
          </p>
        </Reveal>

        <div className="mt-16 border-t border-char/15">
          {PRACTICES.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.06}>
              <div className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 border-b border-char/15 py-8 transition-colors sm:grid-cols-[5rem_1fr_auto] sm:py-10">
                <span className="font-display text-lg italic text-gold-deep">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-3xl font-medium text-char sm:text-4xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 max-w-md text-char/60">{p.body}</p>
                </div>
                <span className="col-start-2 text-xs uppercase tracking-[0.25em] text-stone sm:col-start-3 sm:justify-self-end">
                  {p.length}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
