// "use client"
// import { useState } from "react"
// import type React from "react"

// import { CreditCard, Trash2, Edit, X, Loader2 } from "lucide-react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog"
// import { usePaymentMethods } from "@/hooks/use-paymentMethods"

// interface PaymentMethod {
//   id: string
//   user: number
//   stripe_payment_method_id: string
//   card_brand: string
//   last4: string
//   expiry_month: number
//   expiry_year: number
//   card_holder: string
//   is_default: boolean
//   added_on: string
// }

// interface PaymentMethodsListProps {
//   paymentMethods: PaymentMethod[]
//   onSelectPaymentMethod: (id: string) => void
//   selectedPaymentMethodId: string | null
//   onDeletePaymentMethod: (id: string) => void
//   onEditPaymentMethod: (method: PaymentMethod) => void
// }

// export default function PaymentMethodsList({
//   paymentMethods,
//   onSelectPaymentMethod,
//   selectedPaymentMethodId,
//   onDeletePaymentMethod,
//   onEditPaymentMethod,
// }: PaymentMethodsListProps) {
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
//   const [methodToDelete, setMethodToDelete] = useState<string | null>(null)
//   const [isDeleting, setIsDeleting] = useState(false)
// const {deletePaymentMethod,isDeletingPaymentMethod}=usePaymentMethods()
//   const getCardIcon = (brand: string) => {
//     // In a real app, you would use different icons based on the card brand
//     return <CreditCard className="h-5 w-5" />
//   }

//   // Find default payment method if none is selected
//   const defaultPaymentMethod = paymentMethods.find((method) => method.is_default)
//   const effectiveSelectedId = selectedPaymentMethodId || defaultPaymentMethod?.id || null

//   const handleDeleteClick = (id: string, event: React.MouseEvent) => {
//     event.preventDefault()
//     event.stopPropagation()
//     setMethodToDelete(id)
//     setDeleteDialogOpen(true)
//   }

//   const handleConfirmDelete = async () => {
//     if (!methodToDelete) return

   
    
//       deletePaymentMethod(methodToDelete,{
//         onSuccess: () => {
//           setDeleteDialogOpen(false)
//       setMethodToDelete(null)
//         },
//       })
     
      
   
//   }

//   const handleEditClick = (method: PaymentMethod, event: React.MouseEvent) => {
//     event.preventDefault()
//     event.stopPropagation()
//     onEditPaymentMethod(method)
//   }

//   return (
//     <div className="space-y-4">
//       <h3 className="text-lg font-medium mb-4">Your Payment Methods</h3>

//       {paymentMethods.length === 0 ? (
//         <div className="text-center py-8 border border-dashed rounded-lg">
//           <p className="text-gray-500">No payment methods found</p>
//           <p className="text-sm text-gray-400 mt-1">Add a new payment method to continue</p>
//         </div>
//       ) : (
//         <RadioGroup
//           value={effectiveSelectedId || undefined}
//           onValueChange={onSelectPaymentMethod}
//           className="space-y-3"
//         >
//           {paymentMethods.map((method) => (
//             <div key={method.id} className="flex items-center space-x-3">
//               <RadioGroupItem value={method.id} id={`card-${method.id}`} className="mt-0" />
//               <Label htmlFor={`card-${method.id}`} className="flex-1 cursor-pointer">
//                 <Card
//                   className={`overflow-hidden ${method.id === effectiveSelectedId ? "border-green-500 border-2" : ""}`}
//                 >
//                   <CardContent className="p-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-4">
//                         <div className="bg-gray-100 p-2 rounded-md">{getCardIcon(method.card_brand)}</div>
//                         <div>
//                           <div className="flex items-center space-x-2">
//                             <p className="font-medium capitalize">{method.card_brand}</p>
//                             <p className="text-gray-500">•••• {method.last4}</p>
//                             {method.is_default && (
//                               <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
//                                 Default
//                               </Badge>
//                             )}
//                           </div>
//                           <p className="text-sm text-gray-500">
//                             Expires {method.expiry_month}/{method.expiry_year}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex space-x-2">
//                         {/* <Button
//                           variant="ghost"
//                           size="sm"
//                           className="h-8 w-8 p-0"
//                           onClick={(e) => handleEditClick(method, e)}
//                         >
//                           <span className="sr-only">Edit</span>
//                           <Edit className="h-4 w-4" />
//                         </Button> */}
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
//                           onClick={(e) => handleDeleteClick(method.id, e)}
//                           disabled={paymentMethods.length === 1}
//                         >
//                           <span className="sr-only">Delete</span>
//                           <X className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </Label>
//             </div>
//           ))}
//         </RadioGroup>
//       )}

//       <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Delete Payment Method</AlertDialogTitle>
//             <AlertDialogDescription>
//               Are you sure you want to delete this payment method? This action cannot be undone.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={handleConfirmDelete}
//               disabled={isDeleting}
//               className="bg-red-500 hover:bg-red-600"
//             >
//               {isDeletingPaymentMethod ? (
//                 <><Loader2 className="h-4 w-4 animate-spin" />Deleting</>
//               ) : (
//                 "Delete"
//               )}
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   )
// }


import React from 'react'

export default function page() {
  return (
    <div>
      
    </div>
  )
}

