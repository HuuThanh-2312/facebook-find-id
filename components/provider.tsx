"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { LanguageContext } from "@/lib/i18n"
import type { Locale, Translations } from "@/lib/translations"

interface LanguageProviderProps {
  children: ReactNode
  allDictionaries: { [key: string]: Translations }
  initialLocale: Locale
}

export function LanguageProvider({ children, allDictionaries, initialLocale }: LanguageProviderProps) {
  const [lang, setLangState] = useState<Locale>(String(initialLocale))
  const [translations, setTranslations] = useState<Translations>(allDictionaries[String(lang)] || allDictionaries[String(initialLocale)])
  const router = useRouter();
  const pathname = usePathname();

  const setLang = useCallback(
    (locale: Locale) => {
      setLangState(String(locale))
      setTranslations(allDictionaries[String(locale)])
      if (typeof window !== "undefined") {
        localStorage.setItem("lang", String(locale))
      }
      // Xây dựng lại URL với locale mới
      let segments = pathname.split("/").filter(Boolean).map((s) => String(s));
      
      // Xử lý đặc biệt cho group-id/nhom-facebook, page-id, post-id
      if (segments.length > 1) {
        // Group ID
        if (locale === "vi" && (segments[1] === "facebook-group-id" || segments[1] === "get-facebook-group-id" || segments[1] === "nhom-facebook")) {
          segments[1] = "lay-id-nhom-facebook";
        } else if (locale === "en" && (segments[1] === "lay-id-nhom-facebook" || segments[1] === "nhom-facebook" || segments[1] === "facebook-group-id")) {
          segments[1] = "get-facebook-group-id";
        }
        // Page ID
        if (locale === "vi" && (segments[1] === "facebook-page-id" || segments[1] === "get-facebook-page-id")) {
          segments[1] = "lay-id-trang-facebook";
        } else if (locale === "en" && (segments[1] === "lay-id-trang-facebook" || segments[1] === "facebook-page-id")) {
          segments[1] = "get-facebook-page-id";
        }
        // Post ID
        if (locale === "vi" && (segments[1] === "facebook-post-id" || segments[1] === "get-facebook-post-id")) {
          segments[1] = "lay-id-bai-viet-facebook";
        } else if (locale === "en" && (segments[1] === "lay-id-bai-viet-facebook" || segments[1] === "facebook-post-id")) {
          segments[1] = "get-facebook-post-id";
        }
      }
      
      // Nếu segment đầu là locale cũ, thay thế
      if (segments.length > 0 && (String(segments[0]) === "en" || String(segments[0]) === "vi")) {
        segments[0] = String(locale);
      } else {
        segments = [String(locale), ...segments];
      }
      
      const newPath = "/" + segments.join("/");
      router.push(newPath);
    },
    [allDictionaries, pathname, router],
  )

  // Khi initialLocale thay đổi (chuyển URL), cập nhật lang và translations
  useEffect(() => {
    if (String(lang) !== String(initialLocale)) {
      setLangState(String(initialLocale))
      setTranslations(allDictionaries[String(initialLocale)])
      if (typeof window !== "undefined") {
        localStorage.setItem("lang", String(initialLocale))
      }
    }
  }, [initialLocale, allDictionaries, lang])

  const t = useCallback(
    (key: string, options?: { returnObjects?: boolean }) => {
      const keys = key.split(".")
      let current: unknown = translations
      for (const k of keys) {
        if (current && typeof current === "object" && k in (current as Record<string, unknown>)) {
          current = (current as Record<string, unknown>)[k]
        } else {
          // Key not found. Return empty array if expecting object/array, else return key string.
          return options?.returnObjects ? [] : key
        }
      }

      // If returnObjects is true, ensure we return an array or an empty array.
      if (options?.returnObjects) {
        return Array.isArray(current) ? current : []
      }
      return String(current)
    },
    [translations],
  )

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
}
