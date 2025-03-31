"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function RedirectAfterLogin() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // useEffect(() => {
  //   const accessToken = localStorage.getItem("ACCESS_TOKEN")

  //   if (accessToken) {
  //     // L'utilisateur est déjà connecté, rediriger vers le dashboard ou la page demandée
  //     const redirectTo = searchParams.get("redirect") || "/dashboard"
  //     router.push(redirectTo)
  //   }
  // }, [router, searchParams])

  // return null
}

