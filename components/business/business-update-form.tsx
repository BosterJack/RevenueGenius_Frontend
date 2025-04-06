"use client"

import type { Business, BusinessFormValues } from "@/types/business"
import { useBusiness } from "@/hooks/useBusiness"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Loader2 } from "lucide-react"

const businessFormSchema = z.object({
  name: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  industry: z.string().min(1, {
    message: "Please select an industry.",
  }),
  size: z.string().min(1, {
    message: "Please select a business size.",
  }),
})

interface BusinessUpdateFormProps {
  business: Business
  onCancel: () => void
  onSuccess?: () => void
}

export function BusinessUpdateForm({ business, onCancel, onSuccess }: BusinessUpdateFormProps) {
  const { updateBusiness, isUpdatingBusiness, updatingBusinessSuccess } = useBusiness()

  const form = useForm<BusinessFormValues>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      name: business.name,
      industry: business.industry,
      size: business.size,
    },
  })

  const onSubmit = (data: BusinessFormValues) => {
    updateBusiness(
      {
        id: business.id,
        data,
      },
      {
        onSuccess: () => {
          if (onSuccess) onSuccess()
        },
      },
    )
  }

  return (
    <div className="mt-6">
      <Button variant="ghost" onClick={onCancel} className="mb-4 px-2" disabled={isUpdatingBusiness}>
        <ArrowLeft className="h-4 w-4 mr-2" /> Back
      </Button>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter business name" {...field} />
                </FormControl>
                <FormDescription>The name of your business as it will appear to others.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>The industry your business operates in.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Size</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Startup">Startup (1-10 employees)</SelectItem>
                    <SelectItem value="Small">Small (11-50 employees)</SelectItem>
                    <SelectItem value="Medium">Medium (51-250 employees)</SelectItem>
                    <SelectItem value="Large">Large (251-1000 employees)</SelectItem>
                    <SelectItem value="Enterprise">Enterprise (1000+ employees)</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>The approximate size of your business based on employee count.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isUpdatingBusiness}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdatingBusiness}>
              {isUpdatingBusiness && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isUpdatingBusiness ? "Updating..." : "Update Business"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

