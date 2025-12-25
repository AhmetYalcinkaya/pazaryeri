'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Category } from '@/types/product';
import { motion, AnimatePresence } from 'framer-motion';

interface CategoryMenuProps {
  locale: string;
  categories: Category[];
}

export const CategoryMenu = ({ locale, categories }: CategoryMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const t = useTranslations('common');

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {t('categories')}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
              onMouseLeave={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
              className="absolute left-0 top-full z-50 mt-2 w-[800px] rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="grid grid-cols-4 gap-0">
                {/* Main Categories */}
                <div className="border-r border-gray-200 dark:border-gray-700">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      onMouseEnter={() => setHoveredCategory(category.id)}
                      className="group"
                    >
                      <Link
                        href={`/${locale}/categories/${category.slug}`}
                        className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 hover:text-red-600 dark:text-gray-100 dark:hover:bg-gray-700"
                      >
                        <span>{category.name}</span>
                        {category.children && category.children.length > 0 && (
                          <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                        )}
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Subcategories */}
                {categories
                  .find((cat) => cat.id === hoveredCategory)
                  ?.children?.map((subcategory) => (
                    <div
                      key={subcategory.id}
                      className="border-r border-gray-200 px-4 py-3 dark:border-gray-700"
                    >
                      <Link
                        href={`/${locale}/categories/${subcategory.slug}`}
                        className="block text-sm font-medium text-red-600 hover:underline"
                      >
                        {subcategory.name}
                      </Link>
                      <div className="mt-2 space-y-1">
                        {/* Add more subcategories if needed */}
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

