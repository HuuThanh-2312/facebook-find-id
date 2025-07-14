"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import type { LucideIcon } from "lucide-react" // Import type for LucideIcon

interface HeroCardProps {
  href: string
  titleKey?: string
  descriptionKey?: string
  linkTextKey?: string
  title?: string
  description?: string
  linkText?: string
  Icon: LucideIcon // Prop for the Lucide icon component
}

export function HeroCard({ 
  href, 
  titleKey, 
  descriptionKey, 
  linkTextKey, 
  title, 
  description, 
  linkText, 
  Icon 
}: HeroCardProps) {
  const { t } = useTranslation()

  // Use direct strings if provided, otherwise use translation keys
  const displayTitle = title || (titleKey ? t(titleKey) : '')
  const displayDescription = description || (descriptionKey ? t(descriptionKey) : '')
  const displayLinkText = linkText || (linkTextKey ? t(linkTextKey) : '')

  return (
    <Link href={href} className="group block h-full">
      <Card className="h-full flex flex-col justify-start items-start p-6 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border-2 border-border rounded-xl text-left">
        <CardContent className="flex flex-col items-start p-0 text-left w-full">
          <div className="mb-4">
            <Icon className="h-8 w-8 text-primary" /> {/* Icon display */}
          </div>
          <CardTitle className="text-lg md:text-xl font-bold mb-2 text-foreground">{displayTitle}</CardTitle>
          <CardDescription className="text-xs md:text-sm text-muted-foreground mb-4">
            {displayDescription}
          </CardDescription>
          <Button
            variant="link"
            className="flex items-center text-primary group-hover:text-gray-700 text-sm md:text-base font-medium p-0 h-auto"
          >
            {displayLinkText} <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
