import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/home/hero'
import { About } from '@/components/home/about'
import { Marquee } from '@/components/home/marquee'
import { Pillars } from '@/components/home/pillars'
import { Moments } from '@/components/home/moments'
import { MailingList } from '@/components/home/mailing-list'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Marquee />
        <Pillars />
        <Moments />
        <MailingList />
      </main>
      <Footer />
    </>
  )
}
