import 'server-only'

export type BlogListItem = {
  _id: string
  title: string
  excerpt: string
  tags: string[]
  status: 'published' | 'draft'
  featuredImage: string | null
  slug: string
  createdAt: string
}

export type BlogDetail = BlogListItem & {
  content: string
  metaTitle: string | null
  metaDescription: string | null
  updatedAt: string
}

const DB_TIMEOUT_MS = 5000

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`Blog query timed out after ${ms}ms`)),
      ms
    )
    promise.then(
      (value) => {
        clearTimeout(timer)
        resolve(value)
      },
      (error) => {
        clearTimeout(timer)
        reject(error)
      }
    )
  })
}

async function getModels() {
  const [{ default: connectDB }, { default: Blog }] = await Promise.all([
    import('@/lib/mongodb'),
    import('@/models/Blog'),
  ])
  await withTimeout(connectDB(), DB_TIMEOUT_MS)
  return Blog
}

function toIso(value: unknown): string {
  if (value instanceof Date) return value.toISOString()
  if (typeof value === 'string') return value
  return new Date().toISOString()
}

/**
 * Published posts for the /blog listing, rendered on the server so crawlers
 * receive titles, excerpts and links in the initial HTML.
 */
export async function getPublishedPosts(): Promise<BlogListItem[]> {
  try {
    const Blog = await getModels()

    const posts = await withTimeout(
      Blog.find({ status: 'published' })
        .sort({ createdAt: -1 })
        .select('title excerpt tags status featuredImage slug createdAt')
        .lean()
        .exec(),
      DB_TIMEOUT_MS
    )

    return posts.map((post: any) => ({
      _id: String(post._id),
      title: post.title ?? '',
      excerpt: post.excerpt ?? '',
      tags: Array.isArray(post.tags) ? post.tags : [],
      status: 'published',
      featuredImage: post.featuredImage ?? null,
      slug: post.slug ?? '',
      createdAt: toIso(post.createdAt),
    }))
  } catch (error) {
    console.error('getPublishedPosts failed:', error)
    return []
  }
}

/** Published posts sharing tags with `slug`, falling back to the newest posts. */
export async function getRelatedPosts(
  slug: string,
  tags: string[],
  limit = 2
): Promise<BlogListItem[]> {
  const posts = await getPublishedPosts()
  const others = posts.filter((post) => post.slug !== slug)

  if (tags.length === 0) return others.slice(0, limit)

  const tagged = others.filter((post) =>
    post.tags.some((tag) => tags.includes(tag))
  )

  return [...tagged, ...others.filter((post) => !tagged.includes(post))].slice(
    0,
    limit
  )
}

/**
 * A single published post. `ok: false` means the database was unreachable, so
 * callers should not treat a missing post as a genuine 404.
 */
export async function getPublishedPost(
  slug: string
): Promise<{ ok: boolean; post: BlogDetail | null }> {
  try {
    const Blog = await getModels()

    const post: any = await withTimeout(
      Blog.findOne({ slug, status: 'published' }).lean().exec(),
      DB_TIMEOUT_MS
    )

    if (!post) return { ok: true, post: null }

    return {
      ok: true,
      post: {
        _id: String(post._id),
        title: post.title ?? '',
        content: post.content ?? '',
        excerpt: post.excerpt ?? '',
        metaTitle: post.metaTitle ?? null,
        metaDescription: post.metaDescription ?? null,
        tags: Array.isArray(post.tags) ? post.tags : [],
        status: 'published',
        featuredImage: post.featuredImage ?? null,
        slug: post.slug ?? slug,
        createdAt: toIso(post.createdAt),
        updatedAt: toIso(post.updatedAt ?? post.createdAt),
      },
    }
  } catch (error) {
    console.error('getPublishedPost failed:', error)
    return { ok: false, post: null }
  }
}
