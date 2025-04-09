// // // // "use client";

// // // // import { Check, Loader2 } from "lucide-react";
// // // // import { Button } from "@/components/ui/button";
// // // // import {
// // // //   Card,
// // // //   CardContent,
// // // //   CardFooter,
// // // //   CardHeader,
// // // //   CardTitle,
// // // // } from "@/components/ui/card";
// // // // import { Badge } from "@/components/ui/badge";
// // // // import { Alert, AlertDescription } from "@/components/ui/alert";
// // // // import { AlertCircle, CheckCircle2 } from "lucide-react";
// // // // import { useState } from "react";
// // // // import { useSubscriptions } from "@/hooks/use-subscription";
// // // // import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// // // // import { useAuth } from "@/hooks/use-auth";

// // // // interface Feature {
// // // //   name: string;
// // // //   included: boolean;
// // // //   description: string;
// // // // }

// // // // interface Plan {
// // // //   id: number;
// // // //   name: string;
// // // //   slug: string;
// // // //   description: string;
// // // //   price: string;
// // // //   billing_cycle: string;
// // // //   billing_cycle_display: string;
// // // //   is_active: boolean;
// // // //   features: {
// // // //     features: Feature[];
// // // //   };
// // // //   sort_order: number;
// // // // }

// // // // interface PlanSummaryProps {
// // // //   plan: Plan;
// // // //   onConfirm: () => void;
// // // //   isProcessing: boolean;
// // // //   selectedPaymentMethodId: string | null;
// // // // }

// // // // export default function PlanSummary({
// // // //   plan,
// // // //   onConfirm,
// // // //   isProcessing,
// // // //   selectedPaymentMethodId,
// // // // }: PlanSummaryProps) {
// // // //   const [paymentStatus, setPaymentStatus] = useState<
// // // //     "idle" | "success" | "error"
// // // //   >("idle");
// // // //   // Get only the included features for display in summary
// // // //   const includedFeatures = plan.features.features.filter(
// // // //     (feature) => feature.included
// // // //   );

// // // //   // Format price for display
// // // //   const formatPrice = (price: string, cycle: string) => {
// // // //     if (cycle === "one_time") {
// // // //       return `${price}€`;
// // // //     }
// // // //     return `${price}€/${cycle === "monthly" ? "mo" : "yr"}`;
// // // //   };

// // // //   const {
// // // //     createPaymentIntent,
// // // //     confirmPayment,
// // // //     isCreatingPaymentIntent,
// // // //     isConfirmingPayment,
// // // //   } = useSubscriptions();

// // // //   const [clientSecret, setClientSecret] = useState("");
// // // //   const [paymentIntentId, setPaymentIntentId] = useState("");
// // // //   const [setupIntentId, setSetupIntentId] = useState("");
// // // //   const [isSubscription, setIsSubscription] = useState(false);
// // // //   const [error, setError] = useState<string | null>(null);
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const stripe = useStripe();
// // // //   const elements = useElements();
// // // //   const handleCreatePaymentIntent = () => {
// // // //     setIsLoading(true);
// // // //     setError(null);

// // // //     if (!plan?.id) return;

// // // //     createPaymentIntent(
// // // //       { plan_id: plan.id },
// // // //       {
// // // //         onSuccess: (data) => {
// // // //           console.log(data, "data");
// // // //           setClientSecret(data.clientSecret);
// // // //           setIsSubscription(data.isSubscription);
// // // //           setPaymentIntentId(data.paymentIntentId || "");
// // // //           setSetupIntentId(data.setupIntentId || "");
// // // //           setIsLoading(false);
// // // //           setTimeout(() => {
// // // //             handleSubmit();
// // // //           }, 1000);
// // // //         },
// // // //         onError: (err: any) => {
// // // //           console.error("Error creating payment intent:", err);
// // // //           setError(err?.response?.data?.error || "Une erreur s’est produite");
// // // //           setIsLoading(false);
// // // //           setTimeout(() => {
// // // //             handleSubmit();
// // // //           }, 1000);
// // // //         },
// // // //       }
// // // //     );
// // // //   };
// // // //   const { user } = useAuth();
// // // //   const handleSubmit = async () => {
// // // //     // event.preventDefault();
// // // //     const cardElement = elements?.getElement(CardElement);
// // // //     if (!stripe || !elements) return;

// // // //     setIsLoading(true);
// // // //     setError(null);
// // // //     console.log(cardElement, "cardElement");
// // // //     try {
// // // //       let paymentResult;
// // // //       let paymentMethod;

// // // //       if (isSubscription) {
// // // //         paymentResult = await stripe.confirmCardSetup(clientSecret, {
// // // //           payment_method: {
// // // //             card: elements.getElement(CardElement)!,
// // // //             billing_details: {
// // // //               name: user?.username,
// // // //             },
// // // //           },
// // // //         });
// // // //         console.log("lock", paymentResult);
// // // //         if (paymentResult.error) throw paymentResult.error;

// // // //         paymentMethod = paymentResult.setupIntent.payment_method;
// // // //       } else {
// // // //         paymentResult = await stripe.confirmCardPayment(clientSecret, {
// // // //           payment_method: {
// // // //             card: elements.getElement(CardElement)!,
// // // //             billing_details: {
// // // //               name: "User Name",
// // // //             },
// // // //           },
// // // //         });
// // // //         console.log("block", paymentResult);
// // // //         if (paymentResult.error) throw paymentResult.error;

// // // //         paymentMethod = paymentResult.paymentIntent.payment_method;
// // // //       }

// // // //       confirmPayment(
// // // //         {
// // // //           payment_intent_id: isSubscription ? null : paymentIntentId,
// // // //           setup_intent_id: isSubscription ? setupIntentId : null,
// // // //           payment_method_id: paymentMethod,
// // // //           plan_id: plan?.id,
// // // //         },
// // // //         {
// // // //           onSuccess: (data) => {
// // // //             // onSuccess?.(data.subscription)
// // // //             setIsLoading(false);
// // // //           },
// // // //           onError: (err: any) => {
// // // //             console.error("Payment error:", err);
// // // //             setError(
// // // //               err?.response?.data?.error ||
// // // //                 "Une erreur s’est produite lors du paiement"
// // // //             );
// // // //             setIsLoading(false);
// // // //           },
// // // //         }
// // // //       );
// // // //     } catch (error: any) {
// // // //       console.log("Stripe error:", error);
// // // //       setError(error?.message || "Une erreur s’est produite avec Stripe");
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <Card className="shadow-md sticky top-8">
// // // //       <CardHeader className="bg-gradient-to-r from-rose-100 to-teal-100 dark:from-rose-900 dark:to-teal-900">
// // // //         <CardTitle className="flex items-center justify-between">
// // // //           <span>{plan.name}</span>
// // // //           <Badge variant="secondary" className="ml-2">
// // // //             {plan.billing_cycle_display}
// // // //           </Badge>
// // // //         </CardTitle>
// // // //       </CardHeader>
// // // //       <CardContent className="pt-6">
// // // //         <div className="mb-6">
// // // //           <div className="text-3xl font-bold mb-1">
// // // //             {formatPrice(plan.price, plan.billing_cycle)}
// // // //           </div>
// // // //           <p className="text-gray-500 text-sm">{plan.description}</p>
// // // //         </div>

