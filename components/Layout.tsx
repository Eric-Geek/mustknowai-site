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
  const { asPath } = router;
  const siteBaseUrl = "https://mustknowai.com";

  const canonicalUrl = `${siteBaseUrl}${asPath.split('?')[0]}`;

  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />
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