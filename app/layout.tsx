import type { ReactNode } from "react";
import "./globals.css";
import { headers } from "next/headers";
import { Inter } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: {
    default: 'Facebook ID Finder - Free Lookup Tools | Seedingvn.vn',
    template: '%s | Seedingvn.vn'
  },
  description: 'A complete suite of free Facebook ID lookup tools by Seedingvn.vn. Easily find the ID for any Page, Profile, Post, or Group in seconds. No login required.',
  keywords: ['facebook id finder', 'get facebook id', 'facebook page id', 'facebook post id', 'facebook group id', 'seedingvn'],
  authors: [{ name: 'Seedingvn.vn' }],
  creator: 'Seedingvn.vn',
  publisher: 'Seedingvn.vn',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://id.seedingvn.vn'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://id.seedingvn.vn',
    siteName: 'Seedingvn.vn',
    title: 'Facebook ID Finder - Free Lookup Tools | Seedingvn.vn',
    description: 'A complete suite of free Facebook ID lookup tools by Seedingvn.vn. Easily find the ID for any Page, Profile, Post, or Group in seconds. No login required.',
    images: [
      {
        url: '/id-facebook-vi.png',
        width: 1200,
        height: 630,
        alt: 'Facebook ID Extractor - Seedingvn.vn',
      },
      {
        url: '/favicon-32x32.png',
        width: 32,
        height: 32,
        alt: 'Seedingvn.vn Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Facebook ID Finder - Free Lookup Tools | Seedingvn.vn',
    description: 'A complete suite of free Facebook ID lookup tools by Seedingvn.vn. Easily find the ID for any Page, Profile, Post, or Group in seconds. No login required.',
    images: ['/id-facebook-vi.png'],
    creator: '@seedingvn',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Detect locale from pathname (works for /en, /vi, ...)
  let locale = "en";
  const h = await headers();
  const pathname = h.get("x-invoke-path") || h.get("x-next-url") || "/en";
  if (pathname.startsWith("/vi")) locale = "vi";
  else if (pathname.startsWith("/en")) locale = "en";
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K6QCGDDQ');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body className={`${inter.variable} font-sans`} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K6QCGDDQ"
            height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
