"use client"
import { createContext, useContext, useState, ReactNode, use, useEffect } from "react";

interface SelectedContextValue {
  selected: null | unknown;
  setSelected: (selected: null | unknown) => void;
   isGoalSuccess: boolean;
  setIsGoalSuccess: (isGoalSuccess: boolean) => void;
  activeTab: string;
  setActiveTab: (activeTab:string) => void;
}

const SelectedContext = createContext<SelectedContextValue | undefined>(undefined);

export const SelectedProvider = ({ children }: { children: React.ReactNode }) => {
  const [selected, setSelected] = useState<null | unknown>(null);
const [isGoalSuccess, setIsGoalSuccess] = useState(false);
const [activeTab, setActiveTab] = useState("payment-methods");
useEffect(() => {
  if (isGoalSuccess) {
    setTimeout(() => {
      setIsGoalSuccess(false);
    }, 1000);
  }
})
  return (
    <SelectedContext.Provider value={{ selected, setSelected ,isGoalSuccess, setIsGoalSuccess,activeTab,setActiveTab}}>
      {children}
    </SelectedContext.Provider>
  );
};

export const useSelected = () => {
  const context = useContext(SelectedContext);
  if (!context) {
    throw new Error("useSelected must be used within a SelectedProvider");
  }
  return context;
};