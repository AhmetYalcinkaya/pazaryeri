'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/stores/cart';
import { Product } from '@/types/product';
import { Button } from '@/components/atoms/Button';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
  product: Product;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AddToCartButton = ({
  product,
  variant = 'primary',
  size = 'md',
  className,
}: AddToCartButtonProps) => {
  const t = useTranslations('common');
  const { addItem, isInCart } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAdding(true);
    addItem(product);

    // Animation feedback
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsAdding(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  const inCart = isInCart(product.id);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      <Button
        variant={variant}
        size={size}
        onClick={handleAddToCart}
        isLoading={isAdding}
        disabled={isAdding}
        className="relative w-full"
      >
        {showSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <Check className="h-5 w-5" />
            <span>Sepete Eklendi!</span>
          </motion.div>
        ) : inCart ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <Check className="h-5 w-5" />
            <span>Sepette Var</span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>{t('addToCart')}</span>
          </motion.div>
        )}
      </Button>
    </motion.div>
  );
};

