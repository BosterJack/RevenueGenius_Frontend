"use client"


import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant, ...props }) => (
        <div
          
          className={` ${variant==="destructive"?"bg-red-900":"bg-green-900 text-white"}`}
        >
          <Toast {...props} variant={variant} className={` ${variant==="destructive"?"bg-red-500":"bg-green-500"}`}>
            <div className="grid gap-1 text-white">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        </div>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}