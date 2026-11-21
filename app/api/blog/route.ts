import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Blog from '@/models/Blog'
import { isAuthenticated } from '@/lib/auth'
import {
  compressDataUriImage,
  compressHtmlDataImages,
} from '@/lib/blog-images'

// GET all blogs (with optional filtering)
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    // Build query
    const query: any = {}
    
    if (status && status !== 'all') {
      query.status = status
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ]
    }

    // List views never need full HTML body — excluding it cuts origin transfer a lot.
    const blogs = await Blog.find(query)
      .select('-content')
      .sort({ createdAt: -1 })
      .lean()

    const isPublicPublished =
      status === 'published' && !search

    const response = NextResponse.json(
      { success: true, data: blogs },
      { status: 200 }
    )

    if (isPublicPublished) {
      response.headers.set(
        'Cache-Control',
        'public, s-maxage=3600, stale-while-revalidate=86400'
      )
    } else {
      response.headers.set('Cache-Control', 'private, no-store')
    }

    return response
  } catch (error: any) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
}

// POST create new blog
export async function POST(request: NextRequest) {
  // Check authentication
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Please login to create blogs.' },
      { status: 401 }
    )
  }

  try {
    await connectDB()

    const body = await request.json()
    const { title, content, tags, featuredImage, status, metaTitle, metaDescription } = body

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // For server-side, use a simple regex to strip HTML tags
    const textContent = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    const excerpt = textContent.length > 150 
      ? textContent.substring(0, 150) + '...' 
      : textContent

    const [safeContent, safeFeatured] = await Promise.all([
      compressHtmlDataImages(content),
      compressDataUriImage(featuredImage),
    ])

    // Generate slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug })
    if (existingBlog) {
      // Append timestamp to make it unique
      const uniqueSlug = `${slug}-${Date.now()}`
      const blog = await Blog.create({
        title,
        content: safeContent,
        excerpt,
        metaTitle: metaTitle?.trim() || null,
        metaDescription: metaDescription?.trim() || null,
        tags: tags || [],
        featuredImage: safeFeatured,
        status: status || 'draft',
        slug: uniqueSlug,
      })

      return NextResponse.json({ success: true, data: blog }, { status: 201 })
    }

    const blog = await Blog.create({
      title,
      content: safeContent,
      excerpt,
      metaTitle: metaTitle?.trim() || null,
      metaDescription: metaDescription?.trim() || null,
      tags: tags || [],
      featuredImage: safeFeatured,
      status: status || 'draft',
      slug,
    })

    return NextResponse.json({ success: true, data: blog }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating blog:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create blog' },
      { status: 500 }
    )
  }
}

