/**
 * Bilingual site content maintained outside of Notion.
 * Edit this file to update intro, contact, and footer text.
 */

export interface BilingualText {
  zh: string
  en: string
}

export interface ContactItem {
  label: BilingualText
  value: string
  href?: string
  /** If true, opens in new tab */
  external?: boolean
}

export const siteContent = {
  /** Notion page ID for the homepage (used to scope custom rendering) */
  homePageId: '37d3f7b0-23c5-4cf5-97ca-367f7145965f',

  /** Page title / name */
  name: '许嘉昭',
  nameEn: 'Jiazhao Xu',

  /** Subtitle shown below the name */
  title: {
    zh: '产品设计师',
    en: 'Product Designer',
  } as BilingualText,

  /** Intro paragraph */
  intro: {
    zh: '我专注于融合AI与软硬件体验，打造智能且有温度的产品。以商业成果为导向，我致力于让设计在企业中创造真实价值与可衡量的影响力。我本科毕业于艺术中心设计学院，目前在微软工作。我也是一位创业者、教育者和PPT达人。',
    en: 'I focus on integrating AI with software and hardware experiences to create intelligent and human-centered products. I\'m driven by a results-oriented approach to design—turning creative insight into tangible business value and lasting impact. I graduated from ArtCenter College of Design, currently working at Microsoft. I am also an entrepreneur, educator, and PPT expert.',
  } as BilingualText,

  /** Contact items */
  contacts: [
    {
      label: { zh: '邮箱 E-mail', en: 'E-mail' },
      value: 'hello@xujiazhao.com',
      href: 'mailto:hello@xujiazhao.com',
    },
    {
      label: { zh: '领英 LinkedIn', en: 'LinkedIn' },
      value: 'Jiazhao Xu',
      href: 'https://www.linkedin.com/in/xujiazhao/',
      external: true,
    },
    {
      label: { zh: '微信 WeChat', en: 'WeChat' },
      value: 'xux-ai',
    },
  ] as ContactItem[],

  /** Footer / disclaimer lines */
  footer: {
    disclaimer: {
      zh: '本站内容均由许嘉昭创作，部分图片为项目公开发表素材或线上截图',
      en: 'Contents on this site are created by Jiazhao Xu, some images are referenced from online public source',
    } as BilingualText,
    copyright: {
      zh: '许嘉昭保留所有权利',
      en: 'Jiazhao Xu, All rights reserved.',
    } as BilingualText,
    version: 'Ver. 2026.1',
  },

  /** Highlighted links in intro (rendered inline) */
  introLinks: {
    zh: [
      { text: '艺术中心设计学院', href: 'https://www.artcenter.edu/' },
      { text: '微软', href: 'https://www.microsoft.com/' },
      { text: 'PPT达人', href: '/ppt' },
    ],
    en: [
      { text: 'ArtCenter College of Design', href: 'https://www.artcenter.edu/' },
      { text: 'Microsoft', href: 'https://www.microsoft.com/' },
      { text: 'PPT expert', href: '/ppt' },
    ],
  },

  /**
   * Section titles displayed before each database.
   * Order matches the databases on the Notion page.
   */
  sectionTitles: [
    { zh: '经历', en: 'Experience' },
    { zh: '项目', en: 'Projects' },
    { zh: '写作', en: 'Writing' },
    { zh: '创作', en: 'Creation' },
  ] as BilingualText[],

  /**
   * Chinese translations for DB1 (经历) table headers.
   * Keys are the Notion schema property IDs.
   */
  experienceTableHeaders: {
    'title': { zh: '名称', en: 'Name' },
    'FjAV': { zh: '地点与时间', en: 'Location & Date' },
    'ZR;e': { zh: '类型', en: 'Type' },
    'cf\\L': { zh: '领域', en: 'Area' },
  } as Record<string, BilingualText>,
}
