"use client"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { PaymentForm } from "./process-payment-form"



const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function AddPaymentMethodPage() {
  return (
    <div className="">
      {/* <h1 className="text-2xl font-bold text-center mb-6">Add a payment method</h1> */}

      
      {stripePromise ? (
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      ) : (
        <div className="text-center bg-gray-100 p-7 rounded-lg border text-red-500 font-semibold">
          Error: Stripe key is not configured correctly.
        </div>
      )}
    </div>
  )
}