// // // //         <div className="space-y-4">
// // // //           <h4 className="font-medium">Plan includes:</h4>
// // // //           <ul className="space-y-2">
// // // //             {includedFeatures.slice(0, 5).map((feature, index) => (
// // // //               <li key={index} className="flex items-start">
// // // //                 <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
// // // //                 <span className="text-sm">{feature.name}</span>
// // // //               </li>
// // // //             ))}
// // // //             {includedFeatures.length > 5 && (
// // // //               <li className="text-sm text-gray-500 pl-7">
// // // //                 +{includedFeatures.length - 5} more features
// // // //               </li>
// // // //             )}
// // // //           </ul>
// // // //         </div>

// // // //         {paymentStatus === "success" && (
// // // //           <Alert className="mt-4 bg-green-50 text-green-800 border-green-200">
// // // //             <CheckCircle2 className="h-4 w-4" />
// // // //             <AlertDescription>
// // // //               Payment successful! Your subscription is now active.
// // // //             </AlertDescription>
// // // //           </Alert>
// // // //         )}

// // // //         {paymentStatus === "error" && (
// // // //           <Alert className="mt-4 bg-red-50 text-red-800 border-red-200">
// // // //             <AlertCircle className="h-4 w-4" />
// // // //             <AlertDescription>
// // // //               Payment failed. Please try again or use a different payment
// // // //               method.
// // // //             </AlertDescription>
// // // //           </Alert>
// // // //         )}
// // // //       </CardContent>
// // // //       <CardFooter className="flex flex-col space-y-4 pt-4 border-t">
// // // //         <div className="w-full flex justify-between text-sm">
// // // //           <span className="text-gray-500">Subtotal</span>
// // // //           <span>{formatPrice(plan.price, plan.billing_cycle)}</span>
// // // //         </div>
// // // //         {plan.billing_cycle !== "one_time" && (
// // // //           <div className="w-full flex justify-between text-sm">
// // // //             <span className="text-gray-500">Billing</span>
// // // //             <span>{plan.billing_cycle_display}</span>
// // // //           </div>
// // // //         )}
// // // //         <div className="w-full flex justify-between font-medium">
// // // //           <span>Total</span>
// // // //           <span>{formatPrice(plan.price, plan.billing_cycle)}</span>
// // // //         </div>

// // // //         <Button
// // // //           className="w-full mt-4"
// // // //           size="lg"
// // // //           onClick={handleCreatePaymentIntent}
// // // //           disabled={isCreatingPaymentIntent || !selectedPaymentMethodId}
// // // //         >
// // // //           {isCreatingPaymentIntent ? (
// // // //             <span className="flex items-center">
// // // //               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// // // //               Processing...
// // // //             </span>
// // // //           ) : (
// // // //             "Confirm Payment"
// // // //           )}
// // // //         </Button>

// // // //         {!selectedPaymentMethodId && (
// // // //           <p className="text-xs text-center text-amber-600 mt-1">
// // // //             Please select a payment method to continue
// // // //           </p>
// // // //         )}

// // // //         <p className="text-xs text-center text-gray-500 mt-2">
// // // //           By confirming, you agree to our Terms of Service and Privacy Policy
// // // //         </p>
// // // //       </CardFooter>

    
// // // //     </Card>
// // // //   );
// // // // }
// // // "use client";

// // // import { Check, Loader2 } from "lucide-react";
// // // import { Button } from "@/components/ui/button";
// // // import {
// // //   Card,
// // //   CardContent,
// // //   CardFooter,
// // //   CardHeader,
// // //   CardTitle,
// // // } from "@/components/ui/card";
// // // import { Badge } from "@/components/ui/badge";
// // // import { Alert, AlertDescription } from "@/components/ui/alert";
// // // import { AlertCircle, CheckCircle2 } from "lucide-react";
// // // import { useState } from "react";
// // // import { useSubscriptions } from "@/hooks/use-subscription";
// // // import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// // // import { useAuth } from "@/hooks/use-auth";

// // // interface Feature {
// // //   name: string;
// // //   included: boolean;
// // //   description: string;
// // // }

// // // interface Plan {
// // //   id: number;
// // //   name: string;
// // //   slug: string;
// // //   description: string;
// // //   price: string;
// // //   billing_cycle: string;
// // //   billing_cycle_display: string;
// // //   is_active: boolean;
// // //   features: {
// // //     features: Feature[];
// // //   };
// // //   sort_order: number;
// // // }

// // // interface PlanSummaryProps {
// // //   plan: Plan;
// // //   onConfirm: () => void;
// // //   isProcessing: boolean;
// // //   selectedPaymentMethodId: string | null;
// // // }

// // // export default function PlanSummary({
// // //   plan,
// // //   onConfirm,
// // //   isProcessing,
// // //   selectedPaymentMethodId,
// // // }: PlanSummaryProps) {
// // //   const [paymentStatus, setPaymentStatus] = useState<
// // //     "idle" | "success" | "error"
// // //   >("idle");
// // //   // Get only the included features for display in summary
// // //   const includedFeatures = plan.features.features.filter(
// // //     (feature) => feature.included
// // //   );

// // //   // Format price for display
// // //   const formatPrice = (price: string, cycle: string) => {
// // //     if (cycle === "one_time") {
// // //       return `${price}€`;
// // //     }
// // //     return `${price}€/${cycle === "monthly" ? "mo" : "yr"}`;
// // //   };

// // //   const {
// // //     createPaymentIntent,
// // //     confirmPayment,
// // //     isCreatingPaymentIntent,
// // //     isConfirmingPayment,
// // //   } = useSubscriptions();

// // //   const [clientSecret, setClientSecret] = useState("");
// // //   const [paymentIntentId, setPaymentIntentId] = useState("");
// // //   const [setupIntentId, setSetupIntentId] = useState("");
// // //   const [isSubscription, setIsSubscription] = useState(false);
// // //   const [error, setError] = useState<string | null>(null);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const stripe = useStripe();
// // //   const elements = useElements();
// // //   const { user } = useAuth();
  
// // //   const handleCreatePaymentIntent = async () => {
// // //     if (!stripe || !elements) {
// // //       setError("Stripe has not been properly initialized");
// // //       return;
// // //     }
    
// // //     setIsLoading(true);
// // //     setError(null);

// // //     if (!plan?.id) {
// // //       setError("No plan selected");
// // //       setIsLoading(false);
// // //       return;
// // //     }

// // //     try {
// // //       createPaymentIntent(
// // //         { plan_id: plan.id },
// // //         {
// // //           onSuccess: (data) => {
// // //             console.log("Payment intent created:", data);
// // //             if (!data.clientSecret) {
// // //               console.log("No client secret returned from server");
// // //               setIsLoading(false);
// // //               return;
// // //             }else{
// // //                console.log("No client secret returned from server");
// // //             }
            
// // //             setClientSecret(data.clientSecret);
// // //             setIsSubscription(data.isSubscription);
// // //             setPaymentIntentId(data.paymentIntentId || "");
// // //             setSetupIntentId(data.setupIntentId || "");
            
