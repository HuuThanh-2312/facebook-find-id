import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://facebook-id-extractor.vercel.app' // Thay bằng domain thật nếu deploy
  const staticPages = [
    '',
    '/vi',
    '/en',
    '/vi/lay-id-trang-facebook',
    '/vi/lay-id-bai-viet-facebook',
    '/vi/lay-id-nhom-facebook',
    '/en/get-facebook-page-id',
    '/en/get-facebook-post-id',
    '/en/get-facebook-group-id',
    // Thêm các trang khác nếu có
  ]
  const urls = staticPages.map(
    (path) => `  <url>\n    <loc>${baseUrl}${path}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
  ).join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
} 