"use client"

import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useBusiness } from "@/hooks/useBusiness"
import { BusinessGridView } from "./business-grid-view"
import { BusinessListView } from "./business-list-view"
import { BusinessUpdateForm } from "./business-update-form"

import { Loader2 } from "lucide-react"
import { Business } from "@/types/businesse"

interface BusinessManagementSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  businessId: string | null
}

export function BusinessManagementSheet({ open, onOpenChange, businessId }: BusinessManagementSheetProps) {
  const { businesses } = useBusiness()
  const [activeTab, setActiveTab] = useState("grid")
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null)
  const [isUpdateMode, setIsUpdateMode] = useState(false)

  useEffect(() => {
    if (businessId && Array.isArray(businesses)) {
      const business = businesses?.find((b) => b.id === businessId)
      if (business) {
        setSelectedBusiness(business)
      }
    }
  }, [businessId, businesses])

  const handleUpdate = (business: Business) => {
    setSelectedBusiness(business)
    setIsUpdateMode(true)
  }

  const handleBackToView = () => {
    setIsUpdateMode(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md md:max-w-lg lg:max-w-xl">
        <SheetHeader>
          <SheetTitle>
            {isUpdateMode
              ? `Update Business: ${selectedBusiness?.name}`
              : selectedBusiness
                ? `Manage Business: ${selectedBusiness.name}`
                : "Manage Business"}
          </SheetTitle>
        </SheetHeader>

        {!selectedBusiness ? (
          <div className="flex items-center justify-center h-[300px]">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : isUpdateMode ? (
          <BusinessUpdateForm
            business={selectedBusiness}
            onCancel={handleBackToView}
            onSuccess={() => {
              handleBackToView()
              // Optionally close the sheet after successful update
              // onOpenChange(false);
            }}
          />
        ) : (
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mt-6">
            {/* <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList> */}

            <TabsContent value="grid" className="mt-4">
              <BusinessGridView business={selectedBusiness} onUpdate={() => handleUpdate(selectedBusiness)} />
            </TabsContent>

            <TabsContent value="list" className="mt-4">
              <BusinessListView business={selectedBusiness} onUpdate={() => handleUpdate(selectedBusiness)} />
            </TabsContent>
          </Tabs>
        )}
      </SheetContent>
    </Sheet>
  )
}

