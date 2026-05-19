import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'B8 Technologies — AI-Powered CRM for Luxury Real Estate',
  description:
    'We build automated CRM pipelines that capture every high-value lead from luxury real estate agency websites — from Dubai to Singapore — before they vanish forever. Powered by Clay, Make & Tidio.',
  keywords: [
    'luxury real estate CRM',
    'Clay automation',
    'Make automation',
    'Tidio chatbot CRM',
    'lead capture automation',
    'Gulf real estate',
    'Dubai real estate leads',
    'Singapore real estate',
    'B8 Technologies',
  ],
  authors: [{ name: 'B8 Technologies LTD' }],
  creator: 'B8 Technologies LTD',
  openGraph: {
    title: 'B8 Technologies — AI-Powered CRM for Luxury Real Estate',
    description:
      'Automated CRM pipelines capturing every HNW prospect from luxury real estate websites worldwide.',
    url: 'https://b8-technologies.com',
    siteName: 'B8 Technologies',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B8 Technologies',
    description: 'AI-Powered CRM Automation for Luxury Real Estate',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}