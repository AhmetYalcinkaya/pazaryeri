import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/api/products';
import { getTranslations, getLocale } from 'next-intl/server';
import Image from 'next/image';
import { Price } from '@/components/atoms/Price';
import { Badge } from '@/components/atoms/Badge';
import { AddToCartButton } from '@/components/atoms/AddToCartButton';
import type { Metadata } from 'next';

interface ProductPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const locale = await getLocale();

  if (!product) {
    return {
      title: 'Ürün Bulunamadı',
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
      locale,
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const t = await getTranslations('product');
  const tCommon = await getTranslations('common');
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>

          {product.badges && product.badges.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {product.badges.map((badge) => (
                <Badge key={badge} type={badge} />
              ))}
            </div>
          )}

          <Price
            amount={product.price}
            originalAmount={product.originalPrice}
            className="mb-6"
          />

          <p className="mb-6 text-gray-600 dark:text-gray-400">
            {product.description}
          </p>

          <div className="mb-6">
            <p className="mb-2 text-sm font-medium">
              {product.inStock ? (
                <span className="text-green-600 dark:text-green-400">
                  ✓ {t('inStock')}
                </span>
              ) : (
                <span className="text-red-600 dark:text-red-400">
                  ✗ {t('outOfStock')}
                </span>
              )}
            </p>
            {product.rating && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ⭐ {product.rating} ({product.reviewCount} değerlendirme)
              </p>
            )}
          </div>

          <AddToCartButton product={product} variant="primary" size="lg" />
        </div>
      </div>
    </div>
  );
}

