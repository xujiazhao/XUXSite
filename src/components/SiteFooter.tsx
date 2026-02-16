'use client'

import { useLanguage } from './LanguageContext'
import { siteContent } from '@/lib/siteContent'

/**
 * Site footer with bilingual disclaimer, copyright, and version.
 */
export default function SiteFooter() {
  const { language } = useLanguage()
  const { footer } = siteContent

  return (
    <footer className="site-footer">
      <p className="footer-disclaimer">{footer.disclaimer[language]}</p>
      <p className="footer-copyright">
        © {new Date().getFullYear()} {footer.copyright[language]}
      </p>
      <p className="footer-version">{footer.version}</p>
    </footer>
  )
}
