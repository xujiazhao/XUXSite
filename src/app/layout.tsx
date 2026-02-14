import type { Metadata } from 'next'
import { config } from '@/lib/notion'
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
        <main className="min-h-screen">{children}</main>

        <footer className="site-footer">
          <p>
            © {new Date().getFullYear()} {config.name}. All rights reserved.
          </p>
          <p className="mt-1">
            <a href={`mailto:${config.social.email}`}>{config.social.email}</a>
            {' · '}
            <a
              href={config.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </p>
        </footer>
      </body>
    </html>
  )
}
