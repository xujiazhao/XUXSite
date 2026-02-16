import type { Metadata } from 'next'
import { config } from '@/lib/notion'
import { LanguageProvider } from '@/components/LanguageContext'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: config.name,
    template: `%s | ${config.name}`,
  },
  description: config.description,
  authors: [{ name: config.author }],
  openGraph: {
    title: config.name,
    description: config.description,
    url: `https://${config.domain}`,
    siteName: config.name,
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: config.name,
    description: config.description,
  },
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL(`https://${config.domain}`),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <LanguageProvider>
          <main className="min-h-screen">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  )
}
