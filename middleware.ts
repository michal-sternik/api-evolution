import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ko', 'ru', 'pl', 'es', 'hu', 'de', 'ckb', 'ar', 'fr', 'hi', 'pt', 'zh'],

  // Used when no locale matches
  defaultLocale: 'en'
});

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_vercel).*)'],
};
