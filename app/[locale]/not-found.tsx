import { Link } from '@/i18n/routing';
import { getLocale } from 'next-intl/server';

export default async function NotFound() {
  const locale = await getLocale();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-lg">Sayfa bulunamadı</p>
      <Link
        href={`/${locale}`}
        className="mt-6 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}