// // //             // Process payment immediately after receiving clientSecret
// // //             handleSubmitPayment(data.clientSecret, data.isSubscription, 
// // //                                data.paymentIntentId || "", data.setupIntentId || "");
// // //           },
// // //           onError: (err: any) => {
// // //             console.error("Error creating payment intent:", err);
// // //             setError(err?.response?.data?.error || "An error occurred while creating payment intent");
// // //             setIsLoading(false);
// // //           },
// // //         }
// // //       );
// // //     } catch (error: any) {
// // //       console.error("Exception during payment intent creation:", error);
// // //       setError("Failed to create payment intent");
// // //       setIsLoading(false);
// // //     }
// // //   };
  
// // //   const handleSubmitPayment = async (
// // //     secret: string, 
// // //     isSubscriptionPayment: boolean,
// // //     paymentId: string,
// // //     setupId: string
// // //   ) => {
// // //     if (!stripe || !elements) {
// // //       console.log("Stripe has not been properly initialized");
// // //       setIsLoading(false);
// // //       return;
// // //     }
    
// // //     const cardElement = elements.getElement(CardElement);
// // //     if (!cardElement) {
// // //       console.log("Card element not found");
// // //       setIsLoading(false);
// // //       return;
// // //     }
    
// // //     if (!secret) {
// // //       setError("Missing payment secret");
// // //       setIsLoading(false);
// // //       return;
// // //     }
    
// // //     try {
// // //       let paymentResult;
// // //       let paymentMethod;

// // //       if (isSubscriptionPayment) {
// // //         console.log(`Processing subscription setup with secret: ${secret.substring(0, 10)}...`);
// // //         paymentResult = await stripe.confirmCardSetup(secret, {
// // //           payment_method: {
// // //             card: cardElement,
// // //             billing_details: {
// // //               name: user?.username || "Customer",
// // //             },
// // //           },
// // //         });
        
// // //         if (paymentResult.error) {
// // //           throw paymentResult.error;
// // //         }

// // //         paymentMethod = paymentResult.setupIntent.payment_method;
// // //       } else {
// // //         console.log(`Processing one-time payment with secret: ${secret.substring(0, 10)}...`);
// // //         paymentResult = await stripe.confirmCardPayment(secret, {
// // //           payment_method: {
// // //             card: cardElement,
// // //             billing_details: {
// // //               name: user?.username || "Customer",
// // //             },
// // //           },
// // //         });
        
// // //         if (paymentResult.error) {
// // //           throw paymentResult.error;
// // //         }

// // //         paymentMethod = paymentResult.paymentIntent.payment_method;
// // //       }

// // //       confirmPayment(
// // //         {
// // //           payment_intent_id: isSubscriptionPayment ? null : paymentId,
// // //           setup_intent_id: isSubscriptionPayment ? setupId : null,
// // //           payment_method_id: paymentMethod,
// // //           plan_id: plan?.id,
// // //         },
// // //         {
// // //           onSuccess: (data) => {
// // //             console.log("Payment confirmed successfully:", data);
// // //             setPaymentStatus("success");
// // //             setIsLoading(false);
// // //             onConfirm();
// // //           },
// // //           onError: (err: any) => {
// // //             console.error("Payment error:", err);
// // //             setError(
// // //               err?.response?.data?.error ||
// // //                 "An error occurred during payment processing"
// // //             );
// // //             setPaymentStatus("error");
// // //             setIsLoading(false);
// // //           },
// // //         }
// // //       );
// // //     } catch (error: any) {
// // //       console.error("Stripe error:", error);
// // //       setError(error?.message || "An error occurred with Stripe");
// // //       setPaymentStatus("error");
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   // Original handleSubmit is replaced by handleSubmitPayment with better params

// // //   return (
// // //     <Card className="shadow-md sticky top-8">
// // //       <CardHeader className="bg-gradient-to-r from-rose-100 to-teal-100 dark:from-rose-900 dark:to-teal-900">
// // //         <CardTitle className="flex items-center justify-between">
// // //           <span>{plan.name}</span>
// // //           <Badge variant="secondary" className="ml-2">
// // //             {plan.billing_cycle_display}
// // //           </Badge>
// // //         </CardTitle>
// // //       </CardHeader>
// // //       <CardContent className="pt-6">
// // //         <div className="mb-6">
// // //           <div className="text-3xl font-bold mb-1">
// // //             {formatPrice(plan.price, plan.billing_cycle)}
// // //           </div>
// // //           <p className="text-gray-500 text-sm">{plan.description}</p>
// // //         </div>

// // //         <div className="space-y-4">
// // //           <h4 className="font-medium">Plan includes:</h4>
// // //           <ul className="space-y-2">
// // //             {includedFeatures.slice(0, 5).map((feature, index) => (
// // //               <li key={index} className="flex items-start">
// // //                 <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
// // //                 <span className="text-sm">{feature.name}</span>
// // //               </li>
// // //             ))}
// // //             {includedFeatures.length > 5 && (
// // //               <li className="text-sm text-gray-500 pl-7">
// // //                 +{includedFeatures.length - 5} more features
// // //               </li>
// // //             )}
// // //           </ul>
// // //         </div>

// // //         {paymentStatus === "success" && (
// // //           <Alert className="mt-4 bg-green-50 text-green-800 border-green-200">
// // //             <CheckCircle2 className="h-4 w-4" />
// // //             <AlertDescription>
// // //               Payment successful! Your subscription is now active.
// // //             </AlertDescription>
// // //           </Alert>
// // //         )}

// // //         {paymentStatus === "error" && (
// // //           <Alert className="mt-4 bg-red-50 text-red-800 border-red-200">
// // //             <AlertCircle className="h-4 w-4" />
// // //             <AlertDescription>
// // //               {error || "Payment failed. Please try again or use a different payment method."}
// // //             </AlertDescription>
// // //           </Alert>
// // //         )}
// // //       </CardContent>
// // //       <CardFooter className="flex flex-col space-y-4 pt-4 border-t">
// // //         <div className="w-full flex justify-between text-sm">
// // //           <span className="text-gray-500">Subtotal</span>
// // //           <span>{formatPrice(plan.price, plan.billing_cycle)}</span>
// // //         </div>
// // //         {plan.billing_cycle !== "one_time" && (
// // //           <div className="w-full flex justify-between text-sm">
// // //             <span className="text-gray-500">Billing</span>
// // //             <span>{plan.billing_cycle_display}</span>
// // //           </div>
// // //         )}
// // //         <div className="w-full flex justify-between font-medium">
// // //           <span>Total</span>
// // //           <span>{formatPrice(plan.price, plan.billing_cycle)}</span>
// // //         </div>

// // //         <Button
// // //           className="w-full mt-4"
// // //           size="lg"
// // //           onClick={handleCreatePaymentIntent}
// // //           disabled={isLoading || isCreatingPaymentIntent || !selectedPaymentMethodId || !stripe || !elements}
// // //         >
// // //           {isLoading || isCreatingPaymentIntent ? (
// // //             <span className="flex items-center">
// // //               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// // //               Processing...
// // //             </span>
// // //           ) : (
// // //             "Confirm Payment"
// // //           )}
// // //         </Button>

