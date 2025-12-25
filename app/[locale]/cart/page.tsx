'use client';

import { useCartStore } from '@/lib/stores/cart';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Price } from '@/components/atoms/Price';
import { Button } from '@/components/atoms/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, Truck, Lock, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const params = useParams();
  const locale = (params.locale as string) || 'tr';
  const t = useTranslations('cart');
  const tCommon = useTranslations('common');
  const {
    items,
    removeItem,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useCartStore();
  const [selectAll, setSelectAll] = useState(true);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  useEffect(() => {
    document.title = `${t('title')} - Meşhur`;
  }, [t]);

  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-16">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold">{t('emptyCart')}</h1>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            {t('emptyCartDescription')}
          </p>
          <Link href={`/${locale}`}>
            <Button variant="primary" size="lg">
              {t('continueShopping')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Panel - Cart Items */}
        <div className="lg:col-span-2">
          {/* Free Shipping Banner */}
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 dark:bg-green-900/20">
            <Truck className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-800 dark:text-green-200">
              {t('freeShippingBanner')}
            </span>
          </div>

          {/* Select All */}
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <input
              type="checkbox"
              id="selectAll"
              checked={selectAll}
              onChange={(e) => setSelectAll(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
            />
            <label
              htmlFor="selectAll"
              className="text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              {t('selectAll', { count: items.length })}
            </label>
          </div>

          {/* Cart Items */}
          <div className="space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
                >
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => setSelectAll(e.target.checked)}
                    className="mt-2 h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                  />

                  <Link
                    href={`/${locale}/products/${item.product.slug}`}
                    className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700"
                  >
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col">
                    <Link
                      href={`/${locale}/products/${item.product.slug}`}
                      className="mb-2 text-sm font-medium text-gray-900 hover:text-red-600 dark:text-gray-100"
                    >
                      {item.product.name}
                    </Link>
                    <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                      {t('noOptions')}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          className="rounded-md border border-gray-300 p-1 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-[3rem] text-center text-sm font-medium">
                          {item.quantity} {t('piece')}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          className="rounded-md border border-gray-300 p-1 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="rounded-md p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <Price
                      amount={item.product.price * item.quantity}
                      className="mb-2"
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Panel - Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold">{t('orderSummary')}</h2>

            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium">{t('total')}</span>
              <span className="text-lg font-bold">
                {formatPrice(getTotalPrice())} TL
              </span>
            </div>

            <p className="mb-4 text-xs text-gray-600 dark:text-gray-400">
              {t('checkFinalAmount')}
            </p>

            <Button variant="primary" size="lg" className="mb-4 w-full">
              {t('payment', { count: getTotalItems() })}
            </Button>

            <div className="mb-6 flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
              <Lock className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{t('securePaymentNote')}</span>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
              <h3 className="mb-2 text-sm font-medium">
                {t('securePaymentTitle')}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {t('securePaymentDescription')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

