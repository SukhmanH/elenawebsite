Design Brief — Breath & Balance | Yoga with Elena

I want to make a site that clones https://yoga-by-nina.webflow.io/

A landing site for Elena Collins, a yoga teacher selling a membership built around daily practices of breath, presence, and calm. Small, personal, intimate brand (not a big studio). Her recurring mantra: "Let all that you do be done in love." The white heart 🤍 runs through her brand — soft, light, airy.

Reference for layout/feel only: yoga-by-nina.webflow.io (single-page, editorial, lots of whitespace, membership-focused). Do not copy its palette. Most yoga sites — including that one — land on warm cream + high-contrast serif + terracotta accent. Avoid that default. Ground the design in the one thing that's actually specific here: breath.

Stack

Astro + Tailwind, deployed to Cloudflare Pages (matches the existing setup). Single page, anchor-nav sections. No CMS needed for v1; content can live in a content/ collection or just in the components.

The signature

A breathe-along guide: a soft circle that slowly expands on the inhale and contracts on the exhale (4s in / 6s out — extended exhale is the calming one). Real and usable, not decorative — a visitor can actually take a breath with her before they scroll. This is the memorable element and it's literally the product. Must respect prefers-reduced-motion (freeze to a static state with clear text cues and a "press to begin" affordance).

Palette (sage-forward, dawn/calm — not cream/terracotta)

--paper  #F4F2EC   soft warm-neutral paper (the air / background)
--mist   #E4E7DF   pale sage-mist (section tints, breathing element)
--sage   #97A38C   muted living sage (primary calm tone)
--pine   #3A453B   deep grounding green (dark sections, headings)
--ink    #2B302A   near-black green-grey (body text)
--clay   #C68E7C   soft dusty clay (single warm accent — use sparingly)

Type


Display: Fraunces (light weight, large, airy — soft optical serif, gentle not cold-luxury).
Body / UI: Hanken Grotesk (warm humanist sans — avoid Inter).
Accent: Fraunces italic for the mantra moments only (e.g. the "done in love" line).
Generous line-height and letter-spacing; let the type breathe.


Sections (single page)


Hero — slow page-load reveal. Thesis grounded in breath, e.g. "Come home to your breath." Sub: the membership one-liner. Mantra in Fraunces italic. Join CTA.
Breathe with me — the interactive breathing guide (the signature).
About Elena — warm and personal; she's a small, intimate teacher, lean into that. [photo placeholder]
What's inside the membership — three pillars: Breath · Presence · Calm.
Practices — session types (morning practice, restorative, breathwork…). [placeholder copy]
Membership / pricing — the actual offer. [placeholder pricing — Elena to confirm]
Words from the mat — testimonials. [placeholder]
Join + footer — CTA, Instagram links (@elenacollinsyoga, @elena.collinsss).


Motion

One orchestrated page-load reveal, the breathing guide, subtle scroll-reveals, quiet hover states. Restraint — over-animating reads as AI-generated.

Quality floor

Responsive to mobile, visible keyboard focus, prefers-reduced-motion respected, semantic HTML.

Needs from Elena (placeholders for now)


Real photos (hero, about, practices)
Membership price + what's included
Where "Join" points (membership platform / link in bio)
Any testimonials