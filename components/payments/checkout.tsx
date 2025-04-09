"use client"

import { use, useEffect, useState } from "react"
import { ChevronLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import PlanSelector from "./plan-selector"
import PaymentMethodsList from "./payment-method-list"
import AddPaymentMethodPage from "./payment-form-display"
import PlanSummary from "./plan-summary"
import { usePlans } from "@/hooks/use-plans"
import { usePaymentMethods } from "@/hooks/use-paymentMethods"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useSearchParams } from "next/navigation"
import { useSelected } from "@/app/provider"


// Sample data based on the provided formats
const initialPaymentMethods = [
  {
    id: "b5b334b4-5653-4c41-86e7-c2186918981b",
    user: 2,
    stripe_payment_method_id: "pm_1RBOm9RZozRKGddDDw9pzp02",
    card_brand: "visa",
    last4: "4242",
    expiry_month: 12,
    expiry_year: 2027,
    card_holder: "Credit card",
    is_default: true,
    added_on: "2025-04-07T23:08:22.386333Z",
  },
  {
    id: "b5b300000034b4-5653-4c41-86e7-c2186918981b",
    user: 2,
    stripe_payment_method_id: "pm_1RBOm9RZozRKGddDDw9pzp02",
    card_brand: "mastercard",
    last4: "5555",
    expiry_month: 10,
    expiry_year: 2026,
    card_holder: "Credit card",
    is_default: false,
    added_on: "2025-04-07T23:08:22.386333Z",
  },
]

const plans = [
  {
    id: 1,
    name: "Basic Plan",
    slug: "basic",
    description: "Plan de base avec fonctionnalités essentielles",
    price: "27.00",
    billing_cycle: "monthly",
    billing_cycle_display: "Monthly",
    is_active: true,
    features: {
      features: [
        {
          name: "Revenue Forecasting",
          included: true,
          description: "Basic forecasting with linear projections",
        },
        {
          name: "Lead Tracking",
          included: true,
          description: "Simple lead pipeline tracking",
        },
        {
          name: "AI-based Suggestions",
          included: true,
          description: "Basic AI-driven next step recommendations",
        },
        {
          name: "Content ROI",
          included: false,
          description: "Analyze return on investment for your content",
        },
        {
          name: "LTV to CAC Tracking",
          included: false,
          description: "Track lifetime value to customer acquisition cost ratio",
        },
        {
          name: "Advanced Forecasting",
          included: false,
          description: "Advanced forecasting with multiple scenarios and seasonality",
        },
        {
          name: "Milestone Tracking",
          included: false,
          description: "Set and track business milestones",
        },
        {
          name: "Data Exports",
          included: true,
          description: "Export data in various formats",
        },
      ],
    },
    sort_order: 1,
  },
  {
    id: 2,
    name: "Pro Plan",
    slug: "pro",
    description: "Plan professionnel avec toutes les fonctionnalités",
    price: "39.00",
    billing_cycle: "monthly",
    billing_cycle_display: "Monthly",
    is_active: true,
    features: {
      features: [
        {
          name: "Revenue Forecasting",
          included: true,
          description: "Basic forecasting with linear projections",
        },
        {
          name: "Lead Tracking",
          included: true,
          description: "Simple lead pipeline tracking",
        },
        {
          name: "AI-based Suggestions",
          included: true,
          description: "Advanced AI-driven business recommendations",
        },
        {
          name: "Content ROI",
          included: true,
          description: "Analyze return on investment for your content",
        },
        {
          name: "LTV to CAC Tracking",
          included: true,
          description: "Track lifetime value to customer acquisition cost ratio",
        },
        {
          name: "Advanced Forecasting",
          included: true,
          description: "Advanced forecasting with multiple scenarios and seasonality",
        },
        {
          name: "Milestone Tracking",
          included: true,
          description: "Set and track business milestones",
        },
        {
          name: "Data Exports",
          included: true,
          description: "Export data in various formats",
        },
      ],
    },
    sort_order: 2,
  },
  {
    id: 3,
    name: "Lifetime Plan",
    slug: "lifetime",
    description: "Accès illimité à toutes les fonctionnalités pour la vie",
    price: "497.00",
    billing_cycle: "one_time",
    billing_cycle_display: "One Time",
    is_active: true,
    features: {
      features: [
        {
          name: "Revenue Forecasting",
          included: true,
          description: "Basic forecasting with linear projections",
        },
        {
          name: "Lead Tracking",
          included: true,
          description: "Simple lead pipeline tracking",
        },
        {
          name: "AI-based Suggestions",
          included: true,
          description: "Advanced AI-driven business recommendations",
        },
        {
          name: "Content ROI",
          included: true,
          description: "Analyze return on investment for your content",
        },
        {
          name: "LTV to CAC Tracking",
          included: true,
          description: "Track lifetime value to customer acquisition cost ratio",
        },
        {
          name: "Advanced Forecasting",
          included: true,
          description: "Advanced forecasting with multiple scenarios and seasonality",
        },
        {
          name: "Milestone Tracking",
          included: true,
          description: "Set and track business milestones",
        },
        {
          name: "Data Exports",
          included: true,
          description: "Export data in various formats",
        },
        {
          name: "Priority Support",
          included: true,
          description: "Get priority assistance when you need help",
        },
        {
          name: "Future Features",
          included: true,
          description: "Access to all future features at no additional cost",
        },
      ],
    },
    sort_order: 3,
  },
]

