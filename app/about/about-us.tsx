"use client"

import React, { useState, useEffect, useRef } from "react"
import Header from "@/components/header"
const iconMap: { [key: string]: React.ElementType } = {
  Building2,
  Globe,
  Headphones,
  MapPin,
  Phone,
  Shield,
  Target,
  Users,
  Zap,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
}

import {
  Building2,
  Globe,
  Headphones,
  MapPin,
  Phone,
  Shield,
  Target,
  Users,
  Zap,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Footer from "@/components/footer"

function ServiceCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [data, setData] = useState<ContentfulResponse | null>(null);

  interface ServiceType {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    color: string;
    features: string[];
    channels?: string[];
    languages?: string;
    gradient: string;
    benefits?: string[];
    technology?: string[];
    deployment?: string[];
    specializations?: string[];
  }
  

  interface ContentfulEntry {
    fields: {
      heading?: string;
      services?: ServiceType[];
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

  const services = [
    {
      id: "inbound",
      title: "InBound Services",
      subtitle: "Multi-Language Support",
      description:
        "Customer support functionality is the key for various verticals like Customer Service, customer complaint resolution, Travel customer help desk, retailer/vendor help desk, HR Support & IT Support.",
      icon: Phone,
      color: "green",
      features: [
        "Customer Service & Complaint Resolution",
        "Travel Customer Help Desk",
        "Retailer/Vendor Help Desk",
        "HR Support & IT Support",
      ],
      channels: ["Voice", "Email", "Chat"],
      languages: "English, Hindi, Marathi & Regional Languages",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      id: "outbound",
      title: "OutBound Services",
      subtitle: "Global Market Reach",
      description:
        "Excellent customer service can be the biggest differentiator in the manner in which business is driven in the global market place. The choice of a perfect telemarketing partner can yield desired results.",
      icon: Headphones,
      color: "blue",
      features: [
        "Direct Telemarketing Campaigns",
        "Lead Generation & Qualification",
        "Upsell/Cross-sell Campaigns",
        "Appointment Scheduling",
      ],
      benefits: ["Market Differentiation", "Global Marketplace Reach", "Desired Business Results"],
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      id: "email",
      title: "E-mail Services",
      subtitle: "Lightning Speed",
      description:
        "We respond at lightning speeds to client enquiries, sales requests or service requests. Our associates respond using our latest email management software using ACD technology.",
      icon: Zap,
      color: "purple",
      features: [
        "Client Enquiry Management",
        "Sales Request Processing",
        "Service Request Handling",
        "ACD Technology Integration",
      ],
      technology: ["Latest Email Management Software", "ACD Technology", "Lightning Speed Response Times"],
      gradient: "from-purple-500 to-violet-600",
    },
    {
      id: "chat",
      title: "Chat Services",
      subtitle: "Proactive Support",
      description:
        "We deploy proactive chat services on client websites as well as our website for prospective clients and valued clients to interact and chat with our agents for fulfilling client requirements urgently.",
      icon: Users,
      color: "orange",
      features: [
        "Website Chat Integration",
        "Proactive Customer Engagement",
        "Real-time Agent Interaction",
        "Urgent Requirement Fulfillment",
      ],
      deployment: ["Client Website Integration", "Our Website Chat Support", "Multi-platform Compatibility"],
      gradient: "from-orange-500 to-amber-600",
    },
    {
      id: "healthcare",
      title: "US Health Care",
      subtitle: "Specialized Domain",
      description:
        "We are capable of handling various healthcare projects in the healthcare domain starting with management of account receivable, claims processing & RCM.",
      icon: Shield,
      color: "red",
      features: [
        "Account Receivable Management",
        "Claims Processing",
        "Revenue Cycle Management (RCM)",
        "Healthcare Domain Expertise",
      ],
      specializations: [
        "Medical Billing & Coding",
        "Insurance Verification",
        "Patient Data Management",
        "Compliance & HIPAA Standards",
      ],
      gradient: "from-red-500 to-rose-600",
    },
  ]

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}/environments/master/entries?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&content_type=aboutPage`;


  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay && !isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % services.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlay, isPaused, services.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay)
  }

  const currentService = services[currentSlide]
  const IconComponent = currentService.icon

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-full">
      
      {/* Carousel Header with Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 lg:p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">Service Portfolio</h3>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs sm:text-sm">
            {currentSlide + 1} of {services.length}
          </Badge>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAutoPlay}
            className="flex items-center gap-2 flex-1 sm:flex-none text-xs sm:text-sm"
          >
            {isAutoPlay ? <Pause className="w-3 h-3 sm:w-4 sm:h-4" /> : <Play className="w-3 h-3 sm:w-4 sm:h-4" />}
            <span className="hidden sm:inline">{isAutoPlay ? "Pause" : "Play"}</span>
          </Button>

          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" onClick={prevSlide} className="p-2">
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={nextSlide} className="p-2">
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Carousel Content */}
      <div
        className="relative overflow-hidden"
        style={{ minHeight: "50vh" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {data?.items?.[0]?.fields?.services?.map((service:ServiceType, index:number) => {
            const ServiceIcon = iconMap[service.icon]
            
            return (
              <div key={service.id} className="w-full flex-shrink-0">
                
                <div className="flex flex-col lg:flex-row min-h-full">
                  {/* Service Info */}
                  <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 flex flex-col justify-center bg-white order-2 lg:order-1">
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                        <div
                          className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${service.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
                        >
                          <ServiceIcon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">{service.title}</h3>
                          <Badge
                            variant="secondary"
                            className={`mt-1 bg-${service.color}-50 text-${service.color}-700 text-xs sm:text-sm`}
                          >
                            {service.subtitle}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg">
                        {service.description}
                      </p>

                      <div className="space-y-3 sm:space-y-4">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Key Features:</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {service.features.map((feature:any, idx:number) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className={`w-2 h-2 bg-${service.color}-500 rounded-full mt-2 flex-shrink-0`}></div>
                              <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {service.channels && (
                        <div className={`bg-${service.color}-50 p-3 sm:p-4 rounded-lg`}>
                          <p className={`text-xs text-${service.color}-700 font-medium mb-2`}>Channels Supported:</p>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {service.channels.map((channel:any, idx:number) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {channel}
                              </Badge>
                            ))}
                          </div>
                          {service.languages && (
                            <p className={`text-xs text-${service.color}-600 mt-2 leading-relaxed`}>
                              Languages: {service.languages}
                            </p>
                          )}
                        </div>
                      )}

                      {service.benefits && (
                        <div className={`bg-${service.color}-50 p-3 sm:p-4 rounded-lg`}>
                          <p className={`text-xs text-${service.color}-700 font-medium mb-2`}>Key Benefits:</p>
                          <ul className={`text-xs text-${service.color}-600 space-y-1`}>
                            {service.benefits.map((benefit:any, idx:number) => (
                              <li key={idx} className="leading-relaxed">
                                • {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {service.technology && (
                        <div className={`bg-${service.color}-50 p-3 sm:p-4 rounded-lg`}>
                          <p className={`text-xs text-${service.color}-700 font-medium mb-2`}>Technology Features:</p>
                          <ul className={`text-xs text-${service.color}-600 space-y-1`}>
                            {service.technology.map((tech:any, idx:number) => (
                              <li key={idx} className="leading-relaxed">
                                • {tech}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {service.deployment && (
                        <div className={`bg-${service.color}-50 p-3 sm:p-4 rounded-lg`}>
                          <p className={`text-xs text-${service.color}-700 font-medium mb-2`}>Deployment Options:</p>
                          <ul className={`text-xs text-${service.color}-600 space-y-1`}>
                            {service.deployment.map((option:any, idx:number) => (
                              <li key={idx} className="leading-relaxed">
                                • {option}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {service.specializations && (
                        <div className={`bg-${service.color}-50 p-3 sm:p-4 rounded-lg`}>
                          <p className={`text-xs text-${service.color}-700 font-medium mb-2`}>
                            Healthcare Specializations:
                          </p>
                          <ul className={`text-xs text-${service.color}-600 space-y-1`}>
                            {service.specializations.map((spec:any, idx:number) => (
                              <li key={idx} className="leading-relaxed">
                                • {spec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Service Action Button */}
                      <div className="pt-3 sm:pt-4 border-t border-gray-200">
                        <Button
                          className={`w-full bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white shadow-lg text-sm sm:text-base`}
                          onClick={() => {
                            window.location.href = `/services/${service.id}`
                          }}
                        >
                          <span className="truncate">Learn More About {service.title}</span>
                          <ChevronRight className="w-4 h-4 ml-2 flex-shrink-0" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Visual Side */}
                  <div
                    className={`w-full lg:w-1/2 bg-gradient-to-br ${service.gradient} flex items-center justify-center relative overflow-hidden order-1 lg:order-2`}
                    style={{ minHeight: "30vh" }}
                  >
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10 text-center text-white p-4 sm:p-6">
                      <ServiceIcon className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto mb-4 sm:mb-6 opacity-80" />
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">{service.title}</h3>
                      <p className="text-base sm:text-lg lg:text-xl opacity-90">{service.subtitle}</p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-10 lg:right-10 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/10 rounded-full"></div>
                    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-10 lg:left-10 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-white/10 rounded-full"></div>
                    <div className="absolute top-1/2 left-4 sm:left-6 lg:left-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/10 rounded-full"></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="flex items-center justify-center gap-2 p-4 sm:p-6 bg-gray-50">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? `bg-gradient-to-r ${services[currentSlide].gradient} shadow-lg`
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
        <div
          className={`h-full bg-gradient-to-r ${services[currentSlide].gradient} transition-all duration-300`}
          style={{ width: `${((currentSlide + 1) / services.length) * 100}%` }}
        />
      </div>
    </div>
  )
}

function AnimatedCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardCount = 6;
  const cardWidth = 304; // 300px card + 2*2px padding
  const intervalMs = 3000;
  const [index, setIndex] = useState(0);

  // Auto-scroll to the next card
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % (cardCount - 2)); // Only scroll to positions where 3 cards are visible
    }, intervalMs);
    return () => clearInterval(id);
  }, [cardCount]);

  // Scroll to the current card (horizontal only)
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;   
    carousel.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  }, [index]);

  return (
    <>
      <div
        className="overflow-x-auto hide-scrollbar scrollbar-none"
        style={{
          maxWidth: `${cardWidth * 3}px`, // Show 3 cards at a time
          margin: "0 auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",        // Firefox (inline fallback)
          msOverflowStyle: "none",       // IE 10+ (inline fallback)
          overflowY: "hidden",           // Prevent vertical scrollbar
        }}
        ref={carouselRef}
      >
        <div className="flex" style={{ width: `${cardCount * cardWidth}px` }}>
          {/* Each card: 300px wide, 3 visible at a time */}
          <div className="min-w-[300px] max-w-[300px] flex-shrink-0 snap-center px-2">
            <Card className="h-full shadow-xl transition-all hover:scale-105">
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-responsive-lg sm:text-responsive-xl break-words">
                        Mumbai (Head Office)
                      </CardTitle>
                      <Badge variant="secondary" className="mt-1 text-responsive-xs sm:text-responsive-sm">
                        Head Office
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-responsive-xs sm:text-responsive-sm text-gray-600 leading-relaxed">
                  <p className="font-medium">DBS House, EL-73, Electronic Zone,</p>
                  <p>TTC MIDC, Mahape, Navi Mumbai-400 710,</p>
                  <p>Maharashtra, India</p>
                </div>
                <div className="flex items-center justify-between text-responsive-xs sm:text-responsive-sm">
                  <div>
                    <span className="font-semibold text-gray-900">12,000</span>
                    <span className="text-gray-600"> Sq Ft</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">3</span>
                    <span className="text-gray-600"> Floors</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-responsive-xs sm:text-responsive-sm"
                  onClick={() =>
                    window.open(
                      "https://maps.google.com/?q=DBS+House+EL-73+Electronic+Zone+TTC+MIDC+Mahape+Navi+Mumbai+400710",
                      "_blank",
                    )
                  }
                >
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">View on Google Maps</span>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="min-w-[300px] max-w-[300px] flex-shrink-0 snap-center px-2">
            <Card className="h-full transition-all hover:scale-105">
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-responsive-lg sm:text-responsive-xl break-words">
                        Baner, Pune
                      </CardTitle>
                      <Badge variant="outline" className="mt-1 text-responsive-xs sm:text-responsive-sm">
                        Modern Facility
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-responsive-xs sm:text-responsive-sm text-gray-600 leading-relaxed">
                  <p className="font-medium">4th Floor, Anjani Palladium</p>
                  <p>Next to Prabhavee Tech Park, Baner,</p>
                  <p>Pune, Maharashtra 411045</p>
                </div>
                <div className="flex items-center justify-between text-responsive-xs sm:text-responsive-sm">
                  <div>
                    <span className="font-semibold text-gray-900">10,000</span>
                    <span className="text-gray-600"> Sq Ft</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Latest</span>
                    <span className="text-gray-600"> Tech</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-responsive-xs lg:mt-12 sm:text-responsive-sm"
                  onClick={() =>
                    window.open(
                      "https://maps.google.com/?q=Anjani+Palladium+Prabhavee+Tech+Park+Baner+Pune+Maharashtra+411045",
                      "_blank",
                    )
                  }
                >
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">View on Google Maps</span>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="min-w-[300px] max-w-[300px] flex-shrink-0 snap-center px-2">
            <Card className="h-full transition-all hover:scale-105">
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-responsive-lg sm:text-responsive-xl break-words">
                        Kothrud, Pune
                      </CardTitle>
                      <Badge variant="outline" className="mt-1 text-responsive-xs sm:text-responsive-sm">
                        IT Park
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-responsive-xs sm:text-responsive-sm text-gray-600 leading-relaxed">
                  <p className="font-medium">3rd Floor, B Wing, Lohia Jain IT Park,</p>
                  <p>Kothrud, PUNE-411-038, Chandni Chowk,</p>
                  <p>Maharashtra, India</p>
                </div>
                <div className="flex items-center justify-between text-responsive-xs sm:text-responsive-sm">
                  <div>
                    <span className="font-semibold text-gray-900">12,000</span>
                    <span className="text-gray-600"> Sq Ft</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Premium</span>
                    <span className="text-gray-600"> Location</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-responsive-xs lg:mt-5 sm:text-responsive-sm"
                  onClick={() =>
                    window.open(
                      "https://maps.google.com/?q=Lohia+Jain+IT+Park+Kothrud+Pune+411038+Maharashtra",
                      "_blank",
                    )
                  }
                >
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">View on Google Maps</span>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="min-w-[300px] max-w-[300px] flex-shrink-0 snap-center px-2">
            <Card className="h-full transition-all hover:scale-105">
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-responsive-lg sm:text-responsive-xl break-words">
                        Kolkata Office
                      </CardTitle>
                      <Badge variant="outline" className="mt-1 text-responsive-xs sm:text-responsive-sm">
                        Business District
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-responsive-xs sm:text-responsive-sm text-gray-600 leading-relaxed">
                  <p className="font-medium">Suit# 10F, 32, Chowringhee Road,</p>
                  <p>Om Tower, 7th Floor, Unit#706, Park Street,</p>
                  <p>Kolkata- 700 071</p>
                </div>
                <div className="flex items-center justify-between text-responsive-xs sm:text-responsive-sm">
                  <div>
                    <span className="font-semibold text-gray-900">Premium</span>
                    <span className="text-gray-600"> Office</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Central</span>
                    <span className="text-gray-600"> Location</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-responsive-xs sm:text-responsive-sm"
                  onClick={() =>
                    window.open(
                      "https://maps.google.com/?q=Om+Tower+32+Chowringhee+Road+Park+Street+Kolkata+700071",
                      "_blank",
                    )
                  }
                >
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">View on Google Maps</span>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="min-w-[300px] max-w-[300px] flex-shrink-0 snap-center px-2">
            <Card className="h-full transition-all hover:scale-105">
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-responsive-lg sm:text-responsive-xl break-words">
                        Navi Mumbai
                      </CardTitle>
                      <Badge variant="outline" className="mt-1 text-responsive-xs sm:text-responsive-sm">
                        Modern Facility
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-responsive-xs sm:text-responsive-sm text-gray-600 leading-relaxed">
                  <p className="font-medium">6, Neelkanth CHS Limited,</p>
                  <p>Sector 3, Ghansoli, opp. Ghansoli Rly Station,</p>
                  <p> Navi Mumbai, Maharashtra 400701</p>
                </div>
                <div className="flex items-center justify-between text-responsive-xs sm:text-responsive-sm">
                  <div>
                    <span className="font-semibold text-gray-900">10,000</span>
                    <span className="text-gray-600"> Sq Ft</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Latest</span>
                    <span className="text-gray-600"> Tech</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-responsive-xs lg:mt-12 sm:text-responsive-sm"
                  onClick={() =>
                    window.open(
                      "https://www.google.com/maps/place/DBS+Mintek+Pvt.Ltd.+Ghansoli/@19.1144607,73.0054354,17z/data=!4m6!3m5!1s0x3be7c0c607fb3bef:0x46bf6691e00d6827!8m2!3d19.1145117!4d73.0056129!16s%2Fg%2F11c0xrytb7?entry=ttu&g_ep=EgoyMDI1MDYyMy4yIKXMDSoASAFQAw%3D%3D",
                      "_blank",
                    )
                  }
                >
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">View on Google Maps</span>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="min-w-[300px] max-w-[300px] flex-shrink-0 snap-center px-2">
            <Card className="h-full transition-all hover:scale-105">
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-responsive-lg sm:text-responsive-xl break-words">
                        Arihant Aura, Thane
                      </CardTitle>
                      <Badge variant="outline" className="mt-1 text-responsive-xs sm:text-responsive-sm">
                        Modern Facility
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-responsive-xs sm:text-responsive-sm text-gray-600 leading-relaxed">
                  <p className="font-medium">Belapur Rd,</p>
                  <p>Turbhe MIDC, Turbhe,</p>
                  <p>Navi Mumbai, Maharashtra 400705</p>
                </div>
                <div className="flex items-center justify-between text-responsive-xs sm:text-responsive-sm">
                  <div>
                    <span className="font-semibold text-gray-900">10,000</span>
                    <span className="text-gray-600"> Sq Ft</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Latest</span>
                    <span className="text-gray-600"> Tech</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-responsive-xs lg:mt-12 sm:text-responsive-sm"
                  onClick={() =>
                    window.open(
                      "https://maps.google.com/?q=Anjani+Palladium+Prabhavee+Tech+Park+Baner+Pune+Maharashtra+411045",
                      "_blank",
                    )
                  }
                >
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">View on Google Maps</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* Dot navigation */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: cardCount - 2 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index
                ? "bg-blue-600"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}

const url = `${process.env.NEXT_PUBLIC_BASE_URL}/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}/environments/master/entries?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&content_type=aboutPage`;

console.log(url)
export default function AboutUs() {
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full  overflow-x-hidden">
      <Header/>
      
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 xl:py-24 px-4 text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white w-full">
        <div className="container-responsive">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30 text-xs sm:text-sm">
            Established 2008
          </Badge>
          <h1 className="text-responsive-3xl text-5xl sm:text-responsive-4xl lg:text-responsive-5xl font-bold mb-4 sm:mb-6 leading-tight">
          {data?.items?.[0]?.fields?.companyName}
          </h1>
          <p className="text-responsive-base discription sm:text-responsive-lg lg:text-responsive-xl mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed">
          {data?.items?.[0]?.fields?.herodescription}
            
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-2 bg-white/20 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>{data?.items?.[0]?.fields?.highlightStats?.[0]?.label}</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/20 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>{data?.items?.[0]?.fields?.highlightStats?.[1]?.label}</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/20 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>{data?.items?.[0]?.fields?.highlightStats?.[2]?.label}</span>
            </div>
          </div>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8"
          >
            Request A Call Today
          </Button>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-12 sm:py-16  lg:pl-56 sm:pl-32 xl:py-24 px-4 p w-5/6" id="about">
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-responsive-2xl text-2xl  sm:text-3xl lg:text-4xl sm:text-responsive-3xl font-bold text-gray-900 mb-4">
              About Our Company
            </h2>
            <p className="text-responsive-base text-lg lg:text-xl sm:text-responsive-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Incorporated in 2008 as a Private Limited Company, DBS MINTEK has grown to become a trusted partner for
              businesses seeking reliable call center solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 align-items-center lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-6 shadow-xl p-5 rounded-xl ">
              <h3 className="text-responsive-xl sm:text-responsive-2xl  lg:text-2xl  font-semibold text-gray-900">Our Story</h3>
              <p className="text-gray-600 text-responsive-sm discription sm:text-responsive-base leading-relaxed">
              {data?.items?.[0]?.fields?.ourStory} 
              </p>
              <p className="text-gray-600 text-responsive-sm discription sm:text-responsive-base leading-relaxed">
                We are scaling up by another 200 workstations in the short term, demonstrating our commitment to growth
                and meeting increasing client demands.
              </p>
              <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1  gap-4">
                <div className="text-center p-3 sm:p-4 bg-white rounded-lg">
                  <div className="text-responsive-xl sm:text-responsive-2xl font-bold text-blue-600">1200+</div>
                  <div className="text-responsive-xs sm:text-responsive-sm text-gray-600">Active Workstations</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-indigo-50 rounded-lg">
                  <div className="text-responsive-xl sm:text-responsive-2xl font-bold text-indigo-600">34,000+</div>
                  <div className="text-responsive-xs sm:text-responsive-sm text-gray-600">Sq Ft Total Area</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
              <div className="aspect-responsive bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12  sm:py-16 lg:py-20 xl:py-24 px-4 lg:px-40 bg-white w-full">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-2   gap-6 sm:gap-8">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
                  <CardTitle className="text-responsive-xl sm:text-responsive-2xl">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-responsive-sm sm:text-responsive-base">
                {data?.items?.[0]?.fields?.ourMission}
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-indigo-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 flex-shrink-0" />
                  <CardTitle className="text-responsive-xl sm:text-responsive-2xl">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-responsive-sm sm:text-responsive-base">
                {data?.items?.[0]?.fields?.ourVision}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 lg:px-40 md:px-36 px-4 bg-gray-50 w-full" id="services">
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-responsive-2xl sm:text-responsive-3xl font-bold lg:text-4xl md:text-3xl sm:text-2xl text-gray-900 mb-4">Our Services</h2>
            <p className="text-responsive-base sm:text-responsive-lg text-gray-600 lg:text-xl text-md leading-relaxed">
              Comprehensive solutions across multiple domains and languages
            </p>
          </div>

          {/* Advanced Services Carousel */}
          <div className="relative w-full rounded-xl">
            <ServiceCarousel />
          </div>
        </div>
      </section>

      {/* Infrastructure & Technology */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 px-4 lg:px-36 md:px-36 bg-white w-full">
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-responsive-2xl sm:text-responsive-3xl text-2xl   sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              State-of-the-Art Infrastructure
            </h2>
            <p className="text-responsive-base sm:text-responsive-lg text-lg lg:text-xl text-gray-600 leading-relaxed">
              Premium technology and infrastructure ensuring seamless operations
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:px-20 gap-5">
            <Card className="h-full">
              <CardHeader>
                <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 mb-2" />
                <CardTitle className="text-responsive-sm sm:text-responsive-xl">{data?.items?.[0]?.fields?.infrastructure[0].title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-responsive-xs sm:text-responsive-sm text-gray-600 space-y-1 leading-relaxed">
                  <li>• {data?.items?.[0]?.fields?.infrastructure[0].features[0]}</li>
                  <li>• {data?.items?.[0]?.fields?.infrastructure[0].features[1]}</li>
                  <li>• {data?.items?.[0]?.fields?.infrastructure[0].features[2]}</li>
                  <li>• {data?.items?.[0]?.fields?.infrastructure[0].features[3]}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <Phone className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 mb-2" />
                <CardTitle className="text-responsive-lg sm:text-responsive-xl">{data?.items?.[0]?.fields?.infrastructure[1].title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-responsive-xs sm:text-responsive-sm text-gray-600 space-y-1 leading-relaxed">
                  <li>• {data?.items?.[0]?.fields?.infrastructure[1].features[0]}</li>
                  <li>• {data?.items?.[0]?.fields?.infrastructure[1].features[1]}</li>
                  <li>• {data?.items?.[0]?.fields?.infrastructure[1].features[2]}</li>
                  <li>• {data?.items?.[0]?.fields?.infrastructure[1].features[3]}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mb-2" />
                <CardTitle className="text-responsive-lg sm:text-responsive-xl">{data?.items?.[0]?.fields?.infrastructure[2].title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-responsive-xs sm:text-responsive-sm text-gray-600 space-y-1 leading-relaxed">
                  <li>• {data?.items?.[0]?.fields?.infrastructure[2].features[0]}</li>
                  <li>• {data?.items?.[0]?.fields?.infrastructure[2].features[1]}</li>
                  <li>• {data?.items?.[0]?.fields?.infrastructure[2].features[2]}</li>
                  <li>• {data?.items?.[0]?.fields?.infrastructure[2].features[3]}</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 px-20 lg:px-40 md:px-36  bg-gray-50 w-full" id="locations">
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-responsive-2xl sm:text-responsive-3xl  text-2xl  sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Locations</h2>
            <p className="text-responsive-base sm:text-responsive-lg lg:text-xl text-gray-600 leading-relaxed">
              Strategically located across major business hubs in India
            </p>
          </div>

          {/* Carousel for Locations */}
          {/* Animated Carousel with no visible scrollbar */}
          <div className="relative">
            {/* Carousel Wrapper */}
            <AnimatedCarousel />
          </div>

          {/* Interactive Map Section */}
          <div className="mt-8 sm:mt-12 ">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-responsive-xl sm:text-responsive-2xl">Find Us on the Map</CardTitle>
                <CardDescription className="text-responsive-sm sm:text-responsive-base">
                  Click on any location above to view detailed directions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="text-center p-3 sm:p-4 bg-red-50 rounded-lg shadow-xl">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 mx-auto mb-2 " />
                    <div className="font-semibold text-responsive-xs sm:text-responsive-sm">Mumbai</div>
                    <div className="text-responsive-xs text-gray-600">Head Office</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg shadow-xl">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold text-responsive-xs sm:text-responsive-sm">Baner</div>
                    <div className="text-responsive-xs text-gray-600">Tech Hub</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg shadow-xl">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mx-auto mb-2" />
                    <div className="font-semibold text-responsive-xs sm:text-responsive-sm">Kothrud</div>
                    <div className="text-responsive-xs text-gray-600">IT Park</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-lg shadow-xl">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 mx-auto mb-2" />
                    <div className="font-semibold text-responsive-xs sm:text-responsive-sm">Kolkata</div>
                    <div className="text-responsive-xs text-gray-600">Business Center</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 px-4 lg:px-40 md:px-36 bg-white w-full">
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-responsive-2xl sm:text-responsive-3xl  text-2xl  sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose DBS MINTEK?
            </h2>
            <p className="text-responsive-base sm:text-responsive-lg text-lg lg:text-xl text-gray-600 leading-relaxed">
              Experience the difference with our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center p-4 sm:p-6 ">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2 text-responsive-sm sm:text-responsive-base">Fast Ramp-up</h3>
              <p className="text-responsive-xs sm:text-responsive-sm text-gray-600 leading-relaxed">
                Quick deployment and scaling of new campaigns
              </p>
            </div>

            <div className="text-center p-4 sm:p-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2 text-responsive-sm sm:text-responsive-base">Quality Assurance</h3>
              <p className="text-responsive-xs sm:text-responsive-sm text-gray-600 leading-relaxed">
                Uncompromising quality in all operations
              </p>
            </div>

            <div className="text-center p-4 sm:p-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2 text-responsive-sm sm:text-responsive-base">Experienced Team</h3>
              <p className="text-responsive-xs sm:text-responsive-sm text-gray-600 leading-relaxed">
                Passionate professionals dedicated to excellence
              </p>
            </div>

            <div className="text-center p-4 sm:p-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2 text-responsive-sm sm:text-responsive-base">Global Reach</h3>
              <p className="text-responsive-xs sm:text-responsive-sm text-gray-600 leading-relaxed">
                Making your business global with our solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white w-full">
        <div className="container-responsive text-center">
          <h2 className="text-responsive-2xl sm:text-responsive-3xl  text-2xl  sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Our Culture & Values</h2>
          <p className="text-responsive-base sm:text-responsive-lg mb-6 text-lg lg:text-xl sm:mb-8 max-w-4xl mx-auto leading-relaxed">
            We encourage an open & creative workplace conducive to personal & professional growth for all of our
            employees. We believe in rewarding excellence & providing an environment that is both fun & challenging.
          </p>
          <div className="grid lg:grid-cols-3 gap-2 md:grid-cols-3 sm:grid-cols-1">
            <div className="bg-white/10 p-4 sm:p-6 rounded-lg">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4" />
              <h3 className="font-semibold mb-2 text-responsive-sm sm:text-responsive-base">{data?.items?.[0]?.fields?.culture[0].title}</h3>
              <p className="text-responsive-xs sm:text-responsive-sm opacity-90 leading-relaxed">
              {data?.items?.[0]?.fields?.culture[0].description}              </p>
            </div>
            <div className="bg-white/10 p-4 sm:p-6 rounded-lg">
              <Target className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4" />
              <h3 className="font-semibold mb-2 text-responsive-sm sm:text-responsive-base">{data?.items?.[0]?.fields?.culture[1].title}</h3>
              <p className="text-responsive-xs sm:text-responsive-sm opacity-90 leading-relaxed">
              {data?.items?.[0]?.fields?.culture[1].description}              </p>
            </div>
            <div className="bg-white/10 p-4 sm:p-6 rounded-lg">
              <Zap className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4" />
              <h3 className="font-semibold mb-2 text-responsive-sm sm:text-responsive-base">{data?.items?.[0]?.fields?.culture[2].title}</h3>
              <p className="text-responsive-xs sm:text-responsive-sm opacity-90 leading-relaxed">
              {data?.items?.[0]?.fields?.culture[0].description}              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 xl:py-24 px-4 bg-white w-full" id="contact">
        <div className="container-responsive text-center">
          <h2 className="text-responsive-2xl sm:text-responsive-3xl  text-2xl  sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Make Your Business Global
          </h2>
          <p className="text-responsive-base sm:text-responsive-lg text-lg lg:text-xl  text-gray-600 mb-6 sm:mb-8 leading-relaxed">
          {data?.items?.[0]?.fields?.contactCta}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-responsive-sm sm:text-responsive-base"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
              Request A Call Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50 w-full sm:w-auto text-responsive-sm sm:text-responsive-base"
            >
              Get Free Consultation
            </Button>
          </div>
          <div className="p-4 sm:p-6 bg-gray-50 rounded-lg">
            <p className="text-responsive-xs sm:text-responsive-sm text-gray-600 mb-2">Contact Information</p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 text-responsive-xs sm:text-responsive-sm">
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                <span>Mumbai • Pune • Kolkata</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                <span>24/7 Support Available</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                <span>International Services</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}