// // //         {!selectedPaymentMethodId && (
// // //           <p className="text-xs text-center text-amber-600 mt-1">
// // //             Please select a payment method to continue
// // //           </p>
// // //         )}

// // //         <p className="text-xs text-center text-gray-500 mt-2">
// // //           By confirming, you agree to our Terms of Service and Privacy Policy
// // //         </p>
// // //       </CardFooter>
// // //     </Card>
// // //   );
// // // }








// // "use client";

// // import { Check, Loader2 } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Card,
// //   CardContent,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { Alert, AlertDescription } from "@/components/ui/alert";
// // import { AlertCircle, CheckCircle2 } from "lucide-react";
// // import { useState, useEffect } from "react";
// // import { useSubscriptions } from "@/hooks/use-subscription";
// // import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// // import { useAuth } from "@/hooks/use-auth";

// // interface Feature {
// //   name: string;
// //   included: boolean;
// //   description: string;
// // }

// // interface Plan {
// //   id: number;
// //   name: string;
// //   slug: string;
// //   description: string;
// //   price: string;
// //   billing_cycle: string;
// //   billing_cycle_display: string;
// //   is_active: boolean;
// //   features: {
// //     features: Feature[];
// //   };
// //   sort_order: number;
// // }

// // interface PlanSummaryProps {
// //   plan: Plan;
// //   onConfirm: () => void;
// //   isProcessing: boolean;
// //   selectedPaymentMethodId: string | null;
// // }

// // export default function PlanSummary({
// //   plan,
// //   onConfirm,
// //   isProcessing,
// //   selectedPaymentMethodId,
// // }: PlanSummaryProps) {
// //   const [paymentStatus, setPaymentStatus] = useState<
// //     "idle" | "success" | "error"
// //   >("idle");
// //   // Get only the included features for display in summary
// //   const includedFeatures = plan.features.features.filter(
// //     (feature) => feature.included
// //   );

// //   // Format price for display
// //   const formatPrice = (price: string, cycle: string) => {
// //     if (cycle === "one_time") {
// //       return `${price}€`;
// //     }
// //     return `${price}€/${cycle === "monthly" ? "mo" : "yr"}`;
// //   };

// //   const {
// //     createPaymentIntent,
// //     confirmPayment,
// //     isCreatingPaymentIntent,
// //     isConfirmingPayment,
// //   } = useSubscriptions();

// //   const [clientSecret, setClientSecret] = useState("");
// //   const [paymentIntentId, setPaymentIntentId] = useState("");
// //   const [setupIntentId, setSetupIntentId] = useState("");
// //   const [isSubscription, setIsSubscription] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const stripe = useStripe();
// //   const elements = useElements();
// //   const { user } = useAuth();
  
// //   // We'll use this to verify if CardElement is ready
// //   const [cardElementReady, setCardElementReady] = useState(false);
  
// //   // Check if Stripe and Elements are ready
// //   useEffect(() => {
// //     if (stripe && elements) {
// //       // Check if the CardElement exists
// //       const cardElement = elements.getElement(CardElement);
// //       setCardElementReady(!!cardElement);
// //     }
// //   }, [stripe, elements]);
// //   useEffect(() => {
// //   const checkCard = setInterval(() => {
// //     const card = elements?.getElement(CardElement);
// //     console.log("CardElement exists?", !!card);
// //   }, 500);

// //   return () => clearInterval(checkCard);
// // }, [elements]);

// //   const handleCreatePaymentIntent = async () => {
// //     if (!stripe || !elements) {
// //       setError("Stripe has not been properly initialized");
// //       return;
// //     }
    
// //     // Make sure we have a card element before proceeding
// //     const cardElement = elements.getElement(CardElement);
// //     // if (!cardElement) {
// //     //   setError("Please enter card details first");
// //     //   return;
// //     // }
    
// //     setIsLoading(true);
// //     setError(null);

// //     if (!plan?.id) {
// //       setError("No plan selected");
// //       setIsLoading(false);
// //       return;
// //     }

// //     // First just create the payment intent
// //     try {
// //       createPaymentIntent(
// //         { plan_id: plan.id },
// //         {
// //           onSuccess: (data) => {
// //             console.log("Payment intent created:", data);
// //             if (!data.clientSecret) {
// //               setError("No client secret returned from server");
// //               setIsLoading(false);
// //               return;
// //             }
            
// //             setClientSecret(data.clientSecret);
// //             setIsSubscription(data.isSubscription);
// //             setPaymentIntentId(data.paymentIntentId || "");
// //             setSetupIntentId(data.setupIntentId || "");
            
// //             // Now that we have all the data, process the payment
// //              processPayment(
// //     data.clientSecret,
// //     data.isSubscription,
// //     data.paymentIntentId || "",
// //     data.setupIntentId || "",
// //     selectedPaymentMethodId // ici tu mets la méthode existante si dispo
// //   );
// //           },
// //           onError: (err: any) => {
// //             console.error("Error creating payment intent:", err);
// //             setError(err?.response?.data?.error || "An error occurred while creating payment intent");
// //             setIsLoading(false);
// //           },
// //         }
// //       );
// //     } catch (error: any) {
// //       console.error("Exception during payment intent creation:", error);
// //       setError("Failed to create payment intent");
// //       setIsLoading(false);
// //     }
// //   };
  
// //   // const processPayment = async (
// //   //   secret: string, 
// //   //   isSubscriptionPayment: boolean,
// //   //   paymentId: string,
// //   //   setupId: string
// //   // ) => {
// //   //   if (!stripe || !elements) {
// //   //     setError("Stripe has not been properly initialized");
// //   //     setIsLoading(false);
// //   //     return;
// //   //   }
    
// //   //   // Get the card element again right when we need it
// //   //   const cardElement = elements.getElement(CardElement);
// //   //   if (!cardElement) {
// //   //     setError("Card element not found. Please refresh and try again.");
// //   //     setIsLoading(false);
// //   //     return;
// //   //   }
    
// //   //   if (!secret) {
// //   //     setError("Missing payment secret");
// //   //     setIsLoading(false);
// //   //     return;
// //   //   }
    
// //   //   try {
// //   //     let paymentResult;
// //   //     let paymentMethod;

// //   //     if (isSubscriptionPayment) {
// //   //       console.log(`Processing subscription setup with secret: ${secret.substring(0, 10)}...`);
// //   //       paymentResult = await stripe.confirmCardSetup(secret, {
// //   //         payment_method: {
// //   //           card: cardElement,
// //   //           billing_details: {
// //   //             name: user?.username || "Customer",
// //   //           },
// //   //         },
// //   //       });
        
// //   //       if (paymentResult.error) {
// //   //         throw paymentResult.error;
// //   //       }

// //   //       paymentMethod = paymentResult.setupIntent.payment_method;
// //   //     } else {
// //   //       console.log(`Processing one-time payment with secret: ${secret.substring(0, 10)}...`);
// //   //       paymentResult = await stripe.confirmCardPayment(secret, {
// //   //         payment_method: {
// //   //           card: cardElement,
// //   //           billing_details: {
// //   //             name: user?.username || "Customer",
// //   //           },
// //   //         },
// //   //       });
        
