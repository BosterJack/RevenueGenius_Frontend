"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { authService } from "@/lib/api"
import type { User } from "@/types/auth"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem("accessToken")

      if (!accessToken) {
        // Rediriger vers la page de connexion si pas de token
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
        return
      }

      try {
        // Vérifier si le token est valide en récupérant les infos de l'utilisateur
        const userData = await authService.getCurrentUser(accessToken)
        setUser(userData)
      } catch (error) {
        console.error("Auth check error:", error)

        // Essayer de rafraîchir le token
        const refreshToken = localStorage.getItem("refreshToken")

        if (refreshToken) {
          try {
            const response = await authService.refreshToken(refreshToken)
            localStorage.setItem("accessToken", response.access)

            // Réessayer de récupérer les infos de l'utilisateur
            const userData = await authService.getCurrentUser(response.access)
            setUser(userData)
          } catch (refreshError) {
            console.error("Token refresh error:", refreshError)
            // Rediriger vers la page de connexion si le rafraîchissement échoue
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
            router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
          }
        } else {
          // Rediriger vers la page de connexion si pas de refresh token
          localStorage.removeItem("accessToken")
          router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
      </div>
    )
  }

  return <>{children}</>
}

