import type { ReactNode } from "react";
import { Mona_Sans as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { LanguageProvider } from "@/components/provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { dictionaries, type Translations } from "@/lib/translations";

const fontSans = FontSans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
});

export const locales = ["en", "vi"];
export const defaultLocale = "en";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const currentLocale = locales.includes(resolvedParams.locale)
    ? resolvedParams.locale
    : defaultLocale;

  const allDictionaries = {
    en: dictionaries.en,
    vi: dictionaries.vi,
  };

  return (
    <div
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col overflow-x-hidden",
          fontSans.variable,
        )}
    >
      <LanguageProvider
        allDictionaries={allDictionaries}
        initialLocale={currentLocale}
      >
          <Header />
        <main className="flex-1 container mx-auto max-w-4xl px-4 md:px-6 py-8">
          {children}
        </main>
          <Footer />
        <Toaster />
      </LanguageProvider>
    </div>
  );
} 