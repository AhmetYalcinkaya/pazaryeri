import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { getBestSellers } from '@/lib/api/products';
import { ProductCard } from '@/components/molecules/ProductCard';
import { getLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('home');
  const locale = await getLocale();

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale,
      type: 'website',
    },
  };
}

export default async function HomePage() {
  const t = await getTranslations('home');
  const locale = await getLocale();
  const bestSellers = await getBestSellers(12);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">
      {/* Hero Section */}
      <section className="relative mb-12 overflow-hidden rounded-lg bg-red-600 px-8 py-16 text-center text-white">
        <div className="relative z-10">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            {t('hero.title')}
          </h1>
          <p className="mb-2 text-xl md:text-2xl">{t('hero.subtitle')}</p>
          <p className="text-lg">{t('hero.date')}</p>
        </div>
      </section>

      {/* Info Section */}
      <section className="mb-12 grid grid-cols-2 gap-4 rounded-lg bg-green-50 p-6 dark:bg-green-900/20 md:grid-cols-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-2 text-2xl">✓</div>
          <p className="text-sm font-medium">{t('whyMeshur')}</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-2 text-2xl">🔒</div>
          <p className="text-sm font-medium">{t('securityPrivacy')}</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-2 text-2xl">🛡️</div>
          <p className="text-sm font-medium">{t('securePayments')}</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-2 text-2xl">🚚</div>
          <p className="text-sm font-medium">{t('deliveryGuarantee')}</p>
        </div>
      </section>

      {/* Security Warning */}
      <div className="mb-12 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          ⚠️ {t('securityWarning')}
        </p>
      </div>

      {/* Best Choices Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-center text-3xl font-bold">
          {t('bestChoices')}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}

