"use client"

import Link from "next/link"
import Image from "next/image"
import { LanguageSwitcher } from "./language-switcher"
import { useTranslation } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"

export function Header() {
  const { t } = useTranslation()
  const pathname = usePathname()
  
  // Extract locale from pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  const currentLocale = pathSegments[0] === 'en' || pathSegments[0] === 'vi' ? pathSegments[0] : 'en'

  const navLinks = [
    { href: currentLocale === 'vi' ? `/${currentLocale}/lay-id-trang-facebook` : currentLocale === 'en' ? `/${currentLocale}/get-facebook-page-id` : `/${currentLocale}/facebook-page-id`, label: t("common.getPageId") },
    { href: currentLocale === 'vi' ? `/${currentLocale}/lay-id-bai-viet-facebook` : currentLocale === 'en' ? `/${currentLocale}/get-facebook-post-id` : `/${currentLocale}/facebook-post-id`, label: t("common.getPostId") },
    { href: currentLocale === 'vi' ? `/${currentLocale}/lay-id-nhom-facebook` : `/${currentLocale}/get-facebook-group-id`, label: t("common.getGroupId") },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background shadow-sm" suppressHydrationWarning>
      {/* Container with flexbox for horizontal alignment and vertical centering */}
      {/* h-16 sets the height, flex items-center centers children vertically */}
      <div className="container mx-auto max-w-6xl h-16 flex items-center justify-between px-4 md:px-6 relative">
        {/* Mobile Menu Trigger (visible only on mobile, positioned absolutely left) */}
        <div className="md:hidden absolute left-4 top-1/2 -translate-y-1/2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] sm:w-[300px] p-4">
              <div className="mb-8 mt-4 flex justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SEEDINGVN_compressed-JKygrK4SIZ20Gs5V60PK30YUMlyJqq.gif"
                  alt="Logo"
                  width={120}
                  height={30}
                  className="h-8 w-auto"
                />
              </div>
              <nav className="flex flex-col gap-4 pt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-lg font-medium hover:text-primary",
                      pathname === link.href ? "text-primary font-bold" : "text-muted-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo (Absolute Centered on Mobile, Static Left-aligned on Desktop) */}
        {/* On desktop, it's a flex item, h-full and items-center ensure vertical centering of its content */}
        <Link
          href={`/${currentLocale}`}
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 md:left-auto md:top-auto md:right-auto md:bottom-auto flex items-center h-full"
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SEEDINGVN_compressed-JKygrK4SIZ20Gs5V60PK30YUMlyJqq.gif"
            alt="Logo"
            width={150}
            height={40}
            className="h-10 w-auto"
            priority
          />
          <span className="sr-only">{t("common.appName")}</span>
        </Link>

        {/* Desktop Navigation (Hidden on Mobile, Centered on Desktop) */}
        {/* flex-1 makes it take available space, justify-center centers its content */}
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-2 h-full">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors whitespace-nowrap px-3 py-2 rounded-md",
                pathname === link.href
                  ? "bg-accent text-primary font-bold"
                  : "text-muted-foreground hover:bg-accent hover:text-primary",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Language Switcher (Absolute Right on Mobile, Static Right-aligned on Desktop) */}
        {/* On desktop, it's a flex item, h-full and items-center ensure vertical centering of its content */}
        <div className="flex items-center space-x-2 absolute right-4 top-1/2 -translate-y-1/2 md:static md:translate-y-0 md:right-auto md:top-auto md:left-auto md:bottom-auto h-full">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
