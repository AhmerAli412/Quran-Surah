// SEO Constants
export const SEO_CONFIG = {
  SITE_NAME: 'Holy Quran App',
  SITE_DESCRIPTION: 'Read, Learn, and Reflect on the Divine Words of the Holy Quran with our modern, user-friendly interface.',
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  DEFAULT_IMAGE: '/images/quran-og-image.jpg',
  TWITTER_HANDLE: '@quranapp',
  FACEBOOK_APP_ID: 'your-facebook-app-id'
} as const;

export const SEO_METADATA = {
  HOME: {
    title: 'Holy Quran App - Read Quran Online',
    description: 'Read the Holy Quran online with beautiful Arabic fonts, multiple translations, and progress tracking. Available in Arabic, Urdu, and English.',
    keywords: ['quran', 'holy quran', 'quran online', 'arabic', 'urdu', 'english', 'islam', 'muslim', 'recitation']
  },
  SURAH: {
    titleTemplate: '%s - Surah %d | Holy Quran App',
    description: 'Read Surah %s with authentic Arabic text and multiple translations. Track your reading progress and continue where you left off.',
    keywords: ['surah', 'quran chapter', 'arabic text', 'translation', 'recitation']
  }
} as const;

export const OPEN_GRAPH = {
  type: 'website',
  locale: 'en_US',
  siteName: SEO_CONFIG.SITE_NAME,
  images: [
    {
      url: SEO_CONFIG.DEFAULT_IMAGE,
      width: 1200,
      height: 630,
      alt: 'Holy Quran App'
    }
  ]
} as const;

export const TWITTER_CARD = {
  cardType: 'summary_large_image',
  site: SEO_CONFIG.TWITTER_HANDLE,
  creator: SEO_CONFIG.TWITTER_HANDLE
} as const;

export const STRUCTURED_DATA = {
  ORGANIZATION: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_CONFIG.SITE_NAME,
    description: SEO_CONFIG.SITE_DESCRIPTION,
    url: SEO_CONFIG.SITE_URL,
    logo: `${SEO_CONFIG.SITE_URL}/images/logo.png`
  },
  WEB_APPLICATION: {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SEO_CONFIG.SITE_NAME,
    description: SEO_CONFIG.SITE_DESCRIPTION,
    url: SEO_CONFIG.SITE_URL,
    applicationCategory: 'EducationApplication',
    operatingSystem: 'Web Browser'
  }
} as const;
