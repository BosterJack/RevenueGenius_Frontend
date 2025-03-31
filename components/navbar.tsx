import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react' // Icônes pour le menu burger

export default function Navbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false) // État du menu mobile

  return (
    <header className="px-6 md:px-20 py-4 flex items-center justify-between relative">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/logo.png" alt="Jerry Genie Logo" width={60} height={60} />
      </Link>

      {/* Menu pour grand écran */}
      <nav className="hidden md:flex items-center space-x-6">
        {["features", "demo", "pricing", "faqs", "contact"].map((item) => (
          <Link key={item} href={`#${item}`} className="text-gray-700 hover:text-brand-blue">
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Link>
        ))}
      </nav>

      {/* Bouton Try For Free */}
      <Button onClick={() => router.push("/login")} className="hidden md:block bg-brand-gold hover:bg-amber-500 text-white">
        Try For Free
      </Button>

      {/* Menu burger pour mobile */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Menu déroulant mobile */}
      {isOpen && (
        <nav className="absolute top-16 left-0 w-full bg-white shadow-md p-5 flex flex-col items-center space-y-4 md:hidden">
          {["features", "demo", "pricing", "faqs", "contact"].map((item) => (
            <Link key={item} href={`#${item}`} className="text-gray-700 hover:text-brand-blue" onClick={() => setIsOpen(false)}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
          <Button onClick={() => router.push("/login")} className="bg-brand-gold hover:bg-amber-500 text-white w-full">
            Try For Free
          </Button>
        </nav>
      )}
    </header>
  )
}
