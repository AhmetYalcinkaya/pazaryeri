'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { LoginModal } from '@/components/organisms/LoginModal';
import { CategoryMenu } from '@/components/organisms/CategoryMenu';
import { Category } from '@/types/product';
import { useCartStore } from '@/lib/stores/cart';
import { LanguageSwitcher } from '@/components/molecules/LanguageSwitcher';

interface HeaderProps {
  locale: string;
  categories: Category[];
}

export const Header = ({ locale, categories }: HeaderProps) => {
  const t = useTranslations('common');
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { getTotalItems } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch by only showing cart count after mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartItemsCount = isMounted ? getTotalItems() : 0;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      {/* Top Bar */}
      <div className="hidden border-b border-gray-200 bg-gray-50 px-4 py-2 text-xs dark:border-gray-800 dark:bg-gray-800 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              🚚 {t('freeShipping')} İnanılmaz
            </span>
            <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              💰 Fiyat Düzenleme 14 Gün İçinde
            </span>
            <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              📱 Meşhur Uygulamasını İndirin
            </span>
          </div>
          <Link
            href={`/${locale}/sell`}
            className="rounded-md bg-red-600 px-3 py-1 text-white hover:bg-red-700"
          >
            Meşhur&apos;da Satış Hemen Katıl &gt;
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-2xl font-bold text-red-600">MEŞHUR</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <CategoryMenu locale={locale} categories={categories} />
            <Link
              href={`/${locale}/best-sellers`}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-red-600 dark:text-gray-300"
            >
              {t('bestSellers')}
            </Link>
            <Link
              href={`/${locale}/five-star`}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-red-600 dark:text-gray-300"
            >
              {t('fiveStar')}
            </Link>
            <Link
              href={`/${locale}/new-arrivals`}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-red-600 dark:text-gray-300"
            >
              {t('newArrivals')}
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden flex-1 max-w-md px-4 md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t('search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="hidden rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 md:block"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={() => setLoginModalOpen(true)}
              className="hidden items-center gap-1 text-sm text-gray-700 hover:text-red-600 dark:text-gray-300 md:flex"
            >
              <User className="h-5 w-5" />
              <span>{t('login')}</span>
            </button>

            <Link
              href={`/${locale}/support`}
              className="hidden text-sm text-gray-700 hover:text-red-600 dark:text-gray-300 md:block"
            >
              {t('support')}
            </Link>

            <LanguageSwitcher currentLocale={locale} />

            <Link
              href={`/${locale}/cart`}
              className="relative rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ShoppingCart className="h-5 w-5" />
              {isMounted && cartItemsCount > 0 && (
                <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </span>
              )}
              <span className="sr-only">{t('cart')}</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 md:hidden">
          <nav className="flex flex-col gap-4 px-4 py-4">
            <Link
              href={`/${locale}`}
              className="text-sm font-medium text-gray-700 hover:text-red-600 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('categories')}
            </Link>
            <Link
              href={`/${locale}/best-sellers`}
              className="text-sm font-medium text-gray-700 hover:text-red-600 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('bestSellers')}
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setLoginModalOpen(true);
              }}
              className="text-left text-sm font-medium text-gray-700 hover:text-red-600 dark:text-gray-300"
            >
              {t('login')}
            </button>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-left text-sm font-medium text-gray-700 hover:text-red-600 dark:text-gray-300"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-5 w-5" />
                  <span>Açık Tema</span>
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5" />
                  <span>Koyu Tema</span>
                </>
              )}
            </button>
            <div className="pt-2">
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </nav>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </header>
  );
};

