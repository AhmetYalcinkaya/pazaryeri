import { cn } from '@/lib/utils';
import { ProductBadge } from '@/types/product';
import { useTranslations } from 'next-intl';

interface BadgeProps {
  type: ProductBadge;
  className?: string;
}

export const Badge = ({ type, className }: BadgeProps) => {
  const t = useTranslations('product');

  const badgeStyles: Record<ProductBadge, string> = {
    bestSeller: 'bg-red-600 text-white',
    newProduct: 'bg-green-600 text-white',
    vegan: 'bg-purple-600 text-white',
    alcoholFree: 'bg-blue-600 text-white',
    perfumeFree: 'bg-pink-600 text-white',
    hairGrowth: 'bg-orange-600 text-white',
    sale: 'bg-yellow-500 text-black',
  };

  const badgeLabels: Record<ProductBadge, string> = {
    bestSeller: t('bestSeller'),
    newProduct: t('newProduct'),
    vegan: t('vegan'),
    alcoholFree: t('alcoholFree'),
    perfumeFree: t('perfumeFree'),
    hairGrowth: t('hairGrowth'),
    sale: 'İndirim',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        badgeStyles[type],
        className
      )}
    >
      {badgeLabels[type]}
    </span>
  );
};

