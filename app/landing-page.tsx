import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="container mx-auto py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Jerry Genie Logo" width={50} height={50} />
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#features" className="text-gray-700 hover:text-brand-blue">
            Features
          </Link>
          <Link href="#demo" className="text-gray-700 hover:text-brand-blue">
            Demo
          </Link>
          <Link href="#pricing" className="text-gray-700 hover:text-brand-blue">
            Pricing
          </Link>
          <Link href="#faqs" className="text-gray-700 hover:text-brand-blue">
            FAQs
          </Link>
          <Link href="#contact" className="text-gray-700 hover:text-brand-blue">
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          <Link href="/login">
            <Button variant="outline">Se connecter</Button>
          </Link>
          <Link href="/register">
            <Button className="bg-brand-gold hover:bg-amber-500 text-white">S'inscrire</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-brand-blue py-16 md:py-24 text-white relative overflow-hidden">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Jerry Genie: Your 24/7 AI Business Mentor — Take Action, Scale Success
            </h1>
            <p className="text-lg mb-8 text-blue-100">
              Prévisions de revenus intelligentes et recommandations stratégiques pour les créateurs de contenu et
              entrepreneurs.
            </p>
            <Link href="/register">
              <Button className="bg-brand-gold hover:bg-amber-500 text-white px-8 py-6 text-lg">START FOR FREE</Button>
            </Link>
          </div>
          <div className="relative">
            <Image src="/genie.png" alt="Jerry Genie" width={500} height={500} className="z-10 relative" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-blue-light opacity-80"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white" id="features">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">A Tool for Entrepreneurs Ready to Move Forward</h2>
        </div>
        <div className="container mx-auto grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-brand-blue text-white rounded-lg p-6 relative overflow-hidden">
            <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Action-Oriented Mentorship</h3>
            <p className="mb-4">
              Get personalized, step-by-step guidance to turn ideas into action. Jerry analyzes your business data and
              provides actionable recommendations.
            </p>
            <Image
              src="/genie-small.png"
              alt="Action Oriented"
              width={150}
              height={150}
              className="absolute bottom-0 right-0 opacity-50"
            />
          </div>

          {/* Feature 2 */}
          <div className="bg-brand-blue text-white rounded-lg p-6 relative overflow-hidden">
            <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Built for Doers</h3>
            <p className="mb-4">
              No more drowning in data. AI tool that breaks data information down into clear, actionable steps. Being an
              AI doesn't mean Jerry sacrifices personality - he's here to make business growth fun.
            </p>
            <Image
              src="/genie-small.png"
              alt="Built for Doers"
              width={150}
              height={150}
              className="absolute bottom-0 right-0 opacity-50"
            />
          </div>

          {/* Feature 3 */}
          <div className="bg-brand-blue text-white rounded-lg p-6 relative overflow-hidden">
            <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-4.5-8.599A5 5 0 103 15z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Accessible Anytime, Anywhere</h3>
            <p className="mb-4">
              No more waiting for expensive consultations. Jerry is available 24/7, ready to provide insights when you
              need them through every step of your entrepreneurial journey.
            </p>
            <Image
              src="/genie-small.png"
              alt="Accessible Anytime"
              width={150}
              height={150}
              className="absolute bottom-0 right-0 opacity-50"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-brand-blue text-white">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">3-Tier Pricing</h2>
        </div>
        <div className="container mx-auto grid md:grid-cols-3 gap-6">
          {/* Free Plan */}
          <div className="bg-white text-gray-800 rounded-lg overflow-hidden">
            <div className="p-6 flex flex-col h-full">
              <div className="mb-4">
                <div className="bg-brand-blue text-white w-16 h-16 flex items-center justify-center rounded-lg mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">1 wish</h3>
              </div>
              <div className="mb-6">
                <div className="text-2xl font-bold text-brand-blue">FREE</div>
                <div className="text-sm text-gray-500">Access: Ask 1 question/month</div>
              </div>
              <div className="mb-6">
                <div className="text-sm text-gray-500">Sale Price: $0 (Normally $10/month)</div>
              </div>
              <Link href="/register" className="mt-auto">
                <Button className="w-full bg-brand-gold hover:bg-amber-500 text-white">SIGN UP</Button>
              </Link>
            </div>
          </div>

          {/* Basic Plan */}
          <div className="bg-white text-gray-800 rounded-lg overflow-hidden">
            <div className="p-6 flex flex-col h-full">
              <div className="mb-4">
                <div className="bg-brand-blue text-white w-16 h-16 flex items-center justify-center rounded-lg mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">30 wishes</h3>
              </div>
              <div className="mb-6">
                <div className="text-2xl font-bold text-brand-blue">$9/month</div>
                <div className="text-sm text-gray-500">Access: Ask up to 30 questions/month (1 question/day)</div>
              </div>
              <div className="mb-6">
                <div className="text-sm text-gray-500">Sale Price: $9 (Normally $19/month)</div>
              </div>
              <Link href="/register" className="mt-auto">
                <Button className="w-full bg-brand-gold hover:bg-amber-500 text-white">SIGN UP</Button>
              </Link>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-white text-gray-800 rounded-lg overflow-hidden">
            <div className="p-6 flex flex-col h-full">
              <div className="mb-4">
                <div className="bg-brand-blue text-white w-16 h-16 flex items-center justify-center rounded-lg mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Unlimited wishes</h3>
              </div>
              <div className="mb-6">
                <div className="text-2xl font-bold text-brand-blue">$15/month</div>
                <div className="text-sm text-gray-500">Access: Unlimited questions per month</div>
              </div>
              <div className="mb-6">
                <div className="text-sm text-gray-500">Sale Price: $15 (Normally $39/month)</div>
              </div>
              <Link href="/register" className="mt-auto">
                <Button className="w-full bg-brand-gold hover:bg-amber-500 text-white">SIGN UP</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Questions About Jerry Genie? We Have Answers!</h2>
              <p className="mb-8 text-gray-600">
                We're Here To Help! If You Have Any Questions, Don't Hesitate To Reach Out. Our Team Is Always Ready To
                Assist And Provide The Information You Need.
              </p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="bg-brand-gold/10 p-4 rounded-lg text-left">
                    What is Jerry Genie?
                  </AccordionTrigger>
                  <AccordionContent className="p-4">
                    Jerry Genie is your 24/7 AI-powered business mentor, designed to provide cost-effective, actionable
                    guidance for entrepreneurs looking to create a clear path forward.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="bg-brand-gold/10 p-4 rounded-lg text-left mt-2">
                    How Does Jerry Genie Operate?
                  </AccordionTrigger>
                  <AccordionContent className="p-4">
                    Jerry uses advanced AI to analyze your business data, identify trends, and provide personalized
                    recommendations for growth and revenue optimization.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="bg-brand-gold/10 p-4 rounded-lg text-left mt-2">
                    How Can Jerry Genie Benefit Me?
                  </AccordionTrigger>
                  <AccordionContent className="p-4">
                    Jerry helps you make data-driven decisions, forecast revenue, track leads, analyze content ROI, and
                    set achievable business goals - all in one platform.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="bg-brand-gold/10 p-4 rounded-lg text-left mt-2">
                    Can Jerry Genie Assist Me with Various Business Challenges?
                  </AccordionTrigger>
                  <AccordionContent className="p-4">
                    Yes! Whether you're a coach, content creator, consultant, or online course creator, Jerry adapts to
                    your specific business needs and challenges.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="bg-brand-gold/10 p-4 rounded-lg text-left mt-2">
                    Is Jerry Genie Secure and Protected?
                  </AccordionTrigger>
                  <AccordionContent className="p-4">
                    Absolutely. We implement industry-standard security measures to protect your data and privacy at all
                    times.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="flex justify-center">
              <Image src="/genie-large.png" alt="Jerry Genie" width={400} height={500} className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/register" className="hover:text-brand-gold">
                  Try For Free
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-brand-gold">
                  About
                </Link>
              </li>
              <li>
                <Link href="#faqs" className="hover:text-brand-gold">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-brand-gold">
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
            <p className="mb-4">Welcome to Jerry Genie! Your AI Business Mentor in the Digital Age!</p>
            <p className="text-sm text-gray-400">
              Jerry Genie is a powerful AI tool designed to help entrepreneurs make data-driven decisions, forecast
              revenue, and optimize their business strategies. With Jerry by your side, you'll never have to navigate
              the complexities of business growth alone.
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