// //   //       if (paymentResult.error) {
// //   //         throw paymentResult.error;
// //   //       }

// //   //       paymentMethod = paymentResult.paymentIntent.payment_method;
// //   //     }

// //   //     // Now confirm with our backend
// //   //     confirmPayment(
// //   //       {
// //   //         payment_intent_id: isSubscriptionPayment ? null : paymentId,
// //   //         setup_intent_id: isSubscriptionPayment ? setupId : null,
// //   //         payment_method_id: paymentMethod,
// //   //         plan_id: plan?.id,
// //   //       },  
// //   //       {
// //   //         onSuccess: (data) => {
// //   //           console.log("Payment confirmed successfully:", data);
// //   //           setPaymentStatus("success");
// //   //           setIsLoading(false);
// //   //           onConfirm();
// //   //         },
// //   //         onError: (err: any) => {
// //   //           console.error("Payment error:", err);
// //   //           setError(
// //   //             err?.response?.data?.error ||
// //   //               "An error occurred during payment processing"
// //   //           );
// //   //           setPaymentStatus("error");
// //   //           setIsLoading(false);
// //   //         },
// //   //       }
// //   //     );
// //   //   } catch (error: any) {
// //   //     console.error("Stripe error:", error);
// //   //     setError(error?.message || "An error occurred with Stripe");
// //   //     setPaymentStatus("error");
// //   //     setIsLoading(false);
// //   //   }
// //   // };
// // const processPayment = async (
// //   secret: string,
// //   isSubscriptionPayment: boolean,
// //   paymentId: string,
// //   setupId: string,
// //   existingPaymentMethodId?: string // optionnel
// // ) => {
// //   if (!stripe || !elements) {
// //     setError("Stripe n'est pas initialisé");
// //     setIsLoading(false);
// //     return;
// //   }

// //   try {
// //     let paymentResult;
// //     let paymentMethod;

// //     // Cas 1 : une méthode existante est fournie
// //     if (existingPaymentMethodId) {
// //       if (isSubscriptionPayment) {
// //         paymentResult = await stripe.confirmCardSetup(secret, {
// //           payment_method: existingPaymentMethodId,
// //         });
// //       } else {
// //         paymentResult = await stripe.confirmCardPayment(secret, {
// //           payment_method: existingPaymentMethodId,
// //         });
// //       }
// //     } else {
// //       // Cas 2 : l'utilisateur remplit une nouvelle carte via CardElement
// //       const cardElement = elements.getElement(CardElement);
// //       if (!cardElement) {
// //         setError("Veuillez entrer vos informations de carte");
// //         setIsLoading(false);
// //         return;
// //       }

// //       if (isSubscriptionPayment) {
// //         paymentResult = await stripe.confirmCardSetup(secret, {
// //           payment_method: {
// //             card: cardElement,
// //             billing_details: {
// //               name: user?.username || "Client",
// //             },
// //           },
// //         });
// //       } else {
// //         paymentResult = await stripe.confirmCardPayment(secret, {
// //           payment_method: {
// //             card: cardElement,
// //             billing_details: {
// //               name: user?.username || "Client",
// //             },
// //           },
// //         });
// //       }
// //     }

// //     // Gestion des erreurs Stripe
// //     if (paymentResult.error) {
// //       throw paymentResult.error;
// //     }

// //     // Récupération du payment_method_id selon le cas
// //     if (isSubscriptionPayment) {
// //       paymentMethod = paymentResult.setupIntent.payment_method;
// //     } else {
// //       paymentMethod = paymentResult.paymentIntent.payment_method;
// //     }

// //     // Appel au backend pour confirmer le paiement
// //     confirmPayment(
// //       {
// //         payment_intent_id: isSubscriptionPayment ? null : paymentId,
// //         setup_intent_id: isSubscriptionPayment ? setupId : null,
// //         payment_method_id: paymentMethod,
// //         plan_id: plan?.id,
// //       },
// //       {
// //         onSuccess: (data) => {
// //           setPaymentStatus("success");
// //           setIsLoading(false);
// //           onConfirm();
// //         },
// //         onError: (err: any) => {
// //           setError(
// //             err?.response?.data?.error ||
// //               "Erreur lors de la confirmation du paiement"
// //           );
// //           setPaymentStatus("error");
// //           setIsLoading(false);
// //         },
// //       }
// //     );
// //   } catch (error: any) {
// //     setError(error?.message || "Erreur avec Stripe");
// //     setPaymentStatus("error");
// //     setIsLoading(false);
// //   }
// // };

// //   return (
// //     <Card className="shadow-md sticky top-8">
// //       <CardHeader className="bg-gradient-to-r from-rose-100 to-teal-100 dark:from-rose-900 dark:to-teal-900">
// //         <CardTitle className="flex items-center justify-between">
// //           <span>{plan.name}</span>
// //           <Badge variant="secondary" className="ml-2">
// //             {plan.billing_cycle_display}
// //           </Badge>
// //         </CardTitle>
// //       </CardHeader>
// //       <CardContent className="pt-6">
// //         <div className="mb-6">
// //           <div className="text-3xl font-bold mb-1">
// //             {formatPrice(plan.price, plan.billing_cycle)}
// //           </div>
// //           <p className="text-gray-500 text-sm">{plan.description}</p>
// //         </div>

// //         <div className="space-y-4">
// //           <h4 className="font-medium">Plan includes:</h4>
// //           <ul className="space-y-2">
// //             {includedFeatures.slice(0, 5).map((feature, index) => (
// //               <li key={index} className="flex items-start">
// //                 <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
// //                 <span className="text-sm">{feature.name}</span>
// //               </li>
// //             ))}
// //             {includedFeatures.length > 5 && (
// //               <li className="text-sm text-gray-500 pl-7">
// //                 +{includedFeatures.length - 5} more features
// //               </li>
// //             )}
// //           </ul>
// //         </div>
        
// //         {/* This is where we need to make sure there's a CardElement rendered */}
// //         <div className="mt-6">
// //           <h4 className="font-medium mb-2">Payment Information</h4>
// //           <div className="border rounded-md p-3">
           
// //           </div>
// //         </div>

// //         {paymentStatus === "success" && (
// //           <Alert className="mt-4 bg-green-50 text-green-800 border-green-200">
// //             <CheckCircle2 className="h-4 w-4" />
// //             <AlertDescription>
// //               Payment successful! Your subscription is now active.
// //             </AlertDescription>
// //           </Alert>
// //         )}

// //         {error && (
// //           <Alert className="mt-4 bg-red-50 text-red-800 border-red-200">
// //             <AlertCircle className="h-4 w-4" />
// //             <AlertDescription>{error}</AlertDescription>
// //           </Alert>
// //         )}

