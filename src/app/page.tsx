import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/home/hero'
import { About } from '@/components/home/about'
import { Pillars } from '@/components/home/pillars'
import { Practices } from '@/components/home/practices'
import { MailingList } from '@/components/home/mailing-list'
import { Testimonials } from '@/components/home/testimonials'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Pillars />
        <Practices />
        <MailingList />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
