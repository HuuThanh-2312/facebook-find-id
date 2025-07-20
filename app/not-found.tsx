import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HomeIcon, ArrowLeftIcon, SearchIcon } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <Card className="border-0 shadow-none">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 text-6xl font-bold text-muted-foreground">
              404
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Trang không tìm thấy
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="flex-1 sm:flex-none">
                <Link href="/">
                  <HomeIcon className="mr-2 h-4 w-4" />
                  Về trang chủ
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex-1 sm:flex-none">
                <Link href="/en">
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  Quay lại
                </Link>
              </Button>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                Hoặc thử các trang phổ biến:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/en/get-facebook-page-id">
                    <SearchIcon className="mr-1 h-3 w-3" />
                    Lấy ID trang
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/en/get-facebook-post-id">
                    <SearchIcon className="mr-1 h-3 w-3" />
                    Lấy ID bài viết
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/en/get-facebook-group-id">
                    <SearchIcon className="mr-1 h-3 w-3" />
                    Lấy ID nhóm
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