"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useTranslation } from "@/lib/i18n"
import { CopyIcon, CheckIcon, Loader2 } from "lucide-react" // Import Loader2

interface IdExtractorFormProps {
  type: "page" | "post" | "group"
}

interface ExtractionResult {
  url: string
  id: string | null
  status: "success" | "error" | "info"
  message?: string
  copyFeedback: boolean // New state for individual copy button feedback
}

export function IdExtractorForm({ type }: IdExtractorFormProps) {
  const { t } = useTranslation()
  const [urlInput, setUrlInput] = useState("") // For single URL
  const [urlsInputBatch, setUrlsInputBatch] = useState("") // For batch URLs
  const [extractedId, setExtractedId] = useState<string | null>(null) // For single result
  const [singleCopyFeedback, setSingleCopyFeedback] = useState(false) // New state for single copy feedback
  const [batchResults, setBatchResults] = useState<ExtractionResult[]>([]) // For batch results
  const [message, setMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<"success" | "error" | "info" | null>(null)
  const [extractionMode, setExtractionMode] = useState<"single" | "batch">("single") // Mode state
  const [isLoading, setIsLoading] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const performExtraction = async (
    inputUrl: string,
  ): Promise<{ id: string | null; messageType: "success" | "error" | "info"; message: string }> => {
    if (!inputUrl) {
      return { id: null, messageType: "error", message: tString("common.invalidUrl") }
    }

    let apiEndpoint = ""
    if (type === "page") {
      apiEndpoint = "/api/extract/page"
    } else if (type === "post") {
      apiEndpoint = "/api/extract/post"
    } else if (type === "group") {
      apiEndpoint = "/api/extract/group"
    } else {
      return { id: null, messageType: "error", message: "Invalid extraction type" }
    }

    try {
      const response = await fetch(`${apiEndpoint}?link=${encodeURIComponent(inputUrl)}`)
      const data = await response.json()

      if (response.ok) {
        // Handle different response formats for each API type
        let extracted = null
        if (type === "page") {
          extracted = data.facebook_id || data.id || data.page_id
        } else if (type === "post") {
          extracted = data.post_id || data.id || data.facebook_id
        } else if (type === "group") {
          extracted = data.group_id || data.id || data.facebook_id
        }
        
        if (extracted) {
          return { id: String(extracted), messageType: "success", message: "" }
        } else {
          // If API returns success but no ID, it might be a custom URL that needs API
          return { id: "N/A", messageType: "info", message: tString(`${type}IdPage.apiRequiredMessage`) || "" }
        }
      } else {
        // Handle API errors
        return { id: null, messageType: "error", message: data.error || tString("common.errorExtractingId") || "" }
      }
    } catch (e) {
      console.error("Network or API call error:", e)
      return { id: null, messageType: "error", message: tString("common.errorExtractingId") || "" }
    }
  }

  const handleExtract = async () => {
    let urlForEvent = extractionMode === 'single' ? urlInput : urlsInputBatch;
    let idResultForEvent: string | null = null;

    setIsLoading(true)
    setMessage(null)
    setMessageType(null)
    setExtractedId(null)
    setSingleCopyFeedback(false) // Reset single copy feedback
    setBatchResults([])

    if (extractionMode === "single") {
      const { id, messageType: type, message: msg = "" } = await performExtraction(urlInput) // Await here
      idResultForEvent = id || null;

      if (id) {
        setExtractedId(id)
        if (type === "info") {
          setMessage(msg)
          setMessageType("info")
        } else {
          setMessage(null)
          setMessageType(null)
        }
      } else {
        setExtractedId(null)
        setMessage(msg || "Error extracting ID")
        setMessageType(type)
      }
    } else {
      // Batch mode
      const urls = urlsInputBatch
        .split("\n")
        .map((u) => u.trim())
        .filter((u) => u.length > 0)
      if (urls.length === 0) {
        setMessage(tString("common.enterUrlsPlaceholder"))
        setMessageType("error")
        return
      }

      const resultsPromises: Promise<ExtractionResult>[] = urls.map(async (url) => {
        const { id, messageType: type, message: msg = "" } = await performExtraction(url) // Await each extraction
        return {
          url,
          id,
          status: type,
          message: msg,
          copyFeedback: false,
        }
      })
      const results = await Promise.all(resultsPromises) // Wait for all extractions to complete
      setBatchResults(results)
      idResultForEvent = results.map(r => r.id).filter(Boolean).join(", ");
    }

    if (typeof window !== 'undefined') {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({ event: 'extract_id_click', extractionMode, type, url: urlForEvent, idresult: idResultForEvent });
    }
    setIsLoading(false)
  }

  const handleCopyToClipboard = (idToCopy: string, index?: number) => {
    navigator.clipboard.writeText(idToCopy)
    if (typeof index === "number") {
      setBatchResults((prevResults) =>
        prevResults.map((res, i) => (i === index ? { ...res, copyFeedback: true } : res)),
      )
      setTimeout(() => {
        setBatchResults((prevResults) =>
          prevResults.map((res, i) => (i === index ? { ...res, copyFeedback: false } : res)),
        )
      }, 1500) // Feedback duration for individual copy
    } else {
      // For single mode copy
      setSingleCopyFeedback(true)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setSingleCopyFeedback(false)
      }, 1500)
    }
  }

  const handleCopyAllResults = () => {
    const textToCopy = batchResults
      .map((result) => {
        if (result.id && result.id !== "N/A") {
          return result.id
        }
        return "" // Do not include invalid or placeholder IDs in "copy all"
      })
      .filter(Boolean) // Remove empty strings
      .join("\n")

    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy)
      setMessage(tString("common.copied"))
      setMessageType("success")
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setMessage(null)
      }, 2000)
    } else {
      setMessage(tString("common.noIdsToCopy")) // Or a translated message
      setMessageType("info")
    }
  }

  // Fix for t() possibly returning string[]
  function tString(key: string): string {
    const val = t(key)
    return Array.isArray(val) ? val.join(' ') : (val as string)
  }

  return (
    <Card className="w-full mx-auto shadow-md border border-border rounded-2xl">
      <CardContent className="p-6 space-y-6">
        {/* Mode Selector */}
        <div className="flex justify-center mb-4 gap-x-2">
          <Button
            variant={extractionMode === "single" ? "outline" : "outline"}
            onClick={() => setExtractionMode("single")}
            className={`w-1/2 text-sm md:text-base text-wrap h-auto py-2 border-2 ${extractionMode === "single" ? "border-primary font-semibold text-primary" : "border-border text-muted-foreground"} bg-white shadow-none`}
          >
            {tString("common.singleUrlExtraction")}
          </Button>
          <Button
            variant={extractionMode === "batch" ? "outline" : "outline"}
            onClick={() => setExtractionMode("batch")}
            className={`w-1/2 text-sm md:text-base text-wrap h-auto py-2 border-2 ${extractionMode === "batch" ? "border-primary font-semibold text-primary" : "border-border text-muted-foreground"} bg-white shadow-none`}
          >
            {tString("common.batchUrlExtraction")}
          </Button>
        </div>

        {/* Input Area based on mode */}
        {extractionMode === "single" ? (
          <Input
            placeholder={tString("common.enterUrlPlaceholder")}
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="w-full p-2 text-xs md:text-sm rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          />
        ) : (
          <Textarea
            placeholder={tString("common.enterUrlsPlaceholder")}
            value={urlsInputBatch}
            onChange={(e) => setUrlsInputBatch(e.target.value)}
            rows={8}
            className="w-full p-2 text-xs md:text-sm max-h-32 resize-y rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          />
        )}

        <Button
          onClick={handleExtract}
          className="w-full h-9 text-xs md:text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              {tString("common.extractIdButton")}
            </>
          ) : (
            tString("common.extractIdButton")
          )}
        </Button>

        {/* Display results for single mode (unified format) */}
        {extractionMode === "single" && extractedId && (
          <>
            <div className="border p-2 rounded-md bg-muted/20">
              <div className="flex items-center space-x-2">
                <span className="text-base md:text-lg font-semibold text-foreground flex-1 break-all">{extractedId}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopyToClipboard(extractedId)}
                  aria-label={tString("common.copyToClipboard")}
                  disabled={!extractedId}
                  className="h-9 w-9 rounded-md hover:bg-accent bg-transparent"
                >
                  {singleCopyFeedback ? <CheckIcon className="h-5 w-5 text-primary" /> : <CopyIcon className="h-5 w-5" />}
                  <span className="sr-only">{tString("common.copyToClipboard")}</span>
                </Button>
              </div>
            </div>
            <Button
              onClick={() => extractedId && handleCopyToClipboard(extractedId)}
              className="w-full h-9 text-xs md:text-sm bg-secondary text-secondary-foreground hover:bg-secondary/90 mt-2"
              variant="outline"
              disabled={!extractedId}
            >
              {tString("common.copyToClipboard")}
            </Button>
          </>
        )}

        {/* Display results for batch mode (simplified format) */}
        {extractionMode === "batch" && batchResults.length > 0 && (
          <div className="space-y-4">
            <div className="flex flex-col space-y-4">
              {batchResults.map((result, index) => (
                <div key={index} className="border p-4 rounded-md bg-muted/20">
                  {/* Removed URL display */}
                  <div className="flex items-center space-x-2">
                    <span className="text-xl md:text-2xl font-bold text-foreground flex-1 break-all">
                      {result.id || "N/A"}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => result.id && handleCopyToClipboard(result.id, index)}
                      aria-label={tString("common.copyToClipboard")}
                      disabled={!result.id}
                      className="h-9 w-9 rounded-md hover:bg-accent bg-transparent"
                    >
                      {result.copyFeedback ? (
                        <CheckIcon className="h-5 w-5 text-primary" />
                      ) : (
                        <CopyIcon className="h-5 w-5" />
                      )}
                      <span className="sr-only">{tString("common.copyToClipboard")}</span>
                    </Button>
                  </div>
                  {/* Removed message display */}
                </div>
              ))}
            </div>
            <Button
              onClick={handleCopyAllResults}
              className="w-full h-10 text-sm md:text-base bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              {tString("common.copyAllResults")}
            </Button>
          </div>
        )}

        {message && (
          <p
            className={`text-center text-xs md:text-sm p-3 rounded-md ${
              messageType === "error"
                ? "text-destructive bg-destructive/10"
                : messageType === "success"
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground bg-muted"
            }`}
          >
            {message}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
