'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { Badge } from '@/components/atoms/Badge';
import { Price } from '@/components/atoms/Price';
import { useFavoritesStore } from '@/lib/stores/favorites';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  locale: string;
}

export const ProductCard = ({ product, locale }: ProductCardProps) => {
  const t = useTranslations('common');
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
    });
  };

  const favorite = isFavorite(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
    >
      <Link
        href={`/${locale}/products/${product.slug}`}
        className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-700"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.badges && product.badges.length > 0 && (
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {product.badges.map((badge) => (
              <Badge key={badge} type={badge} />
            ))}
          </div>
        )}
        <button
          onClick={handleFavoriteClick}
          className="absolute right-2 top-2 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
          aria-label={
            favorite ? t('removeFromFavorites') : t('addToFavorites')
          }
        >
          <Heart
            className={`h-5 w-5 ${
              favorite
                ? 'fill-red-600 text-red-600'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          />
        </button>
      </Link>

      <Link
        href={`/${locale}/products/${product.slug}`}
        className="flex flex-1 flex-col p-4"
      >
        <h3 className="mb-2 line-clamp-2 text-sm font-medium text-gray-900 transition-colors hover:text-red-600 dark:text-gray-100">
          {product.name}
        </h3>

        <div className="mt-auto">
          <Price
            amount={product.price}
            originalAmount={product.originalPrice}
          />
        </div>
      </Link>
    </motion.div>
  );
};

