'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { X, Lock, Truck, Package } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic here
    console.log('Login:', email);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{t('loginOrRegister')}</h2>
              <button
                onClick={onClose}
                className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <Lock className="h-4 w-4" />
              <span>{t('dataEncrypted')}</span>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                <Truck className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-xs font-medium">{tCommon('freeShipping')}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    inanılmaz
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                <Package className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-xs font-medium">{tCommon('freeReturns')}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    14 güne kadar
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  {t('email')}
                </label>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('emailPlaceholder')}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full">
                {t('continue')}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-red-600 dark:text-gray-400"
              >
                {t('troubleLogin')}
              </a>
            </div>

            <p className="mt-6 text-xs text-gray-600 dark:text-gray-400">
              {t('terms')}{' '}
              <a href="#" className="font-medium text-red-600 hover:underline">
                {t('termsLink')}
              </a>{' '}
              ve{' '}
              <a href="#" className="font-medium text-red-600 hover:underline">
                {t('privacyLink')}
              </a>
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

