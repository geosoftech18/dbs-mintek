'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
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

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [slug, setSlug] = useState<string>('')

  // Fallback dummy blog posts data
  const dummyPosts: BlogPost[] = [
    {
      id: 1,
      title: "Welcome to Our Futuristic Blog!",
      content: `
        <h2>Welcome to the Future of Blogging</h2>
        <p>This is a sample blog post to demonstrate the blog module. The database is not configured yet, so this is placeholder content.</p>
        
        <h3>What You'll Find Here</h3>
        <p>Our blog covers a wide range of topics including:</p>
        <ul>
          <li>Web development trends</li>
          <li>Technology insights</li>
          <li>Design inspiration</li>
          <li>Industry news</li>
        </ul>
        
        <h3>Getting Started</h3>
        <p>Feel free to explore our content and don't hesitate to reach out if you have any questions. We're here to help you stay updated with the latest in technology and design.</p>
        
        <blockquote>
          <p>"The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt</p>
        </blockquote>
        
        <p>Thank you for visiting our blog, and we hope you find the content valuable and inspiring!</p>
      `,
      excerpt: "This is a sample blog post to demonstrate the blog module. The database is not configured yet, so this is placeholder content.",
      tags: ["welcome", "demo", "blog"],
      status: "published",
      featuredImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop",
      createdAt: new Date().toISOString(),
      author: "Admin User",
      readTime: "5 min read",
      likes: 42,
      comments: 8
    },
    {
      id: 2,
      title: "Getting Started with Our Blog System",
      content: `
        <h2>Mastering Our Blog System</h2>
        <p>Learn how to use our modern blog system with all its features and capabilities.</p>
        
        <h3>Key Features</h3>
        <p>Our blog system comes packed with amazing features:</p>
        <ul>
          <li>Rich text editing with TinyMCE</li>
          <li>Image upload and management</li>
          <li>Tag system for organization</li>
          <li>Draft and publish workflow</li>
          <li>Responsive design</li>
        </ul>
        
        <h3>Creating Your First Post</h3>
        <p>To create a new blog post, simply click the "Create New Post" button and fill out the form. Make sure to add a compelling title and engaging content.</p>
        
        <h3>Best Practices</h3>
        <p>Here are some tips for creating great blog posts:</p>
        <ol>
          <li>Write compelling headlines</li>
          <li>Use images to break up text</li>
          <li>Add relevant tags</li>
          <li>Proofread before publishing</li>
        </ol>
      `,
      excerpt: "Learn how to use our modern blog system with all its features and capabilities.",
      tags: ["tutorial", "getting-started"],
      status: "published",
      featuredImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      author: "Tech Writer",
      readTime: "7 min read",
      likes: 28,
      comments: 5
    },
    {
      id: 3,
      title: "The Future of Web Development",
      content: `
        <h2>Exploring Tomorrow's Web</h2>
        <p>Exploring the latest trends and technologies that are shaping the future of web development.</p>
        
        <h3>Emerging Technologies</h3>
        <p>The web development landscape is constantly evolving. Here are some key trends to watch:</p>
        
        <h4>Artificial Intelligence</h4>
        <p>AI is revolutionizing how we build and interact with websites. From automated code generation to intelligent user experiences.</p>
        
        <h4>WebAssembly</h4>
        <p>WebAssembly is bringing near-native performance to web applications, opening up new possibilities for complex applications.</p>
        
        <h4>Progressive Web Apps</h4>
        <p>PWAs are blurring the line between web and native applications, providing app-like experiences in the browser.</p>
        
        <h3>What This Means for Developers</h3>
        <p>As these technologies mature, developers will need to adapt and learn new skills to stay relevant in the industry.</p>
      `,
      excerpt: "Exploring the latest trends and technologies that are shaping the future of web development.",
      tags: ["web-development", "future", "technology"],
      status: "draft",
      featuredImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      author: "Future Tech",
      readTime: "10 min read",
      likes: 15,
      comments: 3
    }
  ]

  useEffect(() => {
    // Await params first
    const initParams = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    initParams()
  }, [params])

  useEffect(() => {
    if (!slug) return
    
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
  }, [slug])

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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/70">Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-white/70 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <Link href="/blog">
              <Button 
                variant="ghost" 
                className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl"
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
                    ? 'text-red-400 hover:text-red-300' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 mr-1 ${liked ? 'fill-current' : ''}`} />
                {post.likes + (liked ? 1 : 0)}
              </Button>
              
              <Button
                onClick={handleShare}
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white rounded-xl"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 h-64 md:h-80 flex items-center justify-center">
              <BookOpen className="w-24 h-24 text-white/30" />
            </div>
          )}
        </motion.div>

        {/* Post Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-2xl">
            <CardContent className="p-8">
              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-white/70">
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
                    className="bg-purple-500/10 text-purple-200 border-purple-400/30"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Content */}
              <div className="blog-content prose prose-invert max-w-none">
                <div 
                  className="text-white/90 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
              <style jsx global>{`
                .blog-content h1 {
                  font-size: 2.5em;
                  font-weight: bold;
                  color: white;
                  margin: 1.5em 0 0.75em 0;
                  line-height: 1.2;
                }
                .blog-content h2 {
                  font-size: 2em;
                  font-weight: bold;
                  color: white;
                  margin: 1.25em 0 0.625em 0;
                  line-height: 1.3;
                }
                .blog-content h3 {
                  font-size: 1.5em;
                  font-weight: bold;
                  color: white;
                  margin: 1em 0 0.5em 0;
                  line-height: 1.4;
                }
                .blog-content h4 {
                  font-size: 1.25em;
                  font-weight: bold;
                  color: white;
                  margin: 0.875em 0 0.4375em 0;
                  line-height: 1.4;
                }
                .blog-content h5 {
                  font-size: 1.125em;
                  font-weight: bold;
                  color: white;
                  margin: 0.75em 0 0.375em 0;
                  line-height: 1.5;
                }
                .blog-content h6 {
                  font-size: 1em;
                  font-weight: bold;
                  color: white;
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
                  color: rgba(255, 255, 255, 0.9);
                  margin: 1em 0;
                  line-height: 1.7;
                  font-size: 1rem;
                }
                .blog-content ul,
                .blog-content ol {
                  color: rgba(255, 255, 255, 0.9);
                  margin: 1em 0;
                  padding-left: 2em;
                  line-height: 1.7;
                }
                .blog-content li {
                  margin: 0.5em 0;
                  color: rgba(255, 255, 255, 0.9);
                }
                .blog-content strong {
                  font-weight: bold;
                  color: white;
                }
                .blog-content em {
                  font-style: italic;
                  color: rgba(255, 255, 255, 0.9);
                }
                .blog-content u {
                  text-decoration: underline;
                }
                .blog-content s {
                  text-decoration: line-through;
                }
                .blog-content blockquote {
                  border-left: 4px solid rgba(255, 255, 255, 0.3);
                  padding-left: 1.5em;
                  margin: 1.5em 0;
                  color: rgba(255, 255, 255, 0.8);
                  font-style: italic;
                  background: rgba(255, 255, 255, 0.05);
                  padding: 1em 1.5em;
                  border-radius: 0.5em;
                }
                .blog-content blockquote p {
                  margin: 0.5em 0;
                }
                .blog-content a {
                  color: #a78bfa;
                  text-decoration: underline;
                  transition: color 0.2s;
                }
                .blog-content a:hover {
                  color: #c4b5fd;
                }
                .blog-content code {
                  background-color: rgba(0, 0, 0, 0.4);
                  color: #fbbf24;
                  padding: 0.2em 0.4em;
                  border-radius: 0.25em;
                  font-size: 0.9em;
                  font-family: 'Courier New', monospace;
                }
                .blog-content pre {
                  background-color: rgba(0, 0, 0, 0.4);
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
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                }
                .blog-content table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 1.5em 0;
                  background: rgba(255, 255, 255, 0.05);
                  border-radius: 0.5em;
                  overflow: hidden;
                }
                .blog-content th,
                .blog-content td {
                  border: 1px solid rgba(255, 255, 255, 0.2);
                  padding: 0.75em;
                  text-align: left;
                  color: rgba(255, 255, 255, 0.9);
                }
                .blog-content th {
                  background-color: rgba(255, 255, 255, 0.1);
                  font-weight: bold;
                  color: white;
                }
                .blog-content hr {
                  border: none;
                  border-top: 2px solid rgba(255, 255, 255, 0.2);
                  margin: 2em 0;
                }
                .blog-content iframe {
                  max-width: 100%;
                  margin: 2em 0;
                  border-radius: 0.5em;
                }
              `}</style>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-white/10">
                <Button
                  onClick={handleLike}
                  className={`rounded-xl ${
                    liked 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 mr-2 ${liked ? 'fill-current' : ''}`} />
                  {liked ? 'Liked' : 'Like'} ({post.likes + (liked ? 1 : 0)})
                </Button>
                
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 rounded-xl"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Post
                </Button>
                
                <Link href="/blog/create">
                  <Button 
                    variant="outline" 
                    className="border-purple-400/30 text-purple-200 hover:bg-purple-500/10 rounded-xl"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Write Post
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Related Posts (placeholder) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Related Posts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {dummyPosts
              .filter(p => (p.id || 0) !== (post.id || post._id || 0))
              .slice(0, 2)
              .map((relatedPost, index) => (
                <Link 
                  key={relatedPost.id || index}
                  href={`/blog/${relatedPost.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')}`}
                >
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      {relatedPost.featuredImage ? (
                        <img
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          className="w-full h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg mb-4 flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-white/30" />
                        </div>
                      )}
                      <h3 className="text-white font-semibold mb-2 group-hover:text-purple-300 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-white/70 text-sm line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
