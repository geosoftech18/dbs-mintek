"use client"

import type React from "react"

import { useState , useEffect} from "react"
import {
  Phone,
  Mail,
  MapPin,
  Building2,
  Clock,
  Globe,
  Send,
  CheckCircle,
  MessageSquare,
  Shield,
  Award,
  Target,
  Users,
  ExternalLink,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface ContactFormData {
  firstName: string
  
  lastName: string
  phone: string
  email: string
 
  companyName: string
  
  signature: string
  enquiryType: string
  captcha: string
}

const url = `${process.env.NEXT_PUBLIC_BASE_URL}/spaces/${process.env.NEXT_PUBLIC_SPACE_ID}/environments/master/entries?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&content_type=contactPage`;

export default function ContactUs() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    companyName: "",
    signature: "",
    enquiryType: "",
   captcha:""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
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

  // const [captchaAnswer] = useState(19) // 11 + 8 = 19

  useEffect(() => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setNum1(a);
    setNum2(b);
  }, []);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('')
    setError('')

    // Validate captcha
    const correctAnswer = num1 + num2;
    if (parseInt(formData.captcha) !== correctAnswer) {
      setError("Please solve the security check correctly")
      setIsSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/inquiry-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (result.success) {
        setStatus('Your enquiry has been submitted successfully! We\'ll be in touch soon.')
        setIsSubmitted(true)

        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            companyName: "",
            signature: "",
            enquiryType: "",
            captcha: "",
          })
          // Regenerate captcha
          const a = Math.floor(Math.random() * 10) + 1;
          const b = Math.floor(Math.random() * 10) + 1;
          setNum1(a);
          setNum2(b);
          setStatus('')
        }, 3000)
      } else {
        setError(result.error || 'Failed to submit enquiry. Please try again.')
        console.error('Enquiry submission error:', result)
      }
    } catch (error: any) {
      setError('Failed to submit enquiry. Please try again.')
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const locations = [
    {
      id: "mumbai",
      name: "Mahape, Navi Mumbai",
      type: "Head Office",
      address: "DBS House, EL-73, Electronic Zone, TTC MIDC, Mahape, Navi Mumbai-400 710, Maharashtra, India",
      color: "red",
      gradient: "from-red-500 to-red-600",
      mapUrl: "https://maps.google.com/?q=DBS+House+EL-73+Electronic+Zone+TTC+MIDC+Mahape+Navi+Mumbai+400710",
    },
    {
      id: "baner",
      name: "Baner, Pune",
      type: "Modern Facility",
      address: "4th Floor, Anjani Palladium Next to Prabhavee Tech Park, Baner, Pune, Maharashtra 411045",
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      mapUrl: "https://maps.google.com/?q=Anjani+Palladium+Prabhavee+Tech+Park+Baner+Pune+Maharashtra+411045",
    },
    {
      id: "kothrud",
      name: "Kothrud, Pune",
      type: "IT Park Office",
      address: "3rd Floor, B Wing, Lohia Jain IT Park, Kothrud, PUNE-411-038, Chandni Chowk, Maharashtra, India",
      color: "green",
      gradient: "from-green-500 to-green-600",
      mapUrl: "https://maps.google.com/?q=Lohia+Jain+IT+Park+Kothrud+Pune+411038+Maharashtra",
    },
    {
      id: "kolkata",
      name: "Kolkata Office",
      type: "Business District",
      address: "Suit# 10F, 32, Chowringhee Road, Om Tower, 7th Floor, Unit#706, Park Street, Kolkata- 700 071",
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
      mapUrl: "https://maps.google.com/?q=Om+Tower+32+Chowringhee+Road+Park+Street+Kolkata+700071",
    },
    {
      id: "kolkata",
      name: "Kolkata Office",
      type: "Business District",
      address: "Suit# 10F, 32, Chowringhee Road, Om Tower, 7th Floor, Unit#706, Park Street, Kolkata- 700 071",
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
      mapUrl: "https://maps.google.com/?q=Om+Tower+32+Chowringhee+Road+Park+Street+Kolkata+700071",
    },{
      id: "kolkata",
      name: "Kolkata Office",
      type: "Business District",
      address: "Suit# 10F, 32, Chowringhee Road, Om Tower, 7th Floor, Unit#706, Park Street, Kolkata- 700 071",
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
      mapUrl: "https://maps.google.com/?q=Om+Tower+32+Chowringhee+Road+Park+Street+Kolkata+700071",
    }
  ]

  const enquiryTypes = [
    "General Enquiry",
    "Inbound Services",
    "Outbound Services",
    "Email Services",
    "Chat & Bot Services",
    "US Pension Administration",
    "Healthcare Services",
    "Partnership Opportunities",
    "Technical Support",
    "Pricing Information",
  ]

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header/>
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm">
              {data?.items?.[0]?.fields?.subtitle} 
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">{data?.items?.[0]?.fields?.title}</h1>
              <p className="text-lg sm:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
              {data?.items?.[0]?.fields?.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Phone className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                <div className="font-semibold mb-1">Call Us</div>
                <div className="text-sm text-blue-200">{data?.items?.[0]?.fields?.phoneNumber}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <Mail className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                <div className="font-semibold mb-1">Email Us</div>
                <div className="text-sm text-blue-200">{data?.items?.[0]?.fields?.email}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-3 text-blue-200" />
                <div className="font-semibold mb-1">Visit Us</div>
                <div className="text-sm text-blue-200">4 Strategic Locations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Send Us a Message</h2>
                <p className="text-gray-600 leading-relaxed">
                  Please complete the details below and then click on Submit. We'll be in contact with you shortly to
                  discuss your requirements.
                </p>
              </div>

              <Card className="border-2 border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Contact Form
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}  className="space-y-6">
                    {/* Name Fields */}
                    <div className="space-y-4">
                      <Label className="text-base font-semibold text-gray-900">
                        Name <span className="text-red-500">*</span>
                      </Label>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-sm text-gray-600">
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                        {/* <div>
                          <Label htmlFor="middleName" className="text-sm text-gray-600">
                            Middle Name
                          </Label>
                          <Input
                            id="middleName"
                            value={formData.middleName}
                            onChange={(e) => handleInputChange("middleName", e.target.value)}
                            className="mt-1"
                          />
                        </div> */}
                        <div>
                          <Label htmlFor="lastName" className="text-sm text-gray-600">
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <Label htmlFor="phone" className="text-base font-semibold text-gray-900">
                        Phone <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="081234 56789"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                        className="mt-2"
                      />
                    </div>

                    {/* Email Fields */}
                    <div className="grid  gap-4">
                      <div>
                        <Label htmlFor="email" className="text-base font-semibold text-gray-900">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          className="mt-2"
                        />
                      </div>
                      
                    </div>

                    {/* Company Name */}
                    <div>
                      <Label htmlFor="companyName" className="text-base font-semibold text-gray-900">
                        Company Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        required
                        className="mt-2"
                      />
                    </div>

                    {/* Website */}
                    {/* <div>
                      <Label htmlFor="website" className="text-base font-semibold text-gray-900">
                        Website / URL
                      </Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://www.yourcompany.com"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        className="mt-2"
                      />
                    </div> */}

                     {/* Enquiry Type */}
                     <div>
                      <Label className="text-base font-semibold text-gray-900">
                        Type of Enquiry <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.enquiryType}
                        onValueChange={(value) => handleInputChange("enquiryType", value)}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select enquiry type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {enquiryTypes.map((type) => (
                            <SelectItem key={type} value={type} className="hover:bg-gray-300">
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Signature */}
                    <div>
                      <Label htmlFor="signature" className="text-base font-semibold text-gray-900">
                        Message / Additional Information
                      </Label>
                      <Textarea
                        id="signature"
                        placeholder="Please provide any additional details about your enquiry..."
                        value={formData.signature}
                        onChange={(e) => handleInputChange("signature", e.target.value)}
                        rows={4}
                        className="mt-2"
                      />
                    </div>

                   

                    {/* Captcha */}
                    <div>
                      <Label htmlFor="captcha" className="text-base font-semibold text-gray-900">
                        Security Check <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-lg">{num1} + {num2} = ?</div>
                        <Input
                          id="captcha"
                          type="number"
                          placeholder="Answer"
                          value={formData.captcha}
                          onChange={(e) => handleInputChange("captcha", e.target.value)}
                          required
                          className="w-24"
                        />
                      </div>
                    </div>

                    {/* Status Messages */}
                    {error && (
                      <div className="p-3 rounded-md text-sm bg-red-100 text-red-700 border border-red-300">
                        {error}
                      </div>
                    )}

                    {status && (
                      <div className="p-3 rounded-md text-sm bg-green-100 text-green-700 border border-green-300">
                        {status}
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Submit Enquiry
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Get In Touch</h2>
                <p className="text-gray-600 leading-relaxed">
                  Ready to transform your business operations? Our expert team is standing by to help you achieve your
                  goals with our comprehensive call center solutions.
                </p>
              </div>

              {/* Quick Contact Cards */}
              <div className="space-y-4">
                <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Call Us Directly</h3>
                        <p className="text-gray-600 text-sm mb-2">Speak with our sales team immediately</p>
                        <a
                          href="tel:+918380055201"
                          className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                        >
                          {data?.items?.[0]?.fields?.phoneNumber}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                        <p className="text-gray-600 text-sm mb-2">Send us your detailed requirements</p>
                        <a
                          href="mailto:info@dbsmintek.com"
                          className="text-green-600 font-semibold hover:text-green-700 transition-colors"
                        >
                          {data?.items?.[0]?.fields?.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                        <p className="text-gray-600 text-sm mb-2">We're available when you need us</p>
                        <div className="text-purple-600 font-semibold">
                          <div>{data?.items?.[0]?.fields?.businessHours}</div>
                          <div className="text-sm text-gray-600">24/7 Support Available</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Why Choose Us */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    Why Choose DBS MINTEK?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">

                  {data?.items?.[0]?.fields?.whyChooseUsPoints.map((key:any)=>{
                    return(<div key={key}  className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{key}</span>
                    </div>)
                    
                  })} 

                    
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Locations</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Visit us at any of our strategically located offices across major business hubs in India. We're here to
              serve you with world-class call center solutions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {data?.items?.[0]?.fields?.locations.map((location:any) => (
              <Card key={location.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${location.gradient} rounded-xl flex items-center justify-center`}
                      >
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-900">{location.name}</CardTitle>
                        <Badge
                          variant="secondary"
                          className={`bg-${location.color}-100 text-${location.color}-700 mt-1`}
                        >
                          {location.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600 text-sm leading-relaxed">{location.address}</p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => window.open(location.mapUrl, "_blank")}
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        View on Google Maps
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </Button>

                      {location.id === "mumbai" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                          <Building2 className="w-4 h-4 mr-2" />
                          Head Office
                        </Button>
                      )}
                    </div>

                    {location.id === "mumbai" && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-semibold text-blue-900">Head Office Features</span>
                        </div>
                        <div className="text-xs text-blue-700 space-y-1">
                          <div>• 12,000 Sq Ft across 3 floors</div>
                          <div>• Primary operations center</div>
                          <div>• Advanced technology infrastructure</div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Summary */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-0">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{data?.items?.[0]?.fields?.ctaheading}</h3>
                    <p className="text-blue-100">
                    {data?.items?.[0]?.fields?.ctadescription}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
                      <Phone className="w-5 h-5 mr-2" />
                      Request A Call Today
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-blue-600 hover:text-white hover:bg-white/10">
                      <Target className="w-5 h-5 mr-2" />
                      Get Free Consultation
                    </Button>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-white/20">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Users className="w-6 h-6" />
                      </div>
                      <div className="font-semibold">Expert Team</div>
                      <div className="text-sm text-blue-200">17+ years experience</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Globe className="w-6 h-6" />
                      </div>
                      <div className="font-semibold">Global Reach</div>
                      <div className="text-sm text-blue-200">International solutions</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Shield className="w-6 h-6" />
                      </div>
                      <div className="font-semibold">Trusted Partner</div>
                      <div className="text-sm text-blue-200">Proven track record</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}
