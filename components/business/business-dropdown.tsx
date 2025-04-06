"use client"

import { Building2, Plus, Check, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useBusiness } from "@/hooks/useBusiness"
import { useState } from "react"
import { BusinessManagementSheet } from "./business-management-sheet"
import { NewBusinessSheet } from "./new-business-sheet"
import { Badge } from "../ui/badge"

export function BusinessDropdown() {
  const { businesses, activeBusiness, isLoadingBusinesses, setActiveBusiness, isSettingActiveBusiness } = useBusiness()

  const [isManagementSheetOpen, setIsManagementSheetOpen] = useState(false)
  const [isNewBusinessSheetOpen, setIsNewBusinessSheetOpen] = useState(false)
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null)

  const handleManage = (businessId: string) => {
    setSelectedBusiness(businessId)
    setIsManagementSheetOpen(true)
  }

  const handleSetActive = (businessId: string) => {
    setActiveBusiness(businessId)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            <Building2 className="h-4 w-4" />
            {Array.isArray(businesses) && businesses?.length > 0 ? businesses[0]?.name  : "Business"}<Badge className="bg-green-500" variant="default">Active</Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[250px] ml-80">
          <DropdownMenuLabel className="flex justify-between items-center">
            <span>Your Businesses</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 gap-1"
              disabled={Array.isArray(businesses) &&
              businesses?.length > 0}
              onClick={() => setIsNewBusinessSheetOpen(true)}
            >
              <Plus className="h-3.5 w-3.5" /> New
            </Button>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {isLoadingBusinesses ? (
            <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
          ) : Array.isArray(businesses) && businesses.length > 0 ? (
            businesses.map((business) => (
              <DropdownMenuItem key={business.id} className="p-0 focus:bg-transparent">
                <div className="flex items-center justify-between w-full px-2 py-1.5">
                  <span className="text-sm truncate max-w-[120px]">{business.name}</span>
                  <div className="flex items-center gap-1">
                    {/* <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs"
                      onClick={() => handleSetActive(business.id)}
                      disabled={isSettingActiveBusiness}
                    >
                      {activeBusiness?.id === business.id ? (
                        <Check className="h-3.5 w-3.5 text-green-500 mr-1" />
                      ) : null}
                      {activeBusiness?.id === business.id ? "Active" : "Set Active"}
                    </Button> */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs"
                      onClick={() => handleManage(business.id)}
                    >
                      <Settings className="h-3.5 w-3.5 mr-1" />
                      Manage
                    </Button>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem disabled>No businesses found</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <BusinessManagementSheet
        open={isManagementSheetOpen}
        onOpenChange={setIsManagementSheetOpen}
        businessId={selectedBusiness}
      />

      <NewBusinessSheet open={isNewBusinessSheetOpen} onOpenChange={setIsNewBusinessSheetOpen} />
    </>
  )
}

