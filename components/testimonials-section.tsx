
// "use client"

// import { useEffect, useRef, useState, useCallback } from "react"
// import Image from "next/image"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import {
//   ChevronLeft,
//   ChevronRight,
//   Star,
//   Quote,
//   Play,
//   Pause,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Building,
// } from "lucide-react"

// const styles = `
//   .perspective-1000 {
//     perspective: 1000px;
//   }
//     @media (min-width: 640px) {
//     .perspective-1000 {
//       perspective: 900px;
//     }
//   }
  
//   @media (min-width: 1024px) {
//     .perspective-1000 {
//       perspective: 1000px;
//     }
//   }
// `

// const testimonials = [
//   {
//     id: "idea-mumbai",
//     name: "Sr.Gen.Manager, Service Delivery",
//     company: "Idea Mumbai Circle",
//     location: "Mumbai, India",
//     image: "/placeholder.svg?height=80&width=80",
//     rating: 5,
//     testimonial:
//       "DBS runs entire Mumbai circle operations for us right from Inbound customer service, Inbound activations, Prepaid & Postpaid retentions, VAS upsell, Data upsell, backend communications for the past over 4 years now and have been doing it very efficiently, we have found their team to be very efficient, flexible & focussed. They have always delivered before time whenever it comes to any new launch. We wish them all the very best.",
//     socialIcon: Facebook,
//     industry: "Telecommunications",
//     partnership: "4+ Years",
//   },
//   {
//     id: "vodafone-mag",
//     name: "VP, Service Delivery",
//     company: "Vodafone, MAG Circle",
//     location: "Maharashtra & Goa, India",
//     image: "/placeholder.svg?height=80&width=80",
//     rating: 5,
//     testimonial:
//       "DBS successfully has completed their 5 years for Mah & Goa circle for Vodafone and are doing fantastic work on pre churn retention(CPM) cases as well as RHD, Retention Desk and they have a very dedicated team which give market VOC to us on regular intervals.We are proud of the team their Managing Director, Mr.Bibhash Jha has who have never let us down.",
//     socialIcon: Facebook,
//     industry: "Telecommunications",
//     partnership: "5+ Years",
//   },
//   {
//     id: "rtech-usa",
//     name: "President",
//     company: "Rtech Consultants, USA",
//     location: "United States",
//     image: "/placeholder.svg?height=80&width=80",
//     rating: 5,
//     testimonial:
//       "Our entire backend pension plan administration work has been fully automated by DBS and they are actively managing our secure data which contain SSN and financial data which are critical and very important from the client security point of view. They have continuously delivered on time and their performance has always exceeded our expectations. We have been doing business with them for over four years now.",
//     socialIcon: Twitter,
//     industry: "Financial Services",
//     partnership: "4+ Years",
//   },
//   {
//     id: "hdfc-bank",
//     name: "Operations Manager",
//     company: "HDFC Bank",
//     location: "Mumbai, India",
//     image: "/placeholder.svg?height=80&width=80",
//     rating: 5,
//     testimonial:
//       "DBS Mintek has been our trusted partner for customer service operations. Their professional approach, attention to detail, and commitment to quality has helped us maintain our high standards of customer satisfaction. The team is responsive, skilled, and always goes the extra mile.",
//     socialIcon: Linkedin,
//     industry: "Banking",
//     partnership: "3+ Years",
//   },
//   {
//     id: "bajaj-finance",
//     name: "Head of Customer Experience",
//     company: "Bajaj Auto Finance",
//     location: "Pune, India",
//     image: "/placeholder.svg?height=80&width=80",
//     rating: 5,
//     testimonial:
//       "Working with DBS Mintek has been a game-changer for our customer support operations. Their technology-driven approach and skilled workforce have significantly improved our customer satisfaction scores. We highly recommend their services to any organization looking for reliable call center solutions.",
//     socialIcon: Linkedin,
//     industry: "Financial Services",
//     partnership: "2+ Years",
//   },
// ]

// const stats = [
//   { number: "50+", label: "Happy Clients" },
//   { number: "98%", label: "Satisfaction Rate" },
//   { number: "500+", label: "Projects Completed" },
//   { number: "24/7", label: "Support Available" },
// ]

