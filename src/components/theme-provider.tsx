"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Interface pour les props du ThemeProvider
interface ThemeProviderProps {
  children: React.ReactNode;
  [key: string]: any; // Pour permettre d'autres props
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
