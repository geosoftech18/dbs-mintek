"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, MessageCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Typewriter from 'typewriter-effect'

const slides = [
  {
    title: "Excellence On Every Single Interaction",
    subtitle: "Ensuring consistent high-quality service experience for your clients",
    image: "/hero/1.png",
  },
  {
    title: "Innovative Solutions for Modern Business",
    subtitle: "Transforming your business with cutting-edge technology and expertise",
    image: "/hero/2.png",
  },
  {
    title: "Your Success is Our Priority",
    subtitle: "Dedicated support and personalized service for every client",
    image: "/hero/3.png",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={slides[currentSlide].image || "/placeholder.svg"}
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-blue-700 leading-tight mb-6 animate-fade-in">
            <Typewriter
               options={{
               strings: `${slides[currentSlide].title}`,
               autoStart: true,
               loop: true,
    
                }}
            />
              
            </h1>
            <p className="text-lg md:text-xl text-gray-700  animate-fade-in-delay">
              {slides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:pt-20 animate-fade-in-delay-2">
              <Button  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base font-medium">
                Get Free Consultation
              </Button>
              <Button
                
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-base font-medium"
              >
                View Our Services
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex items-center space-x-6 text-sm text-gray-600 animate-fade-in-delay-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>500+ Happy Clients</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-blue-600 rounded-full w-12 h-12"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-blue-600 rounded-full w-12 h-12"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-blue-600" : "bg-white/60 hover:bg-white/80"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Live Chat Decoration */}
      {/* <div className="absolute bottom-20 right-8 hidden lg:flex items-center space-x-4 text-blue-600">
        <div className="flex space-x-2">
          <MessageCircle className="h-8 w-8 fill-current" />
          <MessageCircle className="h-6 w-6 fill-current opacity-80" />
        </div>
        <span className="text-2xl font-bold opacity-20 select-none">Live Chat</span>
      </div> */}

      {/* Decorative Elements */}
      {/* <div className="absolute top-20 right-20 text-blue-600/20 text-6xl font-bold select-none hidden lg:block">#</div> */}
    </section>
  )
}
