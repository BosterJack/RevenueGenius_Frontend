"use client"
import { createContext, useContext, useState, ReactNode } from "react";

interface SelectedContextValue {
  selected: null | unknown;
  setSelected: (selected: null | unknown) => void;
}

const SelectedContext = createContext<SelectedContextValue | undefined>(undefined);

export const SelectedProvider = ({ children }: { children: React.ReactNode }) => {
  const [selected, setSelected] = useState<null | unknown>(null);

  return (
    <SelectedContext.Provider value={{ selected, setSelected }}>
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