// //         {paymentStatus === "error" && !error && (
// //           <Alert className="mt-4 bg-red-50 text-red-800 border-red-200">
// //             <AlertCircle className="h-4 w-4" />
// //             <AlertDescription>
// //               Payment failed. Please try again or use a different payment method.
// //             </AlertDescription>
// //           </Alert>
// //         )}
// //       </CardContent>
// //       <CardFooter className="flex flex-col space-y-4 pt-4 border-t">
// //         <div className="w-full flex justify-between text-sm">
// //           <span className="text-gray-500">Subtotal</span>
// //           <span>{formatPrice(plan.price, plan.billing_cycle)}</span>
// //         </div>
// //         {plan.billing_cycle !== "one_time" && (
// //           <div className="w-full flex justify-between text-sm">
// //             <span className="text-gray-500">Billing</span>
// //             <span>{plan.billing_cycle_display}</span>
// //           </div>
// //         )}
// //         <div className="w-full flex justify-between font-medium">
// //           <span>Total</span>
// //           <span>{formatPrice(plan.price, plan.billing_cycle)}</span>
// //         </div>

// //         <Button
// //           className="w-full mt-4"
// //           size="lg"
// //           onClick={handleCreatePaymentIntent}
// //           disabled={isLoading || isCreatingPaymentIntent || !selectedPaymentMethodId || !stripe || !elements }
// //         >
// //           {isLoading || isCreatingPaymentIntent ? (
// //             <span className="flex items-center">
// //               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// //               Processing...
// //             </span>
// //           ) : (
// //             "Confirm Payment"
// //           )}
// //         </Button>

// //         {!selectedPaymentMethodId && (
// //           <p className="text-xs text-center text-amber-600 mt-1">
// //             Please select a payment method to continue
// //           </p>
// //         )}

// //         <p className="text-xs text-center text-gray-500 mt-2">
// //           By confirming, you agree to our Terms of Service and Privacy Policy
// //         </p>
// //       </CardFooter>
// //     </Card>
// //   );
// // }



// "use client";

// import { Check, Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { AlertCircle, CheckCircle2 } from "lucide-react";
// import { use, useEffect, useState } from "react";
// import { useSubscriptions } from "@/hooks/use-subscription";
// import { useStripe } from "@stripe/react-stripe-js";
// import { useAuth } from "@/hooks/use-auth";
// import { usePaymentMethods } from "@/hooks/use-paymentMethods";
// import { set } from "date-fns";

// interface Feature {
//   name: string;
//   included: boolean;
//   description: string;
// }

// interface Plan {
//   id: number;
//   name: string;
//   slug: string;
//   description: string;
//   price: string;
//   billing_cycle: string;
//   billing_cycle_display: string;
//   is_active: boolean;
//   features: {
//     features: Feature[];
//   };
//   sort_order: number;
// }

// interface PlanSummaryProps {
//   plan: Plan;
//   onConfirm: () => void;
//   isProcessing: boolean;
//   selectedPaymentMethodId: string | null;
// }

// export default function PlanSummary({
//   plan,
//   onConfirm,
//   isProcessing,
//   selectedPaymentMethodId,
// }: PlanSummaryProps) {
//   const [paymentStatus, setPaymentStatus] = useState<
//     "idle" | "success" | "error"
//   >("idle");
  
//   // Get only the included features for display in summary
//   const includedFeatures = plan && plan?.features?.features.filter(
//     (feature) => feature.included
//   );

//   // Format price for display
//   const formatPrice = (price: string, cycle: string) => {
//     if (cycle === "one_time") {
//       return `${price}€`;
//     }
//     return `${price}€/${cycle === "monthly" ? "mo" : "yr"}`;
//   };

//   const {
//     createPaymentIntent,
//     confirmPayment,
//     isCreatingPaymentIntent,
//     isConfirmingPayment,
    
    
//   } = useSubscriptions();
// const {paymentMethods}=usePaymentMethods();
//   const [clientSecret, setClientSecret] = useState("");
//   const [paymentIntentId, setPaymentIntentId] = useState("");
//   const [setupIntentId, setSetupIntentId] = useState("");
//   const [isSubscription, setIsSubscription] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const stripe = useStripe();
//   const { user } = useAuth();
//   const [isRedirect, setIsRedirect] = useState(false);
//   const [stripe_payment_method_id, setStripe_payment_method_id] = useState("");
//   useEffect(() => {
//   const foundMethod = Array.isArray(paymentMethods) && paymentMethods?.find(
//     (method) => method.id === selectedPaymentMethodId
//   );

//   setStripe_payment_method_id(foundMethod?.stripe_payment_method_id || "");
// }, [paymentMethods, selectedPaymentMethodId]);

//   const handleCreatePaymentIntent = async () => {
//     if (!stripe) {
//       setError("Stripe has not been properly initialized");
//       return;
//     }
    
//     if (!selectedPaymentMethodId || !stripe_payment_method_id) {
//       setError("Please select a payment method");
//       return;
//     }
    
//     setIsLoading(true);
//     setError(null);

//     if (!plan?.id) {
//       setError("No plan selected");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       createPaymentIntent(
//         { plan_id: plan.id },
//         {
//           onSuccess: (data) => {
//             console.log("Payment intent created:", data);
//             if (!data.clientSecret) {
//               setError("No client secret returned from server");
//               setIsLoading(false);
//               return;
//             }
            
//             setClientSecret(data.clientSecret);
//             setIsSubscription(data.isSubscription);
//             setPaymentIntentId(data.paymentIntentId || "");
//             setSetupIntentId(data.setupIntentId || "");
            
//             // Process payment with saved payment method
//             processPaymentWithSavedMethod(
//               data.clientSecret, 
//               data.isSubscription, 
//               data.paymentIntentId || "", 
//               data.setupIntentId || ""
//             );
//           },
//           onError: (err: any) => {
//             console.error("Error creating payment intent:", err);
//             setError(err?.response?.data?.error || "Une erreur s'est produite lors de la création de l'intention de paiement");
//             setIsLoading(false);
//           },
//         }
//       );
//     } catch (error: any) {
//       console.error("Exception during payment intent creation:", error);
//       setError("Échec de la création de l'intention de paiement");
//       setIsLoading(false);
//     }
//   };

  
//   const processPaymentWithSavedMethod = async (
//     secret: string,
//     isSubscriptionPayment: boolean,
//     paymentId: string,
//     setupId: string
//   ) => {
//     if (!stripe) {
//       setError("Stripe has not been properly initialized");
//       setIsLoading(false);
//       return;
//     }
    
//     if (!selectedPaymentMethodId) {
//       setError("No payment method selected");
//       setIsLoading(false);
//       return;
//     }
    
//     if (!secret) {
//       setError("Missing payment secret");
//       setIsLoading(false);
//       return;
//     }
    
//     try {
//       let paymentResult;

//       if (isSubscriptionPayment) {
//         console.log(`Processing subscription setup with secret: ${secret.substring(0, 10)}...`);
//         paymentResult = await stripe.confirmCardSetup(secret, {
//           payment_method: stripe_payment_method_id??""
//         });
        
//         if (paymentResult.error) {
//           throw paymentResult.error;
//         }
//       } else {
//         console.log(`Processing one-time payment with secret: ${secret.substring(0, 10)}...`);
//         paymentResult = await stripe.confirmCardPayment(secret, {
//           payment_method: stripe_payment_method_id??""
//         });
        
//         if (paymentResult.error) {
//           throw paymentResult.error;
//         }
//       }

