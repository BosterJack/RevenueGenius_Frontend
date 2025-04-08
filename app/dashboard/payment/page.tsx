"use client"
import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutPage from '@/components/payments/checkout'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Page() {
  return (
    <>
      {stripePromise ? (
        <Elements stripe={stripePromise}>
          <CheckoutPage />
        </Elements>
      ) : (
        <div className="text-center bg-gray-100 p-7 rounded-lg border text-red-500 font-semibold">
          Error: Stripe key is not configured correctly.
        </div>
      )}
    </>
  )
}
