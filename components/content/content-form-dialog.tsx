"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contentSchema } from "@/lib/validations/content"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useContent } from "@/hooks/use-content"
import type { Content } from "@/types/content"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import StatusToast from "../toast-status"

interface ContentFormDialogProps {
  isOpen: boolean
  onClose: () => void
  content?: Content
}

export function ContentFormDialog({ isOpen, onClose, content }: ContentFormDialogProps) {
  const { createContent, updateContent, isCreatingContent, isUpdatingContent ,isCreatingContentSuccess,isUpdatingContentSuccess} = useContent()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(contentSchema),
    defaultValues: content
      ? {
          title: content.title,
          type: content.type,
          publish_date: content.publish_date,
          url: content.url || "",
          cost: content.cost,
        }
      : {
          title: "",
          type: "blog",
          publish_date: new Date().toISOString().split("T")[0],
          url: "",
          cost: 0,
        },
  })

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      if (content) {
        await updateContent({ id: content.id, data })
      } else {
        await createContent(data)
      }
      onClose()
      form.reset()
    } catch (error) {
      console.error("Error submitting the form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{content ? "Edit Content" : "Add New Content"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Content Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="blog">Blog</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="webinar">Webinar</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publish_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Publish Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Content URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost (€)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Production Cost"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || isCreatingContent || isUpdatingContent}>
                {isSubmitting ? "Saving..." : content ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
    <StatusToast status={isCreatingContent || isUpdatingContent ? "pending" : false ? "error" : isCreatingContentSuccess || isUpdatingContentSuccess ? "success" : "idle"} />
    </>
  )
}
