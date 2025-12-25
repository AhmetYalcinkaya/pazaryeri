import { cn } from '@/lib/utils';

interface PriceProps {
  amount: number;
  originalAmount?: number;
  className?: string;
  currency?: string;
}

export const Price = ({
  amount,
  originalAmount,
  className,
  currency = 'TL',
}: PriceProps) => {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
        {formatPrice(amount)} {currency}
      </span>
      {originalAmount && originalAmount > amount && (
        <span className="text-sm text-gray-500 line-through dark:text-gray-400">
          {formatPrice(originalAmount)} {currency}
        </span>
      )}
    </div>
  );
};

