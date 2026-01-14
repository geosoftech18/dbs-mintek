"use client"

import { useEffect, useRef, useState,useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { stat, Stats } from "fs"

const clients = [
  {
    name: "Finolet",
    logo: "/client5.jpg?height=80&width=100",
    industry: "Financial Technology",
    testimonial: "DBS Mintek transformed our customer service operations with their professional approach.",
  },
  {
    name: "Yellow.ai",
    logo: "/client6.jpg?height=60&width=120",
    industry: "AI Technology",
    testimonial: "Outstanding support quality and 24/7 availability that matches our global operations.",
  },
  {
    name: "Xanadu",
    logo: "/client9.jpg?height=60&width=120",
    industry: "Consulting",
    testimonial: "Their team's expertise in customer engagement has significantly improved our client satisfaction.",
  },
  {
    name: "HeroFinCorp",
    logo: "/client3.jpg?height=60&width=120",
    industry: "Financial Services",
    testimonial: "Reliable, professional, and results-driven. Exactly what we needed for our call center operations.",
  },
  {
    name: "Bike Bazaar",
    logo: "/client6.jpg?height=60&width=120",
    industry: "E-commerce",
    testimonial: "DBS Mintek's sales support has helped us achieve remarkable growth in customer acquisition.",
  },
  {
    name: "HDFC Bank",
    logo: "/client2.jpg?height=60&width=120",
    industry: "Banking",
    testimonial: "Professional service delivery that aligns perfectly with our banking standards.",
  },
  {
    name: "Bajaj",
    logo: "/client4.jpg?height=60&width=120",
    industry: "Automotive",
    testimonial: "Their customer support excellence has enhanced our brand reputation significantly.",
  },
  {
    name: "Bajaj Auto Finance",
    logo: "/client10.jpg?height=60&width=120",
    industry: "Financial Services",
    testimonial: "Exceptional call center services that have improved our customer retention rates.",
  },
]

const achievements = [
  { metric: "98%", label: "Client Satisfaction" },
  { metric: "500+", label: "Projects Completed" },
  { metric: "50+", label: "Happy Clients" },
  { metric: "24/7", label: "Support Available" },
]


// Custom hook for countup animation
function useCountUp(end: number, duration = 2000, start = 0) {
  const [count, setCount] = useState(start)
  const [isAnimating, setIsAnimating] = useState(false)


  const startAnimation = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    const startTime = Date.now()
    const startValue = start

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = startValue + (end - startValue) * easeOutQuart

      setCount(Math.floor(currentValue))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
        setIsAnimating(false)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, start, isAnimating])

  return { count, startAnimation, isAnimating }
}

// Component for animated stat numbers
function AnimatedStat({ stat, isVisible }: { stat: (typeof achievements)[0]; isVisible: boolean }) {
  const [hasAnimated, setHasAnimated] = useState(false)

  // Extract number from stat.number (handle 50+, 98%, 500+, 24/7)
  const getNumericValue = (value: string) => {
    if (value === "24/7") return 24
    return Number.parseInt(value.replace(/[^0-9]/g, ""))
  }

  const numericValue = getNumericValue(stat.metric)
  const { count, startAnimation } = useCountUp(numericValue, 2500)

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true)
      // Add a small delay for staggered animation
      const delay = Math.random() * 500
      setTimeout(startAnimation, delay)
    }
  }, [isVisible, hasAnimated, startAnimation])

  // Format the display value
  const getDisplayValue = (currentCount: number, originalValue: string) => {
    if (originalValue === "24/7") {
      return currentCount >= 24 ? "24/7" : `${currentCount}/7`
    }
    if (originalValue.includes("+")) {
      return `${currentCount}+`
    }
    if (originalValue.includes("%")) {
      return `${currentCount}%`
    }
    return currentCount.toString()
  }

  return (
    <div className="text-center group">
      <div className="mb-2">
        <span className="text-3xl lg:text-4xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
          {hasAnimated ? getDisplayValue(count, stat.metric) : "0"}
        </span>
      </div>
      <p className="text-gray-600 font-medium">{stat.label}</p>
    </div>
  )
}

export default function ClientsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

   // Stats section intersection observer
   useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(clients.length / 4))
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(clients.length / 4))
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(clients.length / 4)) % Math.ceil(clients.length / 4))
    setIsAutoPlaying(false)
  }

  const getVisibleClients = () => {
    const clientsPerSlide = 4
    const startIndex = currentSlide * clientsPerSlide
    return clients.slice(startIndex, startIndex + clientsPerSlide)
  }

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Our Clients</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Our clients are seeing amazing results with{" "}
            <span className="text-purple-600 font-semibold">DBS mintek!</span>
          </p>
        </div>

        {/* Client Logos Carousel */}
        <div className={`mb-16 ${isVisible ? "animate-fade-in-delay" : "opacity-0"}`}>
          <div className="relative">
            {/* Navigation Buttons */}
            <Button
             
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl -ml-6"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
             
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl -mr-6"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Logos Grid */}
            <div className="grid grid-cols-2 grid-rows-1  lg:grid-cols-4 gap-6">
              {getVisibleClients().map((client, index) => (
                <Card
                  key={`${currentSlide}-${index}`}
                  className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white/80 backdrop-blur-sm"
                >
                  <CardContent className="p-8 flex flex-col items-center justify-center h-48">
                    <div className="relative w-full h-48 mb-2">
                      <Image
                        src={client.logo || "/placeholder.svg"}
                        alt={`${client.name} logo`}
                        fill
                        className="object-contain  filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <p className="text-sm text-gray-500 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {client.industry}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(clients.length / 4) }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentSlide ? "bg-purple-600 w-8" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => {
                    setCurrentSlide(index)
                    setIsAutoPlaying(false)
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Achievements Stats */}
        <div ref={statsRef} className={`mb-16 ${isVisible ? "animate-fade-in-delay-2" : "opacity-0"}`}>
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <AnimatedStat key={index} stat={achievement} isVisible={statsVisible} />
                // <div key={index} className="text-center group">
                //   <div className="mb-2">
                //     <span className="text-3xl lg:text-4xl font-bold text-purple-600 group-hover:text-purple-700 transition-colors">
                //       {achievement.metric}
                //     </span>
                //   </div>
                //   <p className="text-gray-600 font-medium">{achievement.label}</p>
                // </div>
              ))}
            </div>
          </div>
        </div>

       

        {/* Call to Action */}
        <div className={`text-center mt-16 ${isVisible ? "animate-fade-in-delay-4" : "opacity-0"}`}>
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Ready to Join Our Success Stories?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover how DBS Mintek can transform your customer service operations and drive exceptional results for
            your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button  className="bg-purple-600 hover:bg-purple-700 px-8">
              Start Your Journey
            </Button>
            <Button   className="px-8">
              View Case Studies
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
