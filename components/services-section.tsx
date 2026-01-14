"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
const iconMap: { [key: string]: React.ElementType } = {
  Headphones,
  Phone,
  Mail,
  MessageCircle,
  Heart,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Globe,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
}
import {
  Headphones,
  Phone,
  Mail,
  MessageCircle,
  Heart,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Globe,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react"

const services = [
  {
    id: "inbound",
    title: "INBOUND SERVICES",
    icon: Headphones,
    description:
      "Complete inbound call handling services for your various verticals like customer service, customer support, help desk, reservation/hotel help desk, HR support & IT Support service desk, order taking, appointment setting, HVAC, Email, Chat to the English, Hindi, Marathi & various other regional and foreign languages.",
    features: ["24/7 Customer Support", "Multi-language Support", "Order Processing", "Appointment Scheduling"],
    color: "blue",
    gradient: "from-blue-500 to-blue-700",
  },
  {
    id: "outbound",
    title: "OUTBOUND SERVICES",
    icon: Phone,
    description:
      "Complete outbound services that are designed to help your business in manner to attract business & driven to the global market place. Our experienced team of professionals promise you great desired results.",
    features: ["Lead Generation", "Sales Calls", "Market Research", "Customer Surveys"],
    color: "green",
    gradient: "from-green-500 to-green-700",
  },
  {
    id: "email",
    title: "E-MAIL SERVICES",
    icon: Mail,
    description:
      "We deploy professional services on the clients websites as well as our website for prospective clients. Our team is well trained to handle connect and chat with our agents for fulfilling client requirements urgently.",
    features: ["Email Management", "Response Handling", "Customer Queries", "Professional Communication"],
    color: "purple",
    gradient: "from-purple-500 to-purple-700",
  },
  {
    id: "chat",
    title: "CHAT SERVICES",
    icon: MessageCircle,
    description:
      "We deploy professional services on the clients websites as well as our website for prospective clients. Our team is well trained to handle connect and chat with our agents for fulfilling client requirements urgently.",
    features: ["Live Chat Support", "Real-time Assistance", "Website Integration", "Instant Response"],
    color: "indigo",
    gradient: "from-indigo-500 to-indigo-700",
  },
  {
    id: "healthcare",
    title: "US HEALTH CARE",
    icon: Heart,
    description:
      "We are capable of handling various healthcare related services like appointment scheduling with management of account receivable, claims processing & EOB.",
    features: ["Appointment Scheduling", "Claims Processing", "Account Management", "EOB Handling"],
    color: "red",
    gradient: "from-red-500 to-red-700",
  },
]

const stats = [
  { icon: Users, number: "500+", label: "Satisfied Clients", targetValue: 500, suffix: "+" },
  { icon: Clock, number: "24/7", label: "Support Available", targetValue: 24, suffix: "/7" },
  { icon: Globe, number: "15+", label: "Languages Supported", targetValue: 15, suffix: "+" },
  { icon: CheckCircle, number: "99.9%", label: "Service Uptime", targetValue: 99.9, suffix: "%" },
]

// Simple and reliable CountUp hook
function useCountUp(target: number, duration = 2000, shouldStart = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldStart) return

    const startTime = Date.now()
    const endTime = startTime + duration

    const timer = setInterval(() => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)

      // Easing function
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const currentValue = target * easeProgress

      setCount(currentValue)

      if (progress >= 1) {
        clearInterval(timer)
        setCount(target) // Ensure we end at exact target
      }
    }, 16) // ~60fps

    return () => clearInterval(timer)
  }, [target, duration, shouldStart])

  return count
}

// Updated CountUp component
function CountUp({ target, suffix, shouldStart }: { target: number; suffix: string; shouldStart: boolean }) {
  const count = useCountUp(target, 2000, shouldStart)

  const formatNumber = (num: number) => {
    if (suffix === "%") {
      return num.toFixed(1)
    }
    return Math.floor(num).toString()
  }

  return (
    <span className="text-3xl lg:text-4xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
      {formatNumber(count)}
      {suffix}
    </span>
  )
}
const url = `${process.env.NEXT_PUBLIC_BASE_URL}/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}/environments/master/entries?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&content_type=aboutSection`;

export default function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const [windowWidth, setWindowWidth] = useState(0)
  const [data, setData] = useState<ContentfulResponse | null>(null);

  interface ContentfulEntry {
    fields: {
      heading?: string;
      [key: string]: any;
    };
  }
  
  interface ContentfulResponse {
    items: ContentfulEntry[];
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url); // Replace with your API URL
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();
        setData(json);

        // ✅ Safe log
      if (json?.items?.length > 0) {
        console.log(json);
      }
      } catch (err) {
        console.error("API fetch error:", err);
      } finally {
      }
    }

    fetchData();
  }, []);

