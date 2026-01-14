"use client"

import { useState ,useEffect} from "react"
const iconMap: { [key: string]: React.ElementType } = {
  DollarSign,
  Shield,
  FileText,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Settings,
  BarChart3,
  Clock,
  Award,
  Building2,
  ChevronDown,
  ChevronUp,
  Phone,
  Calculator,
  Database,
  Lock,
  Globe,
  Target,
  Briefcase,
}
import {
  DollarSign,
  Shield,
  FileText,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Settings,
  BarChart3,
  Clock,
  Award,
  Building2,
  ChevronDown,
  ChevronUp,
  Phone,
  Calculator,
  Database,
  Lock,
  Globe,
  Target,
  Briefcase,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/dropdown-header"
import Footer from "@/components/footer"
import { color } from "framer-motion"

interface FAQItem {
  question: string
  answer: string
}
const url = `${process.env.NEXT_PUBLIC_BASE_URL}/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}/environments/master/entries?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&content_type=serviceUsPension`;
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

  

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {data?.items?.[0]?.fields?.pageContent.faqList.map((faq:any) => (
        <Card key={faq.question} className="border border-gray-200 hover:border-emerald-300 transition-colors">
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toggleFAQ(faq.question)}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 pr-4">{faq.question}</CardTitle>
              {openIndex === faq.question ? (
                <ChevronUp className="w-5 h-5 text-emerald-600 flex-shrink-0" />
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

export default function USPensionAdministration() {
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <Header/>
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 bg-gradient-to-r from-emerald-600 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm">
                {data?.items?.[0]?.fields?.pageContent.badge}
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                {data?.items?.[0]?.fields?.pageContent.title}
                  <span className="block text-emerald-200">{data?.items?.[0]?.fields?.pageContent.subtitle}</span>
                </h1>
                <p className="text-lg sm:text-xl text-emerald-100 leading-relaxed">
                {data?.items?.[0]?.fields?.pageContent.description}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-lg font-semibold mb-2 text-emerald-100">{data?.items?.[0]?.fields?.pageContent.heroHighlightTitle}</div>
                    <div className="text-sm text-emerald-200">
                    {data?.items?.[0]?.fields?.pageContent.heroHighlightText}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold">
                  <DollarSign className="w-5 h-5 mr-2" />
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

                {data?.items?.[0]?.fields?.pageContent.heroStats.map((stat:any,index:Number)=>{
                  const StatIcon = iconMap[stat.icon]

                  return(
                    <div key={stat.label} className="bg-white/20 rounded-lg p-4 text-center">
                    <StatIcon className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-sm font-medium">{stat.label}</div>
                  </div>
                  )

                })}
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
              Complete Pension Plan Administration
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From plan setup to ongoing administration, we manage every aspect of your US pension plans with meticulous
              attention to compliance, participant satisfaction, and operational efficiency.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {data?.items?.[0]?.fields?.pageContent.services.map((service:any,index:Number)=>{
                  const ServiceIcon = iconMap[service.icon]

                  return(
                    <Card key={service.title} className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-0 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center`}>
                    <ServiceIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
                    <Badge variant="secondary" className={` ${service.badgeColor} mt-1`}>
                     {service.badge}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {service.keyFeatures[0]}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {service.keyFeatures[1]}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {service.keyFeatures[2]}
                  </li>
                </ul>
              </CardContent>
            </Card>
                  )
          })}
            

          </div>
        </div>
      </section>

      {/* Experience & Expertise */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-r from-gray-50 to-emerald-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {data?.items?.[0]?.fields?.pageContent.experienceTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {data?.items?.[0]?.fields?.pageContent.experienceDescription}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                {data?.items?.[0]?.fields?.pageContent.experincebadge}
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{data?.items?.[0]?.fields?.pageContent.experiencesubTitle}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                {data?.items?.[0]?.fields?.pageContent.experiencesubDescription}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">13+ Years of Continuous Service</h4>
                    <p className="text-gray-600 text-sm">
                      Uninterrupted service delivery with consistent quality and reliability
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Building2 className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Leading US West Coast Client</h4>
                    <p className="text-gray-600 text-sm">
                      Serving major enterprise client with complex pension plan requirements
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Target className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Complete Backend Administration</h4>
                    <p className="text-gray-600 text-sm">
                      End-to-end management of all pension plan administrative functions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Briefcase className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Various 401(k) Plan Types</h4>
                    <p className="text-gray-600 text-sm">Expertise across all 401(k) plan variations and structures</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Partnership Milestones</h4>
                <p className="text-gray-600 text-sm">Key achievements in our long-term client relationship</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
              
                {data?.items?.[0]?.fields?.pageContent.experienceStats.map((stat:any)=>{
                  return(
                    <div key={stat.label} className={` ${stat.bgColor} rounded-lg p-4 text-center`}>
                  <div className={`text-2xl font-bold ${stat.textColor}  mb-1`}>{stat.label}</div>
                  <div className={`text-sm text-gray-600`}>{stat.subLabel}</div>
                </div>
                  )
                  } ) }
              
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Services */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {data?.items?.[0]?.fields?.pageContent.serviceTitle}
            </h2>
            <p className="text-lg text-gray-600">
            {data?.items?.[0]?.fields?.pageContent.serviceText}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
          {data?.items?.[0]?.fields?.pageContent.administrationServices.map((service:any)=>{
                  const ServiceIcon = iconMap[service.icon]

                  return(
                    <Card key={service.title} className="bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${service.color}  rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <ServiceIcon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-gray-900 mb-2">{service.title}</CardTitle>
                          <Badge variant="secondary" className={` ${service.badgeColor}`}>
                           {service.badge}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {service.keyFeatures[0]}
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {service.keyFeatures[1]}
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {service.keyFeatures[2]}
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  )

          })}
            
   
          </div>
        </div>
      </section>

      {/* Technology & Security */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-r from-emerald-600 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{data?.items?.[0]?.fields?.pageContent.technologyTitle}</h2>
            <p className="text-lg text-emerald-100 max-w-3xl mx-auto">
            {data?.items?.[0]?.fields?.pageContent.technologyIntro}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Security & Technology
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold">{data?.items?.[0]?.fields?.pageContent.technologysubTitle}</h3>
                <p className="text-emerald-100 text-lg leading-relaxed">
                {data?.items?.[0]?.fields?.pageContent.technologysubdescription}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Lock className="w-4 h-4" />
                  </div>
                  <span className="text-emerald-100">{data?.items?.[0]?.fields?.pageContent.technologyFeatures[0]}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span className="text-emerald-100">{data?.items?.[0]?.fields?.pageContent.technologyFeatures[1]}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span className="text-emerald-100">{data?.items?.[0]?.fields?.pageContent.technologyFeatures[2]}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold mb-2">Technology Infrastructure</h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
              {data?.items?.[0]?.fields?.pageContent.technologyStats.map((stat:any)=>{
                 return(
                  <div key={stat.label} className="bg-white/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold mb-1">{stat.label}</div>
                  <div className="text-sm text-emerald-200">{stat.subLabel}</div>
                </div>
                 )

              })}
                
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
            {data?.items?.[0]?.fields?.pageContent.faqTitle}
            </h2>
            <p className="text-lg text-gray-600">
            {data?.items?.[0]?.fields?.pageContent.faqdescription}
            </p>
          </div>

          <FAQSection />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-r from-emerald-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              {data?.items?.[0]?.fields?.pageContent.ctaTitle}
              </h2>
              <p className="text-lg sm:text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
              {data?.items?.[0]?.fields?.pageContent.ctaText}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold px-8">
                <DollarSign className="w-5 h-5 mr-2" />
                {data?.items?.[0]?.fields?.pageContent.ctaButtons[0].label}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white bg-white/10 font-semibold px-8"
              >
                <Phone className="w-5 h-5 mr-2" />
                {data?.items?.[0]?.fields?.pageContent.ctaButtons[1].label}
              </Button>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 pt-8 border-t border-white/20">
            {data?.items?.[0]?.fields?.pageContent.ctaStats.map((stat:any)=>{
                  const StatIcon = iconMap[stat.icon]
                  return(
                    <div key={stat.label} className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <StatIcon className="w-6 h-6" />
                    </div>
                    <div className="font-semibold">{stat.label}</div>
                    <div className="text-sm text-emerald-200">{stat.subLabel}</div>
                  </div>
                  )

            })}
              
             
            </div>

            <div className="pt-6 border-t border-white/20">
              <p className="text-sm text-emerald-200">
                Ready to experience expert pension plan administration?{" "}
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
