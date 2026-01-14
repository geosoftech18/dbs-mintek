"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
const iconMap: { [key: string]: React.ElementType } = {
  Linkedin, Quote, Award, Users, TrendingUp 
}
import { Linkedin, Quote, Award, Users, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef,useEffect,useState } from "react"

const url = `${process.env.NEXT_PUBLIC_BASE_URL}/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}/environments/master/entries?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&content_type=aboutSection`;

export default function FounderSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
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
  const stats = [
    { icon: Users, value: "300+", label: "Businesses Helped" },
    { icon: TrendingUp, value: "10+", label: "Years Experience" },
    { icon: Award, value: "95%", label: "Client Success Rate" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div  className="text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 mb-6 text-sm font-medium text-blue-600 bg-blue-50 rounded-full dark:bg-blue-900/20 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/50">
              <Award className="w-4 h-4 mr-2" />
              Meet Our Founder
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-white">
              Leadership That Drives Innovation
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Discover the vision and expertise behind Geo SofTech's success story
            </p>
          </motion.div>

          {/* Main Grid - 2 Columns on Large Screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 lg:mb-20">
            {/* Left Column - Image Section */}
            <motion.div  className="relative">
              <div className="relative max-w-md mx-auto lg:max-w-none">
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl" />

                {/* Image Container */}
                <div className="relative">
                  <div className="aspect-square relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-2">
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow-2xl">
                      <Image
                        src="/founder-image.jpeg?height=500&width=500"
                        alt="Amar Korde - Founder & CEO of Geo SofTech"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>

                  {/* Floating Stats Card */}
                  <motion.div
                    
                    className="absolute -bottom-6 -right-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20 dark:border-slate-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">10+</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Years Leading</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - All Content */}
            <motion.div  className="space-y-8">
              {/* Name and Title */}
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">{data?.items?.[0]?.fields?.founderName}</h3>
                <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-6">
                {data?.items?.[0]?.fields?.founderTitle}
                </p>

                {/* Bio */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                  {data?.items?.[0]?.fields?.founderDescription}
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl">
                {data?.items?.[0]?.fields?.founderStats.map((stat:any, index:any) => {
                  const StatIcon = iconMap[stat.icon]
                  return(<motion.div
                    key={index}
                   
                    className="text-center p-4 rounded-xl  border border-white/20 dark:border-slate-700/50"
                  >
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                      <StatIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                  </motion.div>)
                  
                })}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://linkedin.com/in/amarkorde"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <Button
                    size="lg"
                    className="px-8 py-3 bg-[#0077B5] hover:bg-[#005885] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Linkedin className=" mr-2" />
                    Connect on LinkedIn
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 font-semibold rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
                >
                  View Portfolio
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Testimonial Section - Outside the Grid */}
          <motion.div >
            <Card className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 border-0 shadow-xl">
              
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
