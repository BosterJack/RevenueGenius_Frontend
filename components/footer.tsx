import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div>
       <footer className="bg-brand-blue/90 text-white py-12">
        <div className="container mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-brand-gold">
                  Try For Free
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-brand-gold">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-brand-gold">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-brand-gold">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-brand-gold">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-brand-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>info@jerrygenie.ai</span>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-brand-gold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="mb-4">
              Welcome to Jerry Genie! Your AI Business Mentor in the Digital
              Age!
            </p>
            <p className="text-sm text-gray-400">
              Jerry Genie is a powerful AI tool designed to help entrepreneurs
              make data-driven decisions, forecast revenue, and optimize their
              business strategies. With Jerry by your side, you'll never have to
              navigate the complexities of business growth alone.
            </p>
          </div>
        </div>
        <div className="container mx-auto mt-8 pt-8 border-t border-gray-800 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>© JerryGenie.com © 2024. All Rights Reserved</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-brand-gold">
              Terms
            </Link>
            <Link href="#" className="hover:text-brand-gold">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
