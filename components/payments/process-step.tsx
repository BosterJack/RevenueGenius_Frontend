"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProcessStepsProps {
  currentStep: number
  isRedirecting: boolean
  error: string | null
}

const steps = [
  { id: 1, title: "Creating payment" },
  { id: 2, title: "Verifying payment details" },
  { id: 3, title: "Processing payment" },
  { id: 4, title: "Confirming subscription" },
  { id: 5, title: "Payment complete" },
]

export function ProcessSteps({ currentStep, isRedirecting, error }: ProcessStepsProps) {
  const [progressWidth, setProgressWidth] = useState(0)

  useEffect(() => {
    // Calculate progress percentage based on current step
    const progress = ((currentStep - 1) / (steps.length - 1)) * 100
    setProgressWidth(progress)
  }, [currentStep])

  return (
    <Card className="shadow-md w-full max-w-md mx-auto">
      <CardHeader className="bg-gradient-to-r from-rose-100 to-teal-100 dark:from-rose-900 dark:to-teal-900">
        <CardTitle className="text-center">Payment Processing</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="relative h-2 bg-gray-200 rounded-full mb-6">
          <div
            className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progressWidth}%` }}
          />
        </div>

        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "flex items-center p-3 rounded-lg transition-all duration-300",
                currentStep === step.id ? "bg-gray-100 dark:bg-gray-800" : "",
                currentStep > step.id ? "text-green-600 dark:text-green-400" : "",
              )}
            >
              <div className="mr-3 flex-shrink-0">
                {currentStep > step.id ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : currentStep === step.id ? (
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                ) : (
                  <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
                )}
              </div>
              <div className="flex-grow">
                <p className={cn("font-medium", currentStep === step.id ? "text-primary" : "")}>{step.title}</p>
              </div>
            </div>
          ))}
        </div>

        {isRedirecting && (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">Redirecting to dashboard in 2 seconds...</p>
            <div className="mt-2">
              <Loader2 className="h-5 w-5 animate-spin mx-auto" />
            </div>
          </div>
        )}

        {error && (
          <Alert className="mt-6 bg-red-50 text-red-800 border-red-200">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
