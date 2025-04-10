// // pages/add-payment-method.tsx
// "use client"
// import { useState } from "react";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { Label } from "../ui/label";

// // ⚠️ Remplace par ta propre clé publique Stripe
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// const PaymentForm = () => {
//     console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,stripePromise)
//   const stripe = useStripe();
//   const elements = useElements();
//   const [cardHolder, setCardHolder] = useState("");
//   const [status, setStatus] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus("Processing...");

//     if (!stripe || !elements) return;

//     const cardElement = elements.getElement(CardElement);

//     const { paymentMethod, error } = await stripe.createPaymentMethod({
//       type: "card",
//       card: cardElement!,
//       billing_details: {
//         name: cardHolder,
//       },
//     });

//     if (error) {
//       console.error(error);
//       setStatus("Error: " + error.message);
//     } else {
//       const { id, card } = paymentMethod;

//       console.log("Stripe Payment Method:", {
//         stripe_payment_method_id: id,
//         card_brand: card?.brand,
//         last4: card?.last4,
//         expiry_month: card?.exp_month,
//         expiry_year: card?.exp_year,
//         card_holder: cardHolder,
//         is_default: true,
//       });

//       setStatus("Card added successfully! ✅");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
//       <input
//         type="text"
//         value={cardHolder}
//         onChange={(e) => setCardHolder(e.target.value)}
//         placeholder="Cardholder Name"
//         className="w-full p-2 border rounded"
//         required
//       />

//       <div className="space-y-2">
//         <Label htmlFor="card-element">Informations de carte</Label>
//         <div className="border rounded-md p-3">
//           <CardElement
//             id="card-element"
//             options={{
//               style: {
//                 base: {
//                   fontSize: "16px",
//                   color: "#424770",
//                   "::placeholder": {
//                     color: "#aab7c4",
//                   },
//                 },
//                 invalid: {
//                   color: "#9e2146",
//                 },
//               },
//             }}
//           />
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         disabled={!stripe}
//       >
//         Save Card
//       </button>

//       {status && <p className="text-center mt-4">{status}</p>}
//     </form>
//   );
// };

// export default function AddPaymentMethodPage() {
//   return (
//     <Elements stripe={stripePromise}>
//       <PaymentForm />
//     </Elements>
//   );
// }
// "use client"

// import type React from "react"

// import { useState } from "react"
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { AlertCircle, CheckCircle } from "lucide-react"

// export function PaymentForm() {
//   const stripe = useStripe()
//   const elements = useElements()
//   const [cardHolder, setCardHolder] = useState("")
//   const [isDefault, setIsDefault] = useState(true)
//   const [loading, setLoading] = useState(false)
//   const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({
//     type: "",
//     message: "",
//   })

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!stripe || !elements) {
//       setStatus({
//         type: "error",
//         message: "Stripe n'est pas encore chargé. Veuillez réessayer.",
//       })
//       return
//     }

//     setLoading(true)
//     setStatus({ type: "", message: "" })

//     const cardElement = elements.getElement(CardElement)

//     if (!cardElement) {
//       setStatus({
//         type: "error",
//         message: "Impossible de trouver l'élément de carte.",
//       })
//       setLoading(false)
//       return
//     }

//     try {
//       const { paymentMethod, error } = await stripe.createPaymentMethod({
//         type: "card",
//         card: cardElement,
//         billing_details: {
//           name: cardHolder,
//         },
//       })

//       if (error) {
//         console.error("Stripe error:", error)
//         setStatus({
//           type: "error",
//           message: `Erreur: ${error.message}`,
//         })
//       } else if (paymentMethod) {
//         const { id, card } = paymentMethod

//         // Créer l'objet au format demandé
//         const paymentData = {
//           stripe_payment_method_id: id,
//           card_brand: card?.brand || "unknown",
//           last4: card?.last4 || "****",
//           expiry_month: card?.exp_month || 0,
//           expiry_year: card?.exp_year || 0,
//           card_holder: cardHolder,
//           is_default: isDefault,
//         }

//         console.log("Payment method data:", paymentData)

//         // Ici, vous pouvez envoyer ces données à votre API
//         // await fetch('/api/payment-methods', {
//         //   method: 'POST',
//         //   headers: { 'Content-Type': 'application/json' },
//         //   body: JSON.stringify(paymentData)
//         // })

//         setStatus({
//           type: "success",
//           message: "Carte ajoutée avec succès!",
//         })

//         // Réinitialiser le formulaire
//         cardElement.clear()
//         setCardHolder("")
//       }
//     } catch (err) {
//       console.error("Unexpected error:", err)
//       setStatus({
//         type: "error",
//         message: "Une erreur inattendue s'est produite.",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Card className="max-w-md mx-auto">
//       <CardHeader>
//         <CardTitle>Informations de paiement</CardTitle>
//       </CardHeader>
//       <form onSubmit={handleSubmit}>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="card-holder">Nom du titulaire</Label>
//             <Input
//               id="card-holder"
//               value={cardHolder}
//               onChange={(e) => setCardHolder(e.target.value)}
//               placeholder="Nom complet du titulaire"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="card-element">Informations de carte</Label>
//             <div className="border rounded-md p-3 bg-white">
//               <CardElement
//                 id="card-element"
//                 options={{
//                   style: {
//                     base: {
//                       fontSize: "16px",
//                       color: "#424770",
//                       "::placeholder": {
//                         color: "#aab7c4",
//                       },
//                     },
//                     invalid: {
//                       color: "#9e2146",
//                     },
//                   },
//                   hidePostalCode: true,
//                 }}
//               />
//             </div>
//           </div>

//           <div className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               id="default-card"
//               checked={isDefault}
//               onChange={(e) => setIsDefault(e.target.checked)}
//               className="rounded border-gray-300"
//             />
//             <Label htmlFor="default-card" className="text-sm">
//               Définir comme méthode de paiement par défaut
//             </Label>
//           </div>

//           {status.message && (
//             <div
//               className={`p-3 rounded-md flex items-center space-x-2 ${
//                 status.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
//               }`}
//             >
//               {status.type === "error" ? <AlertCircle className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
//               <span>{status.message}</span>
//             </div>
//           )}
//         </CardContent>
//         <CardFooter>
//           <Button type="submit" className="w-full" disabled={!stripe || loading}>
//             {loading ? "Traitement en cours..." : "Enregistrer la carte"}
//           </Button>
//         </CardFooter>
//       </form>
//     </Card>
//   )
// }

"use client";

import type React from "react";
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, CheckCircle, Loader, Loader2 } from "lucide-react";
import { usePaymentMethods } from "@/hooks/use-paymentMethods";
import { useRouter } from "next/navigation";
import { useSelected } from "@/app/provider";

