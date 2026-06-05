export const SITE_NAME = 'DBS MINTEK PVT LTD'

export const SITE_DESCRIPTION =
  'Enterprise call center and BPO solutions — inbound, outbound, email, chat, and pension administration services across India.'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://www.dbsmintek.com'

export const SITE_LOGO_PATH = '/logo.png'

export const SITE_LOGO_URL = `${SITE_URL}${SITE_LOGO_PATH}`

export const SITE_EMAIL = 'info@dbsmintek.com'

export const SITE_LINKEDIN = 'https://www.linkedin.com/company/dbsmintek/'
