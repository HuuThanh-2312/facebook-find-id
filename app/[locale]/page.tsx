import { FileTextIcon, MessageSquareIcon, UsersIcon } from "lucide-react"
import { ExpandableContent } from "@/components/expandable-content"
import { Slideshow } from "@/components/slideshow"
import { slideshowImages } from "@/lib/slideshow-images"
import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"
import { dictionaries } from "@/lib/translations"

// Dynamic metadata based on locale
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const dict = (dictionaries[locale as keyof typeof dictionaries] || dictionaries["en"]) as {
    homePage: any;
    common: any;
  };
  if (!dict?.homePage) {
    return {
      title: "Missing translation for homePage",
      description: "Missing translation for homePage",
    };
  }
  
  return {
    title: dict.homePage.title,
    description: dict.homePage.description,
    keywords: [
      "facebook id finder", "get facebook id", "facebook page id", "facebook post id", "facebook group id"
    ],
    openGraph: {
      title: dict.homePage.title,
      description: dict.homePage.description,
      images: [
        {
          url: `/id-facebook-${locale}.png`,
          width: 1200,
          height: 630,
          alt: "Facebook ID Extractor - Seedingvn.vn"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: dict.homePage.title,
      description: dict.homePage.description,
      images: [`/cong-cu-tim-id-facebook-${locale}.png`],
    },
    other: {
      "application-ld+json": JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Seedingvn.vn",
          "url": "https://seedingvn.vn/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://seedingvn.vn/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Seedingvn.vn",
          "url": "https://seedingvn.vn/",
          "logo": "https://seedingvn.vn/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Support",
            "email": "support@seedingvn.vn"
          }
        }
      ])
    }
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const dict = (dictionaries[locale as keyof typeof dictionaries] || dictionaries["en"]) as {
    homePage: any;
    common: any;
  };
  if (!dict?.homePage) {
    return <div className="text-red-500 font-bold p-8">Missing translation for homePage ({locale})</div>;
  }

  return (
    <section className="py-2 md:py-6 lg:py-10 flex-1">
      <div className="max-w-4xl mx-auto px-4 text-left">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 leading-tight text-foreground max-w-full">
          {dict.homePage.heroHeading}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-4xl">
          {dict.homePage.heroSubheading}
        </p>

        {/* Tool Cards Grid */}
        <div className="mb-10">
        <div className="grid gap-6 md:grid-cols-3">
            <Link href={`/${locale}/get-facebook-page-id`} className="group block h-full">
              <Card className="h-full flex flex-col justify-start items-start p-6 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-border rounded-2xl text-left">
                <CardContent className="flex flex-col items-start p-0 text-left w-full">
                  <div className="mb-4">
                    <FileTextIcon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg md:text-xl font-bold mb-2 text-foreground">
                    {dict.common.pageCardTitle}
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm text-muted-foreground mb-4">
                    {dict.common.pageCardDescription}
                  </CardDescription>
                  <Button
                    variant="link"
                    className="flex items-center text-primary group-hover:text-primary/80 text-base font-semibold p-0 h-auto tracking-tight"
                  >
                    {locale === 'en' ? 'Try Now' : 'Thử Ngay'} <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href={`/${locale}/get-facebook-post-id`} className="group block h-full">
              <Card className="h-full flex flex-col justify-start items-start p-6 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-border rounded-2xl text-left">
                <CardContent className="flex flex-col items-start p-0 text-left w-full">
                  <div className="mb-4">
                    <MessageSquareIcon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg md:text-xl font-bold mb-2 text-foreground">
                    {dict.common.postCardTitle}
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm text-muted-foreground mb-4">
                    {dict.common.postCardDescription}
                  </CardDescription>
                  <Button
                    variant="link"
                    className="flex items-center text-primary group-hover:text-primary/80 text-base font-semibold p-0 h-auto tracking-tight"
                  >
                    {locale === 'en' ? 'Try Now' : 'Thử Ngay'} <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href={`/${locale}/get-facebook-group-id`} className="group block h-full">
              <Card className="h-full flex flex-col justify-start items-start p-6 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-border rounded-2xl text-left">
                <CardContent className="flex flex-col items-start p-0 text-left w-full">
                  <div className="mb-4">
                    <UsersIcon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg md:text-xl font-bold mb-2 text-foreground">
                    {dict.common.groupCardTitle}
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm text-muted-foreground mb-4">
                    {dict.common.groupCardDescription}
                  </CardDescription>
                  <Button
                    variant="link"
                    className="flex items-center text-primary group-hover:text-primary/80 text-base font-semibold p-0 h-auto tracking-tight"
                  >
                    {locale === 'en' ? 'Try Now' : 'Thử Ngay'} <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Slideshow */}
        <div className="w-full mt-8 flex justify-center">
          <Slideshow images={slideshowImages} interval={6000} />
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="max-w-4xl mx-auto px-4 mt-12 md:mt-20">
        <ExpandableContent
          title={locale === 'en' ? 'What is Facebook ID?' : 'Facebook ID Là Gì?'}
          content={locale === 'en' ? 
            `<h2 class='text-xl font-bold mt-4 mb-2'>What is Facebook ID?</h2>
<p>Facebook ID (or UID) is a unique numerical identifier that Facebook uses to identify a specific object (account, page, group, post...). This ID is extremely important for developers and marketers when working with Facebook's tools and APIs.</p>

<h2 class='text-xl font-bold mt-6 mb-2'>Why Choose Seedingvn.vn Tools?</h2>
<ul class='list-disc pl-6'>
  <li><strong>Free & Unlimited:</strong> Use freely without paying any costs.</li>
  <li><strong>Fast & Accurate:</strong> Our technology helps return ID results almost instantly with high accuracy.</li>
  <li><strong>Safe & Secure:</strong> We don't require login, don't store any information you enter.</li>
  <li><strong>Diverse Support:</strong> Our Facebook ID tool meets all your most common ID finding needs.</li>
</ul>
` : 
            `<h2 class='text-xl font-bold mt-4 mb-2'>Facebook ID Là Gì?</h2>
<p>Facebook ID (hay UID) là một dãy số định danh duy nhất mà Facebook sử dụng để xác định một đối tượng cụ thể (tài khoản, trang, nhóm, bài viết...). ID này cực kỳ quan trọng đối với các nhà phát triển và marketer khi làm việc với các công cụ và API của Facebook.</p>

<h2 class='text-xl font-bold mt-6 mb-2'>Tại Sao Chọn Công Cụ Của Seedingvn.vn?</h2>
<ul class='list-disc pl-6'>
  <li><strong>Miễn phí & Không giới hạn:</strong> Sử dụng thoải mái mà không cần trả bất kỳ chi phí nào.</li>
  <li><strong>Nhanh chóng & Chính xác:</strong> Công nghệ của chúng tôi giúp trả về kết quả ID gần như ngay lập tức với độ chính xác cao.</li>
  <li><strong>An toàn & Bảo mật:</strong> Chúng tôi không yêu cầu đăng nhập, không lưu trữ bất kỳ thông tin nào bạn nhập vào.</li>
  <li><strong>Hỗ trợ đa dạng:</strong> Bộ tool facebook id đáp ứng mọi nhu cầu tìm ID phổ biến nhất của bạn.</li>
</ul>
`}
          className="shadow-lg border border-border text-left"
          readMoreText={dict.common.readMore}
          collapseText={dict.common.collapseContent}
        />
      </div>
    </section>
  )
}
