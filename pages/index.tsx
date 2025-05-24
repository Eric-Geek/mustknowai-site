import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Head from 'next/head';
import Image from 'next/image'; // 确保导入 Next.js Image 组件
import {
  Twitter,
  Github,
  Calendar,
  ArrowRight,
  Menu,
  Brain as DefaultBrainIcon, // 保留 Brain 作为网站 Logo
  // 如果不再使用 Lucide 作为分类图标的后备，可以移除下面这些
  // PenTool as DefaultPenTool,
  // ImageIcon as DefaultImageIcon,
  // Video as DefaultVideoIcon,
  // Code as DefaultCodeIcon,
} from "lucide-react"
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Link from 'next/link';

// 辅助函数加载翻译 (保持不变)
async function loadTranslations(locale: string | undefined, defaultLocale: string = 'zh') {
  const currentLocale = locale || defaultLocale;
  try {
    const translations = await import(`@/locales/${currentLocale}/common.json`);
    return translations.default;
  } catch (error) {
    console.warn(`无法加载语言环境 ${currentLocale} 的翻译。正在回退到默认语言 ${defaultLocale}。`);
    const defaultTranslations = await import(`@/locales/${defaultLocale}/common.json`);
    return defaultTranslations.default;
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale, defaultLocale } = context;
  const t = await loadTranslations(locale, defaultLocale);
  const title = `${t.siteName} - ${t.heroTitle.split('—')[1]?.trim() || 'AI 工具与玩法'}`;
  const description = t.heroSubtitle;

  return {
    props: {
      t,
      title,
      description,
    },
  };
}


