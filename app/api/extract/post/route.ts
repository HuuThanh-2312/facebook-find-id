import { NextResponse } from "next/server"
import { optimizedRapidApiCall, API_CONFIGS } from "@/lib/api-utils"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const link = searchParams.get("link")

  if (!link) {
    return NextResponse.json({ error: "Missing 'link' parameter" }, { status: 400 })
  }

  return optimizedRapidApiCall(link, API_CONFIGS.post, request)
}
