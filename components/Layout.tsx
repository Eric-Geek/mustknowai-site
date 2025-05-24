// components/Layout.tsx
import { Inter as FontSans } from 'next/font/google';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { locale, asPath } = router;
  const siteBaseUrl = "https://mustknowai.com"; // 您的网站基础URL

  // 生成规范URL和hreflang URLs
  const canonicalUrl = `${siteBaseUrl}${locale === router.defaultLocale ? '' : `/${locale}`}${asPath === '/' && locale !== router.defaultLocale ? '' : asPath.split('?')[0]}`;
  const zhUrl = `${siteBaseUrl}/zh${asPath.split('?')[0]}`;
  const enUrl = `${siteBaseUrl}/en${asPath.split('?')[0]}`;


  return (
    <html lang={locale || 'zh'} suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="zh" href={zhUrl} />
        <link rel="alternate" hrefLang="en" href={enUrl} />
        <link rel="alternate" hrefLang="x-default" href={`${siteBaseUrl}/${router.defaultLocale}${asPath.split('?')[0]}`} />
      </Head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}