// // Custom hook for countup animation
// function useCountUp(end: number, duration = 2000, start = 0) {
//   const [count, setCount] = useState(start)
//   const [isAnimating, setIsAnimating] = useState(false)

//   const startAnimation = useCallback(() => {
//     if (isAnimating) return

//     setIsAnimating(true)
//     const startTime = Date.now()
//     const startValue = start

//     const animate = () => {
//       const now = Date.now()
//       const elapsed = now - startTime
//       const progress = Math.min(elapsed / duration, 1)

//       // Easing function for smooth animation
//       const easeOutQuart = 1 - Math.pow(1 - progress, 4)
//       const currentValue = startValue + (end - startValue) * easeOutQuart

//       setCount(Math.floor(currentValue))

//       if (progress < 1) {
//         requestAnimationFrame(animate)
//       } else {
//         setCount(end)
//         setIsAnimating(false)
//       }
//     }

//     requestAnimationFrame(animate)
//   }, [end, duration, start, isAnimating])

//   return { count, startAnimation, isAnimating }
// }

// // Component for animated stat numbers
// function AnimatedStat({ stat, isVisible }: { stat: (typeof stats)[0]; isVisible: boolean }) {
//   const [hasAnimated, setHasAnimated] = useState(false)

//   // Extract number from stat.number (handle 50+, 98%, 500+, 24/7)
//   const getNumericValue = (value: string) => {
//     if (value === "24/7") return 24
//     return Number.parseInt(value.replace(/[^0-9]/g, ""))
//   }

//   const numericValue = getNumericValue(stat.number)
//   const { count, startAnimation } = useCountUp(numericValue, 2500)

//   useEffect(() => {
//     if (isVisible && !hasAnimated) {
//       setHasAnimated(true)
//       // Add a small delay for staggered animation
//       const delay = Math.random() * 500
//       setTimeout(startAnimation, delay)
//     }
//   }, [isVisible, hasAnimated, startAnimation])

//   // Format the display value
//   const getDisplayValue = (currentCount: number, originalValue: string) => {
//     if (originalValue === "24/7") {
//       return currentCount >= 24 ? "24/7" : `${currentCount}/7`
//     }
//     if (originalValue.includes("+")) {
//       return `${currentCount}+`
//     }
//     if (originalValue.includes("%")) {
//       return `${currentCount}%`
//     }
//     return currentCount.toString()
//   }

//   return (
//     <div className="text-center group">
//       <div className="mb-2">
//         <span className="text-3xl lg:text-4xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
//           {hasAnimated ? getDisplayValue(count, stat.number) : "0"}
//         </span>
//       </div>
//       <p className="text-gray-600 font-medium">{stat.label}</p>
//     </div>
//   )
// }

// export default function TestimonialsSection() {
//   const [isVisible, setIsVisible] = useState(false)
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true)
//   const [isPaused, setIsPaused] = useState(false)
//   const sectionRef = useRef<HTMLElement>(null)
//   const [statsVisible, setStatsVisible] = useState(false)
//   const statsRef = useRef<HTMLDivElement>(null)


//   useEffect(() => {
//     const styleElement = document.createElement("style")
//     styleElement.textContent = styles
//     document.head.appendChild(styleElement)

//     return () => {
//       document.head.removeChild(styleElement)
//     }
//   }, [])

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true)
//         }
//       },
//       { threshold: 0.1 },
//     )

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current)
//     }

//     return () => observer.disconnect()
//   }, [])

//   // Stats section intersection observer
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setStatsVisible(true)
//         }
//       },
//       { threshold: 0.3 },
//     )

//     if (statsRef.current) {
//       observer.observe(statsRef.current)
//     }

//     return () => observer.disconnect()
//   }, [])

//   useEffect(() => {
//     if (!isAutoPlaying || isPaused) return

//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % testimonials.length)
//     }, 6000)

//     return () => clearInterval(interval)
//   }, [isAutoPlaying, isPaused])

//   const nextSlide = useCallback(() => {
//     setCurrentSlide((prev) => (prev + 1) % testimonials.length)
//     setIsAutoPlaying(false)
//   }, [])

