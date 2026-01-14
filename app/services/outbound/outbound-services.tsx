"use client"

import Header from "@/components/dropdown-header"
import { useState ,useEffect} from "react"
const iconMap: { [key: string]: React.ElementType } = {
  Phone,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  Zap,
  CheckCircle,
  ArrowRight,
  Headphones,
  Mail,
  Settings,
  Shield,
  Award,
  ChevronDown,
  ChevronUp,
  Star,
  Clock,
  Database,
  PhoneCall,
  UserCheck,
  Building2,
}
import {
  Phone,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  Zap,
  CheckCircle,
  ArrowRight,
  Headphones,
  Mail,
  Settings,
  Shield,
  Award,
  ChevronDown,
  ChevronUp,
  Star,
  Clock,
  Database,
  PhoneCall,
  UserCheck,
  Building2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Footer from "@/components/footer"

interface FAQItem {
  question: string
  answer: string
}

const url = `${process.env.NEXT_PUBLIC_BASE_URL}/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}/environments/master/entries?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&content_type=serviceOutbound`;
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
      question: "What is the difference between inbound and outbound services?",
      answer:
        "Inbound services handle incoming customer calls, emails, and chats for support and inquiries. Outbound services involve proactively contacting customers or prospects for telemarketing, lead generation, collections, and customer retention campaigns.",
    },
    {
      question: "What is the best way to reach Outbound Services?",
      answer:
        "You can reach our outbound services team by calling +91-838-005-5201, sending an email to info@dbsmintek.com, or filling out the contact form on our website at www.dbsmintek.com. Our team is available to discuss your specific requirements.",
    },
    {
      question: "What is the average time it takes to process and launch a campaign?",
      answer:
        "Campaign setup typically takes 3-5 business days depending on complexity. This includes CRM configuration, agent training, script development, and testing. We can design and implement campaigns on the fly as per customer needs.",
    },
    {
      question: "What are Outbound Services?",
      answer:
        "Outbound services involve proactively contacting customers or prospects through telemarketing, telesales, lead generation, collections, and customer retention campaigns. These services help businesses increase leads, sales, and maintain customer relationships.",
    },
    {
      question: "How can I contact Outbound Services for more information?",
      answer:
        "Contact us at +91-838-005-5201 or email info@dbsmintek.com. You can also visit our website at www.dbsmintek.com to learn more about our comprehensive outbound solutions and request a consultation.",
    },
    {
      question: "What does it mean to be an Outbound Services Representative?",
      answer:
        "Outbound service representatives proactively contact customers who have expressed interest in products or services. They follow up on inquiries, conduct sales calls, generate leads, and maintain customer relationships. Our representatives are trained subject matter experts in collections, lead generation, and customer retention.",
    },
    {
      question: "What are the most common outbound services you provide?",
      answer:
        "Our most common outbound services include telemarketing campaigns, lead generation, telesales, collections, customer retention calls, appointment setting, market research, and survey campaigns. We also provide hosted OBD solutions and CRM integration services.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    
    
   
    <div className="space-y-4">
      
      {data?.items?.[0]?.fields?.pageContent.faqList.map((faq:any) => (
        <Card key={faq.answer} className="border border-gray-200 hover:border-blue-300 transition-colors">
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toggleFAQ(faq.answer)}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 pr-4">{faq.question}</CardTitle>
              {openIndex === faq.answer ? (
                <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </div>
          </CardHeader>
          {openIndex === faq.answer && (
            <CardContent className="pt-0">
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{faq.answer}</p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}

export default function OutboundServices() {
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
       <Header/>
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 bg-gradient-to-r from-green-600 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm">
                {data?.items?.[0]?.fields?.pageContent.techTitle}
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  {data?.items?.[0]?.fields?.pageContent.title}
                  <span className="block text-green-200">& Telesales Services</span>
                </h1>
                <p className="text-lg sm:text-xl text-green-100 leading-relaxed">
                {data?.items?.[0]?.fields?.pageContent.description}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="text-lg sm:text-xl font-semibold mb-2 text-green-100">
                  "Outbound services are a great way to connect with new customers and grow your business."
                </div>
                <div className="text-sm text-green-200">- DBS MINTEK Expert Team</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-semibold">
                  <Phone className="w-5 h-5 mr-2" />
                  Start Campaign Today
                </Button>
                <Button size="lg" variant="outline" className="border-white hover:text-white text-green-600 hover:bg-white/10">
                  View Solutions
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
                <div className="grid grid-cols-2 gap-4 mb-6">

                {data?.items?.[0]?.fields?.pageContent.channels.map((channel:any,index:Number)=>{
                  const ChannelIcon = iconMap[channel.icon]
                   return(
                    <div key={channel.icon} className="bg-white/20 rounded-lg p-4 text-center">
                    <ChannelIcon className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-sm font-medium">{channel.label}</div>
                  </div>
                )
                })}

                  
                </div>
                <div className="text-center">
                  <div className="text-sm text-green-200 mb-2">Serving Industries</div>
                  <div className="text-lg font-semibold">{data?.items?.[0]?.fields?.pageContent.trustedBy}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {data?.items?.[0]?.fields?.pageContent.benefitsTitle}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {data?.items?.[0]?.fields?.pageContent.benefitsIntro}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">

          {data?.items?.[0]?.fields?.pageContent.benefitsList.map((benefit:any)=>{
            const BenefitIcon = iconMap[benefit.icon]
            return(
              <Card key={benefit.icon} className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <BenefitIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900">{benefit.title}</CardTitle>
                    <Badge variant="secondary" className="bg-blue-200 text-blue-800 mt-1">
                      {benefit.badge}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {benefit.description}
                </p>
                <ul className="space-y-2 text-sm text-gray-600">

                

                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {benefit.points[0]}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {benefit.points[1]}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {benefit.points[2]}
                  </li>
                </ul>
              </CardContent>
            </Card>
            )
          })}

        
          </div>
        </div>
      </section>

      {/* Lead Management Solutions */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {data?.items?.[0]?.fields?.pageContent.techTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {data?.items?.[0]?.fields?.pageContent.techIntro}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  Enterprise Solutions
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Advanced CRM & OBD Integration</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Our solutions are highly customizable and tailored to match your specific requirements, helping
                  increase business efficiency with minimal training and support needed.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Settings className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1"> {data?.items?.[0]?.fields?.pageContent.techFeatures[0].title}</h4>
                    <p className="text-gray-600 text-sm">
                    {data?.items?.[0]?.fields?.pageContent.techFeatures[0].subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1"> {data?.items?.[0]?.fields?.pageContent.techFeatures[1].title}</h4>
                    <p className="text-gray-600 text-sm"> {data?.items?.[0]?.fields?.pageContent.techFeatures[1].subtitle}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <BarChart3 className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1"> {data?.items?.[0]?.fields?.pageContent.techFeatures[2].title}</h4>
                    <p className="text-gray-600 text-sm">
                    {data?.items?.[0]?.fields?.pageContent.techFeatures[2].subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingUp className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1"> {data?.items?.[0]?.fields?.pageContent.techFeatures[3].title}</h4>
                    <p className="text-gray-600 text-sm">
                    {data?.items?.[0]?.fields?.pageContent.techFeatures[3].subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <Database className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-900">CRM Integration</div>
                  <div className="text-xs text-gray-600">7+ Years Experience</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <PhoneCall className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-900">Hosted OBD</div>
                  <div className="text-xs text-gray-600">Scalable Solution</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <Building2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-900">Telecom CRM</div>
                  <div className="text-xs text-gray-600">Collection Process</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <Award className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-900">Blended Calls</div>
                  <div className="text-xs text-gray-600">Best of Both Worlds</div>
                </div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full px-4 py-2">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-medium">Campaign Design On-The-Fly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Service Features
            </h2>
            <p className="text-lg text-gray-600">
              Explore our full range of outbound services designed to maximize your business potential.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Missed Call Services */}
            <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg"> {data?.items?.[0]?.fields?.pageContent.services[0].title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {data?.items?.[0]?.fields?.pageContent.services[0].description}
                </p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[0].keyFeatures[0]}</li>
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[0].keyFeatures[1]}</li>
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[0].keyFeatures[2]}</li>
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[0].keyFeatures[3]}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Lead Management */}
            <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">{data?.items?.[0]?.fields?.pageContent.services[1].title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {data?.items?.[0]?.fields?.pageContent.services[1].description}
                </p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[1].keyFeatures[0]}</li>
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[1].keyFeatures[1]}</li>
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[1].keyFeatures[2]}</li>
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[1].keyFeatures[3]}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Hosted OBD */}
            <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <PhoneCall className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">{data?.items?.[0]?.fields?.pageContent.services[2].title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {data?.items?.[0]?.fields?.pageContent.services[2].description}
                </p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[2].keyFeatures[0]}</li>
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[2].keyFeatures[1]}</li>
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[2].keyFeatures[2]}</li>
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[2].keyFeatures[3]}</li>
                </ul>
              </CardContent>
            </Card>

            {/* CRM Integration */}
            <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Database className="w-6 h-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg">{data?.items?.[0]?.fields?.pageContent.services[3].title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {data?.items?.[0]?.fields?.pageContent.services[3].description}
                </p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[3].keyFeatures[0]}</li>
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[3].keyFeatures[1]}</li>
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[3].keyFeatures[2]}</li>
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[3].keyFeatures[3]}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Blended Calls */}
            <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Headphones className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle className="text-lg">{data?.items?.[0]?.fields?.pageContent.services[4].title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {data?.items?.[0]?.fields?.pageContent.services[4].description}
                </p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[4].keyFeatures[0]}</li>
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[4].keyFeatures[1]}</li>
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[4].keyFeatures[2]}</li>
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[4].keyFeatures[3]}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Telecom Collections */}
            <Card className="border-l-4 border-l-indigo-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-lg">{data?.items?.[0]?.fields?.pageContent.services[5].title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {data?.items?.[0]?.fields?.pageContent.services[5].description}
                  
                </p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[5].keyFeatures[0]}</li>
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[5].keyFeatures[1]}</li>
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[5].keyFeatures[2]}</li>
                  <li>• {data?.items?.[0]?.fields?.pageContent.services[5].keyFeatures[3]}</li>
                </ul>
              </CardContent>
            </Card>
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
              We're here to help you with any questions about our outbound services.
            </p>
          </div>

          <FAQSection />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-r from-green-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              {data?.items?.[0]?.fields?.pageContent.ctaTitle}
              </h2>
              <p className="text-lg sm:text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
              {data?.items?.[0]?.fields?.pageContent.ctaText}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8">
                <Phone className="w-5 h-5 mr-2" />
                {data?.items?.[0]?.fields?.pageContent.ctaButtons[0].label}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-green-600 hover:text-white  hover:bg-white/10 font-semibold px-8"
              >
                <Mail className="w-5 h-5 mr-2" />
                {data?.items?.[0]?.fields?.pageContent.ctaButtons[1].label}
              </Button>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 pt-8 border-t border-white/20">
           { data?.items?.[0]?.fields?.pageContent.quickCards.map((card:any)=>{
            const CardIcon = iconMap[card.icon]
            return(
              <div className="text-center" key={card.icon}>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CardIcon className="w-6 h-6" />
                </div>
                <div className="font-semibold">{card.title}</div>
                <div className="text-sm text-green-200">{card.description}</div>
              </div>
            )
           })}
              
             
            </div>

            <div className="pt-6 border-t border-white/20">
              <p className="text-sm text-green-200">
                Visit our website:{" "}
                <a href="https://www.dbsmintek.com" className="text-white font-semibold hover:underline">
                  www.dbsmintek.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
    
  )
  
}
