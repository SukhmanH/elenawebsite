import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/home/hero'
import { About } from '@/components/home/about'
import { Marquee } from '@/components/home/marquee'
import { Pillars } from '@/components/home/pillars'
import { Meadow } from '@/components/home/meadow'
import { Moments } from '@/components/home/moments'
import { MailingList } from '@/components/home/mailing-list'
import { Connect } from '@/components/home/connect'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Marquee />
        <Pillars />
        <Connect />
        <Meadow />
        <MailingList />
        <Moments />
      </main>
      <Footer />
    </>
  )
}