//   const prevSlide = useCallback(() => {
//     setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
//     setIsAutoPlaying(false)
//   }, [])

//   const goToSlide = useCallback((index: number) => {
//     setCurrentSlide(index)
//     setIsAutoPlaying(false)
//   }, [])

//   const toggleAutoPlay = () => {
//     setIsAutoPlaying(!isAutoPlaying)
//     setIsPaused(!isPaused)
//   }

//   return (
//     <section
//       ref={sectionRef}
//       className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
//     >
//       {/* Background Elements */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 left-20 w-40 h-40 bg-green-500 rounded-full blur-3xl animate-pulse"></div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
//         {/* Header */}
//         <div className={`text-center mb-16 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
//           <Badge className="mb-4 px-4 py-2 text-sm font-medium">WHAT OUR CLIENTS SAY</Badge>
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-6">Our Testimonials</h2>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             Hear from our satisfied clients about their experience working with DBS Mintek and how we've helped
//             transform their business operations.
//           </p>
//         </div>

//         {/* Testimonials Carousel */}
//         <div className={`relative top-32 lg:left-36 md:top-28 md:left-48   ${isVisible ? "animate-fade-in-delay" : "opacity-0"}`}>
//           {/* Navigation Buttons */}
//           <Button
//             variant="outline"
//             size="icon"
//             className="absolute   sm:left-4  transform  top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl border-0"
//             onClick={prevSlide}
//           >
//             <ChevronLeft className="h-4 w-4" />
//           </Button>

//           <Button
//             variant="outline"
//             size="icon"
//             className="absolute lg:right-80 right-3 top-1/2  -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl border-0"
//             onClick={nextSlide}
//           >
//             <ChevronRight className="h-4 w-4" />
//           </Button>

//           {/* 3D Testimonials Slider */}
//           <div className="relative  min-h-[500px] sm:min-h-[500px] md:min-h-[500px] sm:left-40 lg:left-10 flex  items-center justify-center perspective-1000 px-4">
//             <div className="relative w-full max-w-6xl   mx-auto">
//               {testimonials.map((testimonial, index) => {
//                 const position = (index - currentSlide + testimonials.length) % testimonials.length
//                 const isCenter = position === 0
//                 const isLeft = position === testimonials.length - 1
//                 const isRight = position === 1
//                 const isVisible = isCenter || isLeft || isRight

//                 if (!isVisible) return null

//                 let transform = ""
//                 let zIndex = 1
//                 let opacity = 0.4
//                 let scale = 0.8

//                 const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

// if (isCenter) {
//   transform = "translateX(0) translateZ(0) rotateY(0deg)"
//   zIndex = 10
//   opacity = 1
//   scale = 1
// } else if (isLeft) {
//   transform = isMobile
//     ? "translateX(-100%) scale(0.9)"
//     : "translateX(-80%) translateZ(-200px) rotateY(25deg)"
//   zIndex = 5
//   opacity = 0.6
//   scale = 0.85
// } else if (isRight) {
//   transform = isMobile
//     ? "translateX(100%) scale(0.9)"
//     : "translateX(80%) translateZ(-200px) rotateY(-25deg)"
//   zIndex = 5
//   opacity = 0.6
//   scale = 0.85
// }

//                 // if (isCenter) {
//                 //   transform = "translateX(0) translateZ(0) rotateY(0deg)"
//                 //   zIndex = 10
//                 //   opacity = 1
//                 //   scale = 1
//                 // } else if (isLeft) {
//                 //   transform = "translateX(-80%) translateZ(-200px) rotateY(25deg)"
//                 //   zIndex = 5
//                 //   opacity = 0.6
//                 //   scale = 0.85
//                 // } else if (isRight) {
//                 //   transform = "translateX(80%) translateZ(-200px) rotateY(-25deg)"
//                 //   zIndex = 5
//                 //   opacity = 0.6
//                 //   scale = 0.85
//                 // }

