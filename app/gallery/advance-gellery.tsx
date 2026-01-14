"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  Grid3X3,
  Grid2X2,
  LayoutGrid,
  List,
  Search,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Calendar,
  Eye,
} from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface GalleryImage {
  id: number
  src: string
  title: string
  location: string
  date: string
  views: number
  description: string
}

const sampleImages: GalleryImage[] = [
  {
    id: 1,
    src: "/placeholder.svg?height=400&width=600",
    title: "Brooklyn Bridge at Sunset",
    location: "Navi Mumbai",
    date: "2024-01-15",
    views: 1250,
    description: "Golden hour view of the iconic Brooklyn Bridge with Manhattan skyline",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=500&width=400",
    title: "Eiffel Tower Night",
    location: "Pune",
    date: "2024-02-20",
    views: 2100,
    description: "The illuminated Eiffel Tower against the Parisian night sky",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=300&width=500",
    title: "Shibuya Crossing",
    location: "Kolkata",
    date: "2024-03-10",
    views: 1800,
    description: "Bustling pedestrian crossing in the heart of Tokyo",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=600&width=400",
    title: "Central Park Autumn",
    location: "Navi Mumbai",
    date: "2024-01-25",
    views: 950,
    description: "Fall foliage in Central Park with colorful autumn leaves",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=400&width=400",
    title: "Louvre Pyramid",
    location: "Pune",
    date: "2024-02-28",
    views: 1650,
    description: "Modern glass pyramid entrance to the historic Louvre Museum",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=500&width=600",
    title: "Mount Fuji Dawn",
    location: "Kolkata",
    date: "2024-03-15",
    views: 2800,
    description: "Majestic Mount Fuji at sunrise with cherry blossoms in foreground",
  },
  {
    id: 7,
    src: "/placeholder.svg?height=400&width=500",
    title: "Times Square Energy",
    location: "Navi Mumbai",
    date: "2024-01-30",
    views: 1400,
    description: "Vibrant neon lights and bustling crowds in Times Square",
  },
  {
    id: 8,
    src: "/placeholder.svg?height=600&width=500",
    title: "Seine River Evening",
    location: "Pune",
    date: "2024-02-25",
    views: 1100,
    description: "Romantic evening view along the Seine River with historic bridges",
  },
  {
    id: 9,
    src: "/placeholder.svg?height=300&width=400",
    title: "Tokyo Skyline",
    location: "Kolkata",
    date: "2024-03-20",
    views: 2200,
    description: "Modern Tokyo skyline with towering skyscrapers and city lights",
  },
  {
    id: 10,
    src: "/placeholder.svg?height=500&width=500",
    title: "Statue of Liberty",
    location: "Navi Mumbai",
    date: "2024-01-20",
    views: 1750,
    description: "Iconic Statue of Liberty standing tall in New York Harbor",
  },
  {
    id: 11,
    src: "/placeholder.svg?height=400&width=600",
    title: "Montmartre Streets",
    location: "Pune",
    date: "2024-02-22",
    views: 890,
    description: "Charming cobblestone streets of Montmartre district",
  },
  {
    id: 12,
    src: "/placeholder.svg?height=600&width=400",
    title: "Traditional Temple",
    location: "Kolkata",
    date: "2024-03-12",
    views: 1950,
    description: "Ancient temple architecture surrounded by modern Tokyo cityscape",
  },
]

type LayoutType = "grid3" | "grid4" | "masonry" | "list"
type SortType = "date" | "popularity" | "title"

