'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import BlogEditor from '@/components/blog-editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  X, 
  Plus, 
  Save, 
  Eye, 
  EyeOff,
  Image as ImageIcon,
  Tag,
  Type,
  FileText,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

export default function BlogCreatePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams?.get('id') || null
  const isEditing = !!editId

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [featuredImage, setFeaturedImage] = useState<string | null>(null)
  const [isPublished, setIsPublished] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(isEditing)
  const [authenticated, setAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check-session')
        const result = await response.json()

        if (result.success && result.authenticated) {
          setAuthenticated(true)
        } else {
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

  // Load blog data if editing
  useEffect(() => {
    if (!authenticated) return

    if (isEditing && editId) {
      const loadBlog = async () => {
        try {
          const response = await fetch(`/api/blog/${editId}`)
          const result = await response.json()
          
          if (result.success && result.data) {
            const blog = result.data
            setTitle(blog.title)
            setContent(blog.content)
            setTags(blog.tags || [])
            setFeaturedImage(blog.featuredImage)
            setIsPublished(blog.status === 'published')
          }
        } catch (error) {
          console.error('Error loading blog:', error)
          alert('Failed to load blog post')
        } finally {
          setLoading(false)
        }
      }
      loadBlog()
    } else {
      setLoading(false)
    }
  }, [editId, isEditing, authenticated])

  // Handle image upload (dummy)
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFeaturedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle tag addition
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  // Handle tag removal
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  // Generate excerpt from content
  const generateExcerpt = (htmlContent: string, maxLength: number = 150): string => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlContent
    const text = tempDiv.textContent || tempDiv.innerText || ''
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (!title.trim()) {
      alert('Please enter a title for your blog post')
      return
    }

    if (!content.trim()) {
      alert('Please enter content for your blog post')
      return
    }

    setIsSubmitting(true)
    
    try {
      const blogData = {
      title,
      content,
      tags,
      featuredImage,
      status: isPublished ? 'published' : 'draft',
      }

      let response
      if (isEditing && editId) {
        // Update existing blog
        response = await fetch(`/api/blog/${editId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(blogData),
        })
      } else {
        // Create new blog
        response = await fetch('/api/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(blogData),
        })
      }

      const result = await response.json()

      if (result.success) {
        alert(`Blog post ${isPublished ? (isEditing ? 'updated and published' : 'published') : (isEditing ? 'updated as draft' : 'saved as draft')} successfully!`)
        // Redirect to admin page
        router.push('/blog/admin')
      } else {
        throw new Error(result.error || 'Failed to save blog post')
      }
    } catch (error: any) {
      console.error('Error saving blog:', error)
      alert(error.message || 'Error saving blog post. Please try again.')
    } finally {
    setIsSubmitting(false)
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
          <p className="text-white/70">Loading blog post...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <Link href="/blog/admin">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Admin
              </Button>
            </Link>
          </div>
          <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {isEditing ? '✏️ Edit Blog Post' : '✨ Create New Blog Post'}
          </h1>
          <p className="text-white/70 text-lg">
              {isEditing ? 'Update your blog post' : 'Share your thoughts with the world'}
          </p>
          </div>
        </motion.div>

        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Blog Post Details
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Title Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <Label htmlFor="title" className="text-white/90 flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Blog Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter your blog title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
                />
              </motion.div>

              {/* Featured Image Upload */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <Label className="text-white/90 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Featured Image
                </Label>
                
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Upload Button */}
                  <div className="flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="w-full h-32 border-dashed border-2 border-white/30 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-xl flex flex-col items-center justify-center gap-2"
                    >
                      <Upload className="w-8 h-8" />
                      <span>Click to upload image</span>
                    </Button>
                  </div>
                  
                  {/* Image Preview */}
                  {featuredImage && (
                    <div className="flex-1">
                      <div className="relative">
                        <img
                          src={featuredImage}
                          alt="Featured"
                          className="w-full h-32 object-cover rounded-xl"
                        />
                        <Button
                          type="button"
                          onClick={() => setFeaturedImage(null)}
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Tags Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <Label className="text-white/90 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </Label>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-purple-500/20 text-purple-200 border-purple-400/30 px-3 py-1"
                    >
                      {tag}
                      <Button
                        type="button"
                        onClick={() => removeTag(tag)}
                        size="sm"
                        variant="ghost"
                        className="ml-2 p-0 w-4 h-4 hover:bg-red-500/20"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl"
                  />
                  <Button
                    type="button"
                    onClick={addTag}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-4"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>

              {/* Content Editor */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <Label className="text-white/90">Blog Content</Label>
                <BlogEditor
                  content={content}
                  onChange={(newContent) => setContent(newContent)}
                  placeholder="Start writing your blog post..."
                />
              </motion.div>

              {/* Publish/Draft Toggle */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="flex items-center gap-3">
                  {isPublished ? (
                    <Eye className="w-5 h-5 text-green-400" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-yellow-400" />
                  )}
                  <div>
                    <Label className="text-white font-medium">
                      {isPublished ? 'Published' : 'Draft'}
                    </Label>
                    <p className="text-white/60 text-sm">
                      {isPublished ? 'This post will be visible to everyone' : 'This post will be saved as draft'}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={isPublished}
                  onCheckedChange={setIsPublished}
                  className="data-[state=checked]:bg-green-500"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center pt-4"
              >
                <Button
                  onClick={handleSubmit}
                  disabled={!title.trim() || isSubmitting}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {isPublished ? 'Publishing...' : 'Saving...'}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save className="w-5 h-5" />
                      {isPublished ? 'Publish Post' : 'Save as Draft'}
                    </div>
                  )}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <p className="text-white/50 text-sm">
            💡 Tip: Use the rich text editor to format your content beautifully. You can now insert images, links, videos, and tables!
          </p>
        </motion.div>
      </div>
    </div>
  )
}
