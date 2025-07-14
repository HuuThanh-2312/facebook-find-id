import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/;
const locales = ['en', 'vi'];
const defaultLocale = 'en';

function getLocaleFromHeader(header: string | null) {
  if (!header) return defaultLocale;
  const accepted = header.split(',').map(l => l.split(';')[0].trim());
  for (const locale of accepted) {
    if (locales.includes(locale)) return locale;
    if (locale.startsWith('en')) return 'en';
    if (locale.startsWith('vi')) return 'vi';
  }
  return defaultLocale;
}

// Temporarily disabled to debug routing issue
// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Ignore API routes, _next/static, _next/image, favicon, etc.
//   if (
//     pathname.startsWith('/api') ||
//     pathname.startsWith('/_next') ||
//     pathname.startsWith('/favicon.ico') ||
//     PUBLIC_FILE.test(pathname)
//   ) {
//     return NextResponse.next();
//   }

//   // Check if path already has locale
//   const pathnameParts = pathname.split('/');
//   const hasLocale = locales.includes(pathnameParts[1]);
//   if (!hasLocale) {
//     // Detect from Accept-Language
//     const acceptLang = request.headers.get('accept-language');
//     const locale = getLocaleFromHeader(acceptLang);
//     const url = request.nextUrl.clone();
//     url.pathname = `/${locale}${pathname}`;
//     return NextResponse.redirect(url);
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     // Match all except API, static, favicon
//     '/((?!api|_next|favicon.ico|.*\\..*).*)',
//   ],
// }; 