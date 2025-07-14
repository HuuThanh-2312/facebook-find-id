"use client"

import { createContext, useContext } from "react"
import type { Locale } from "./translations"

interface LanguageContextType {
  lang: Locale
  setLang: (locale: Locale) => void
  t: (key: string, options?: { returnObjects?: boolean }) => string | string[]
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useTranslation = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider")
  }
  return context
}
