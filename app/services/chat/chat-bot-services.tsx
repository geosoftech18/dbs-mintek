"use client"

import { useState,useEffect } from "react"
const iconMap: { [key: string]: React.ElementType }={
  MessageSquare,
  Bot,
  Mic,
  CheckCircle,
  ArrowRight,
  Settings,
  BarChart3,
  Clock,
  Brain,
  Layers,
  ChevronDown,
  ChevronUp,
  Phone,
  TrendingUp,
  Headphones,
  Smartphone,
  Monitor,
}
import {
  MessageSquare,
  Bot,
  Mic,
  CheckCircle,
  ArrowRight,
  Settings,
  BarChart3,
  Clock,
  Brain,
  Layers,
  ChevronDown,
  ChevronUp,
  Phone,
  TrendingUp,
  Headphones,
  Smartphone,
  Monitor,
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

const url = `${process.env.NEXT_PUBLIC_BASE_URL}/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}/environments/master/entries?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&content_type=serviceChat`;
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
      question: "What types of chatbots can you integrate with our existing systems?",
      answer:
        "We can integrate various types of chatbots including rule-based bots, AI-powered conversational bots, voice bots, and hybrid solutions. Our integration capabilities support popular platforms and can be customized to work with your existing CRM and communication systems.",
    },
    {
      question: "How do voice bots differ from traditional chatbots?",
      answer:
        "Voice bots use speech recognition and natural language processing to interact through voice commands, while traditional chatbots use text-based communication. Voice bots provide hands-free interaction, making them ideal for accessibility and multitasking scenarios.",
    },
    {
      question: "Can you design custom voice bots based on our specific requirements?",
      answer:
        "Yes, we design custom voice bots tailored to your specific business requirements, including industry-specific terminology, workflow integration, multi-language support, and custom voice personalities that align with your brand identity.",
    },
    {
      question: "What platforms do your chatbots support?",
      answer:
        "Our chatbots support multiple platforms including websites, mobile apps, WhatsApp, Facebook Messenger, Telegram, Slack, Microsoft Teams, and custom API integrations. We ensure seamless deployment across all your customer touchpoints.",
    },
    {
      question: "How do you ensure chatbot accuracy and performance?",
      answer:
        "We use advanced NLP algorithms, continuous machine learning, regular training data updates, performance monitoring, and A/B testing to ensure high accuracy. Our bots are continuously optimized based on real user interactions and feedback.",
    },
    {
      question: "What kind of analytics and reporting do you provide for bot interactions?",
      answer:
        "We provide comprehensive analytics including conversation flow analysis, user engagement metrics, resolution rates, response times, popular queries, user satisfaction scores, and detailed performance reports to help optimize bot effectiveness.",
    },
    {
      question: "How quickly can you deploy a chatbot or voice bot solution?",
      answer:
        "Deployment time varies based on complexity. Simple chatbots can be deployed in 1-2 weeks, while custom voice bots with advanced features may take 4-6 weeks. We provide detailed project timelines during the consultation phase.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {data?.items?.[0]?.fields?.pageContent.faqList.map((faq:any, index:Number)=> (
        <Card key={faq.question} className="border border-gray-200 hover:border-teal-300 transition-colors">
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toggleFAQ(faq.question)}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 pr-4">{faq.question}</CardTitle>
              {openIndex === faq.question ? (
                <ChevronUp className="w-5 h-5 text-teal-600 flex-shrink-0" />
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

export default function ChatBotServices() {
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      <Header/>
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 bg-gradient-to-r from-teal-600 to-cyan-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm">
                {data?.items?.[0]?.fields?.pageContent.subtitle}
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Chat, Chatbot &<span className="block text-teal-200">Voice Bot Services</span>
                </h1>
                <p className="text-lg sm:text-xl text-teal-100 leading-relaxed">
                {data?.items?.[0]?.fields?.pageContent.description}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <Bot className="w-6 h-6 text-cyan-300 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-lg font-semibold mb-2 text-teal-100">Intelligent Automation</div>
                    <div className="text-sm text-teal-200">
                      Advanced chatbot integration with various bots and custom voice bot design based on client
                      requirements for seamless customer interactions.
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 font-semibold">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  {data?.items?.[0]?.fields?.pageContent.primaryCTA}
                </Button>
                <Button size="lg" variant="outline" className="border-white text-teal-600 hover:text-white hover:bg-white/10">
                {data?.items?.[0]?.fields?.pageContent.secondaryCTA}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                 
                {data?.items?.[0]?.fields?.pageContent.channels.map((channel:any, index:Number)=>{
                  const ChannelIcon = iconMap[channel.icon]
                  return (
                    <div key={channel.icon} className="bg-white/20 rounded-lg p-4 text-center">
                    <ChannelIcon className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-sm font-medium">{channel.label}</div>
                  </div>
                  )
                })}
                  
                </div>
                <div className="text-center">
                  <div className="text-sm text-teal-200 mb-2">Intelligent Solutions</div>
                  <div className="text-lg font-semibold">24/7 • Multi-platform • Customizable</div>
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
              Intelligent Conversational Solutions
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Deploy proactive chat services on client websites and integrate advanced chatbots with various platforms
              to provide seamless customer interactions and support across all touchpoints.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
           
          {data?.items?.[0]?.fields?.pageContent.services.map((service:any,index:any)=>{
            const ServiceIcon = iconMap[service.icon]
            return(
              <Card key={index} className="bg-gradient-to-br from-teal-50 to-teal-100 border-0 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <ServiceIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
                    <Badge variant="secondary" className="bg-teal-200 text-teal-800 mt-1">
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

      {/* Advanced Features */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-r from-gray-50 to-teal-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {data?.items?.[0]?.fields?.pageContent.benefitsTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {data?.items?.[0]?.fields?.pageContent.benefitsIntro}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
          {data?.items?.[0]?.fields?.pageContent.benefitsList.map((benefit:any, index:any)=>{
            const BenefitIcon = iconMap[benefit.icon]

            return(
              <Card key={index} className="bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BenefitIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900 mb-2">{benefit.title}</CardTitle>
                    <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                      {benefit.badge}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">
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

          <div className="bg-gradient-to-r from-teal-600 to-cyan-700 rounded-2xl p-6 sm:p-8 lg:p-12 text-white">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {data?.items?.[0]?.fields?.pageContent.techBadge}
                  </Badge>
                  <h3 className="text-2xl sm:text-3xl font-bold">{data?.items?.[0]?.fields?.pageContent.techSubtitle}</h3>
                  <p className="text-teal-100 text-lg leading-relaxed">
                  {data?.items?.[0]?.fields?.pageContent.techdescription}
                  </p>
                </div>

                <div className="space-y-4">

                {data?.items?.[0]?.fields?.pageContent.techFeatures.map((fech:any,index:Number)=>{
                  const FeatureIcon = iconMap[fech.icon]

                  return(
                    <div key={fech.icon} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <FeatureIcon className="w-4 h-4" />
                    </div>
                    <span className="text-teal-100">{fech.title}</span>
                  </div>
                  )
                })}

                  
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Bot className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Bot Performance Metrics</h4>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold mb-1">95%</div>
                    <div className="text-sm text-teal-200">Accuracy Rate</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold mb-1">{"< 2s"}</div>
                    <div className="text-sm text-teal-200">Response Time</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold mb-1">50+</div>
                    <div className="text-sm text-teal-200">Languages</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold mb-1">24/7</div>
                    <div className="text-sm text-teal-200">Availability</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Integration */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-r from-gray-50 to-cyan-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {data?.items?.[0]?.fields?.pageContent.platformtitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {data?.items?.[0]?.fields?.pageContent.platformDescription}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {data?.items?.[0]?.fields?.pageContent.platforms.map((platform:any,index:Number)=>{
            const PlatformIcon = iconMap[platform.icon]

            return(
              <Card key={platform.title} className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className= "w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4" >
                <PlatformIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{platform.title}</h3>
              <p className="text-sm text-gray-600">
               {platform.description}
              </p>
            </Card>
            )
          })}

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
              Get answers to common questions about our chatbot and voice bot services.
            </p>
          </div>

          <FAQSection />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-r from-teal-600 to-cyan-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{data?.items?.[0]?.fields?.pageContent.ctaTitle}</h2>
              <p className="text-lg sm:text-xl text-teal-100 max-w-2xl mx-auto leading-relaxed">
                {data?.items?.[0]?.fields?.pageContent.ctaText}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 font-semibold px-8">
                <MessageSquare className="w-5 h-5 mr-2" />
                {data?.items?.[0]?.fields?.pageContent.ctaButtons[0].label}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-teal-600 hover:text-white hover:bg-white/10 font-semibold px-8"
              >
                
                <Phone className="w-5 h-5 mr-2" />
                {data?.items?.[0]?.fields?.pageContent.ctaButtons[1].label}
              </Button>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 pt-8 border-t border-white/20">
             
            {data?.items?.[0]?.fields?.pageContent.quickCards.map((card:any,index:Number)=>{
              const CardIcon = iconMap[card.icon]
              return(
                <div key={card.icon} className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CardIcon className="w-6 h-6" />
                </div>
                <div className="font-semibold">{card.title}</div>
                <div className="text-sm text-teal-200">{card.description}</div>
              </div>
              )
            })}

              
            </div>
            
            <div className="pt-6 border-t border-white/20">
              <p className="text-sm text-teal-200">
                Ready to enhance customer interactions with intelligent bots?{" "}
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