//                 return (
//                   <div
//                     key={testimonial.id}
//                     className="absolute left-1/2 w-100 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out cursor-pointer"
//                     style={{
//                       transform: `translate(-50%, -50%) ${transform} scale(${scale})`,
//                       zIndex,
//                       opacity,
//                     }}
//                     onClick={() => !isCenter && goToSlide(index)}
//                   >
//                     <Card className=" w-full max-w-xs sm:max-w-sm md:max-w-md group hover:shadow-2xl transition-all duration-500 border-0 bg-white/95 backdrop-blur-sm">
//                       <CardContent className="p-8">
//                         {/* Quote Icon */}
//                         <div className="flex justify-between items-start mb-6">
//                           <Quote className="h-8 w-8 text-blue-600 opacity-50" />
//                           <div className="flex items-center space-x-1">
//                             <testimonial.socialIcon className="h-5 w-5 text-blue-600" />
//                           </div>
//                         </div>

//                         {/* Rating */}
//                         <div className="flex items-center space-x-1 mb-4">
//                           {[...Array(testimonial.rating)].map((_, i) => (
//                             <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                           ))}
//                         </div>

//                         {/* Testimonial Text */}
//                         <blockquote className="text-gray-600 leading-relaxed mb-6 text-sm line-clamp-4">
//                           "{testimonial.testimonial}"
//                         </blockquote>

//                         {/* Client Info */}
//                         <div className="flex items-center space-x-4">
//                           <div className="relative">
//                             <Image
//                               src={testimonial.image || "/placeholder.svg"}
//                               alt={testimonial.name}
//                               width={50}
//                               height={50}
//                               sizes="(max-width: 768px) 40px, 50px"
//                               className="rounded-full object-cover"
//                             />
//                             <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
//                               <Building className="h-2 w-2 text-white" />
//                             </div>
//                           </div>
//                           <div className="flex-1">
//                             <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
//                             <p className="text-xs text-blue-600 font-medium">{testimonial.company}</p>
//                             <p className="text-xs text-gray-500">{testimonial.location}</p>
//                           </div>
//                         </div>

//                         {/* Additional Info */}
//                         <div className="mt-4 pt-4 border-t border-gray-100">
//                           <div className="flex justify-between text-xs text-gray-500">
//                             <span className="bg-gray-100 px-2 py-1 rounded text-xs">{testimonial.industry}</span>
//                             <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
//                               {testimonial.partnership}
//                             </span>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>

//           {/* Controls */}
//           <div className="flex relative bottom-50 lg:right-40 items-center justify-center mt-6 space-x-4">
//             {/* Slide Indicators */}
//             <div className="flex space-x-2">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   className={`w-2 h-2 rounded-full transition-all duration-200 ${
//                     index === currentSlide ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400"
//                   }`}
//                   onClick={() => goToSlide(index)}
//                 />
//               ))}
//             </div>

//             {/* Auto-play Control */}
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={toggleAutoPlay}
//               className="bg-white shadow-lg hover:shadow-xl border-0 w-8 h-8"
//             >
//               {isAutoPlaying && !isPaused ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
//             </Button>
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div ref={statsRef} className={`mb-16 ${isVisible ? "animate-fade-in-delay-2" : "opacity-0"}`}>
//           <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
//             <div className="text-center mb-8">
//               <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Client Success Metrics</h3>
//               <p className="text-gray-600 max-w-2xl mx-auto">
//                 Our commitment to excellence is reflected in these key performance indicators
//               </p>
//             </div>

//             <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//               {stats.map((stat, index) => (
//                   <AnimatedStat key={index} stat={stat} isVisible={statsVisible} />
                
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Call to Action */}
//         <div className={`text-center ${isVisible ? "animate-fade-in-delay-3" : "opacity-0"}`}>
//           <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 lg:p-12 text-white">
//             <div className="max-w-3xl mx-auto">
//               <h3 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Join Our Success Stories?</h3>
//               <p className="text-lg mb-8 text-blue-100">
//                 Experience the same level of excellence that our clients rave about. Let's discuss how we can transform
//                 your customer service operations.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8">Start Your Journey</Button>
//                 <Button className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
//                   Read More Reviews
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }
"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Play,
  Pause,
  Facebook,
  Twitter,
  Linkedin,
  Building,
} from "lucide-react"

