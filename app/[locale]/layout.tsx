import { ReactNode } from 'react';
import { Header } from '@/components/organisms/Header';
import { getLocale } from 'next-intl/server';

export default async function LocaleLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
    </div>
  );
}