export default function CheckoutPage() {
    const {plans} = usePlans()
    const {paymentMethods,createPaymentMethod} = usePaymentMethods()
    const seachParams = useSearchParams()
    const id = seachParams.get("checkout") ??1
  const [selectedPlan, setSelectedPlan] = useState(Array.isArray(plans) && plans[id as number]) 
  useEffect(() => {
    setSelectedPlan(Array.isArray(plans) && plans[id as number])
  }, [id,plans])
const {activeTab,setActiveTab}=useSelected()
  // const [activeTab, setActiveTab] = useState("payment-methods")
  const [isProcessing, setIsProcessing] = useState(false)
  // stripe_payment_method_id
  const [stripePaymentMethodId, setStripePaymentMethodId] = useState<string | null>(null)
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string | null>(null)
//   const [paymentMethods, setPaymentMethods] = useState(initialPaymentMethods)
  const [editingPaymentMethod, setEditingPaymentMethod] = useState<(typeof paymentMethods)[0] | null>(null)

  // Find default payment method
  const defaultPaymentMethod =Array.isArray(paymentMethods) && paymentMethods.find((method) => method.is_default)

  // Set default payment method on initial load if none selected
  if (!selectedPaymentMethodId && defaultPaymentMethod) {
    setSelectedPaymentMethodId(defaultPaymentMethod.id)
  }

  const handleConfirmPayment = async () => {
    if (!selectedPaymentMethodId) return

    setIsProcessing(true)

    
    setTimeout(() => {
      setIsProcessing(false)
    }, 2000)
  }

  const handleSelectPaymentMethod = (id: string) => {
    setSelectedPaymentMethodId(id)
  }

 

  const handleDeletePaymentMethod = (id: string) => {
    // Remove the payment method from the list
    const updatedMethods =Array.isArray(paymentMethods) && paymentMethods.filter((method) => method.id !== id)

    // If we're deleting the selected method, select another one
    if (selectedPaymentMethodId === id) {
      const defaultMethod = Array.isArray(updatedMethods) && updatedMethods.find((m) => m.is_default)
      setSelectedPaymentMethodId(defaultMethod ? defaultMethod.id :Array.isArray(updatedMethods) && updatedMethods[0]?.id || null)
    }

    // setPaymentMethods(updatedMethods)
  }

  const handleEditPaymentMethod = (method: (typeof paymentMethods)[0]) => {
    setEditingPaymentMethod(method)
    setActiveTab("edit-payment-method")
  }

 

  const handleSelectPlan = (plan: (typeof plans)[0]) => {
    setSelectedPlan(plan)
  }
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  return (
    <div className="min-h-screen ">
      <div className=" px-4 py-8">
        {/* <div className="mb-8">
          <Link href="/" className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Methods */}
          <div className="lg:col-span-2">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Checkout</CardTitle>
                <CardDescription>Complete your purchase</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
                    <TabsTrigger value="add-payment-method">Add New Method</TabsTrigger>
                  </TabsList>
                  <TabsContent value="payment-methods">
                    <PlanSelector plans={Array.isArray(plans) ? plans : []} selectedPlan={selectedPlan} onSelectPlan={handleSelectPlan} />
                    <PaymentMethodsList
                      paymentMethods={ Array.isArray(paymentMethods) ? paymentMethods :[]}
                      onSelectPaymentMethod={handleSelectPaymentMethod}
                      selectedPaymentMethodId={selectedPaymentMethodId}
                      onDeletePaymentMethod={handleDeletePaymentMethod}
                      onEditPaymentMethod={handleEditPaymentMethod}
                    />
                  </TabsContent>
                  <TabsContent value="add-payment-method">
                    <AddPaymentMethodPage  />
                  </TabsContent>
                  {/* <TabsContent value="edit-payment-method">
                    {editingPaymentMethod && (
                      <EditPaymentMethodForm
                        paymentMethod={editingPaymentMethod}
                        onSuccess={handleEditSuccess}
                        onCancel={() => {
                          setEditingPaymentMethod(null)
                          setActiveTab("payment-methods")
                        }}
                      />
                    )}
                  </TabsContent> */}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Plan Summary */}
          <div>
            <Elements stripe={stripePromise}>
            <PlanSummary
              plan={selectedPlan}
              onConfirm={handleConfirmPayment}
              isProcessing={isProcessing}
              selectedPaymentMethodId={selectedPaymentMethodId}
            />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  )
}