//       // Now confirm with our backend
//       confirmPayment(
//         {
//           payment_intent_id: isSubscriptionPayment ? null : paymentId,
//           setup_intent_id: isSubscriptionPayment ? setupId : null,
//           payment_method_id: stripe_payment_method_id??"",
//           plan_id: plan?.id,
//         },
//         {
//           onSuccess: (data) => {
//             console.log("Payment confirmed successfully:", data);
//             setPaymentStatus("success");
//             setIsLoading(false);
//             onConfirm();
//             setTimeout(() => {
//               window.location.reload();
//             })
//           },
//           onError: (err: any) => {
//             console.error("Payment error:", err);
//             setError(
//               err?.response?.data?.error ||
//                 "Une erreur s'est produite lors du traitement du paiement"
//             );
//             setPaymentStatus("error");
//             setIsLoading(false);
//           },
//         }
//       );
//     } catch (error: any) {
//       console.error("Stripe error:", error);
//       setError(error?.message || "Une erreur s'est produite avec Stripe");
//       setPaymentStatus("error");
//       setIsLoading(false);
//     }
//   };

//   return (
//    <>
//    {plan &&  <Card className={`shadow-md sticky top-8" `}>
//       <CardHeader className="bg-gradient-to-r from-rose-100 to-teal-100 dark:from-rose-900 dark:to-teal-900">
//         <CardTitle className="flex items-center justify-between">
//           <span>{plan?.name}</span>
//           <Badge variant="secondary" className="ml-2">
//             {plan.billing_cycle_display}
//           </Badge>
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="pt-6">
//         <div className="mb-6">
//           <div className="text-3xl font-bold mb-1">
//             {formatPrice(plan.price, plan.billing_cycle)}
//           </div>
//           <p className="text-gray-500 text-sm">{plan.description}</p>
//         </div>

//         <div className="space-y-4">
//           <h4 className="font-medium">Plan includes:</h4>
//           <ul className="space-y-2">
//             {Array.isArray(includedFeatures) && includedFeatures.slice(0, 5).map((feature, index) => (
//               <li key={index} className="flex items-start">
//                 <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
//                 <span className="text-sm">{feature.name}</span>
//               </li>
//             ))}
//             {Array.isArray(includedFeatures) && includedFeatures.length > 5 && (
//               <li className="text-sm text-gray-500 pl-7">
//                 +{includedFeatures.length - 5} more features
//               </li>
//             )}
//           </ul>
//         </div>

//         {paymentStatus === "success" && (
//           <Alert className="mt-4 bg-green-50 text-green-800 border-green-200">
//             <CheckCircle2 className="h-4 w-4" />
//             <AlertDescription>
//               Payment successful! Your subscription is now active.
//             </AlertDescription>
//           </Alert>
//         )}

//         {error && (
//           <Alert className="mt-4 bg-red-50 text-red-800 border-red-200">
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}

//         {paymentStatus === "error" && !error && (
//           <Alert className="mt-4 bg-red-50 text-red-800 border-red-200">
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription>
//               Payment failed. Please try again or use a different payment method.
//             </AlertDescription>
//           </Alert>
//         )}
//       </CardContent>
//       <CardFooter className="flex flex-col space-y-4 pt-4 border-t">
//         <div className="w-full flex justify-between text-sm">
//           <span className="text-gray-500">Subtotal</span>
//           <span>{formatPrice(plan.price, plan.billing_cycle)}</span>
//         </div>
//         {plan.billing_cycle !== "one_time" && (
//           <div className="w-full flex justify-between text-sm">
//             <span className="text-gray-500">Billing</span>
//             <span>{plan.billing_cycle_display}</span>
//           </div>
//         )}
//         <div className="w-full flex justify-between font-medium">
//           <span>Total</span>
//           <span>{formatPrice(plan.price, plan.billing_cycle)}</span>
//         </div>

//         <Button
//           className="w-full mt-4"
//           size="lg"
//           onClick={handleCreatePaymentIntent}
//           disabled={isLoading || isCreatingPaymentIntent || !selectedPaymentMethodId || !stripe || isConfirmingPayment}
//         >
//           {isLoading || isCreatingPaymentIntent || isConfirmingPayment ? (
//             <span className="flex items-center">
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Processing payment...
//             </span>
//           ) : (
//             "Confirm Payment"
//           )}
//         </Button>

//         {!selectedPaymentMethodId && (
//           <p className="text-xs text-center text-amber-600 mt-1">
//             Please select a payment method to continue
//           </p>
//         )}

//         <p className="text-xs text-center text-gray-500 mt-2">
//           By confirming, you agree to our Terms of Service and Privacy Policy
//         </p>
//       </CardFooter>
//     </Card>}
//    </>
//   );
// }



"use client"

import { Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useSubscriptions } from "@/hooks/use-subscription"
import { useStripe } from "@stripe/react-stripe-js"
import { useAuth } from "@/hooks/use-auth"
import { usePaymentMethods } from "@/hooks/use-paymentMethods"
import { useRouter } from "next/navigation"
import { ConfirmationModal } from "./confirmation-modal"
import { ProcessSteps } from "./process-step"


interface Feature {
  name: string
  included: boolean
  description: string
}

interface Plan {
  id: number
  name: string
  slug: string
  description: string
  price: string
  billing_cycle: string
  billing_cycle_display: string
  is_active: boolean
  features: {
    features: Feature[]
  }
  sort_order: number
}

interface PlanSummaryProps {
  plan: Plan
  onConfirm: () => void
  isProcessing: boolean
  selectedPaymentMethodId: string | null
}

