"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/lib/i18n"

interface InfoSectionProps {
  type: "page" | "post" | "group"
  section: "whatIs" | "whyNeed"
  content: string | string[]
}

export function InfoSection({ type, section, content }: InfoSectionProps) {
  const { t } = useTranslation()
  const titleKey = section === "whatIs" ? "common.whatIs" : "common.whyNeed"
  let specificTitle = ""

  if (type === "page") {
    specificTitle = t("common.getPageId").replace("Get ", "")
  } else if (type === "post") {
    specificTitle = t("common.getPostId").replace("Get ", "")
  } else if (type === "group") {
    specificTitle = t("common.getGroupId").replace("Get ", "")
  }

  return (
    <Card className="w-full max-w-4xl shadow-lg border border-border">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold text-foreground">
          {t(titleKey)} {specificTitle}?
        </CardTitle>
      </CardHeader>
      <CardContent>
        {Array.isArray(content) ? (
          <ul className="list-disc list-inside space-y-2 text-muted-foreground text-base">
            {content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-base">{content}</p>
        )}
      </CardContent>
    </Card>
  )
}
