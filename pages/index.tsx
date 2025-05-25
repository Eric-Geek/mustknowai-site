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
import { ToolCard } from "@/components/ToolCard";

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
      description: "OpenAI's powerful conversational AI for writing, coding, and analysis",
      image: "/icons/tools/chatgpt-icon.png",
      url: "https://chat.openai.com",
      featured: true,
      rating: 4.8
    },
    {
      name: "Midjourney",
      description: "Create stunning AI-generated artwork and images with simple prompts",
      image: "/icons/tools/midjourney-icon.jpg",
      url: "https://midjourney.com",
      featured: true,
      rating: 4.7
    },
    {
      name: "GitHub Copilot",
      description: "AI pair programmer that helps you write code faster and smarter",
      image: "/icons/tools/github-copilot-icon.jpg",
      url: "https://github.com/features/copilot",
      featured: false,
      rating: 4.6
    },
    {
      name: "Claude AI",
      description: "Anthropic's helpful AI assistant for analysis, writing, and reasoning",
      image: "/icons/tools/claude-icon.jpg",
      url: "https://claude.ai",
      featured: false,
      rating: 4.5
    },
    {
      name: "Notion AI",
      description: "AI-powered productivity assistant integrated into your workspace",
      image: "/icons/tools/notion-icon.jpg",
      url: "https://notion.so/product/ai",
      featured: false,
      rating: 4.4
    },
    {
      name: "RunwayML",
      description: "Professional AI video editing and generation platform",
      image: "/icons/tools/runway-icon.jpg",
      url: "https://runwayml.com",
      featured: false,
      rating: 4.3
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
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mx-auto max-w-5xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg mb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Discover 100+ AI Tools
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-size-200 animate-gradient">
                Discover the Best
              </span>
              <br />
              <span className="text-slate-900 dark:text-white">AI Tools</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Curated collection of AI tools to empower your work, learning, and creative projects
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0"
                onClick={handleExploreTools}
              >
                {t.exploreToolsButton}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:border-blue-500 dark:hover:border-blue-400 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
              >
                {t.subscribeButton}
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">100+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">AI Tools</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">4.8</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
              </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {featuredTools.map((tool, index) => (
              <div key={index} className="h-fit">
                <ToolCard
                  logo={tool.image}
                  name={tool.name}
                  tagline={tool.description}
                  category="AI Tool"
                  url={tool.url}
                  featured={tool.featured}
                  rating={tool.rating}
                  variant="standard"
                />
              </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 hover:scale-105 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 border-0 rounded-2xl"
                onClick={() => handleCategoryClick(category.query)}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                
                <CardContent className="p-8 text-center relative z-10">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 flex items-center justify-center shadow-lg ring-1 ring-gray-200/50 dark:ring-gray-700/50 group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={category.icon}
                        alt={category.name}
                        width={40}
                        height={40}
                        className="object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Floating badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                      <ArrowRight className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
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