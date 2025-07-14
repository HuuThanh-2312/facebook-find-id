"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ExpandableContentProps {
  title: string
  content: string | string[]
  initialHeight?: string // e.g., "100px"
  className?: string
  readMoreText?: string
  collapseText?: string
}

export function ExpandableContent({ 
  title, 
  content, 
  initialHeight = "150px", 
  className,
  readMoreText = "Read More",
  collapseText = "Collapse Content"
}: ExpandableContentProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Helper: check if string is HTML
  function isHTMLString(str: string) {
    return /<[a-z][\s\S]*>/i.test(str)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden relative" style={{ maxHeight: isExpanded ? "none" : initialHeight }}>
          {Array.isArray(content) ? (
            <ul className="list-disc list-inside space-y-2 text-muted-foreground text-base">
              {content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : isHTMLString(content) ? (
            <div className="text-muted-foreground text-base" dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <p className="text-muted-foreground text-base">{content}</p>
          )}
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          )}
        </div>
        <div className="text-center mt-4">
          <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? collapseText : readMoreText}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
