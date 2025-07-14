import en from "./locales/en.json"
import vi from "./locales/vi.json"

export type Translations = Record<string, unknown>
export type Dictionary = typeof en

export const dictionaries: { [key: string]: Translations } = {
  en: en,
  vi: vi,
}

export type Locale = keyof typeof dictionaries

export const defaultLocale: Locale = "en"

// This function is still server-only and used by Server Components
export function getTranslation(locale: Locale): Translations {
  return dictionaries[locale] || dictionaries[defaultLocale]
}
