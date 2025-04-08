"use client";

import { use, useEffect, useState } from "react";
import { useBusiness } from "@/hooks/useBusiness";
import { NewBusinessSheet } from "@/components/business/new-business-sheet";
import { Button } from "@/components/ui/button";
import React from "react";
import { useAuth } from "@/hooks/use-auth";
import { usePlans } from "@/hooks/use-plans";
import { useSearchParams } from "next/navigation";

interface PlanGuardProps {
  children: React.ReactNode;
}

export function PlanGuard({ children }: PlanGuardProps) {
  const { user, isLoadingUser } = useAuth();
  const [isNewBusinessSheetOpen, setIsNewBusinessSheetOpen] = useState(false);
  const { plans } = usePlans();
  const handlePlanSelection = (planId: string,index: number) => {
    localStorage.setItem("selectedPlan", planId);
    window.location.href = `/dashboard/payment?checkout=${index}`;
  };
  const searchParams =useSearchParams()
 const id = searchParams.get("checkout") 
  const [selectedPlan, setSelectedPlan] = useState(null) 
  useEffect(() => {
    // @ts-ignore
    setSelectedPlan(id)
  }, [id,plans])
  if (isLoadingUser) return null;
  if (!user?.subscription?.id && !selectedPlan) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <p className="text-lg text-gray-600 max-w-md mt-10">
          It seems you don't have an active subscription yet. You can select and
          add a plan by clicking the button below.
        </p>
        <div className="container mx-auto mt-10 grid md:grid-cols-3 gap-6">
          {Array.isArray(plans) &&
            plans.map((plan,index) => (
              <div
                key={plan.id}
                className="bg-white border text-gray-800 rounded-lg overflow-hidden"
              >
                <div className="p-6 flex flex-col h-full">
                    <div className="mb-4">
                      <div className="bg-brand-blue text-white w-16 h-16 flex items-center justify-center rounded-lg mx-auto mb-4">
                        {/* Icon or logo for the plan can go here */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                    </div>
                  <div className="max-h-96 my-2 overflow-auto">
                    <div className="mb-6">
                      <div className="text-2xl font-bold text-brand-blue">
                        ${plan.price}/{plan.billing_cycle_display}
                      </div>
                      <div className="text-sm text-left text-gray-500">
                        Access: {plan.description}
                      </div>
                    </div>
                    <div className="mb-6">
                      <h4 className="text-lg text-left font-semibold text-gray-700">
                        Features:
                      </h4>
                      <ul className="list-disc text-left mt-2  pl-6 space-y-4 text-sm text-gray-600">
                        {plan.features.features.map(
                          (feature: any, index: number) => (
                            <li
                              key={index}
                              className={
                                feature.included
                                  ? "text-gray-800 text-left"
                                  : "text-gray-400 text-left"
                              }
                            >
                              <strong>{feature.name}:</strong>{" "}
                              {feature.description}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="mb-6">
                      <div className="text-sm text-left text-gray-500">
                        Sale Price: ${plan.price}
                        {/* Optionally, you can display a regular price here */}
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handlePlanSelection(plan?.id as string,index)}
                    className="mt-auto bg-brand-gold hover:bg-amber-500 text-white"
                  >
                    Continue with {plan.name}
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
