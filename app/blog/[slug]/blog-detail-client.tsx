'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import Header from '@/components/header'
import PageBreadcrumbs from '@/components/page-breadcrumbs'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Tag, 
  User,
  Share2,
  Heart,
  MessageCircle,
  BookOpen
} from 'lucide-react'

interface BlogPost {
  _id?: string
  id?: number
  title: string
  content: string
  excerpt: string
  tags: string[]
  status: string
  featuredImage: string | null
  createdAt: string
  author?: string
  readTime?: string
  likes?: number
  comments?: number
}

type RelatedPost = {
  slug: string
  title: string
  excerpt: string
  featuredImage: string | null
}

export default function BlogDetailClient({
  slug,
  initialPost = null,
  relatedPosts = [],
}: {
  slug: string
  initialPost?: BlogPost | null
  relatedPosts?: RelatedPost[]
}) {
  const [post, setPost] = useState<BlogPost | null>(
    initialPost
      ? {
          author: 'Admin User',
          readTime: '5 min read',
          likes: 0,
          comments: 0,
          ...initialPost,
        }
      : null
  )
  const [loading, setLoading] = useState(!initialPost)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (!slug) return
    // Content already arrived with the server-rendered HTML.
    if (initialPost) return

    // Load post from API
    const fetchPost = async () => {
      setLoading(true)
      
      try {
        const response = await fetch(`/api/blog/slug/${slug}`)
        const result = await response.json()

        if (result.success && result.data) {
          const blogData = result.data
          // Add default values if missing
          const foundPost: BlogPost = {
            ...blogData,
            author: 'Admin User',
            readTime: '5 min read',
            likes: 0,
            comments: 0
          }
          setPost(foundPost)
        } else {
          setPost(null)
        }
      } catch (error) {
        console.error('Error loading blog post:', error)
        setPost(null)
      } finally {
      setLoading(false)
      }
    }

    fetchPost()
  }, [slug, initialPost])

  const handleLike = () => {
    if (post) {
      setLiked(!liked)
      // In real app, this would update the database
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <PageBreadcrumbs
          variant="onLight"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.title, href: `/blog/${slug}` },
          ]}
        />
      </div>
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <Link href="/blog">
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={handleLike}
                variant="ghost"
                size="sm"
                className={`rounded-xl ${
                  liked 
                    ? 'text-red-500 hover:text-red-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Heart className={`w-4 h-4 mr-1 ${liked ? 'fill-current' : ''}`} />
                {(post.likes ?? 0) + (liked ? 1 : 0)}
              </Button>
              
              <Button
                onClick={handleShare}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-blue-600 rounded-xl"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          {post.featuredImage ? (
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-blue-100 to-blue-200 h-64 md:h-80 flex items-center justify-center">
              <BookOpen className="w-24 h-24 text-blue-400" />
            </div>
          )}
        </motion.div>

        {/* Post Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white border-gray-200 shadow-xl">
            <CardContent className="p-8">
              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments} comments</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-300"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Content */}
              <div className="blog-content prose max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
              <style jsx global>{`
                .blog-content h1 {
                  font-size: 2.5em;
                  font-weight: bold;
                  color: #1e40af;
                  margin: 1.5em 0 0.75em 0;
                  line-height: 1.2;
                }
                .blog-content h2 {
                  font-size: 2em;
                  font-weight: bold;
                  color: #1e40af;
                  margin: 1.25em 0 0.625em 0;
                  line-height: 1.3;
                }
                .blog-content h3 {
                  font-size: 1.5em;
                  font-weight: bold;
                  color: #2563eb;
                  margin: 1em 0 0.5em 0;
                  line-height: 1.4;
                }
                .blog-content h4 {
                  font-size: 1.25em;
                  font-weight: bold;
                  color: #2563eb;
                  margin: 0.875em 0 0.4375em 0;
                  line-height: 1.4;
                }
                .blog-content h5 {
                  font-size: 1.125em;
                  font-weight: bold;
                  color: #3b82f6;
                  margin: 0.75em 0 0.375em 0;
                  line-height: 1.5;
                }
                .blog-content h6 {
                  font-size: 1em;
                  font-weight: bold;
                  color: #3b82f6;
                  margin: 0.625em 0 0.3125em 0;
                  line-height: 1.5;
                }
                .blog-content h1:first-child,
                .blog-content h2:first-child,
                .blog-content h3:first-child,
                .blog-content h4:first-child,
                .blog-content h5:first-child,
                .blog-content h6:first-child {
                  margin-top: 0;
                }
                .blog-content p {
                  color: #374151;
                  margin: 1em 0;
                  line-height: 1.7;
                  font-size: 1rem;
                }
                .blog-content ul,
                .blog-content ol {
                  color: #374151;
                  margin: 1em 0;
                  padding-left: 2em;
                  line-height: 1.7;
                }
                .blog-content li {
                  margin: 0.5em 0;
                  color: #374151;
                }
                .blog-content strong {
                  font-weight: bold;
                  color: #1f2937;
                }
                .blog-content em {
                  font-style: italic;
                  color: #374151;
                }
                .blog-content u {
                  text-decoration: underline;
                }
                .blog-content s {
                  text-decoration: line-through;
                }
                .blog-content blockquote {
                  border-left: 4px solid #3b82f6;
                  padding-left: 1.5em;
                  margin: 1.5em 0;
                  color: #4b5563;
                  font-style: italic;
                  background: #eff6ff;
                  padding: 1em 1.5em;
                  border-radius: 0.5em;
                }
                .blog-content blockquote p {
                  margin: 0.5em 0;
                }
                .blog-content a {
                  color: #2563eb;
                  text-decoration: underline;
                  transition: color 0.2s;
                }
                .blog-content a:hover {
                  color: #1d4ed8;
                }
                .blog-content code {
                  background-color: #f3f4f6;
                  color: #dc2626;
                  padding: 0.2em 0.4em;
                  border-radius: 0.25em;
                  font-size: 0.9em;
                  font-family: 'Courier New', monospace;
                }
                .blog-content pre {
                  background-color: #1f2937;
                  color: #f3f4f6;
                  padding: 1.5em;
                  border-radius: 0.5em;
                  overflow-x: auto;
                  margin: 1.5em 0;
                }
                .blog-content pre code {
                  background-color: transparent;
                  padding: 0;
                  color: inherit;
                }
                .blog-content img {
                  max-width: 100%;
                  height: auto;
                  margin: 2em 0;
                  border-radius: 0.5em;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                }
                .blog-content table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 1.5em 0;
                  background: #f9fafb;
                  border-radius: 0.5em;
                  overflow: hidden;
                }
                .blog-content th,
                .blog-content td {
                  border: 1px solid #e5e7eb;
                  padding: 0.75em;
                  text-align: left;
                  color: #374151;
                }
                .blog-content th {
                  background-color: #eff6ff;
                  font-weight: bold;
                  color: #1e40af;
                }
                .blog-content hr {
                  border: none;
                  border-top: 2px solid #e5e7eb;
                  margin: 2em 0;
                }
                .blog-content iframe {
                  max-width: 100%;
                  margin: 2em 0;
                  border-radius: 0.5em;
                }
              `}</style>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-200">
                <Button
                  onClick={handleLike}
                  className={`rounded-xl ${
                    liked 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 mr-2 ${liked ? 'fill-current' : ''}`} />
                  {liked ? 'Liked' : 'Like'} ({(post.likes ?? 0) + (liked ? 1 : 0)})
                </Button>
                
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 rounded-xl"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Post
                </Button>
                
                <Link href="/blog/create" rel="nofollow">
                  <Button 
                    variant="outline" 
                    className="border-blue-300 text-blue-700 hover:bg-blue-50 rounded-xl"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Write Post
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Posts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                >
                  <Card className="bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      {relatedPost.featuredImage ? (
                        <img
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          className="w-full h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-blue-400" />
                        </div>
                      )}
                      <h3 className="text-gray-800 font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </motion.div>
        )}
      </div>
    </div>
    </>
  )
}