useEffect(() => {
  // Set initial window width after mount
  const handleResize = () => setWindowWidth(window.innerWidth)
  handleResize()

  window.addEventListener("resize", handleResize)
  return () => window.removeEventListener("resize", handleResize)
}, [])


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

  // Observer for stats section - change threshold to 0.1
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsVisible) {
          setStatsVisible(true)
        }
      },
      { threshold: 0.1 }, // Changed from 0.3 to 0.1
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [statsVisible]) // Added statsVisible as dependency

  useEffect(() => {
    if (!isAutoPlaying || isPaused) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const maxSlides = Math.ceil(services.length / 3)
        return (prev + 1) % maxSlides
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isPaused])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const maxSlides = Math.ceil(services.length / 3)
      return (prev + 1) % maxSlides
    })
    setIsAutoPlaying(false)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const maxSlides = Math.ceil(services.length / 3)
      return (prev - 1 + maxSlides) % maxSlides
    })
    setIsAutoPlaying(false)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }, [])

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
    setIsPaused(!isPaused)
  }

 

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-green-500 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <Badge className="mb-4 px-4 py-2 text-sm font-medium">WHAT WE OFFER</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-blue-600 mb-6">{data?.items?.[0]?.fields?.serviceTitle}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {data?.items?.[0]?.fields?.serviceDescription}
          </p>
        </div>

        {/* Services Carousel */}
        <div className={`relative mb-16 ${isVisible ? "animate-fade-in-delay" : "opacity-0"}`}>
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-2xl">
            <div
              ref={carouselRef}
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (windowWidth < 768 ? 100 : window.innerWidth < 1024 ? 50 : 100 / 3)}%)`,
              }}
            >
              {data?.items?.[0]?.fields?.services.map((service:any, index:any) => {
                const ServiceIcon = iconMap[service.icon]
                return(
                <div key={service.id} className="w-full  md:w-1/2 lg:w-1/3 flex-shrink-0 px-2">
                  <Card
                    className="h-full hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm border-0  overflow-hidden hover:-translate-y-4"
                    onMouseEnter={() => setActiveFeature(service.id)}
                    onMouseLeave={() => setActiveFeature(null)}
                  >
                    {/* Gradient Header */}
                    <div className={`bg-gradient-to-r ${service.gradient} p-8 text-white relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                            <ServiceIcon className="h-12 w-12 text-white" />
                          </div>
                          <div className="text-right">
                            <div className="text-sm opacity-80">Service #{index + 1}</div>
                            <div className="text-2xl font-bold">{service.title}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-8">
                      <div className="grid  gap-8">
                        {/* Features */}
                        <div>
                          <h3 className={`text-xl font-bold text-gray-900 mb-4 `}>Key Features</h3>
                          <div className="space-y-3">
                            {service.features.map((feature:any, featureIndex:number) => (
                              <div
                                key={featureIndex}
                                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700 font-medium">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Description on hover */}
                        <div
                          className={`space-y-2 mb-6 transition-all duration-300 ${
                            activeFeature === service.id ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden"
                          }`}
                        >
                          <h3 className="text-xl font-bold text-gray-900 mb-4">Service Overview</h3>
                          <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                        </div>
                        <Button className={`bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white`}>
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
)})}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Previous/Next Buttons */}
            <div className="flex space-x-4">
              <Button onClick={prevSlide} className="bg-white shadow-lg hover:shadow-xl border-0">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button onClick={nextSlide} className="bg-white shadow-lg hover:shadow-xl border-0">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(services.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? `bg-gradient-to-r ${services[currentSlide].gradient} w-8`
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>

            {/* Auto-play Control */}
            <Button onClick={toggleAutoPlay} className="bg-white shadow-lg hover:shadow-xl border-0">
              {isAutoPlaying && !isPaused ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 bg-gray-200 rounded-full h-1 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${services[currentSlide].gradient} transition-all duration-300`}
              style={{ width: `${((currentSlide + 1) / Math.ceil(services.length / 3)) * 100}%` }}
            />
          </div>
        </div>

        {/* Stats Section with CountUp Effect */}
        <div ref={statsRef} className={`mb-16 ${isVisible ? "animate-fade-in-delay-2" : "opacity-0"}`}>
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{data?.items?.[0]?.fields?.serviceStatTitle}</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
              {data?.items?.[0]?.fields?.serviceStatDescription}
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {data?.items?.[0]?.fields?.serviceStats.map((stat:any, index:any) => {
                const StatIcon = iconMap[stat.icon]
                return(
                  <div key={index} className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <StatIcon className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="mb-2">
                    <CountUp target={stat.targetValue} suffix={stat.suffix} shouldStart={statsVisible} />
                  </div>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
                )
               
                })}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center ${isVisible ? "animate-fade-in-delay-3" : "opacity-0"}`}>
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 lg:p-12 text-white">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">{data?.items?.[0]?.fields?.servicectaTitle}</h3>
              <p className="text-lg mb-8 text-blue-100">
              {data?.items?.[0]?.fields?.servicectaDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8">{data?.items?.[0]?.fields?.ctaBtn1}</Button>
                <Button className="border-white text-white hover:bg-white border-2 hover:text-blue-600 px-8">
                {data?.items?.[0]?.fields?.ctaBtn2}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