export default function PlanSummary({ plan, onConfirm, isProcessing, selectedPaymentMethodId }: PlanSummaryProps) {
  const router = useRouter()
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isRedirecting, setIsRedirecting] = useState(false)

  // Get only the included features for display in summary
  const includedFeatures = plan && plan?.features?.features.filter((feature) => feature.included)

  // Format price for display
  const formatPrice = (price: string, cycle: string) => {
    if (cycle === "one_time") {
      return `${price}€`
    }
    return `${price}€/${cycle === "monthly" ? "mo" : "yr"}`
  }

  const { createPaymentIntent, confirmPayment, isCreatingPaymentIntent, isConfirmingPayment } = useSubscriptions()

  const { paymentMethods } = usePaymentMethods()
  const [clientSecret, setClientSecret] = useState("")
  const [paymentIntentId, setPaymentIntentId] = useState("")
  const [setupIntentId, setSetupIntentId] = useState("")
  const [isSubscription, setIsSubscription] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const stripe = useStripe()
  const { user } = useAuth()
  const [stripe_payment_method_id, setStripe_payment_method_id] = useState("")

  useEffect(() => {
    const foundMethod =
      Array.isArray(paymentMethods) && paymentMethods?.find((method) => method.id === selectedPaymentMethodId)

    setStripe_payment_method_id(foundMethod?.stripe_payment_method_id || "")
  }, [paymentMethods, selectedPaymentMethodId])

  const handleOpenModal = () => {
    if (!selectedPaymentMethodId || !stripe_payment_method_id) {
      setError("Please select a payment method")
      return
    }

    setError(null)
    setIsModalOpen(true)
  }

  const handleCreatePaymentIntent = async () => {
    if (!stripe) {
      setError("Stripe has not been properly initialized")
      return
    }

    if (!selectedPaymentMethodId || !stripe_payment_method_id) {
      setError("Please select a payment method")
      return
    }

    setIsLoading(true)
    setError(null)
    setIsModalOpen(false)
    setCurrentStep(1) // Start the payment process

    if (!plan?.id) {
      setError("No plan selected")
      setIsLoading(false)
      setCurrentStep(0)
      return
    }

    try {
      createPaymentIntent(
        { plan_id: plan.id },
        {
          onSuccess: (data) => {
            console.log("Payment intent created:", data)
            if (!data.clientSecret) {
              setError("No client secret returned from server")
              setIsLoading(false)
              setCurrentStep(0)
              return
            }

            setClientSecret(data.clientSecret)
            setIsSubscription(data.isSubscription)
            setPaymentIntentId(data.paymentIntentId || "")
            setSetupIntentId(data.setupIntentId || "")

            setCurrentStep(2) // Move to next step

            // Process payment with saved payment method
            processPaymentWithSavedMethod(
              data.clientSecret,
              data.isSubscription,
              data.paymentIntentId || "",
              data.setupIntentId || "",
            )
          },
          onError: (err: any) => {
            console.error("Error creating payment intent:", err)
            setError(
              err?.response?.data?.error || "Une erreur s'est produite lors de la création de l'intention de paiement",
            )
            setIsLoading(false)
            setCurrentStep(0)
          },
        },
      )
    } catch (error: any) {
      console.error("Exception during payment intent creation:", error)
      setError("Échec de la création de l'intention de paiement")
      setIsLoading(false)
      setCurrentStep(0)
    }
  }

  const processPaymentWithSavedMethod = async (
    secret: string,
    isSubscriptionPayment: boolean,
    paymentId: string,
    setupId: string,
  ) => {
    if (!stripe) {
      setError("Stripe has not been properly initialized")
      setIsLoading(false)
      setCurrentStep(0)
      return
    }

    if (!selectedPaymentMethodId) {
      setError("No payment method selected")
      setIsLoading(false)
      setCurrentStep(0)
      return
    }

    if (!secret) {
      setError("Missing payment secret")
      setIsLoading(false)
      setCurrentStep(0)
      return
    }

    try {
      let paymentResult
      setCurrentStep(3) // Processing payment

      if (isSubscriptionPayment) {
        console.log(`Processing subscription setup with secret: ${secret.substring(0, 10)}...`)
        paymentResult = await stripe.confirmCardSetup(secret, {
          payment_method: stripe_payment_method_id,
        })

        if (paymentResult.error) {
          throw paymentResult.error
        }
      } else {
        console.log(`Processing one-time payment with secret: ${secret.substring(0, 10)}...`)
        paymentResult = await stripe.confirmCardPayment(secret, {
          payment_method: stripe_payment_method_id,
        })

        if (paymentResult.error) {
          throw paymentResult.error
        }
      }

      setCurrentStep(4) // Confirming payment

      // Now confirm with our backend
      confirmPayment(
        {
          payment_intent_id: isSubscriptionPayment ? null : paymentId,
          setup_intent_id: isSubscriptionPayment ? setupId : null,
          payment_method_id: stripe_payment_method_id,
          plan_id: plan?.id,
        },
        {
          onSuccess: (data) => {
            console.log("Payment confirmed successfully:", data)
            setPaymentStatus("success")
            setIsLoading(false)
            setCurrentStep(5) // Payment complete
            onConfirm()

            // Redirect to dashboard after 2 seconds
            setIsRedirecting(true)
            setTimeout(() => {
              window.location.href = "/dashboard"
            }, 2000)
          },
          onError: (err: any) => {
            console.error("Payment error:", err)
            setError(err?.response?.data?.error || "Une erreur s'est produite lors du traitement du paiement")
            setPaymentStatus("error")
            setIsLoading(false)
            setCurrentStep(0)
          },
        },
      )
    } catch (error: any) {
      console.error("Stripe error:", error)
      setError(error?.message || "Une erreur s'est produite avec Stripe")
      setPaymentStatus("error")
      setIsLoading(false)
      setCurrentStep(0)
    }
  }

  return (
    <>
      {currentStep > 0 && currentStep < 6 ? (
        <ProcessSteps currentStep={currentStep} isRedirecting={isRedirecting} error={error} />
      ) : (
        plan && (
          <Card className="shadow-md sticky top-8">
            <CardHeader className="bg-gradient-to-r from-rose-100 to-teal-100 dark:from-rose-900 dark:to-teal-900">
              <CardTitle className="flex items-center justify-between">
                <span>{plan?.name}</span>
                <Badge variant="secondary" className="ml-2">
                  {plan.billing_cycle_display}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="text-3xl font-bold mb-1">{formatPrice(plan.price, plan.billing_cycle)}</div>
                <p className="text-gray-500 text-sm">{plan.description}</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Plan includes:</h4>
                <ul className="space-y-2">
                  {Array.isArray(includedFeatures) &&
                    includedFeatures.slice(0, 5).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature.name}</span>
                      </li>
                    ))}
                  {Array.isArray(includedFeatures) && includedFeatures.length > 5 && (
                    <li className="text-sm text-gray-500 pl-7">+{includedFeatures.length - 5} more features</li>
                  )}
                </ul>
              </div>

              {paymentStatus === "success" && (
                <Alert className="mt-4 bg-green-50 text-green-800 border-green-200">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>Payment successful! Your subscription is now active.</AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert className="mt-4 bg-red-50 text-red-800 border-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {paymentStatus === "error" && !error && (
                <Alert className="mt-4 bg-red-50 text-red-800 border-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Payment failed. Please try again or use a different payment method.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-4 border-t">
              <div className="w-full flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>{formatPrice(plan.price, plan.billing_cycle)}</span>
              </div>
              {plan.billing_cycle !== "one_time" && (
                <div className="w-full flex justify-between text-sm">
                  <span className="text-gray-500">Billing</span>
                  <span>{plan.billing_cycle_display}</span>
                </div>
              )}
              <div className="w-full flex justify-between font-medium">
                <span>Total</span>
                <span>{formatPrice(plan.price, plan.billing_cycle)}</span>
              </div>

              <Button
                className="w-full mt-4"
                size="lg"
                onClick={handleOpenModal}
                disabled={
                  isLoading || isCreatingPaymentIntent || !selectedPaymentMethodId || !stripe || isConfirmingPayment
                }
              >
                {isLoading || isCreatingPaymentIntent || isConfirmingPayment ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing payment...
                  </span>
                ) : (
                  "Confirm Payment"
                )}
              </Button>

              {!selectedPaymentMethodId && (
                <p className="text-xs text-center text-amber-600 mt-1">Please select a payment method to continue</p>
              )}

              <p className="text-xs text-center text-gray-500 mt-2">
                By confirming, you agree to our Terms of Service and Privacy Policy
              </p>
            </CardFooter>
          </Card>
        )
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCreatePaymentIntent}
        plan={plan}
        formatPrice={formatPrice}
      />
    </>
  )
}