const styles = `
  .perspective-1000 {
    perspective: 1000px;
  }
    @media (min-width: 640px) {
    .perspective-1000 {
      perspective: 900px;
    }
  }
  
  @media (min-width: 1024px) {
    .perspective-1000 {
      perspective: 1000px;
    }
  }
`

const testimonials = [
  {
    id: "idea-mumbai",
    name: "Sr.Gen.Manager, Service Delivery",
    company: "Idea Mumbai Circle",
    location: "Mumbai, India",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    testimonial:
      "DBS runs entire Mumbai circle operations for us right from Inbound customer service, Inbound activations, Prepaid & Postpaid retentions, VAS upsell, Data upsell, backend communications for the past over 4 years now and have been doing it very efficiently, we have found their team to be very efficient, flexible & focussed. They have always delivered before time whenever it comes to any new launch. We wish them all the very best.",
    socialIcon: Facebook,
    industry: "Telecommunications",
    partnership: "4+ Years",
  },
  {
    id: "vodafone-mag",
    name: "VP, Service Delivery",
    company: "Vodafone, MAG Circle",
    location: "Maharashtra & Goa, India",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    testimonial:
      "DBS successfully has completed their 5 years for Mah & Goa circle for Vodafone and are doing fantastic work on pre churn retention(CPM) cases as well as RHD, Retention Desk and they have a very dedicated team which give market VOC to us on regular intervals.We are proud of the team their Managing Director, Mr.Bibhash Jha has who have never let us down.",
    socialIcon: Facebook,
    industry: "Telecommunications",
    partnership: "5+ Years",
  },
  {
    id: "rtech-usa",
    name: "President",
    company: "Rtech Consultants, USA",
    location: "United States",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    testimonial:
      "Our entire backend pension plan administration work has been fully automated by DBS and they are actively managing our secure data which contain SSN and financial data which are critical and very important from the client security point of view. They have continuously delivered on time and their performance has always exceeded our expectations. We have been doing business with them for over four years now.",
    socialIcon: Twitter,
    industry: "Financial Services",
    partnership: "4+ Years",
  },
  {
    id: "hdfc-bank",
    name: "Operations Manager",
    company: "HDFC Bank",
    location: "Mumbai, India",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    testimonial:
      "DBS Mintek has been our trusted partner for customer service operations. Their professional approach, attention to detail, and commitment to quality has helped us maintain our high standards of customer satisfaction. The team is responsive, skilled, and always goes the extra mile.",
    socialIcon: Linkedin,
    industry: "Banking",
    partnership: "3+ Years",
  },
  {
    id: "bajaj-finance",
    name: "Head of Customer Experience",
    company: "Bajaj Auto Finance",
    location: "Pune, India",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    testimonial:
      "Working with DBS Mintek has been a game-changer for our customer support operations. Their technology-driven approach and skilled workforce have significantly improved our customer satisfaction scores. We highly recommend their services to any organization looking for reliable call center solutions.",
    socialIcon: Linkedin,
    industry: "Financial Services",
    partnership: "2+ Years",
  },
]

const stats = [
  { number: "50+", label: "Happy Clients" },
  { number: "98%", label: "Satisfaction Rate" },
  { number: "500+", label: "Projects Completed" },
  { number: "24/7", label: "Support Available" },
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
function AnimatedStat({ stat, isVisible }: { stat: (typeof stats)[0]; isVisible: boolean }) {
  const [hasAnimated, setHasAnimated] = useState(false)

  // Extract number from stat.number (handle 50+, 98%, 500+, 24/7)
  const getNumericValue = (value: string) => {
    if (value === "24/7") return 24
    return Number.parseInt(value.replace(/[^0-9]/g, ""))
  }

  const numericValue = getNumericValue(stat.number)
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
          {hasAnimated ? getDisplayValue(count, stat.number) : "0"}
        </span>
      </div>
      <p className="text-gray-600 font-medium">{stat.label}</p>
    </div>
  )
}

