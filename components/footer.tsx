"use client"

import Link from "next/link"
import { useTranslation } from "@/lib/i18n"
import { usePathname } from "next/navigation"
import Image from "next/image"

export function Footer() {
  const { t } = useTranslation()
  const pathname = usePathname()
  
  // Extract locale from pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  const currentLocale = pathSegments[0] === 'en' || pathSegments[0] === 'vi' ? pathSegments[0] : 'en'

  const footerSections = [
    {
      titleKey: "common.footerSection1Title",
      links: [
        { href: currentLocale === 'vi' ? `/${currentLocale}/lay-id-trang-facebook` : currentLocale === 'en' ? `/${currentLocale}/get-facebook-page-id` : `/${currentLocale}/facebook-page-id`, textKey: "common.footerSection1Link1" },
        { href: currentLocale === 'vi' ? `/${currentLocale}/lay-id-bai-viet-facebook` : currentLocale === 'en' ? `/${currentLocale}/get-facebook-post-id` : `/${currentLocale}/facebook-post-id`, textKey: "common.footerSection1Link2" },
        { href: currentLocale === 'vi' ? `/${currentLocale}/lay-id-nhom-facebook` : `/${currentLocale}/get-facebook-group-id`, textKey: "common.footerSection1Link3" },
        { href: "#", textKey: "common.footerSection1Link4" }, // Placeholder link
        { href: "#", textKey: "common.footerSection1Link5" }, // Placeholder link
      ],
    },
    {
      titleKey: "common.footerSection2Title",
      links: [
        { href: "#", textKey: "common.footerSection2Link1" }, // Placeholder link
        { href: "#", textKey: "common.footerSection2Link2" }, // Placeholder link
        { href: "#", textKey: "common.footerSection2Link3" }, // Placeholder link
        { href: "#", textKey: "common.footerSection2Link4" }, // Placeholder link
      ],
    },
    {
      titleKey: "common.footerSection3Title",
      links: [
        { href: "#", textKey: "common.footerSection3Link1" }, // Placeholder link
        { href: "#", textKey: "common.footerSection3Link2" }, // Placeholder link
        { href: "#", textKey: "common.footerSection3Link3" }, // Placeholder link
        { href: "#", textKey: "common.footerSection3Link4" }, // Placeholder link
      ],
    },
    {
      titleKey: "common.footerSection4Title",
      links: [
        { href: "#", textKey: "common.footerSection4Link1" }, // Placeholder link
        { href: "#", textKey: "common.footerSection4Link2" }, // Placeholder link
        { href: "#", textKey: "common.footerSection4Link3" }, // Placeholder link
      ],
    },
  ]

  return (
    <footer className="bg-gray-50 py-2 md:py-4 lg:py-6 border-t border-gray-200" suppressHydrationWarning>
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {/* Top section: Title, Description, and Link Columns */}
        {/*
        <div className="mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t("common.footerTitle")}</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-5xl mb-8">{t("common.footerDescription")}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{t(section.titleKey)}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.href} className="text-gray-600 hover:text-primary transition-colors text-sm">
                        {t(link.textKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        */}
        {/* Bottom section: Copyright and Social Icons */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-4 text-gray-600 text-sm">
          <p className="mb-4 md:mb-0">
            {(() => {
              const footerText = t("common.footerText");
              const text = Array.isArray(footerText) ? footerText.join(' ') : footerText as string;
              return text.replace(
                "© 2025 Facebook ID Extractor. All rights reserved.",
                "© 2025 Facebook ID Extractor by SeedingVN. All rights reserved.",
              );
            })()}
          </p>
          <div className="flex space-x-4">
            <Link 
              href="https://www.facebook.com/seedingvn/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook" 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <Image 
                src="/facebook-icon.svg" 
                alt="Facebook" 
                width={24} 
                height={24} 
                className="h-6 w-6"
              />
            </Link>
            <Link 
              href="https://www.instagram.com/Seedingvn.vn" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram" 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <Image 
                src="/instagram-icon.svg" 
                alt="Instagram" 
                width={24} 
                height={24} 
                className="h-6 w-6"
              />
            </Link>
            <Link 
              href="https://www.threads.com/@seedingvn.vn" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Threads" 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <Image 
                src="/threads-icon.svg" 
                alt="Threads" 
                width={24} 
                height={24} 
                className="h-6 w-6"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
