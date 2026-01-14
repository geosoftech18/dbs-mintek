"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Quote, ChevronLeft, ChevronRight, Facebook, Twitter, Linkedin } from "lucide-react"

const mobileTestimonials = [
  {
    id: "idea-mumbai-mobile",
    name: "Sr.Gen.Manager",
    company: "Idea Mumbai Circle",
    location: "Mumbai, India",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    testimonial:
      "DBS runs entire Mumbai circle operations for us efficiently. Their team is very efficient, flexible & focused. They always deliver before time.",
    socialIcon: Facebook,
    industry: "Telecom",
    partnership: "4+ Years",
  },
  {
    id: "vodafone-mag-mobile",
    name: "VP, Service Delivery",
    company: "Vodafone MAG Circle",
    location: "Maharashtra & Goa",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    testimonial:
      "DBS has completed 5 years for Vodafone and doing fantastic work. They have a dedicated team that gives market VOC regularly. We're proud of their team.",
    socialIcon: Facebook,
    industry: "Telecom",
    partnership: "5+ Years",
  },
  {
    id: "rtech-usa-mobile",
    name: "President",
    company: "Rtech Consultants",
    location: "United States",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    testimonial:
      "Our backend pension plan administration is fully automated by DBS. They manage secure data and consistently deliver on time, exceeding expectations.",
    socialIcon: Twitter,
    industry: "Finance",
    partnership: "4+ Years",
  },
  {
    id: "hdfc-bank-mobile",
    name: "Operations Manager",
    company: "HDFC Bank",
    location: "Mumbai, India",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    testimonial:
      "DBS Mintek is our trusted partner. Their professional approach and commitment to quality helps us maintain high customer satisfaction standards.",
    socialIcon: Linkedin,
    industry: "Banking",
    partnership: "3+ Years",
  },
  {
    id: "bajaj-finance-mobile",
    name: "Head of CX",
    company: "Bajaj Auto Finance",
    location: "Pune, India",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    testimonial:
      "Working with DBS Mintek has been a game-changer. Their technology-driven approach significantly improved our customer satisfaction scores.",
    socialIcon: Linkedin,
    industry: "Finance",
    partnership: "2+ Years",
  },
]

const mobileStats = [
  { number: "50+", label: "Happy Clients" },
  { number: "98%", label: "Satisfaction" },
  { number: "500+", label: "Projects" },
  { number: "24/7", label: "Support" },
]

export default function MobileTestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mobileTestimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mobileTestimonials.length) % mobileTestimonials.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Auto-scroll effect
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const cardWidth = container.children[0]?.clientWidth || 280
      const scrollPosition = currentSlide * (cardWidth + 16) // 16px for gap
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
    }
  }, [currentSlide])

  return (
    <section
      ref={sectionRef}
      className="block md:hidden py-12 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-20 h-20 bg-blue-500 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-green-500 rounded-full blur-2xl animate-pulse"></div>
      </div>

      <div className="max-w-sm mx-auto px-4 relative">
        {/* Header */}
        <div className={`text-center mb-8 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <Badge className="mb-3 px-3 py-1 text-xs font-medium">WHAT OUR CLIENTS SAY</Badge>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Testimonials</h2>
          <p className="text-sm text-gray-600">
            Hear from our satisfied clients about their experience working with DBS Mintek
          </p>
        </div>

        {/* Mobile Stats */}
        <div className={`mb-8 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="grid grid-cols-2 gap-4">
              {mobileStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl font-bold text-blue-600">{stat.number}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className={`relative ${isVisible ? "animate-fade-in-delay" : "opacity-0"}`}>
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-lg border-0 w-8 h-8"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-lg border-0 w-8 h-8"
            onClick={nextSlide}
          >
            <ChevronRight className="h-3 w-3" />
          </Button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {mobileTestimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className="flex-shrink-0 w-72 snap-center bg-white/95 backdrop-blur-sm border-0 shadow-lg"
              >
                <CardContent className="p-5">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <Quote className="h-6 w-6 text-blue-600 opacity-50" />
                    <testimonial.socialIcon className="h-4 w-4 text-blue-600" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                    "{testimonial.testimonial}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="flex items-center space-x-3 mb-3">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-blue-600 font-medium">{testimonial.company}</p>
                      <p className="text-xs text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex justify-between text-xs">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">{testimonial.industry}</span>
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                      {testimonial.partnership}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {mobileTestimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentSlide ? "bg-blue-600 w-6" : "bg-gray-300"
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <div className={`mt-8 ${isVisible ? "animate-fade-in-delay-2" : "opacity-0"}`}>
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 text-white text-center">
            <h3 className="text-lg font-bold mb-2">Ready to Join Our Success Stories?</h3>
            <p className="text-sm text-blue-100 mb-4">Experience excellence in customer service operations</p>
            <div className="space-y-2">
              <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">Start Your Journey</Button>
              <Button
                variant="outline"
                className="w-full border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Read More Reviews
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