export default function AdvancedGallery() {
  const [layout, setLayout] = useState<LayoutType>("grid3")
  const [activeFilter, setActiveFilter] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortType>("date")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const locations = ["All", ...Array.from(new Set(sampleImages.map((img) => img.location)))]

  const filteredAndSortedImages = useMemo(() => {
    let filtered = sampleImages

    // Filter by location
    if (activeFilter !== "All") {
      filtered = filtered.filter((img) => img.location === activeFilter)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (img) =>
          img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          img.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          img.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Sort images
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "popularity":
          return b.views - a.views
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return filtered
  }, [activeFilter, searchQuery, sortBy])

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image)
    setZoomLevel(1)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    setZoomLevel(1)
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedImage) return

    const currentIndex = filteredAndSortedImages.findIndex((img) => img.id === selectedImage.id)
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredAndSortedImages.length - 1
    } else {
      newIndex = currentIndex < filteredAndSortedImages.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedImage(filteredAndSortedImages[newIndex])
    setZoomLevel(1)
  }

  const handleZoom = (type: "in" | "out") => {
    if (type === "in" && zoomLevel < 3) {
      setZoomLevel((prev) => prev + 0.5)
    } else if (type === "out" && zoomLevel > 0.5) {
      setZoomLevel((prev) => prev - 0.5)
    }
  }

  const getGridClasses = () => {
    switch (layout) {
      case "grid3":
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      case "grid4":
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      case "masonry":
        return "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
      case "list":
        return "flex flex-col gap-4"
      default:
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="flex gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 bg-muted rounded w-20"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[4/3] bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
        <Header/>
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Advanced Gallery</h1>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Layout and Sort Controls */}
            <div className="flex flex-wrap gap-2 items-center">
              <Select value={sortBy} onValueChange={(value: SortType) => setSortBy(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-1 border rounded-lg p-1">
                <Button variant={layout === "grid3" ? "default" : "ghost"} size="sm" onClick={() => setLayout("grid3")}>
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button variant={layout === "grid4" ? "default" : "ghost"} size="sm" onClick={() => setLayout("grid4")}>
                  <Grid2X2 className="h-4 w-4" />
                </Button>
                <Button
                  variant={layout === "masonry" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setLayout("masonry")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button variant={layout === "list" ? "default" : "ghost"} size="sm" onClick={() => setLayout("list")}>
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Location Filters */}
          <div className="flex flex-wrap gap-2">
            {locations.map((location) => (
              <Button
                key={location}
                variant={activeFilter === location ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(location)}
                className="transition-all duration-200"
              >
                {location}
                {location !== "All" && (
                  <Badge variant="secondary" className="ml-2">
                    {sampleImages.filter((img) => img.location === location).length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredAndSortedImages.length} of {sampleImages.length} images
        </div>

        {/* Gallery Grid */}
        <div className={getGridClasses()}>
          {filteredAndSortedImages.map((image) => (
            <div
              key={image.id}
              className={`group cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                layout === "masonry" ? "break-inside-avoid mb-4" : ""
              } ${layout === "list" ? "flex gap-4 p-4 border rounded-lg hover:shadow-lg" : ""}`}
              onClick={() => openLightbox(image)}
            >
              {layout === "list" ? (
                <>
                  <div className="relative w-48 h-32 flex-shrink-0">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-lg">{image.title}</h3>
                    <p className="text-sm text-muted-foreground">{image.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {image.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(image.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {image.views.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="relative overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold">{image.title}</h3>
                    <div className="flex items-center gap-2 text-sm opacity-90">
                      <MapPin className="h-3 w-3" />
                      {image.location}
                      <span>•</span>
                      <Eye className="h-3 w-3" />
                      {image.views.toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedImages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No images found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black/95">
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                onClick={closeLightbox}
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Navigation Buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={() => navigateImage("prev")}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={() => navigateImage("next")}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>

              {/* Zoom Controls */}
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={() => handleZoom("out")}
                  disabled={zoomLevel <= 0.5}
                >
                  <ZoomOut className="h-5 w-5" />
                </Button>
                <div className="px-3 py-2 bg-black/50 rounded text-white text-sm">{Math.round(zoomLevel * 100)}%</div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={() => handleZoom("in")}
                  disabled={zoomLevel >= 3}
                >
                  <ZoomIn className="h-5 w-5" />
                </Button>
              </div>

              {/* Main Image */}
              <div className="relative max-w-full max-h-full overflow-auto">
                <Image
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.title}
                  width={800}
                  height={600}
                  className="max-w-none transition-transform duration-200"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    maxWidth: zoomLevel > 1 ? "none" : "100%",
                    maxHeight: zoomLevel > 1 ? "none" : "100%",
                  }}
                />
              </div>

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
                <p className="text-gray-300 mb-3">{selectedImage.description}</p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {selectedImage.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(selectedImage.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    {selectedImage.views.toLocaleString()} views
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
    <Footer/></>
  )
}
