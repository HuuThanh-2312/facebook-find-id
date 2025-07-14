// CORRECTED CODE FOR: /vi/lay-id-trang-facebook page

import { IdExtractorForm } from "@/components/id-extractor-form";
import { Slideshow } from "@/components/slideshow";
import { slideshowImages } from "@/lib/slideshow-images";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExpandableContent } from "@/components/expandable-content";
import type { Metadata } from "next";

// --- START: ALL METADATA IS HANDLED HERE ---
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://seedingvn.vn"),
  // Updated title to include Profile
  title: "Công Cụ Tìm ID Facebook (Page & Profile) | Seedingvn.vn",
  
  // Updated description
  description: "Công cụ tìm ID Facebook miễn phí. Dán URL của Trang (Fanpage) hoặc trang cá nhân (Profile) để lấy ID ngay lập tức. Chính xác, nhanh chóng và không cần đăng nhập.",
  
  // Added keywords
  keywords: ["lấy id page", "lấy id trang cá nhân", "cách lấy id trang facebook", "tìm id facebook", "check id fanpage", "công cụ tìm id facebook", "tool lấy id"],

  openGraph: {
    title: "Công Cụ Tìm ID Facebook (Page & Profile) | Seedingvn.vn",
    description: "Cách dễ nhất để tìm ID số cho bất kỳ Trang Facebook hoặc trang cá nhân nào. Miễn phí, nhanh chóng và bảo mật.",
    images: [
      {
        url: "/social-image-id-finder-vi.png", // TODO: Thay thế đường dẫn ảnh
        width: 1200,
        height: 630,
        alt: "Tìm ID Facebook với công cụ của Seedingvn.vn"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Công Cụ Tìm ID Facebook (Page & Profile) | Seedingvn.vn",
    description: "Cách dễ nhất để tìm ID số cho bất kỳ Trang Facebook hoặc trang cá nhân nào. Miễn phí, nhanh chóng và bảo mật.",
    images: ["/social-image-id-finder-vi.png"], // TODO: Thay thế đường dẫn ảnh
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
              "name": "Tôi có thể lấy ID của trang cá nhân (Profile) bằng công cụ này không?",
              "acceptedAnswer": {
                "@type": "Answer",
              "text": "Chắc chắn rồi! Công cụ này hoạt động tốt cho cả Trang (Fanpage) và trang cá nhân (Profile). Bạn chỉ cần dán URL của trang cá nhân vào ô tìm kiếm tương tự như cách làm với Fanpage, hệ thống sẽ trả về ID chính xác."
              }
            },
            {
              "@type": "Question",
            "name": "Tại sao tôi không lấy được ID của một trang/profile nào đó?",
              "acceptedAnswer": {
                "@type": "Answer",
              "text": "Có hai lý do phổ biến: 1) URL bạn dán vào không chính xác. 2) Trang cá nhân hoặc Fanpage đó có thể đã bị hạn chế về quốc gia/độ tuổi và hệ thống của chúng tôi không thể truy cập được. Vui lòng kiểm tra lại URL."
              }
            }
          ]
      },
      {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
        "name": "Công Cụ Tìm ID Facebook (Page & Profile) - Seedingvn.vn",
          "operatingSystem": "Web",
          "applicationCategory": "DeveloperTool",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "VND"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "218"
          }
      }
    ])
  }
};
// --- END: METADATA SECTION ---


