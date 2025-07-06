import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import './globals.css';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

// Generate metadata for each locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = t('title') || 'Performance Evaluation of REST, GraphQL, and gRPC';
  const description = t('research.overview.content') || 'Comprehensive performance analysis comparing REST, GraphQL, and gRPC in microservice architectures.';

  return {
    title: `${title} | API Protocol Comparison`,
    description: description.slice(0, 160), // Limit description length for SEO
    keywords: [
      'REST',
      'GraphQL', 
      'gRPC',
      'API performance',
      'microservices',
      'performance comparison',
      'HTTP protocols',
      'system architecture',
      'software engineering',
      'API design'
    ],
    authors: [{ name: 'Mateusz Jakubowski' }],
    creator: 'Mateusz Jakubowski',
    publisher: 'Mateusz Jakubowski',
    category: 'Software Engineering',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://api-evolution.vercel.app'),
    openGraph: {
      title,
      description: description.slice(0, 200),
      type: 'article',
      locale: locale.replace('-', '_'),
      siteName: 'API Performance Research',
      publishedTime: '2024-01-01T00:00:00.000Z',
      modifiedTime: new Date().toISOString(),
      authors: ['Mateusz Jakubowski'],
      section: 'Technology',
      tags: ['REST', 'GraphQL', 'gRPC', 'API', 'Performance', 'Microservices'],
      images: [
        {
          url: '/images/api-performance-og.jpg',
          width: 1200,
          height: 630,
          alt: 'API Performance Comparison - REST vs GraphQL vs gRPC',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description.slice(0, 160),
      creator: '@jakubowskif',
      site: '@jakubowskif',
      images: ['/images/api-performance-og.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://api-evolution.vercel.app'}/${locale}`,
      languages: {
        'en': '/en',
        'es': '/es', 
        'de': '/de',
        'hu': '/hu',
        'ko': '/ko',
        'pl': '/pl',
        'ru': '/ru',
        'x-default': '/en',
      },
    },
    other: {
      'article:author': 'Mateusz Jakubowski',
      'article:section': 'Technology',
      'article:tag': 'REST,GraphQL,gRPC,API,Performance,Microservices',
      'article:published_time': '2024-01-01T00:00:00.000Z',
      'article:modified_time': new Date().toISOString(),
    },
  };
}


export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
            {children}
        </NextIntlClientProvider>     
         </body>
    </html>
 
  );
}
