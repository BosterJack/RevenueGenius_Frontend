"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function LogoutButton({ variant = "ghost", size = "default", className }: LogoutButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)

    try {
      // Supprimer les tokens du localStorage
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")

      // Rediriger vers la page d'accueil
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant={variant} size={size} className={className} onClick={handleLogout} disabled={isLoading}>
      {isLoading ? (
        "Déconnexion..."
      ) : (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          Déconnexion
        </>
      )}
    </Button>
  )
}

