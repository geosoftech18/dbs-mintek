"use client"

import { useState,useEffect } from "react"
const iconMap: { [key: string]: React.ElementType } = {
  Mail,
  Zap,
  Users,
  Globe,
  Shield,
  Target,
  CheckCircle,
  ArrowRight,
  Settings,
  BarChart3,
  Clock,
  Eye,
  Layers,
  ChevronDown,
  ChevronUp,
  Star,
  Award,
  Phone,
  Database,
  TrendingUp,
}
import {
  Mail,
  Zap,
  Users,
  Globe,
  Shield,
  Target,
  CheckCircle,
  ArrowRight,
  Settings,
  BarChart3,
  Clock,
  Eye,
  Layers,
  ChevronDown,
  ChevronUp,
  Star,
  Award,
  Phone,
  Database,
  TrendingUp,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/dropdown-header"
import Footer from "@/components/footer"

interface FAQItem {
  question: string
  answer: string
}
const url = `${process.env.NEXT_PUBLIC_BASE_URL}/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}/environments/master/entries?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&content_type=serviceEmail`;
console.log(url);
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
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

  const faqs: FAQItem[] = [
    {
      question: "How do you integrate client emails with your distribution system?",
      answer:
        "We seamlessly integrate your existing email infrastructure with our distribution system, allowing multiple advisors to respond in real-time. This ensures faster response times and better customer service through coordinated team efforts.",
    },
    {
      question: "What makes your email service different from traditional providers?",
      answer:
        "Our email service goes beyond traditional communication by providing omnichannel engagement experiences, real-time advisor collaboration, and 360-degree customer interaction views across multiple touchpoints and platforms.",
    },
    {
      question: "How fast do you respond to client emails?",
      answer:
        "We respond at lightning speeds using our latest email management software with ACD technology. Our associates are trained to provide immediate responses to client enquiries, sales requests, and service requests.",
    },
    {
      question: "Can you handle multiple communication channels simultaneously?",
      answer:
        "Yes, we provide omnichannel engagement experiences that integrate email with other communication channels like voice, chat, and social media, giving agents a complete 360-degree view of customer interactions.",
    },
    {
      question: "What security measures do you have for email communications?",
      answer:
        "We implement state-of-the-art security measures including encryption, secure data transmission, access controls, and compliance with industry standards to protect all email communications and customer data.",
    },
    {
      question: "How do you ensure quality in email responses?",
      answer:
        "Our quality assurance process includes trained email specialists, standardized response templates, real-time monitoring, performance tracking, and continuous training to maintain high-quality customer communications.",
    },
    {
      question: "Can you customize email workflows for different business needs?",
      answer:
        "We customize email workflows, response templates, escalation procedures, and integration points based on your specific business requirements and customer service objectives.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {data?.items?.[0]?.fields?.pageContent.faqList.map((faq:any, index:Number) => (
        <Card key={faq.question} className="border border-gray-200 hover:border-purple-300 transition-colors">
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toggleFAQ(faq.question)}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 pr-4">{faq.question}</CardTitle>
              {openIndex === faq.question ? (
                <ChevronUp className="w-5 h-5 text-purple-600 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </div>
          </CardHeader>
          {openIndex === faq.question && (
            <CardContent className="pt-0">
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}

export default function EmailServices() {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header/>
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 bg-gradient-to-r from-purple-600 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm">
                {data?.items?.[0]?.fields?.pageContent.badges}
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                {data?.items?.[0]?.fields?.pageContent.title}
                  <span className="block text-purple-200">  {data?.items?.[0]?.fields?.pageContent.subtitle}</span>
                </h1>
                <p className="text-lg sm:text-xl text-purple-100 leading-relaxed">
                {data?.items?.[0]?.fields?.pageContent.description}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-lg font-semibold mb-2 text-purple-100">  {data?.items?.[0]?.fields?.pageContent.heroHighlightTitle}</div>
                    <div className="text-sm text-purple-200">
                    {data?.items?.[0]?.fields?.pageContent.heroHighlightText}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                  <Mail className="w-5 h-5 mr-2" />
                  {data?.items?.[0]?.fields?.pageContent.primaryCTA}
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white bg-white/10">
                {data?.items?.[0]?.fields?.pageContent.secondaryCTA}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                 

                  {data?.items?.[0]?.fields?.pageContent.heroStats.map((stat:any)=>{
                  const StateIcon = iconMap[stat.icon]
                  return(
                    <div key={stat.label} className="bg-white/20 rounded-lg p-4 text-center">
                    <StateIcon className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-sm font-medium">{stat.label}</div>
                  </div>
                  )

                  })}

                </div>
                <div className="text-center">
                  <div className="text-sm text-purple-200 mb-2">Integrated Solutions</div>
                  <div className="text-lg font-semibold">Real-time • Multi-channel • Secure</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {data?.items?.[0]?.fields?.pageContent.overviewTitle}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {data?.items?.[0]?.fields?.pageContent.overviewDescription}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                {data?.items?.[0]?.fields?.pageContent.overviewBadge}
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{data?.items?.[0]?.fields?.pageContent.overviewsubTitle}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                {data?.items?.[0]?.fields?.pageContent.overviewsubdescription}
                </p>
              </div>

              <div className="space-y-4">
               

                {data?.items?.[0]?.fields?.pageContent.overviewFeatures.map((feature:any)=>{
                  const FeatureIcon = iconMap[feature.icon]

                  return(
                    <div key={feature.title} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <FeatureIcon className={`w-4 h-4 ${feature.color} `} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
                  )

                })}

                </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-100 rounded-2xl p-6 sm:p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{data?.items?.[0]?.fields?.pageContent.platformTitle}</h4>
                <p className="text-gray-600 text-sm">
                {data?.items?.[0]?.fields?.pageContent.platformDescription}
                </p>
              </div>

              <div className={`grid grid-cols-2 gap-3 `}>
                <div className="bg-white rounded-lg p-3 text-center">
                  <Clock className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                  <div className="text-xs font-medium text-gray-900">Real-time</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <Database className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <div className="text-xs font-medium text-gray-900">Integrated</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <Award className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <div className="text-xs font-medium text-gray-900">Reliable</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <Star className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                  <div className="text-xs font-medium text-gray-900">Secure</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-r from-gray-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {data?.items?.[0]?.fields?.pageContent.keyFeaturesTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {data?.items?.[0]?.fields?.pageContent.keyFeaturesIntro}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

          {data?.items?.[0]?.fields?.pageContent.keyFeatures.map((feature:any)=>{
                  const FeatureIcon = iconMap[feature.icon]
                  return(
                    <Card key={feature.title} className="bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${feature.iconbg}  rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <FeatureIcon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-gray-900 mb-2">{feature.title}</CardTitle>
                          <Badge variant="secondary" className={`${feature.badgecolor}`}>
                            {feature.badge}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed mb-4">
                       {feature.description}
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {feature.points[0]}
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {feature.points[1]}
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {feature.points[2]}
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  )

          })}
   
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {data?.items?.[0]?.fields?.pageContent.techTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {data?.items?.[0]?.fields?.pageContent.techIntro}
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-700 rounded-2xl p-6 sm:p-8 lg:p-12 text-white">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {data?.items?.[0]?.fields?.pageContent.badge}
                  </Badge>
                  <h3 className="text-2xl sm:text-3xl font-bold">{data?.items?.[0]?.fields?.pageContent.techHighlightTitle}</h3>
                  <p className="text-purple-100 text-lg leading-relaxed">
                  {data?.items?.[0]?.fields?.pageContent.techHighlightDescription}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4" />
                    </div>
                    <span className="text-purple-100">{data?.items?.[0]?.fields?.pageContent.techBulletPoints[0]}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <span className="text-purple-100">{data?.items?.[0]?.fields?.pageContent.techBulletPoints[1]}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                    <span className="text-purple-100">{data?.items?.[0]?.fields?.pageContent.techBulletPoints[2]}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Email Processing Stats</h4>
                </div>

                <div className="grid grid-cols-2 gap-4">


                {data?.items?.[0]?.fields?.pageContent.techStats.map((stat:any)=>{
                  return(<div key={stat.label} className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold mb-1">{stat.label}</div>
                    <div className="text-sm text-purple-200">{stat.subLabel}</div>
                  </div>)
                })}

      
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Get answers to common questions about our email services and solutions.
            </p>
          </div>

          <FAQSection />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              {data?.items?.[0]?.fields?.pageContent.ctaTitle}
              </h2>
              <p>{data?.items?.[0]?.fields?.pageContent.ctaText}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8">
                <Mail className="w-5 h-5 mr-2" />
                {data?.items?.[0]?.fields?.pageContent.ctaButtons[0].label}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-purple-600 hover:text-white hover:bg-white/10 font-semibold px-8"
              >
                <Phone className="w-5 h-5 mr-2" />
                {data?.items?.[0]?.fields?.pageContent.ctaButtons[1].label}
              </Button>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 pt-8 border-t border-white/20">
            {data?.items?.[0]?.fields?.pageContent.ctaStats.map((stat:any)=>{
                  const CtaIcon = iconMap[stat.icon]
                  return(
                    <div key={stat.label} className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CtaIcon className="w-6 h-6" />
                </div>
                <div className="font-semibold">{stat.label}</div>
                <div className="text-sm text-purple-200">{stat.subLabel}</div>
              </div>
                  )
            })}
              
             
            </div>

            <div className="pt-6 border-t border-white/20">
              <p className="text-sm text-purple-200">
                Ready to enhance your email communication?{" "}
                <span className="text-white font-semibold">Contact us for more details</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}
