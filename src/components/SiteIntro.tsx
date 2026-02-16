'use client'

import { useLanguage } from './LanguageContext'
import { siteContent } from '@/lib/siteContent'

/**
 * Renders the site intro section: name, title, intro paragraph, and contacts.
 * Content switches based on the global language toggle.
 */
export default function SiteIntro() {
  const { language } = useLanguage()
  const { name, nameEn, title, intro, contacts } = siteContent

  return (
    <section className="site-intro">
      <h1 className="site-intro-name">{name}</h1>
      <p className="site-intro-title">{title[language]} {language === 'zh' ? title.en : ''}</p>

      <p className="site-intro-text">{intro[language]}</p>

      <div className="site-intro-contacts">
        {contacts.map((c, i) => (
          c.href ? (
            <a
              key={i}
              href={c.href}
              className="contact-btn"
              {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {c.label[language]}
            </a>
          ) : (
            <button
              key={i}
              className="contact-btn"
              onClick={() => { /* TODO: WeChat action */ }}
            >
              {c.label[language]}
            </button>
          )
        ))}
      </div>
    </section>
  )
}
