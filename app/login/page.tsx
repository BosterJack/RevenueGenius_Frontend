"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginSchema } from "@/lib/validations/auth"
import { authService } from "@/lib/api"
import { RedirectAfterLogin } from "@/components/auth/redirect-after-login"
import Image from "next/image"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/hooks/use-auth"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import StatusToast from "@/components/toast-status"

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const registered = searchParams.get("registered") === "true"

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { login,isLoggingIn, loginSuccess,loginError} = useAuth()

  function onSubmit(values: LoginFormValues) {
    login(values)
  }
  
  return (
    <>
      <div className="border-b"><Navbar /></div>
      <div className="py-20 pb-40 flex items-center justify-center bg-gradient-to-r ">
        <div className="w-full max-w-xl p-4">
          <div className="flex justify-center mb-6">
            <Image src="/logo.png" alt="Jerry Genie Logo" width={80} height={80} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Login</CardTitle>
              <CardDescription className="text-center">Log in to your Jerry Genie account</CardDescription>
            </CardHeader>
            <CardContent>
              {registered && (
                <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                  <AlertDescription>
                    Your account has been successfully created. You can now log in.
                  </AlertDescription>
                </Alert>
              )}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {error && <div className="text-red-500 text-sm">{error}</div>}
                  <Button type="submit" className="w-full bg-brand-gold hover:bg-amber-500" disabled={isLoggingIn}>
                    {isLoggingIn ? "Logging in..." : "Log in"}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <div className="text-sm opacity-0 text-center">
                <Link href="/forgot-password" className="text-brand-blue hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="text-sm text-center">
                Don't have an account?{" "}
                <Link href="/register" className="text-brand-blue hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <StatusToast status={isLoggingIn ? "pending" : loginError ? "error" : loginSuccess ? "success" : "idle"} />
      <Footer/>
    </>
  )
}
