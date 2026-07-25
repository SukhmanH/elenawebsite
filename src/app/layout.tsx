import type { Metadata } from 'next'
import { Playfair_Display, Hanken_Grotesk } from 'next/font/google'
import './globals.css'
import { LoadingScreen } from '@/components/ui/loading-screen'
import { SmoothScroll } from '@/components/ui/smooth-scroll'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const hanken = Hanken_Grotesk({
  variable: '--font-hanken',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const SITE_URL = 'https://breathandbalance.example'

export const metadata: Metadata = {
  title: {
    default: 'Breath & Balance | Yoga with Elena',
    template: '%s | Breath & Balance',
  },
  description:
    'A daily practice of mind, body, and breath with Elena Collins.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Breath & Balance',
    title: 'Breath & Balance | Yoga with Elena',
    description:
      'A daily practice of mind, body, and breath with Elena Collins.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Breath & Balance | Yoga with Elena',
    description:
      'A daily practice of mind, body, and breath with Elena Collins.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${hanken.variable}`}>
      <body className="min-h-screen bg-sand text-char">
        <SmoothScroll />
        <LoadingScreen />
        {children}
      </body>
    </html>
  )
}
