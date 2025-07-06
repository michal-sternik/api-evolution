import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
	locales: ['en', 'ko', 'ru', 'pl', 'es', 'hu', 'de', 'ckb', 'ar', 'fr', 'hi', 'pt', 'zh'],

	defaultLocale: 'en',
});