export default function PageIdPage() {
  return (
    // <Head> component removed
      <section className="flex flex-col items-start space-y-12 w-full">
        <div className="max-w-full text-left space-y-4">
        {/* H1 and description updated */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
          Công Cụ Tìm ID Facebook (Page & Profile)
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-4xl">
          Dễ dàng tìm thấy ID số của bất kỳ Trang (Fanpage) hay trang cá nhân (Profile) nào bằng công cụ đơn giản của chúng tôi. Chỉ cần dán liên kết và nhấn nút, bạn sẽ có ngay ID cần thiết.
          </p>
        </div>
      
        <IdExtractorForm type="page" />
      
        <div className="w-full mt-8 flex justify-center">
          <Slideshow images={slideshowImages} interval={6000} />
        </div>

      {/* Accordion (FAQ for users) is correct */}
        <div className="w-full space-y-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base md:text-lg font-semibold">
              Tôi có thể lấy ID của trang cá nhân (Profile) bằng công cụ này không?
            </AccordionTrigger>
            <AccordionContent>
              Chắc chắn rồi! Công cụ này hoạt động tốt cho cả Trang (Fanpage) và trang cá nhân (Profile). Bạn chỉ cần dán URL của trang cá nhân vào ô tìm kiếm tương tự như cách làm với Fanpage, hệ thống sẽ trả về ID chính xác.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-base md:text-lg font-semibold">
              Tại sao tôi không lấy được ID của một trang/profile nào đó?
              </AccordionTrigger>
              <AccordionContent>
              Có hai lý do phổ biến: 1) URL bạn dán vào không chính xác. 2) Trang cá nhân hoặc Fanpage đó có thể đã bị hạn chế về quốc gia/độ tuổi và hệ thống của chúng tôi không thể truy cập được. Vui lòng kiểm tra lại URL.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

      {/* ExpandableContent updated */}
        <div className="w-full">
          <ExpandableContent
          title="Nội dung chi tiết về ID Facebook"
            content={`
              <h2 class='text-xl font-bold mt-4 mb-2'>ID Facebook (Page & Profile ID) là gì?</h2>
              <p>Mỗi đối tượng trên Facebook, từ Trang (Fanpage) cho tới trang cá nhân (Profile), đều được gán một mã định danh duy nhất. Đây là một dãy số không trùng lặp mà Facebook sử dụng để xác định chính xác đối tượng đó. Dù bạn có đổi tên hay đường dẫn (URL), ID này sẽ không bao giờ thay đổi.</p>
              
              <h2 class='text-xl font-bold mt-6 mb-2'>Tại sao việc lấy ID Facebook lại quan trọng?</h2>
              <p>Việc lấy ID là một bước cần thiết trong nhiều công việc liên quan đến marketing và phát triển ứng dụng:</p>
              <ul class='list-disc pl-6'>
                <li><strong>Cho Lập Trình Viên:</strong> Cần có ID để làm việc với Facebook Graph API, tích hợp các tính năng vào website, ứng dụng.</li>
                <li><strong>Cho Nhà Quảng Cáo:</strong> Một số công cụ quảng cáo nâng cao yêu cầu ID để thực hiện các chiến dịch marketing hoặc phân tích.</li>
                <li><strong>Cho Quản Trị Viên Website:</strong> Cần ID để nhúng các plugin của Facebook (hộp chat, feed,...) vào website của mình.</li>
              </ul>

              <h2 class='text-xl font-bold mt-6 mb-2'>Hướng dẫn cách lấy ID Facebook</h2>
              <p>Quy trình cực kỳ đơn giản cho cả Page và Profile:</p>
              <ol class='list-decimal pl-6'>
                <li><strong>Bước 1: Sao chép URL:</strong> Truy cập Trang (Fanpage) hoặc trang cá nhân bạn muốn tìm ID và sao chép toàn bộ đường dẫn trên thanh địa chỉ.</li>
                <li><strong>Bước 2: Dán URL vào công cụ:</strong> Quay lại trang này và dán đường dẫn bạn vừa sao chép vào ô nhập liệu ở trên.</li>
                <li><strong>Bước 3: Lấy kết quả:</strong> Nhấn nút "Tìm ID". Hệ thống sẽ ngay lập tức trả về ID chính xác.</li>
              </ol>
              <hr class='my-6' />
              <div class='text-xs text-muted-foreground mt-4'>
                <strong>Từ khóa tham khảo:</strong> lấy id page, lấy id trang cá nhân, cách lấy id trang facebook, tìm id facebook, check id fanpage, công cụ tìm id facebook, tool lấy id.
              </div>
            `}
            className="shadow-lg border border-border"
          readMoreText="Xem thêm nội dung"
          collapseText="Thu gọn nội dung"
          />
        </div>
      </section>
  );
} 