export default function LandingPage({ t, title, description }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { locale } = router;

  const featuredTools = [ // 这部分的图标应该已经按照您的 PNG 图片更新了
    {
      icon: (
        <Image
          src="/icons/tools/chatgpt-icon.png"
          alt="ChatGPT Plus Logo"
          width={32}
          height={32}
          className="object-contain"
        />
      ),
      name: "ChatGPT Plus",
      pitch: "高级AI对话，处理复杂任务",
      color: "from-green-500 to-emerald-600",
      url: "https://chat.openai.com"
    },
    {
      icon: (
        <Image
          src="/icons/tools/midjourney-icon.jpg"
          alt="Midjourney Logo"
          width={32}
          height={32}
          className="object-contain"
        />
      ),
      name: "Midjourney",
      pitch: "创作令人惊叹的AI生成艺术品",
      color: "from-purple-500 to-pink-600",
      url: "https://midjourney.com"
    },
    {
      icon: (
        <Image
          src="/icons/tools/github-copilot-icon.jpg"
          alt="GitHub Copilot Logo"
          width={32}
          height={32}
          className="object-contain"
        />
      ),
      name: "GitHub Copilot",
      pitch: "AI驱动的代码补全和辅助",
      color: "from-blue-500 to-cyan-600",
      url: "https://github.com/features/copilot"
    },
    {
      icon: (
        <Image
          src="/icons/tools/notion-icon.jpg"
          alt="Notion AI Logo"
          width={32}
          height={32}
          className="object-contain"
        />
      ),
      name: "Notion AI",
      pitch: "提高生产力的智能写作助手",
      color: "from-orange-500 to-red-600",
      url: "https://notion.so/product/ai"
    },
    {
      icon: (
        <Image
          src="/icons/tools/runway-icon.jpg"
          alt="RunwayML Logo"
          width={32}
          height={32}
          className="object-contain"
        />
      ),
      name: "RunwayML",
      pitch: "AI视频编辑和生成工具",
      color: "from-indigo-500 to-purple-600",
      url: "https://runwayml.com"
    },
    {
      icon: (
        <Image
          src="/icons/tools/claude-icon.jpg"
          alt="Claude AI Logo"
          width={32}
          height={32}
          className="object-contain"
        />
      ),
      name: "Claude AI",
      pitch: "乐于助人的AI助手，用于分析和写作",
      color: "from-teal-500 to-green-600",
      url: "https://claude.ai"
    },
  ];

  // 更新 categories 数组以使用您准备好的 PNG 图片
  const categories = [
    {
      icon: (
        <Image
          src="/icons/categories/writing-icon.png" // 假设您的写作分类图标文件名
          alt={t.categoryWriting || "Writing Category"}
          width={48} // 对应 h-12 w-12
          height={48}
          className="object-contain"
        />
      ),
      titleKey: "categoryWriting",
      descriptionKey: "categoryWritingDesc",
      color: "from-blue-500/20 to-cyan-500/20", // 这个颜色是背景渐变，可以保留
      query: "Writing"
    },
    {
      icon: (
        <Image
          src="/icons/categories/image-icon.png" // 假设您的图像分类图标文件名
          alt={t.categoryImage || "Image Category"}
          width={48}
          height={48}
          className="object-contain"
        />
      ),
      titleKey: "categoryImage",
      descriptionKey: "categoryImageDesc",
      color: "from-purple-500/20 to-pink-500/20",
      query: "Image"
    },
    {
      icon: (
        <Image
          src="/icons/categories/video-icon.png" // 假设您的视频分类图标文件名
          alt={t.categoryVideo || "Video Category"}
          width={48}
          height={48}
          className="object-contain"
        />
      ),
      titleKey: "categoryVideo",
      descriptionKey: "categoryVideoDesc",
      color: "from-orange-500/20 to-red-500/20",
      query: "Video"
    },
    {
      icon: (
        <Image
          src="/icons/categories/code-icon.png" // 假设您的代码分类图标文件名
          alt={t.categoryCode || "Code Category"}
          width={48}
          height={48}
          className="object-contain"
        />
      ),
      titleKey: "categoryCode",
      descriptionKey: "categoryCodeDesc",
      color: "from-green-500/20 to-emerald-500/20",
      query: "Code"
    },
  ];

  const articles = [ // 文章数据保持不变
    {
      slug: "getting-started-with-ai-art-generation",
      image: "/placeholder.svg?height=200&width=300",
      titleKey: "articleTitleAIArt",
      date: "2024-01-15",
      excerptKey: "articleExcerptAIArt",
      categoryKey: "articleCategoryTutorial",
    },
    {
      slug: "best-ai-writing-tools",
      image: "/placeholder.svg?height=200&width=300",
      titleKey: "articleTitleWritingTools",
      date: "2024-01-12",
      excerptKey: "articleExcerptWritingTools",
      categoryKey: "articleCategoryReview",
    },
    {
      slug: "future-of-ai-in-development",
      image: "/placeholder.svg?height=200&width=300",
      titleKey: "articleTitleAIDev",
      date: "2024-01-10",
      excerptKey: "articleExcerptAIDev",
      categoryKey: "articleCategoryAnalysis",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://mustknowai.com${router.asPath}`} />
        <meta property="og:site_name" content={t.siteName} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={locale} />
        {router.locales?.filter(l => l !== locale).map(l => (
          <meta key={l} property="og:locale:alternate" content={l} />
        ))}
      </Head>

      <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/80 backdrop-blur-md dark:bg-slate-950/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" locale={locale} className="flex items-center space-x-2">
            <DefaultBrainIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" /> {/* 网站 Logo 暂时保留 Lucide Brain */}
            <span className="text-xl font-bold text-slate-900 dark:text-white">{t.siteName}</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" locale={locale} className="text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
                {t.navHome}
            </Link>
            <Link href="/tools" locale={locale} className="text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
                {t.navTools}
            </Link>
            <Link href="/blog" locale={locale} className="text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
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

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              {t.heroTitle.split('—')[0].trim()} —{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t.heroTitle.split('—')[1]?.trim()}
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => router.push('/tools', undefined, { locale })}
              >
                {t.exploreToolsButton}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 backdrop-blur-sm">
                {t.subscribeButton}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Section (已更新为使用您提供的 PNG) */}
      <section className="py-20 bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">{t.featuredToolsTitle}</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              {t.featuredToolsSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 border-white/20"
              >
                <CardHeader>
                  <div className={`inline-flex items-center justify-center p-3 rounded-lg bg-gradient-to-r ${tool.color} text-white mb-4 w-14 h-14`}> {/* 确保容器有固定大小以容纳图片 */}
                    {tool.icon}
                  </div>
                  <CardTitle className="text-slate-900 dark:text-white">{tool.name}</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300">{tool.pitch}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all"
                  >
                    <a href={tool.url} target="_blank" rel="noopener noreferrer">
                      {t.tryNowButton}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section (已更新为使用您提供的 PNG) */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">{t.exploreByCategoryTitle}</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">{t.exploreByCategorySubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 border-white/20"
                onClick={() => router.push(`/tools?category=${category.query}`, undefined, { locale })}
              >
                <CardContent className="p-6 text-center">
                  {/* 这个 div 用于包裹分类图标，并应用背景渐变和内边距 */}
                  <div className={`inline-flex items-center justify-center p-4 rounded-lg bg-gradient-to-r ${category.color} mb-4 w-20 h-20`}> {/* 确保容器有固定大小以容纳图片 */}
                    {category.icon} {/* 这里会渲染您指定的 Image 组件 */}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{t[category.titleKey] || category.titleKey}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{t[category.descriptionKey] || category.descriptionKey}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Section (保持不变) */}
      <section className="py-20 bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">{t.latestArticlesTitle}</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              {t.latestArticlesSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 border-white/20"
              >
                <Link href={`/blog/${article.slug}`} locale={locale} className="block">
                  <div className="aspect-video overflow-hidden relative">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={t[article.titleKey] || article.titleKey}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-3">
                      {t[article.categoryKey] || article.categoryKey}
                    </Badge>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {t[article.titleKey] || article.titleKey}
                    </h3>
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(article.date).toLocaleDateString(locale)}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">{t[article.excerptKey] || article.excerptKey}</p>
                    <span
                      className="p-0 h-auto font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                    >
                      {t.readMoreButton}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section (保持不变) */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-none text-white">
            <CardContent className="p-8 lg:p-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.newsletterTitle}</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                {t.newsletterSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder={t.newsletterPlaceholder}
                  className="bg-white/10 border-white/20 placeholder:text-blue-100 text-white focus:ring-white/50"
                  aria-label={t.newsletterPlaceholder}
                />
                <Button className="bg-white text-blue-600 hover:bg-blue-50">{t.subscribeButton}</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer (保持不变) */}
      <footer className="py-12 bg-slate-900 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <DefaultBrainIcon className="h-6 w-6 text-blue-400" />
              <span className="text-white font-semibold">{t.siteName}</span>
            </div>
            <p className="text-slate-400 text-sm mb-4 md:mb-0">{t.footerRights}</p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Github">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}