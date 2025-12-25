'use client';

import { useState } from 'react';
import { usePathname } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLocale: string;
}

const languages = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

export const LanguageSwitcher = ({ currentLocale }: LanguageSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0];

  const handleLanguageChange = (locale: string) => {
    // Get current pathname and remove locale if present
    let cleanPathname = pathname;
    
    // Remove current locale from pathname if it exists
    if (cleanPathname.startsWith(`/${currentLocale}`)) {
      cleanPathname = cleanPathname.slice(`/${currentLocale}`.length) || '/';
    }
    
    // Also check for other locales
    languages.forEach((lang) => {
      if (cleanPathname.startsWith(`/${lang.code}`)) {
        cleanPathname = cleanPathname.slice(`/${lang.code}`.length) || '/';
      }
    });
    
    // Ensure path starts with /
    if (!cleanPathname.startsWith('/')) {
      cleanPathname = '/' + cleanPathname;
    }
    
    // Build new URL with locale
    const newPath = `/${locale}${cleanPathname === '/' ? '' : cleanPathname}`;
    
    // Use window.location.assign for full page reload to ensure translations update
    // This is necessary because next-intl needs server-side rendering for new locale
    if (typeof window !== 'undefined') {
      window.location.assign(newPath);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <span className="text-base">{currentLanguage.flag}</span>
        <span className="hidden md:inline">{currentLanguage.name}</span>
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
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-full z-50 mt-2 min-w-[140px] rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="py-1">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                      currentLocale === language.code
                        ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-base">{language.flag}</span>
                    <span>{language.name}</span>
                    {currentLocale === language.code && (
                      <span className="ml-auto text-red-600">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

