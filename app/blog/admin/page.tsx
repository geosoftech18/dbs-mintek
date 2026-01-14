'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  EyeOff,
  FileText,
  Calendar,
  Tag,
  Search,
  Settings,
  ArrowLeft,
  LogOut
} from 'lucide-react'
import { Input } from '@/components/ui/input'

interface BlogPost {
  _id: string
  title: string
  content: string
  excerpt: string
  tags: string[]
  status: 'published' | 'draft'
  featuredImage: string | null
  slug: string
  createdAt: string
  updatedAt?: string
}

export default function BlogAdminPage() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all')

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Add credentials to ensure cookies are sent
        const response = await fetch('/api/auth/check-session', {
          credentials: 'include',
          cache: 'no-store'
        })
        const result = await response.json()

        console.log('Auth check result:', result)

        if (result.success && result.authenticated) {
          setAuthenticated(true)
        } else {
          console.log('Not authenticated, redirecting to login')
          router.push('/blog/admin/login')
        }
      } catch (error) {
        console.error('Error checking auth:', error)
        router.push('/blog/admin/login')
      } finally {
        setCheckingAuth(false)
      }
    }

    checkAuth()
  }, [router])

  // Load blogs from API
  useEffect(() => {
    if (!authenticated) return

    const loadBlogs = async () => {
      try {
        const params = new URLSearchParams()
        if (filterStatus !== 'all') {
          params.append('status', filterStatus)
        }
        if (searchQuery) {
          params.append('search', searchQuery)
        }

        const response = await fetch(`/api/blog?${params.toString()}`)
        const result = await response.json()

        if (result.success) {
          setBlogs(result.data)
        } else {
          console.error('Error loading blogs:', result.error)
        }
      } catch (error) {
        console.error('Error loading blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    loadBlogs()
  }, [filterStatus, searchQuery, authenticated])

  // Handle delete
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        const response = await fetch(`/api/blog/${id}`, {
          method: 'DELETE',
        })
        const result = await response.json()

        if (result.success) {
          setBlogs(blogs.filter(blog => blog._id !== id))
          alert('Blog post deleted successfully!')
        } else {
          alert('Failed to delete blog post: ' + result.error)
        }
      } catch (error) {
        console.error('Error deleting blog:', error)
        alert('Error deleting blog post')
      }
    }
  }

  // Handle status toggle
  const handleToggleStatus = async (id: string) => {
    try {
      const blog = blogs.find(b => b._id === id)
      if (!blog) return

      const newStatus = blog.status === 'published' ? 'draft' : 'published'
      
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...blog,
          status: newStatus,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setBlogs(blogs.map(blog => 
          blog._id === id 
            ? { ...blog, status: newStatus, updatedAt: new Date().toISOString() }
            : blog
        ))
      } else {
        alert('Failed to update blog status: ' + result.error)
      }
    } catch (error) {
      console.error('Error updating blog status:', error)
      alert('Error updating blog status')
    }
  }

  // Filter blogs (client-side filtering for instant feedback, but API handles main filtering)
  const filteredBlogs = blogs

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/blog/admin/login')
    } catch (error) {
      console.error('Error logging out:', error)
      router.push('/blog/admin/login')
    }
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/70">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return null // Will redirect to login
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/70">Loading blogs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <Link href="/blog">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Blog
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center gap-3">
                <Settings className="w-8 h-8 md:w-10 md:h-10" />
                Blog Management
              </h1>
              <p className="text-white/70 text-lg">
                Manage all your blog posts - create, edit, and delete
              </p>
            </div>
            <Button 
              onClick={() => router.push('/blog/create')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Post
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search blogs by title, content, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl pl-10 h-12"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
                className={filterStatus === 'all' 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }
              >
                All ({blogs.length})
              </Button>
              <Button
                variant={filterStatus === 'published' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('published')}
                className={filterStatus === 'published' 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }
              >
                Published ({blogs.filter(b => b.status === 'published').length})
              </Button>
              <Button
                variant={filterStatus === 'draft' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('draft')}
                className={filterStatus === 'draft' 
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }
              >
                Drafts ({blogs.filter(b => b.status === 'draft').length})
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Blog List */}
        {filteredBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <FileText className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl text-white/70 mb-2">
              {searchQuery || filterStatus !== 'all' ? 'No blogs found' : 'No blog posts yet'}
            </h3>
            <p className="text-white/50 mb-6">
              {searchQuery || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Create your first blog post to get started!'
              }
            </p>
            {!searchQuery && filterStatus === 'all' && (
              <Button 
                onClick={() => router.push('/blog/create')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Post
              </Button>
            )}
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Featured Image */}
                      {blog.featuredImage && (
                        <div className="md:w-48 flex-shrink-0">
                          <img
                            src={blog.featuredImage}
                            alt={blog.title}
                            className="w-full h-32 md:h-full object-cover rounded-xl"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-white line-clamp-2">
                                {blog.title}
                              </h3>
                              <Badge 
                                variant={blog.status === 'published' ? 'default' : 'secondary'}
                                className={blog.status === 'published' 
                                  ? 'bg-green-500/20 text-green-200 border-green-400/30' 
                                  : 'bg-yellow-500/20 text-yellow-200 border-yellow-400/30'
                                }
                              >
                                {blog.status === 'published' ? (
                                  <><Eye className="w-3 h-3 mr-1" /> Published</>
                                ) : (
                                  <><EyeOff className="w-3 h-3 mr-1" /> Draft</>
                                )}
                              </Badge>
                            </div>
                            <p className="text-white/70 text-sm line-clamp-2 mb-3">
                              {blog.excerpt}
                            </p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {blog.tags.map((tag, tagIndex) => (
                                <Badge
                                  key={tagIndex}
                                  variant="outline"
                                  className="bg-purple-500/10 text-purple-200 border-purple-400/30 text-xs"
                                >
                                  <Tag className="w-3 h-3 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            {/* Date */}
                            <div className="flex items-center text-white/50 text-xs">
                              <Calendar className="w-3 h-3 mr-1" />
                              Created: {new Date(blog.createdAt).toLocaleDateString()}
                              {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                                <>
                                  <span className="mx-2">•</span>
                                  Updated: {new Date(blog.updatedAt).toLocaleDateString()}
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                          <Link href={`/blog/create?id=${blog._id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-blue-500/10 border-blue-400/30 text-blue-200 hover:bg-blue-500/20 hover:text-blue-100"
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleStatus(blog._id)}
                            className={blog.status === 'published'
                              ? 'bg-yellow-500/10 border-yellow-400/30 text-yellow-200 hover:bg-yellow-500/20 hover:text-yellow-100'
                              : 'bg-green-500/10 border-green-400/30 text-green-200 hover:bg-green-500/20 hover:text-green-100'
                            }
                          >
                            {blog.status === 'published' ? (
                              <>
                                <EyeOff className="w-4 h-4 mr-2" />
                                Unpublish
                              </>
                            ) : (
                              <>
                                <Eye className="w-4 h-4 mr-2" />
                                Publish
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(blog._id)}
                            className="bg-red-500/10 border-red-400/30 text-red-200 hover:bg-red-500/20 hover:text-red-100"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                          <Link href={`/blog/${blog.slug}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white/70 hover:text-white hover:bg-white/10"
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-white mb-1">{blogs.length}</div>
              <div className="text-white/70 text-sm">Total Posts</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">
                {blogs.filter(b => b.status === 'published').length}
              </div>
              <div className="text-white/70 text-sm">Published</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-1">
                {blogs.filter(b => b.status === 'draft').length}
              </div>
              <div className="text-white/70 text-sm">Drafts</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}


