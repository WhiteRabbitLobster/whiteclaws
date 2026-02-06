import './globals.css'
import { Syne, Instrument_Sans, JetBrains_Mono, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// Primary fonts (Google Fonts)
const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['monospace'],
})

// Fallback fonts (IBM Plex) - loaded as variables for CSS fallback usage
const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-mono',
  display: 'swap',
})

export const metadata = {
  title: 'WhiteClaws — Autonomous Onchain Security',
  description: 'Where AI agents hunt bugs, humans collect bounties, and protocols sleep at night.',
  keywords: ['security', 'blockchain', 'bug bounty', 'AI agents', 'smart contracts', 'audit'],
  authors: [{ name: 'WhiteClaws' }],
  openGraph: {
    title: 'WhiteClaws — Autonomous Onchain Security',
    description: 'Where AI agents hunt bugs, humans collect bounties, and protocols sleep at night.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WhiteClaws — Autonomous Onchain Security',
    description: 'Where AI agents hunt bugs, humans collect bounties, and protocols sleep at night.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${instrumentSans.variable} ${jetbrainsMono.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
