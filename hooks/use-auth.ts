"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { authService } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { log } from "console"
import { register } from "module"

// Hook pour gérer l'authentification
export function useAuth() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [token, setToken] = useState<string | null>(null)

  // Charger le token depuis le localStorage au montage du composant
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("accessToken")
      if (storedToken) {
        setToken(storedToken)
      }
    }
  }, [])

  // Mutation pour la connexion
  // const loginMutation = useMutation({
  //   mutationFn: ({ email, password }: { email: string; password: string }) => authService.login(email, password),
  //   onSuccess: (data) => {
  //     localStorage.setItem("accessToken", data.access)
  //     localStorage.setItem("refreshToken", data.refresh)
  //     setToken(data.access)
  //     router.push("/dashboard")
  //   },
  // })
 const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: (data) => {
      if (data.access) {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        setToken(data.access);
        router.push("/dashboard");
      } else {
        router.push("/access-denied");
      }
    },
  });

  // Mutation pour l'inscription
  const registerMutation = useMutation({
    mutationFn: (userData: any) => authService.register(userData),
    onSuccess: () => {
      router.push("/login?registered=true")
    },
  })

  // Mutation pour la déconnexion
  const logout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    setToken(null)
    queryClient.clear()
    router.push("/login")
  }

  // Requête pour obtenir les informations de l'utilisateur courant
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => authService.getCurrentUser(),
    enabled: !!token,
  })


const { data: notifications, isLoading: isLoadingNotifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => authService.getNotifications(),
    enabled: !!token,
  })


// Mutation pour l'inscription
  const changeCurrentUserMutation = useMutation({

    mutationFn: (userData: any) => authService.updateProfile(userData,),
    
  })

  
  return {
    token,
    user,
    isLoadingUser,
    changeCurrentUserInformation:changeCurrentUserMutation.mutate,
    isChangeInformation: changeCurrentUserMutation.isPending,
    changeInformationError: changeCurrentUserMutation.error,
    changeInformationSuccess: changeCurrentUserMutation.isSuccess,
    isAuthenticated: !!token,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    loginSuccess: loginMutation.isSuccess,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    registerSuccess: registerMutation.isSuccess,
    logout,
    notifications,
    isLoadingNotifications
  }
}

