"use client"

import { useEffect, useRef, useState,useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
const iconMap: { [key: string]: React.ElementType } = {
  CheckCircle, Globe, Clock, Users, Award, Zap 
}
import { CheckCircle, Globe, Clock, Users, Award, Zap } from "lucide-react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"


const stats = [
  { number: "500+", label: "Happy Clients"},
  { number: "24/7", label: "Support Hours" },
  { number: "99.9%", label: "Uptime" },
  { number: "17+", label: "Years Experience" },
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

 const url = `${process.env.NEXT_PUBLIC_BASE_URL}/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}/environments/master/entries?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&content_type=aboutSection`;
console.log(url)

export default  function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
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


  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left Column */}
          <div className={`space-y-6 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
            <Badge
              // variant="secondary"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm font-medium w-fit"
            >
              ABOUT US
            </Badge>

           
               <div className="space-y-4">
               <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {data?.items?.[1]?.fields?.heading}
                 
               </h2>
               <p className="text-lg text-purple-600 font-medium">{data?.items?.[4]?.fields?.subheading}</p>
             </div>
 
             <p className="text-gray-600 text-lg leading-relaxed">
             {data?.items?.[1]?.fields?.subheading}
             </p>
            
         
{/* 
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Best in the Call Centre industry
              </h2>
              <p className="text-lg text-purple-600 font-medium">Classy, Symmetrical & Professional Call Centre</p>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              DBS MINTEK PVT LTD is an international call centre based in Mumbai and Pune, India. We provide customer
              support and sales services to clients from all over the world. Our team of skilled professionals are
              available 24/7 to ensure your business operations run smoothly and efficiently.
            </p> */}

            {/* Key Points */}
            <div className="space-y-3 pt-4">
              {[
                "International call centre operations",
                "Based in Mumbai and Pune, India",
                "Customer support and sales services",
                "24/7 professional team availability",
              ].map((point, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className={`space-y-8 ${isVisible ? "animate-fade-in-delay" : "opacity-0"}`}>
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {data?.items?.[0]?.fields?.rightColTitle}
              </h3>
              <p className="text-gray-600 text-lg lg:text-xl">
              {data?.items?.[0]?.fields?.rightColDescription}
              </p>
            </div>
            
            {/* Technology Features */}
            <div className="grid sm:grid-cols-2 gap-4">
            {data?.items?.[0]?.fields?.aboutFeatures.map((feature:any,index:Number)=>{
                  const FeatureIcon = iconMap[feature.icon]

                  return(
                    <Card key={feature.title}  className="border-0 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <FeatureIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                  )
            })}
              
               
              
            </div>
            {/* <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <feature.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div> */}
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className={`${isVisible ? "animate-fade-in-delay-2" : "opacity-0"}`}>
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{data?.items?.[1]?.fields?.heading}</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
              {data?.items?.[1]?.fields?.subheading}
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {data?.items?.[0]?.fields?.aboutStats.map((stat:any) => (
                <AnimatedStat key={stat.label} stat={stat} isVisible={statsVisible} />
                
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 ${isVisible ? "animate-fade-in-delay-3" : "opacity-0"}`}>
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 lg:p-12 text-white">
            <div className="max-w-3xl mx-auto">
              <Zap className="h-12 w-12 mx-auto mb-6 text-yellow-300" />
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">{data?.items?.[0]?.fields?.aboutctaTitle}</h3>
              <p className="text-lg mb-8 text-purple-100">
              {data?.items?.[0]?.fields?.aboutctaDescription} 
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                {data?.items?.[0]?.fields?.ctaBtn1}
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-lg font-semibold transition-colors">
                {data?.items?.[0]?.fields?.ctaBtn2}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
