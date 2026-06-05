import {
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_LINKEDIN,
  SITE_LOGO_URL,
  SITE_NAME,
  SITE_URL,
} from '@/lib/site-config'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: SITE_LOGO_URL,
  image: SITE_LOGO_URL,
  description: SITE_DESCRIPTION,
  email: SITE_EMAIL,
  sameAs: [SITE_LINKEDIN],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    logo: {
      '@type': 'ImageObject',
      url: SITE_LOGO_URL,
    },
  },
}

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}
