import { IdExtractorForm } from "@/components/id-extractor-form";
import { Slideshow } from "@/components/slideshow";
import { slideshowImages } from "@/lib/slideshow-images";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExpandableContent } from "@/components/expandable-content";
import type { Metadata } from "next";

// --- START: ALL METADATA IS HANDLED HERE ---
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://seedingvn.vn"),
  title: "Cách Lấy ID Group Facebook & ID Nhóm Nhanh | Seedingvn.vn",
  description: "Công cụ miễn phí giúp bạn lấy ID Group Facebook hoặc UID nhóm một cách dễ dàng. Chỉ cần dán link nhóm để tìm ID chính xác, phục vụ quản lý cộng đồng và marketing.",
  keywords: [
    "lấy id nhóm", "cách lấy id nhóm", "id nhóm facebook", "lấy id nhóm facebook", "lấy id nhóm fb", "lấy uid nhóm", "công cụ tìm id nhóm", "group id facebook"
  ],
  openGraph: {
    title: "Cách Lấy ID Group Facebook & ID Nhóm Nhanh | Seedingvn.vn",
    description: "Công cụ miễn phí giúp bạn lấy ID Group Facebook hoặc UID nhóm một cách dễ dàng. Chỉ cần dán link nhóm để tìm ID chính xác, phục vụ quản lý cộng đồng và marketing.",
    images: [
      {
        url: "/lay-id-nhom-facebook.png", // TODO: Thay thế đường dẫn ảnh
        width: 1200,
        height: 630,
        alt: "Cách Lấy ID Group Facebook - Seedingvn.vn"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Cách Lấy ID Group Facebook & ID Nhóm Nhanh | Seedingvn.vn",
    description: "Công cụ miễn phí giúp bạn lấy ID Group Facebook hoặc UID nhóm một cách dễ dàng. Chỉ cần dán link nhóm để tìm ID chính xác, phục vụ quản lý cộng đồng và marketing.",
    images: ["/lay-id-nhom-facebook.png"], // TODO: Thay thế đường dẫn ảnh
  },
  other: {
    "application-ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Làm sao để lấy ID của một nhóm kín (Closed Group)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Công cụ của chúng tôi có thể lấy ID của cả nhóm công khai và nhóm kín, miễn là bạn là thành viên của nhóm kín đó. Nếu bạn không ở trong nhóm, hệ thống sẽ không thể truy cập để lấy ID do chính sách bảo mật của Facebook."
            }
          },
          {
            "@type": "Question",
            "name": "Tại sao ID trả về đôi khi không hoạt động?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Hãy chắc chắn rằng bạn đã sao chép đúng URL của trang chính của nhóm (ví dụ: facebook.com/groups/12345...), không phải URL của một bài viết cụ thể bên trong nhóm. Nếu cần lấy id bài viết, vui lòng sử dụng công cụ dành riêng cho việc đó của chúng tôi."
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Công Cụ Lấy ID Nhóm Facebook - Seedingvn.vn",
        "operatingSystem": "Web",
        "applicationCategory": "DeveloperTool",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "VND"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "reviewCount": "195"
        }
      }
    ])
  }
};
// --- END: METADATA SECTION ---

export default function LayIdNhomFacebookPage() {
  return (
    <section className="flex flex-col items-start space-y-12 w-full">
      <div className="max-w-full text-left space-y-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
          Công Cụ Lấy ID Nhóm Facebook (Group ID)
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-4xl">
          Dễ dàng tìm ID định danh của bất kỳ nhóm Facebook nào, dù là nhóm công khai hay nhóm kín. Công cụ của Seedingvn.vn giúp bạn có được ID cần thiết cho công việc quản lý và phát triển cộng đồng.
        </p>
      </div>
      <IdExtractorForm type="group" />
      <div className="w-full mt-8 flex justify-center">
        <Slideshow images={slideshowImages} interval={6000} />
      </div>
      <div className="w-full space-y-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base md:text-lg font-semibold">
              Làm sao để lấy ID của một nhóm kín (Closed Group)?
            </AccordionTrigger>
            <AccordionContent>
              Công cụ của chúng tôi có thể lấy ID của cả nhóm công khai và nhóm kín, miễn là bạn là thành viên của nhóm kín đó. Nếu bạn không ở trong nhóm, hệ thống sẽ không thể truy cập để lấy ID do chính sách bảo mật của Facebook.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-base md:text-lg font-semibold">
              Tại sao ID trả về đôi khi không hoạt động?
            </AccordionTrigger>
            <AccordionContent>
              Hãy chắc chắn rằng bạn đã sao chép đúng URL của trang chính của nhóm (ví dụ: facebook.com/groups/12345...), không phải URL của một bài viết cụ thể bên trong nhóm. Nếu cần lấy id bài viết, vui lòng sử dụng công cụ dành riêng cho việc đó của chúng tôi.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="w-full">
        <ExpandableContent
          title="Chi tiết về ID Nhóm Facebook (Group ID)"
          content={`
            <h2 class='text-xl font-bold mt-4 mb-2'>ID Nhóm Facebook (Group ID) là gì?</h2>
            <p>Mỗi nhóm (group) trên Facebook được định danh bởi một dãy số duy nhất, gọi là ID Nhóm hay UID nhóm. Đây là mã số cố định, không thay đổi ngay cả khi bạn đổi tên hay URL của nhóm.</p>
            
            <h2 class='text-xl font-bold mt-6 mb-2'>Lấy ID Group Facebook để làm gì?</h2>
            <p>Việc lấy id group facebook là một yêu cầu phổ biến đối với các quản trị viên cộng đồng và các nhà marketing. Các ứng dụng chính bao gồm:</p>
            <ul class='list-disc pl-6'>
              <li><strong>Quản lý Cộng đồng:</strong> Nhiều công cụ của bên thứ ba yêu cầu Group ID để tự động duyệt bài, lọc thành viên hoặc phân tích nội dung.</li>
              <li><strong>Marketing & Seeding:</strong> Sử dụng ID nhóm để tạo các tệp đối tượng tùy chỉnh từ thành viên nhóm cho các chiến dịch quảng cáo.</li>
              <li><strong>Phân tích Cộng đồng:</strong> Dùng ID để theo dõi sự phát triển của nhóm, mức độ tương tác và các chỉ số quan trọng khác.</li>
            </ul>

            <h2 class='text-xl font-bold mt-6 mb-2'>Hướng dẫn cách lấy ID nhóm Facebook</h2>
            <p>Bạn đang tìm cách lấy id nhóm? Chỉ cần làm theo 3 bước cực kỳ đơn giản sau:</p>
            <ol class='list-decimal pl-6'>
              <li><strong>Bước 1: Sao chép URL của Nhóm:</strong> Truy cập vào trang chính của nhóm Facebook bạn muốn tìm ID và sao chép URL trên thanh địa chỉ.</li>
              <li><strong>Bước 2: Dán URL vào Công cụ:</strong> Quay lại trang này và dán URL bạn vừa sao chép vào ô nhập liệu.</li>
              <li><strong>Bước 3: Nhận ID Nhóm:</strong> Nhấn nút "Tìm ID". ID chính xác của nhóm sẽ được hiển thị ngay lập tức.</li>
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