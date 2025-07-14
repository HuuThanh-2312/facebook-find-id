// CORRECTED CODE FOR: /vi/lay-id-bai-viet-facebook page

import { IdExtractorForm } from "@/components/id-extractor-form";
import { Slideshow } from "@/components/slideshow";
import { slideshowImages } from "@/lib/slideshow-images";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExpandableContent } from "@/components/expandable-content";
import type { Metadata } from "next";

// --- START: ALL METADATA IS HANDLED HERE ---
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://seedingvn.vn"),
  title: "Lấy ID Bài Viết Facebook & UID Bài Viết Nhanh | Seedingvn.vn",
  description: "Công cụ lấy ID bài viết Facebook (UID bài viết) chỉ với một click. Dán link bài post hoặc video để tìm ID chính xác, phục vụ cho việc tracking, quảng cáo và API.",
  
  // Added keywords
  keywords: ["lấy id bài viết", "cách lấy id bài viết", "id bài viết facebook", "lấy id bài viết facebook", "lấy id bài viết fb", "lấy uid bài viết", "công cụ tìm id bài post"],

  openGraph: {
    title: "Lấy ID Bài Viết Facebook & UID Bài Viết Nhanh | Seedingvn.vn",
    description: "Công cụ lấy ID bài viết Facebook (UID bài viết) chỉ với một click. Dán link bài post hoặc video để tìm ID chính xác.",
    images: [
      {
        url: "/lay-id-bai-viet-facebook.png", // TODO: Thay thế đường dẫn ảnh
        width: 1200,
        height: 630,
        alt: "Lấy ID Bài Viết Facebook - Seedingvn.vn"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Lấy ID Bài Viết Facebook & UID Bài Viết Nhanh | Seedingvn.vn",
    description: "Công cụ lấy ID bài viết Facebook (UID bài viết) chỉ với một click. Dán link bài post hoặc video để tìm ID chính xác.",
    images: ["/lay-id-bai-viet-facebook.png"], // TODO: Thay thế đường dẫn ảnh
  },
  
  // Correctly placed Schema Markup
  other: {
    "application-ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Làm thế nào để lấy link của một bài viết cụ thể?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Cách dễ nhất là tìm bài viết đó trên Facebook và nhấp chuột vào ngày/giờ đăng bài. Thao tác này sẽ mở bài viết ở một trang riêng với URL duy nhất của nó."
            }
          },
          {
            "@type": "Question",
            "name": "Công cụ có hoạt động với bài viết trong nhóm kín không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Thường là không. Với các bài viết trong nhóm kín hoặc có cài đặt riêng tư, hệ thống không thể truy cập để lấy ID. Công cụ hoạt động tốt nhất với các bài viết có chế độ xem công khai."
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Công Cụ Lấy ID Bài Viết Facebook - Seedingvn.vn",
        "operatingSystem": "Web",
        "applicationCategory": "DeveloperTool",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "VND"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "351"
        }
      }
    ])
  }
};
// --- END: METADATA SECTION ---


export default function LayIdBaiVietFacebookPage() {
  return (
    // <Head> component removed
    <section className="flex flex-col items-start space-y-12 w-full">
      <div className="max-w-full text-left space-y-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
          Công Cụ Lấy ID Bài Viết Facebook (Post ID)
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-4xl">
          Tìm ID hoặc UID của bất kỳ bài viết, video, hoặc reel nào trên Facebook một cách dễ dàng và nhanh chóng. Công cụ của Seedingvn.vn giúp bạn lấy mã định danh cần thiết chỉ trong tích tắc.
        </p>
      </div>
      
      <IdExtractorForm type="post" />
      
      <div className="w-full mt-8 flex justify-center">
        <Slideshow images={slideshowImages} interval={6000} />
      </div>

      {/* This FAQ part for users is correct */}
      <div className="w-full space-y-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base md:text-lg font-semibold">
              Làm thế nào để lấy link của một bài viết cụ thể?
            </AccordionTrigger>
            <AccordionContent>
              Cách dễ nhất là tìm bài viết đó trên Facebook và nhấp chuột vào ngày/giờ đăng bài. Thao tác này sẽ mở bài viết ở một trang riêng với URL duy nhất của nó.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-base md:text-lg font-semibold">
              Công cụ có hoạt động với bài viết trong nhóm kín không?
            </AccordionTrigger>
            <AccordionContent>
              Thường là không. Với các bài viết trong nhóm kín hoặc có cài đặt riêng tư, hệ thống không thể truy cập để lấy ID. Công cụ hoạt động tốt nhất với các bài viết có chế độ xem công khai.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* This SEO content part is correct */}
      <div className="w-full">
        <ExpandableContent
          title="Chi tiết về ID Bài Viết Facebook (Post ID)"
          content={`
            <h2 class='text-xl font-bold mt-4 mb-2'>ID Bài Viết Facebook (Post ID) là gì?</h2>
            <p>Mỗi khi một nội dung được đăng lên Facebook, dù là một status, một bức ảnh, một video hay một reel, nó sẽ được gán một mã số định danh duy nhất gọi là ID Bài Viết (Post ID hoặc UID bài viết). ID này giúp Facebook và các ứng dụng bên thứ ba xác định chính xác một nội dung cụ thể.</p>
            
            <h2 class='text-xl font-bold mt-6 mb-2'>Tại sao cần lấy UID bài viết?</h2>
            <p>Việc lấy id bài viết fb là một kỹ năng cần thiết cho nhiều công việc. Dưới đây là các ứng dụng phổ biến nhất:</p>
            <ul class='list-disc pl-6'>
              <li><strong>Chạy Quảng Cáo (Facebook Ads):</strong> Sử dụng ID của một bài viết có tương tác tốt để chạy quảng cáo tương tác (Post Engagement).</li>
              <li><strong>Nhúng Bài Viết Lên Website:</strong> Hiển thị một bài viết Facebook cụ thể lên website hoặc blog của bạn.</li>
              <li><strong>Phân Tích Dữ Liệu:</strong> Sử dụng ID bài viết để theo dõi hiệu suất, thu thập bình luận, lượt thích thông qua API của Facebook.</li>
              <li><strong>Sử dụng trong các tool khác:</strong> Nhiều công cụ seeding, social listening yêu cầu bạn cung cấp ID bài viết để bắt đầu theo dõi.</li>
            </ul>

            <h2 class='text-xl font-bold mt-6 mb-2'>Hướng dẫn cách lấy ID bài viết Facebook (3 bước)</h2>
            <p>Bạn không biết cách lấy id bài viết? Đừng lo, công cụ của Seedingvn.vn sẽ giúp bạn:</p>
            <ol class='list-decimal pl-6'>
              <li><strong>Bước 1: Lấy Liên Kết (URL) của Bài Viết:</strong> Tìm đến bài viết, ảnh hoặc video bạn cần lấy ID. Nhấp vào thời gian đăng của bài viết đó (ví dụ: "5 giờ trước"). Trình duyệt sẽ tự động chuyển đến URL duy nhất của bài viết. Hãy sao chép URL này.</li>
              <li><strong>Bước 2: Dán URL vào Công Cụ:</strong> Quay lại trang này và dán URL bạn vừa sao chép vào ô nhập liệu.</li>
              <li><strong>Bước 3: Nhận Kết Quả:</strong> Nhấn nút "Tìm ID". ID chính xác của bài viết sẽ hiện ra ngay lập tức để bạn sao chép.</li>
            </ol>
            `}
          className="shadow-lg border border-border"
          readMoreText="Xem thêm nội dung"
          collapseText="Thu gọn nội dung"
        />
      </div>
    </section>
  );
} 