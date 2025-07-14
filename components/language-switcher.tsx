"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTranslation } from "@/lib/i18n"
import { GlobeIcon } from "lucide-react"

export function LanguageSwitcher() {
  const { lang, setLang, t } = useTranslation()

  const setLangWithCookie = (newLang: string) => {
    document.cookie = `locale=${newLang}; path=/; max-age=31536000` // 1 năm
    setLang(newLang)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost" // Use ghost variant for proper trigger behavior
          size="icon"
          aria-label={String(t("common.selectLanguage")) || 'Select language'}
          className="rounded-md border border-input hover:bg-accent bg-transparent flex items-center justify-center"
        >
          {lang === 'vi' ? (
            <span role="img" aria-label="Tiếng Việt" className="h-5 w-5 text-xl flex items-center justify-center">🇻🇳</span>
          ) : (
            <span role="img" aria-label="English" className="h-5 w-5 text-xl flex items-center justify-center">🇺🇸</span>
          )}
          <span className="sr-only">{t("common.selectLanguage")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="shadow-lg rounded-md">
        <DropdownMenuItem onClick={() => setLangWithCookie("en")} className={lang === "en" ? "font-bold bg-accent" : ""}>
          <span role="img" aria-label="English" className="mr-2">🇺🇸</span> English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLangWithCookie("vi")} className={lang === "vi" ? "font-bold bg-accent" : ""}>
          <span role="img" aria-label="Tiếng Việt" className="mr-2">🇻🇳</span> Tiếng Việt
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
