import type { ReactNode } from "react";
import "./globals.css";
import { headers } from "next/headers";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
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
      </body>
    </html>
  );
}
