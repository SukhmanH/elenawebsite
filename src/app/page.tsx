import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/home/hero'
import { About } from '@/components/home/about'
import { Marquee } from '@/components/home/marquee'
import { ProgramPresale } from '@/components/home/program-presale'
import { Connect } from '@/components/home/connect'
import { Meadow } from '@/components/home/meadow'
import { MailingList } from '@/components/home/mailing-list'
import { Moments } from '@/components/home/moments'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Marquee />
        <ProgramPresale />
        <Connect />
        <Meadow />
        <MailingList />
        <Moments />
      </main>
      <Footer />
    </>
  )
}


