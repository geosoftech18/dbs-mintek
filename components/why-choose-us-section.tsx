"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
const iconMap: { [key: string]: React.ElementType } = {
  Settings,
  Users,
  Award,
  GraduationCap,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Shield,
  Clock,
}
import {
  Settings,
  Users,
  Award,
  GraduationCap,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Shield,
  Clock,
} from "lucide-react"

const features = [
  {
    id: "technology",
    title: "Technology",
    icon: Settings,
    description:
      "We are well equipped with state-of-the-art technology with the capacity for fast ramp-up and roll out of new campaigns.",
    benefits: [
      "Latest Call Center Software",
      "Cloud-Based Infrastructure",
      "Real-time Analytics",
      "Scalable Solutions",
    ],
    color: "blue",
    gradient: "from-blue-500 to-blue-700",
  },
  {
    id: "team",
    title: "Best Team",
    icon: Users,
    description:
      "We have the skilled and experienced professionals who are well equipped to provide exclusive customer service solutions.",
    benefits: ["Experienced Professionals", "Multi-lingual Support", "24/7 Availability", "Dedicated Account Managers"],
    color: "green",
    gradient: "from-green-500 to-green-700",
  },
  {
    id: "professionalism",
    title: "Professionalism",
    icon: Award,
    description:
      "Our biggest strength lies in our strong & deep tradition of 'Professionalism' & 'Respect for an Individual and Customers'.",
    benefits: ["Quality Assurance", "Professional Standards", "Customer-Centric Approach", "Ethical Practices"],
    color: "purple",
    gradient: "from-purple-500 to-purple-700",
  },
  {
    id: "training",
    title: "Best Training",
    icon: GraduationCap,
    description:
      "Each & every professional appointed by us undergoes rigorous and continuous in-house training by our principals.",
    benefits: ["Comprehensive Training Programs", "Continuous Learning", "Skill Development", "Performance Monitoring"],
    color: "orange",
    gradient: "from-orange-500 to-orange-700",
  },
]

const achievements = [
  { icon: Star, number: 98, label: "Client Satisfaction Rate",suffix:"%" },
  { icon: TrendingUp, number: 500, label: "Successful Projects" ,suffix:"+"},
  { icon: Shield, number: 99.9, label: "Data Security",suffix: "%"  },
  { icon: Clock, number: 24, label: "Support Coverage",suffix: "/7"  },
]

// Counter component for individual achievement
function CountUpNumber({
  end,
  suffix,
  isVisible,
  delay = 0,
}: { end: number; suffix: string; isVisible: boolean; delay?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const timer = setTimeout(() => {
      let startTime: number
      let animationFrame: number

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / 2000, 1)

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentCount = easeOutQuart * end

        setCount(currentCount)

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        } else {
          setCount(end)
        }
      }

      animationFrame = requestAnimationFrame(animate)

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [end, isVisible, delay])

  const displayValue = suffix === "%" && end < 100 ? count.toFixed(1) : Math.floor(count)

  return (
    <span className="text-3xl lg:text-4xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
      {displayValue}
      {suffix}
    </span>
  )
}
const url = `${process.env.NEXT_PUBLIC_BASE_URL}/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}/environments/master/entries?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&content_type=aboutSection`;


export default function WhyChooseUsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [trackRecordVisible, setTrackRecordVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const trackRecordRef = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTrackRecordVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (trackRecordRef.current) {
      observer.observe(trackRecordRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const getIconColor = (color: string) => {
    switch (color) {
      case "blue":
        return "text-blue-600 bg-blue-100 group-hover:bg-blue-200"
      case "green":
        return "text-green-600 bg-green-100 group-hover:bg-green-200"
      case "purple":
        return "text-purple-600 bg-purple-100 group-hover:bg-purple-200"
      case "orange":
        return "text-orange-600 bg-orange-100 group-hover:bg-orange-200"
      default:
        return "text-blue-600 bg-blue-100 group-hover:bg-blue-200"
    }
  }

  return (
    <section
      ref={sectionRef}
      className="py-16 lg:py-24 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <Badge  className="mb-4 px-4 py-2 text-sm font-medium">
            WHY CHOOSE US
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-6">{data?.items?.[0]?.fields?.whychooseTitle}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {data?.items?.[0]?.fields?.whychooseDescription}
          </p>
        </div>

        {/* Features Grid */}
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 ${isVisible ? "animate-fade-in-delay" : "opacity-0"}`}
        >
          {data?.items?.[0]?.fields?.whychooseFeatures.map((feature:any, index:any) => {
            const FeatureIcon = iconMap[feature.icon]
            return(
              <Card
              key={feature.id}
              className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm cursor-pointer transform hover:-translate-y-4"
              onMouseEnter={() => setActiveFeature(feature.id)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <CardContent className="p-8 text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`p-4 rounded-2xl transition-all duration-300 ${getIconColor(feature.color)}`}>
                    <FeatureIcon className="h-12 w-12" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <div className= {`text-gray-600 leading-relaxed mb-6 `}>{feature.benefits.map((benefit:any, benefitIndex:any) => (
                    <div key={benefitIndex} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600">{benefit}</span>
                    </div>
                  ))}
                    </div>

                {/* Benefits List - Shows on Hover */}
                <p
                  className={`space-y-2 mb-6 transition-all duration-300 ${
                    activeFeature === feature.id ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden"
                  }`}
                >
                  {feature.description}
                </p>

                {/* Learn More Button */}
                <Button
                 
                  className={`w-full justify-between group-hover:bg-gradient-to-r group-hover:${feature.gradient} group-hover:text-white transition-all duration-300`}
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
            )
            
          })}
        </div>

        {/* Achievements Section */}
        <div ref={trackRecordRef} className={`mb-16 ${isVisible ? "animate-fade-in-delay-2" : "opacity-0"}`}>
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Our Track Record</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Numbers that speak for our commitment to excellence and client satisfaction
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {data?.items?.[0]?.fields?.whychooseStats.map((achievement:any, index:any) => {
               const StatIcon = iconMap[achievement.icon]
               return(<div key={index} className="text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <StatIcon className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="text-3xl lg:text-4xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    <CountUpNumber
                      end={achievement.number}
                      suffix={achievement.suffix}
                      isVisible={trackRecordVisible}
                      delay={index * 200}
                    />
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium">{achievement.label}</p>
                </div>)
                
              })}
            </div>
          </div>
        </div>

    

        {/* Call to Action */}
        <div className={`text-center ${isVisible ? "animate-fade-in-delay-4" : "opacity-0"}`}>
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-8 lg:p-12 text-white">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">{data?.items?.[0]?.fields?.whychooseCtaTitle}</h3>
              <p className="text-lg mb-8 text-gray-300">
              {data?.items?.[0]?.fields?.whychooseCtaDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button  className="bg-blue-600 hover:bg-blue-700 px-8">
                {data?.items?.[0]?.fields?.ctaBtn1}
                </Button>
                <Button
                  
                  className="border-white text-white hover:bg-white hover:text-gray-900 px-8"
                >
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
