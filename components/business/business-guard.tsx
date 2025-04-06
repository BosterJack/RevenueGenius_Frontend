"use client"

import { useState } from "react"
import { useBusiness } from "@/hooks/useBusiness"
import { NewBusinessSheet } from "@/components/business/new-business-sheet"
import { Button } from "@/components/ui/button"
import React from "react"

interface BusinessGuardProps {
  children: React.ReactNode
}

export function BusinessGuard({ children }: BusinessGuardProps) {
  const { businesses, isLoadingBusinesses } = useBusiness()
  const [isNewBusinessSheetOpen, setIsNewBusinessSheetOpen] = useState(false)

  if (isLoadingBusinesses) return null
//@ts-ignore
  if (!businesses || businesses?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <p className="text-lg text-gray-600 max-w-md">
          You haven't added any business yet. You can add one by clicking the button below.
        </p>
        <Button onClick={() => setIsNewBusinessSheetOpen(true)} className="mt-4">
          Add New Business
        </Button>
        <NewBusinessSheet
          open={isNewBusinessSheetOpen}
          onOpenChange={setIsNewBusinessSheetOpen}
        />
      </div>
    )
  }

  return <>{children}</>
}
