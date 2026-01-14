"use client"

import { useState, useEffect } from "react"
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import logi from "../public/logo.png"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false)
        setActiveSubmenu(null)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    {
      name: "Services",
      href: "#",
      submenu: [
        { name: "Inbound Services", href: "/services/inbound" },
        { name: "Outbound Services", href: "/services/outbound" },
        { name: "Email Services", href: "/services/email" },
        { name: "Chat & Bot Services", href: "/services/chat" },
        { name: "US Pension Administration", href: "/services/pension" },
        
      ],
    },
    { name: "Contact Us", href: "/contact" },
  ]

  const toggleSubmenu = (itemName: string) => {
    if (isMobile) {
      setActiveSubmenu(activeSubmenu === itemName ? null : itemName)
    }
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setActiveSubmenu(null)
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2 px-4 w-full overflow-hidden">
        <div className="container-responsive">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-2 sm:gap-4">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm">+91-838-005-5201</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm">info@dbsmintek.com</span>
              </div>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">Mumbai • Pune • Kolkata</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="w-full">
        <div className="container-responsive">
          <div className="flex items-center justify-between lg:justify-around py-3 sm:py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <img src="/logo.png" alt="DBS MINTEK PVT LTD" className="h-16 w-44"/>
              {/* <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">D</span>
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-xl font-bold text-gray-900 truncate">DBS MINTEK</div>
                <div className="text-xs text-gray-600 hidden sm:block">Call Center Solutions</div>
              </div> */}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.submenu ? (
                    <>
                      <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 flex items-center gap-1">
                        {item.name}
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="py-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link href={item.href} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden lg:block flex-shrink-0">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2">
                <Phone className="w-4 h-4 mr-2" />
                Get Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors flex-shrink-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white w-full">
            <div className="container-responsive">
              <div className="py-4 space-y-2 max-h-[70vh] overflow-y-auto">
                {navigationItems.map((item) => (
                  <div key={item.name}>
                    {item.submenu ? (
                      <div className="space-y-2">
                        <button
                          onClick={() => toggleSubmenu(item.name)}
                          className="w-full text-left px-3 py-2 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 rounded transition-colors flex items-center justify-between"
                        >
                          {item.name}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              activeSubmenu === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {activeSubmenu === item.name && (
                          <div className="pl-4 space-y-1 bg-gray-50 rounded-lg py-2">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                onClick={closeMenu}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded font-medium transition-colors"
                        onClick={closeMenu}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile CTA Button */}
                <div className="pt-4 border-t border-gray-200">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    Get Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
