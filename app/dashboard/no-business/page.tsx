"use client";
import { BusinessDropdown } from "@/components/business/business-dropdown";
import { NewBusinessSheet } from "@/components/business/new-business-sheet";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export default function page() {
  const [isNewBusinessSheetOpen, setIsNewBusinessSheetOpen] = useState(false);
  return (
    <div>
      <p className="text-center text-lg text-gray-600">
        
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <p className="text-center text-lg text-gray-600">
            You haven't added any business yet. You can add a business by
            clicking the button below.
          </p>
          <Button
            onClick={() => setIsNewBusinessSheetOpen(true)}
            className="mt-4"
          >
            Add New Business
          </Button>
          <NewBusinessSheet
            open={isNewBusinessSheetOpen}
            onOpenChange={setIsNewBusinessSheetOpen}
          />
        </div>
      </p>
      <NewBusinessSheet
        open={isNewBusinessSheetOpen}
        onOpenChange={setIsNewBusinessSheetOpen}
      />
    </div>
  );
}
