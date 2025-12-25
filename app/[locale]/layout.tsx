import { ReactNode } from 'react';
import { Header } from '@/components/organisms/Header';
import { getLocale } from 'next-intl/server';
import { getCategories } from '@/lib/api/categories';

export default async function LocaleLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();
  const categories = await getCategories();

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale} categories={categories} />
      <main className="flex-1">{children}</main>
    </div>
  );
}

