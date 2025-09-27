import { Metadata } from 'next';
import { SEO_CONFIG, SEO_METADATA, OPEN_GRAPH, TWITTER_CARD, STRUCTURED_DATA } from '@/constants';

// SEO utility functions
export const generateMetadata = (options: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}): Metadata => {
  const {
    title = SEO_METADATA.HOME.title,
    description = SEO_METADATA.HOME.description,
    keywords = SEO_METADATA.HOME.keywords,
    image = SEO_CONFIG.DEFAULT_IMAGE,
    url = SEO_CONFIG.SITE_URL,
    type = 'website'
  } = options;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: SEO_CONFIG.SITE_NAME }],
    creator: SEO_CONFIG.SITE_NAME,
    publisher: SEO_CONFIG.SITE_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      locale: OPEN_GRAPH.locale,
      url,
      siteName: OPEN_GRAPH.siteName,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: TWITTER_CARD.cardType,
      site: TWITTER_CARD.site,
      creator: TWITTER_CARD.creator,
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
    other: {
      'application-name': SEO_CONFIG.SITE_NAME,
      'apple-mobile-web-app-title': SEO_CONFIG.SITE_NAME,
      'msapplication-TileColor': '#2563eb',
      'theme-color': '#2563eb',
    },
  };
};

export const generateSurahMetadata = (surahNumber: number, surahName: string): Metadata => {
  const title = `Surah ${surahName} - ${surahNumber} | ${SEO_CONFIG.SITE_NAME}`;
  const description = `Read Surah ${surahName} (${surahNumber}) with authentic Arabic text and multiple translations. Track your reading progress and continue where you left off.`;
  const keywords = [
    'surah',
    surahName.toLowerCase(),
    'quran chapter',
    'arabic text',
    'translation',
    'recitation',
    'islam',
    'muslim'
  ];

  return generateMetadata({
    title,
    description,
    keywords,
    url: `${SEO_CONFIG.SITE_URL}/surah/${surahNumber}`,
    type: 'article'
  });
};

export const generateStructuredData = (type: 'organization' | 'webapplication' | 'article') => {
  switch (type) {
    case 'organization':
      return STRUCTURED_DATA.ORGANIZATION;
    case 'webapplication':
      return STRUCTURED_DATA.WEB_APPLICATION;
    case 'article':
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: SEO_CONFIG.SITE_NAME,
        description: SEO_CONFIG.SITE_DESCRIPTION,
        author: {
          '@type': 'Organization',
          name: SEO_CONFIG.SITE_NAME
        },
        publisher: {
          '@type': 'Organization',
          name: SEO_CONFIG.SITE_NAME,
          logo: {
            '@type': 'ImageObject',
            url: `${SEO_CONFIG.SITE_URL}/images/logo.png`
          }
        },
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString()
      };
    default:
      return STRUCTURED_DATA.ORGANIZATION;
  }
};

export const generateSitemap = (surahs: Array<{ number: number; englishName: string }>) => {
  const baseUrl = SEO_CONFIG.SITE_URL;
  const sitemap = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/surah`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...surahs.map(surah => ({
      url: `${baseUrl}/surah/${surah.number}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  ];

  return sitemap;
};

export const generateRobotsTxt = () => {
  return `
User-agent: *
Allow: /

Sitemap: ${SEO_CONFIG.SITE_URL}/sitemap.xml
`.trim();
};