export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const styleElement = document.createElement("style")
    styleElement.textContent = styles
    document.head.appendChild(styleElement)

    return () => {
      document.head.removeChild(styleElement)
    }
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
    if (!isAutoPlaying || isPaused) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isPaused])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
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
      className="hidden md:block py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-green-500 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <Badge className="mb-4 px-4 py-2 text-sm font-medium">WHAT OUR CLIENTS SAY</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-6">Our Testimonials</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from our satisfied clients about their experience working with DBS Mintek and how we've helped
            transform their business operations.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className={`relative ${isVisible ? "animate-fade-in-delay" : "opacity-0"}`}>
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl border-0"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl border-0"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* 3D Testimonials Slider */}
          <div className="relative min-h-[500px] top-20 left-48 flex items-center justify-center perspective-1000 px-4">
            <div className="relative w-full max-w-6xl   mx-auto">
              {testimonials.map((testimonial, index) => {
                const position = (index - currentSlide + testimonials.length) % testimonials.length
                const isCenter = position === 0
                const isLeft = position === testimonials.length - 1
                const isRight = position === 1
                const isVisible = isCenter || isLeft || isRight

                if (!isVisible) return null

                let transform = ""
                let zIndex = 1
                let opacity = 0.4
                let scale = 0.8

                const isMobile = typeof window !== "undefined" && window.innerWidth < 640

                if (isCenter) {
                  transform = "translateX(0) translateZ(0) rotateY(0deg)"
                  zIndex = 10
                  opacity = 1
                  scale = 1
                } else if (isLeft) {
                  transform = isMobile
                    ? "translateX(-100%) scale(0.9)"
                    : "translateX(-80%) translateZ(-200px) rotateY(25deg)"
                  zIndex = 5
                  opacity = 0.6
                  scale = 0.85
                } else if (isRight) {
                  transform = isMobile
                    ? "translateX(100%) scale(0.9)"
                    : "translateX(80%) translateZ(-200px) rotateY(-25deg)"
                  zIndex = 5
                  opacity = 0.6
                  scale = 0.85
                }

                return (
                  <div
                    key={testimonial.id}
                    className="absolute left-1/2 w-100 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out cursor-pointer"
                    style={{
                      transform: `translate(-50%, -50%) ${transform} scale(${scale})`,
                      zIndex,
                      opacity,
                    }}
                    onClick={() => !isCenter && goToSlide(index)}
                  >
                    <Card className=" w-full max-w-xs sm:max-w-sm md:max-w-md group hover:shadow-2xl transition-all duration-500 border-0 bg-white/95 backdrop-blur-sm">
                      <CardContent className="p-8">
                        {/* Quote Icon */}
                        <div className="flex justify-between items-start mb-6">
                          <Quote className="h-8 w-8 text-blue-600 opacity-50" />
                          <div className="flex items-center space-x-1">
                            <testimonial.socialIcon className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center space-x-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>

                        {/* Testimonial Text */}
                        <blockquote className="text-gray-600 leading-relaxed mb-6 text-sm line-clamp-4">
                          "{testimonial.testimonial}"
                        </blockquote>

                        {/* Client Info */}
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <Image
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              width={50}
                              height={50}
                              sizes="(max-width: 768px) 40px, 50px"
                              className="rounded-full object-cover"
                            />
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                              <Building className="h-2 w-2 text-white" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                            <p className="text-xs text-blue-600 font-medium">{testimonial.company}</p>
                            <p className="text-xs text-gray-500">{testimonial.location}</p>
                          </div>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs">{testimonial.industry}</span>
                            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                              {testimonial.partnership}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentSlide ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>

            {/* Auto-play Control */}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleAutoPlay}
              className="bg-white shadow-lg hover:shadow-xl border-0 w-8 h-8"
            >
              {isAutoPlaying && !isPaused ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className={`mb-16 ${isVisible ? "animate-fade-in-delay-2" : "opacity-0"}`}>
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Client Success Metrics</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our commitment to excellence is reflected in these key performance indicators
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <AnimatedStat key={index} stat={stat} isVisible={statsVisible} />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center ${isVisible ? "animate-fade-in-delay-3" : "opacity-0"}`}>
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 lg:p-12 text-white">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Join Our Success Stories?</h3>
              <p className="text-lg mb-8 text-blue-100">
                Experience the same level of excellence that our clients rave about. Let's discuss how we can transform
                your customer service operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8">Start Your Journey</Button>
                <Button className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
                  Read More Reviews
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
