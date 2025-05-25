import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Head from 'next/head';
import Image from 'next/image'; // Import Next.js Image component
import {
  Twitter,
  Github,
  Calendar,
  ArrowRight,
  Menu,
  Brain as DefaultBrainIcon, // Keep Brain as website Logo
  // 如果不再使用 Lucide 作为分类图标的后备，可以移除下面这些
  // PenTool as DefaultPenTool,
  // ImageIcon as DefaultImageIcon,
  // Video as DefaultVideoIcon,
  // Code as DefaultCodeIcon,
} from "lucide-react"
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMemo, useCallback } from 'react';
import { t } from '@/lib/translations';

export const getStaticProps: GetStaticProps = async () => {
  const title = `${t.siteName} - ${t.heroTitle.split('—')[1]?.trim() || 'AI Tools & Insights'}`;
  const description = t.heroSubtitle;

  return {
    props: {
      title,
      description,
    },
  };
}

export default function LandingPage({ title, description }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  // Tool categories data
  const categories = useMemo(() => [
    {
      name: t.categoryWriting,
      description: t.categoryWritingDesc,
      icon: "/icons/categories/writing-icon.png",
      query: "Writing"
    },
    {
      name: t.categoryImage,
      description: t.categoryImageDesc,
      icon: "/icons/categories/image-icon.png",
      query: "Image"
    },
    {
      name: t.categoryVideo,
      description: t.categoryVideoDesc,
      icon: "/icons/categories/video-icon.png",
      query: "Video"
    },
    {
      name: t.categoryCode,
      description: t.categoryCodeDesc,
      icon: "/icons/categories/code-icon.png",
      query: "Code"
    }
  ], []);

  // Featured tools data
  const featuredTools = useMemo(() => [
    {
      name: "ChatGPT",
      description: "OpenAI's powerful conversational AI",
      image: "/icons/tools/chatgpt-icon.png",
      url: "https://chat.openai.com"
    },
    {
      name: "Midjourney",
      description: "AI-powered image generation",
      image: "/icons/tools/midjourney-icon.jpg",
      url: "https://midjourney.com"
    },
    {
      name: "GitHub Copilot",
      description: "AI pair programmer",
      image: "/icons/tools/github-copilot-icon.jpg",
      url: "https://github.com/features/copilot"
    }
  ], []);

  // Articles data
  const articles = useMemo(() => [
    {
      titleKey: "articleTitleAIArt",
      excerptKey: "articleExcerptAIArt",
      categoryKey: "articleCategoryTutorial",
      date: "2024-01-15",
      slug: "ai-art-generation-guide",
      image: "/placeholder.svg?height=300&width=400&text=AI+Art"
    },
    {
      titleKey: "articleTitleWritingTools",
      excerptKey: "articleExcerptWritingTools", 
      categoryKey: "articleCategoryReview",
      date: "2024-01-12",
      slug: "best-ai-writing-tools",
      image: "/placeholder.svg?height=300&width=400&text=Writing+Tools"
    },
    {
      titleKey: "articleTitleAIDev",
      excerptKey: "articleExcerptAIDev",
      categoryKey: "articleCategoryAnalysis",
      date: "2024-01-10",
      slug: "ai-future-software-development",
      image: "/placeholder.svg?height=300&width=400&text=AI+Development"
    }
  ], []);

  const handleExploreTools = useCallback(() => {
    router.push('/tools');
  }, [router]);

  const handleCategoryClick = useCallback((query: string) => {
    router.push(`/tools?category=${query}`);
  }, [router]);

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
      </Head>

      <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/80 backdrop-blur-md dark:bg-slate-950/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <DefaultBrainIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">{t.siteName}</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
                {t.navHome}
            </Link>
            <Link href="/tools" className="text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
                {t.navTools}
            </Link>
            <Link href="/blog" className="text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
                {t.navBlog}
            </Link>
          </nav>

          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" aria-label="Toggle menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                onClick={handleExploreTools}
              >
                {t.exploreToolsButton}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 px-8 py-3 text-lg"
              >
                {t.subscribeButton}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">{t.featuredToolsTitle}</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              {t.featuredToolsSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTools.map((tool, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 border-white/20"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-white shadow-sm">
                      <Image
                        src={tool.image}
                        alt={tool.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{tool.name}</h3>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">{tool.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300"
                    onClick={() => window.open(tool.url, '_blank')}
                  >
                    {t.tryNowButton}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">{t.exploreByCategoryTitle}</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              {t.exploreByCategorySubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 border-white/20"
                onClick={() => handleCategoryClick(category.query)}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-lg overflow-hidden bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
                    <Image
                      src={category.icon}
                      alt={category.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
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
                <Link href={`/blog/${article.slug}`} className="block">
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
                      {new Date(article.date).toLocaleDateString('en-US')}
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

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">{t.newsletterTitle}</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
              {t.newsletterSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder={t.newsletterPlaceholder}
                className="flex-1"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                {t.subscribeButton}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <DefaultBrainIcon className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">{t.siteName}</span>
            </div>
            <div className="flex space-x-6">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                <Github className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>{t.footerRights}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}