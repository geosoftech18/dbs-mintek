import type { Metadata } from 'next'
import { SITE_LOGO_PATH, SITE_NAME, SITE_URL } from '@/lib/site-config'

export type BreadcrumbItem = {
  label: string
  /** Path starting with `/`, or absolute URL. Omit on the current page if you prefer. */
  href?: string
}

/** Build absolute URL from a path using https://www.dbsmintek.com base. */
export function absoluteUrl(path: string = '/'): string {
  if (!path || path === '/') return SITE_URL
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path.replace(/\/$/, '')
  }
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized.replace(/\/$/, '')}`
}

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  type = 'website',
  image,
  noIndex = false,
}: {
  title: string
  description?: string
  path: string
  keywords?: string[]
  type?: 'website' | 'article'
  image?: string
  noIndex?: boolean
}): Metadata {
  const canonical = absoluteUrl(path)
  const ogImage = image || SITE_LOGO_PATH

  return {
    title,
    ...(description ? { description } : {}),
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical,
    },
    openGraph: {
      type,
      locale: 'en_IN',
      title,
      ...(description ? { description } : {}),
      url: canonical,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      ...(description ? { description } : {}),
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
  }
}
