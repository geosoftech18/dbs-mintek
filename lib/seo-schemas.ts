import {
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_LINKEDIN,
  SITE_LOGO_URL,
  SITE_NAME,
  SITE_PHONE,
  SITE_URL,
  SITE_ADDRESS,
  SITE_AREA_SERVED,
} from '@/lib/site-config'
import { absoluteUrl } from '@/lib/seo'

export type JsonLd = Record<string, unknown>

export const organizationId = `${SITE_URL}/#organization`
export const websiteId = `${SITE_URL}/#website`

export function organizationNode(): JsonLd {
  return {
    '@type': 'Organization',
    '@id': organizationId,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: SITE_LOGO_URL,
    },
    image: SITE_LOGO_URL,
    description: SITE_DESCRIPTION,
    email: SITE_EMAIL,
    telephone: SITE_PHONE,
    sameAs: [SITE_LINKEDIN],
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_ADDRESS.streetAddress,
      addressLocality: SITE_ADDRESS.addressLocality,
      addressRegion: SITE_ADDRESS.addressRegion,
      addressCountry: SITE_ADDRESS.addressCountry,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE_PHONE,
        contactType: 'customer service',
        email: SITE_EMAIL,
        areaServed: [...SITE_AREA_SERVED],
        availableLanguage: ['English', 'Hindi'],
      },
    ],
  }
}

export function websiteNode(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': websiteId,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { '@id': organizationId },
    inLanguage: 'en-IN',
  }
}

export function buildOrganizationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    ...organizationNode(),
  }
}

export function buildWebsiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    ...websiteNode(),
  }
}

export type ServiceSeo = {
  name: string
  description: string
  path: string
  serviceType: string
  keywords?: string[]
}

export function buildServiceSchema(service: ServiceSeo): JsonLd {
  const url = absoluteUrl(service.path)

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    url,
    provider: { '@id': organizationId },
    areaServed: SITE_AREA_SERVED.map((code) => ({
      '@type': 'Country',
      name: code === 'IN' ? 'India' : 'United States',
    })),
    ...(service.keywords?.length
      ? { keywords: service.keywords.join(', ') }
      : {}),
  }
}

export function buildWebPageSchema({
  title,
  description,
  path,
  type = 'WebPage',
}: {
  title: string
  description: string
  path: string
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage'
}): JsonLd {
  const url = absoluteUrl(path)

  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { '@id': websiteId },
    about: { '@id': organizationId },
    inLanguage: 'en-IN',
  }
}

export function buildArticleSchema({
  title,
  description,
  path,
  image,
  datePublished,
  dateModified,
  tags,
}: {
  title: string
  description: string
  path: string
  image?: string | null
  datePublished?: string | Date | null
  dateModified?: string | Date | null
  tags?: string[]
}): JsonLd {
  const url = absoluteUrl(path)
  const published =
    datePublished instanceof Date
      ? datePublished.toISOString()
      : datePublished || undefined
  const modified =
    dateModified instanceof Date
      ? dateModified.toISOString()
      : dateModified || published

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: title,
    description,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(image
      ? {
          image: {
            '@type': 'ImageObject',
            url: image.startsWith('http') ? image : absoluteUrl(image),
          },
        }
      : {}),
    ...(published ? { datePublished: published } : {}),
    ...(modified ? { dateModified: modified } : {}),
    author: {
      '@type': 'Organization',
      '@id': organizationId,
      name: SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      '@id': organizationId,
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: SITE_LOGO_URL,
      },
    },
    ...(tags?.length ? { keywords: tags.join(', ') } : {}),
    inLanguage: 'en-IN',
  }
}

export function buildFaqSchema(
  faqs: Array<{ question: string; answer: string }>
): JsonLd | null {
  const cleaned = faqs
    .map((f) => ({
      question: f.question.trim(),
      answer: f.answer.trim(),
    }))
    .filter((f) => f.question && f.answer)

  if (!cleaned.length) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cleaned.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }
}

export function buildLocalBusinessSchema({
  name,
  description,
  path,
}: {
  name: string
  description: string
  path: string
}): JsonLd {
  const url = absoluteUrl(path)

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${url}#localbusiness`,
    name,
    description,
    url,
    image: SITE_LOGO_URL,
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.076,
      longitude: 72.8777,
    },
    areaServed: {
      '@type': 'City',
      name: 'Mumbai',
    },
    parentOrganization: { '@id': organizationId },
    sameAs: [SITE_LINKEDIN],
  }
}

/** Catalog of public service pages for Service schema + sitemap consistency */
export const SERVICE_PAGES: ServiceSeo[] = [
  {
    name: 'Inbound Call Center',
    description:
      'Enterprise inbound call center services from DBS Mintek — 24/7 customer support solutions.',
    path: '/services/inbound',
    serviceType: 'Inbound Call Center',
    keywords: [
      'inbound call center',
      'customer support',
      'BPO',
      'India',
    ],
  },
  {
    name: 'Outbound Call Center',
    description:
      'Outbound call center and telemarketing services from DBS Mintek.',
    path: '/services/outbound',
    serviceType: 'Outbound Call Center',
    keywords: [
      'outbound call center',
      'telesales',
      'telemarketing',
      'BPO',
    ],
  },
  {
    name: 'Email Services',
    description:
      'Professional email support and management services from DBS Mintek.',
    path: '/services/email',
    serviceType: 'Email Support',
    keywords: ['email support', 'email BPO', 'customer service email'],
  },
  {
    name: 'Chat & Bot Services',
    description:
      'Live chat and chatbot customer support services from DBS Mintek.',
    path: '/services/chat',
    serviceType: 'Live Chat and Chatbot',
    keywords: ['live chat', 'chatbot', 'voice bot', 'customer support'],
  },
  {
    name: 'US Pension Administration',
    description:
      'US pension administration and benefits processing services from DBS Mintek.',
    path: '/services/pension',
    serviceType: 'Pension Administration',
    keywords: [
      'US pension administration',
      'benefits processing',
      'pension BPO',
    ],
  },
]

export function getServiceByPath(path: string): ServiceSeo | undefined {
  return SERVICE_PAGES.find((s) => s.path === path)
}
