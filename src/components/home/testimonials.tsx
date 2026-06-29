import { Reveal } from '@/components/ui/reveal'

const QUOTES = [
  {
    quote:
      'I came for the yoga and stayed for the breathing. Three minutes in the morning has changed how my whole day feels.',
    name: 'Placeholder, member',
  },
  {
    quote:
      'Elena makes it feel like a friend checking in, not a class. Small and warm, exactly what I needed.',
    name: 'Placeholder, member',
  },
  {
    quote:
      'The extended exhale thing actually works. I use it before sleep now without even opening the app.',
    name: 'Placeholder, member',
  },
]

export function Testimonials() {
  return (
    <section className="bg-sand py-28 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-gold-deep">
            Words from the mat
          </p>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] text-char sm:text-5xl lg:text-6xl">
            What a quiet practice gives back.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[1.5rem] border border-char/10 bg-char/10 md:grid-cols-3">
          {QUOTES.map((t, i) => (
            <Reveal key={i} delay={i * 0.1} className="bg-sand">
              <figure className="flex h-full flex-col p-8 sm:p-10">
                <span aria-hidden className="font-display text-5xl leading-none text-gold">
                  &ldquo;
                </span>
                <blockquote className="mt-4 flex-1 font-display text-xl font-normal italic leading-relaxed text-char">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 text-sm uppercase tracking-[0.2em] text-stone">
                  {t.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