export function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const {
    createPaymentMethod,
    isCreateSuccess,
    isCreatingPaymentMethod,
    paymentMethods,
  } = usePaymentMethods();
  const [cardHolder, setCardHolder] = useState("");
  const [isDefault, setIsDefault] = useState(true);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | "";
    message: string;
  }>({
    type: "",
    message: "",
  });
  const {setActiveTab}=useSelected()
  console.log("paymentMethods", paymentMethods);
  const router =useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setStatus({
        type: "error",
        message: "Stripe is not loaded yet. Please try again.",
      });
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setStatus({
        type: "error",
        message: "Card element not found.",
      });
      setLoading(false);
      return;
    }

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: cardHolder,
        },
      });

      if (error) {
        console.error("Stripe error:", error);
        setStatus({
          type: "error",
          message: `Error: ${error.message}`,
        });
      } else if (paymentMethod) {
        const { id, card } = paymentMethod;

        const paymentData = {
          stripe_payment_method_id: id,
          card_brand: card?.brand || "unknown",
          last4: card?.last4 || "****",
          expiry_month: card?.exp_month || 0,
          expiry_year: card?.exp_year || 0,
          card_holder: cardHolder,
          is_default: isDefault,
        };
        createPaymentMethod(paymentData, {
          onSuccess: () => {
            setActiveTab(`payment-methods`)
          },
        });
        console.log("Payment method data:", paymentData);

        setStatus({
          type: "success",
          message: "Card added successfully!",
        });

        cardElement.clear();
        setCardHolder("");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setStatus({
        type: "error",
        message: "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      {isCreateSuccess && (
        <div className="p-3 rounded-md flex items-center space-x-2 bg-green-50 text-green-700">
          <CheckCircle className="h-5 w-5" />
          <span>Payment method added successfully!</span>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Payment Information
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="card-holder" className="text-sm text-gray-600">
              Cardholder Name
            </Label>
            <Input
              id="card-holder"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              placeholder="Full name on card"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="card-element" className="text-sm text-gray-600">
              Card Details
            </Label>
            <div className="border rounded-md p-3 bg-white shadow-sm">
              <CardElement
                id="card-element"
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#32325d",
                      fontFamily: "Arial, sans-serif",
                      "::placeholder": {
                        color: "#a0aec0",
                      },
                    },
                    invalid: {
                      color: "#e53e3e",
                    },
                  },
                  hidePostalCode: true,
                }}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="default-card"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="rounded border-gray-300 accent-amber-500"
            />
            <Label htmlFor="default-card" className="text-sm text-gray-600">
              Set as default payment method
            </Label>
          </div>

          {status.message && (
            <div
              className={`p-3 rounded-md flex items-center space-x-2 text-sm ${
                status.type === "error"
                  ? "bg-red-50 text-red-700"
                  : "bg-green-50 text-green-700"
              }`}
            >
              {status.type === "error" ? (
                <AlertCircle className="h-5 w-5" />
              ) : (
                <CheckCircle className="h-5 w-5" />
              )}
              <span>{status.message}</span>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={!stripe || loading || isCreatingPaymentMethod}
          >
            {isCreatingPaymentMethod && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isCreatingPaymentMethod ? "Processing..." : "Save Card"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
