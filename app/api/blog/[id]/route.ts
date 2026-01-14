import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Blog from '@/models/Blog'
import { isAuthenticated } from '@/lib/auth'

// GET single blog by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    const blog = await Blog.findById(id)

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: blog }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching blog:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch blog' },
      { status: 500 }
    )
  }
}

// PUT update blog
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Check authentication
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Please login to update blogs.' },
      { status: 401 }
    )
  }

  try {
    await connectDB()
    const { id } = await params

    const body = await request.json()
    const { title, content, tags, featuredImage, status } = body

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Generate excerpt from content
    const textContent = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    const excerpt = textContent.length > 150 
      ? textContent.substring(0, 150) + '...' 
      : textContent

    // Generate slug if title changed
    let slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    // Check if slug already exists (excluding current blog)
    const existingBlog = await Blog.findOne({ slug, _id: { $ne: id } })
    if (existingBlog) {
      slug = `${slug}-${Date.now()}`
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        content,
        excerpt,
        tags: tags || [],
        featuredImage: featuredImage || null,
        status: status || 'draft',
        slug,
      },
      { new: true, runValidators: true }
    )

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: blog }, { status: 200 })
  } catch (error: any) {
    console.error('Error updating blog:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update blog' },
      { status: 500 }
    )
  }
}

// DELETE blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Check authentication
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Please login to delete blogs.' },
      { status: 401 }
    )
  }

  try {
    await connectDB()
    const { id } = await params

    const blog = await Blog.findByIdAndDelete(id)

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Blog deleted successfully' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error deleting blog:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete blog' },
      { status: 500 }
    )
  }
}

