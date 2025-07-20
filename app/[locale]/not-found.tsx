import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HomeIcon, ArrowLeftIcon, SearchIcon } from 'lucide-react'
import { dictionaries } from '@/lib/translations'

export default async function LocaleNotFound({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const resolvedParams = await params
  const locale = resolvedParams.locale
  const dict = (dictionaries[locale as keyof typeof dictionaries] || dictionaries["en"]) as any

  // Fallback text if translation is missing
  const title = dict?.common?.pageNotFound || "Trang không tìm thấy"
  const description = dict?.common?.pageNotFoundDesc || "Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển."
  const homeButton = dict?.common?.backToHome || "Về trang chủ"
  const backButton = dict?.common?.goBack || "Quay lại"
  const popularPages = dict?.common?.popularPages || "Hoặc thử các trang phổ biến:"
  const getPageId = dict?.common?.getPageId || "Lấy ID trang"
  const getPostId = dict?.common?.getPostId || "Lấy ID bài viết"
  const getGroupId = dict?.common?.getGroupId || "Lấy ID nhóm"

  // Determine correct URLs based on locale
  const getPageUrl = locale === 'vi' ? '/vi/lay-id-trang-facebook' : '/en/get-facebook-page-id'
  const getPostUrl = locale === 'vi' ? '/vi/lay-id-bai-viet-facebook' : '/en/get-facebook-post-id'
  const getGroupUrl = locale === 'vi' ? '/vi/lay-id-nhom-facebook' : '/en/get-facebook-group-id'

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <Card className="border-0 shadow-none">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 text-6xl font-bold text-muted-foreground">
              404
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              {title}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="flex-1 sm:flex-none">
                <Link href={`/${locale}`}>
                  <HomeIcon className="mr-2 h-4 w-4" />
                  {homeButton}
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex-1 sm:flex-none">
                <Link href={`/${locale}`}>
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  {backButton}
                </Link>
              </Button>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                {popularPages}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={getPageUrl}>
                    <SearchIcon className="mr-1 h-3 w-3" />
                    {getPageId}
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={getPostUrl}>
                    <SearchIcon className="mr-1 h-3 w-3" />
                    {getPostId}
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={getGroupUrl}>
                    <SearchIcon className="mr-1 h-3 w-3" />
                    {getGroupId}
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 