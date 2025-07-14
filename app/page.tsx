import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function RootPage() {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value

  if (locale === 'en' || locale === 'vi') {
    redirect(`/${locale}`)
  } else {
    redirect('/vi') // fallback mặc định
  }
} 