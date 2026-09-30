import type { Metadata, Viewport } from 'next'
import { Fraunces, Hanken_Grotesk } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { LoadingScreen } from '@/components/ui/loading-screen'
import { SmoothScroll } from '@/components/ui/smooth-scroll'
import { MotionProvider } from '@/components/motion/motion-provider'

// Variable Fraunces: light weights for display, the SOFT axis for rounded terminals.
const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['SOFT', 'opsz'],
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
    'A daily practice to restore, reconnect, and thrive with Elena Collins.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Breath & Balance',
    title: 'Breath & Balance | Yoga with Elena',
    description:
      'A daily practice to restore, reconnect, and thrive with Elena Collins.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Breath & Balance | Yoga with Elena',
    description:
      'A daily practice to restore, reconnect, and thrive with Elena Collins.',
  },
}

export const viewport: Viewport = {
  themeColor: '#1C1A0F',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${hanken.variable}`}>
      <body className="min-h-screen bg-cream text-ink">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NCGYC6HN68"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NCGYC6HN68');
          `}
        </Script>
        <MotionProvider>
          <SmoothScroll />
          <LoadingScreen />
          {children}
        </MotionProvider>
      </body>
    </html>
  )
}
