"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/lib/i18n"

interface HowToGuideProps {
  type: "page" | "post" | "group"
  steps: string[]
}

export function HowToGuide({ type, steps }: HowToGuideProps) {
  const { t } = useTranslation()

  const getTitle = () => {
    if (type === "page") return t("common.howToGet") + " " + t("common.getPageId").replace("Get ", "")
    if (type === "post") return t("common.howToGet") + " " + t("common.getPostId").replace("Get ", "")
    if (type === "group") return t("common.howToGet") + " " + t("common.getGroupId").replace("Get ", "")
    return ""
  }

  return (
    <Card className="w-full max-w-4xl shadow-lg border border-border">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold text-foreground">{getTitle()}</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal list-inside space-y-3 text-muted-foreground text-base">
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}
