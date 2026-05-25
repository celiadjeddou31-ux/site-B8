import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'B8 Technologies — CRM Intelligence for Real Estate Agencies',
  description: 'B8 Technologies automates luxury real estate lead capture with AI-powered CRM systems. Serving agencies in the Gulf and Asia.',
  keywords: 'CRM automation, luxury real estate, AI lead generation, Make, Clay, Gulf real estate, Dubai, Saudi Arabia',
  openGraph: {
    title: 'B8 Technologies — CRM Intelligence for Luxury Real Estate',
    description: 'Transform your luxury real estate leads with AI-powered CRM automation.',
    url: 'https://b8-technologies.com',
    siteName: 'B8 Technologies',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <script src="//code.tidio.co/qupx5p1snwuwe4tq9u8yvxzo2kqta72b.js" async></script>
      <body>{children}</body>
    </html>
  )
}

