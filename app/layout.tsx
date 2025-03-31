import type React from "react"
import "./globals.css"
import { Inter,Plus_Jakarta_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { TanstackQueryProvider } from "@/lib/tanstack-query"

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] })

export const metadata = {
  title: "JerryGenie - Prévisions de revenus",
  description: "Plateforme de prévision de revenus et d'analyse pour entrepreneurs",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SelectedProvider>
          <TanstackQueryProvider>{children}</TanstackQueryProvider>
          </SelectedProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
import { SelectedProvider } from "./provider"
