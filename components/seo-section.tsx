"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/lib/i18n"

interface SeoSectionProps {
  pageType: "pageIdPage" | "postIdPage" | "groupIdPage"
}

export function SeoSection({ pageType }: SeoSectionProps) {
  const { t } = useTranslation()

  return (
    <Card className="w-full max-w-4xl shadow-lg border border-border">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold text-foreground">{t(`${pageType}.seoHeading`)}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-base">{t(`${pageType}.seoContent`)}</p>
      </CardContent>
    </Card>
  )
}
