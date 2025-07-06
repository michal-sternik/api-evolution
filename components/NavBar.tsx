"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const localeNames = {
  en: 'English',
  ko: '한국어',
  ru: 'Русский',
  pl: 'Polski',
  es: 'Español',
  hu: 'Magyar',
  de: 'Deutsch',
  ckb: 'کوردی',
  ar: 'العربية',
  fr: 'Français',
  hi: 'हिन्दी',
  pt: 'Português',
  zh: '中文'
};

const localeFlags = {
  en: '🇺🇸',
  ko: '🇰🇷',
  ru: '🇷🇺',
  pl: '🇵🇱',
  es: '🇪🇸',
  hu: '🇭🇺',
  de: '🇩🇪',
  ckb: '🏴',
  ar: '🇸🇦',
  fr: '🇫🇷',
  hi: '🇮🇳',
  pt: '🇵🇹',
  zh: '🇨🇳'
};

export default function NavBar() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLocaleChange = (newLocale: string) => {
    // Remove the current locale from the pathname and add the new one
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full md:py-6 lg:py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-black rounded-full shadow-sm" />
            <div className="hidden sm:block">
              <span className="text-sm font-medium text-slate-600">API Evolution</span>
            </div>
          </div>
          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-2 bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span className="hidden sm:inline">
                {localeFlags[currentLocale as keyof typeof localeFlags]} {localeNames[currentLocale as keyof typeof localeNames]}
              </span>
              <span className="sm:hidden">
                        {localeNames[currentLocale as keyof typeof localeNames]}
              </span>
              <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Custom Dropdown */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-lg z-50 p-3">
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(localeNames).map((locale) => (
                    <button
                      key={locale}
                      onClick={() => handleLocaleChange(locale)}
                      className={`flex items-center space-x-2 px-3 py-2 text-sm text-left rounded-md hover:bg-slate-50 transition-colors duration-150 ${
                        locale === currentLocale 
                          ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' 
                          : 'text-slate-700'
                      }`}
                    >
                      <span className="text-base">
                        {localeFlags[locale as keyof typeof localeFlags]}
                      </span>
                      <span className="font-medium truncate">
                        {localeNames[locale as keyof typeof localeNames]}
                      </span>
                      {locale === currentLocale && (
                        <span className="ml-auto text-xs text-blue-600 font-semibold">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
