import BlogPost from "@/components/BlogPost"
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Brain, Menu } from 'lucide-react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

// 辅助函数加载翻译
async function loadTranslations(locale: string | undefined, defaultLocale: string = 'zh') {
  const currentLocale = locale || defaultLocale;
  try {
    const translations = await import(`@/locales/${currentLocale}/common.json`);
    return translations.default;
  } catch {
    console.warn(`无法加载语言环境 ${currentLocale} 的翻译。正在回退到默认语言 ${defaultLocale}。`);
    const defaultTranslations = await import(`@/locales/${defaultLocale}/common.json`);
    return defaultTranslations.default;
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale, defaultLocale } = context;
  const t = await loadTranslations(locale, defaultLocale);
  const exampleBlogPostTitle = t.exampleBlogPost; // 从翻译文件获取
  const pageTitle = `${exampleBlogPostTitle} - ${t.navBlog} - ${t.siteName}`;
  const pageDescription = `阅读博客文章: ${exampleBlogPostTitle}`;

  return {
    props: {
      t,
      pageTitle,
      pageDescription,
      exampleBlogPostTitle,
    },
  };
}

export default function Page({ t, pageTitle, pageDescription, exampleBlogPostTitle }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  // 示例的上一篇/下一篇文章数据，您需要用实际逻辑替换
  // const prevPost = { title: "旧文章", href: "#" };
  // const nextPost = { title: "新文章", href: "#" };

  return (
    <>
      <Head>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:url" content={`https://mustknowai.com${router.asPath}`} />
          <meta property="og:site_name" content={t.siteName} />
          <meta property="og:type" content="article" />
          <meta property="og:locale" content="zh_CN" />
      </Head>

      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md dark:bg-slate-950/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">{t.siteName}</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
              {t.navHome}
            </Link>
            <Link href="/tools" className="text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
              {t.navTools}
            </Link>
            <Link href="/blog" className="text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors font-semibold text-blue-600 dark:text-blue-400">
              {t.navBlog}
            </Link>
            <LanguageSwitcher />
          </nav>
           <div className="md:hidden flex items-center">
            <LanguageSwitcher />
            <Button variant="ghost" size="icon" aria-label="Toggle menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <BlogPost
        title={exampleBlogPostTitle} // 使用从翻译中获取的标题
        date="2024-01-01" // 日期格式化将在组件内部处理
        readingTime="5" // 仅传递数字部分
        heroImage="/placeholder.svg"
        t={t} // 传递翻译对象
        // prevPost={prevPost} // 如果有实际数据，取消注释
        // nextPost={nextPost} // 如果有实际数据，取消注释
      >
        {/* 这部分内容理想情况下应该来自MDX文件或CMS，并且是可翻译的 */}
        {/* 示例内容，你需要将其替换为实际的博客文章内容 */}
        <h2>这是示例博客文章的副标题</h2>
        <p>这是一段示例博客文章的内容。您可以在这里使用 Markdown 或 JSX 来撰写您的文章。</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <h3>更深一级的标题</h3>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <ul>
          <li>列表项 1</li>
          <li>列表项 2</li>
          <li>列表项 3</li>
        </ul>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <pre><code>{`function greet(name) {
  console.log(\`Hello, \${name}!\`);
}`}</code></pre>
        <blockquote>这是一个引用的文本块。</blockquote>
      </BlogPost>
    </>
  )
}