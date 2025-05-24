import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Head from 'next/head'
import Image from 'next/image'
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Menu,
  Brain as DefaultBrainIcon,
  BookOpen,
  TrendingUp,
  Star,
  Filter
} from "lucide-react"
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// 翻译加载函数
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

// 模拟博客文章数据
interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: string
  publishDate: string
  readTime: number
  featured: boolean
  image: string
}

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "ai-revolution-2024",
    title: "AI革命2024：改变世界的十大突破",
    excerpt: "深入探讨2024年最具影响力的AI技术突破，从GPT-4到自动驾驶的全面革新。",
    content: "...",
    category: "news",
    tags: ["AI", "2024", "技术趋势"],
    author: "MustKnowAI团队",
    publishDate: "2024-01-20",
    readTime: 8,
    featured: true,
    image: "/placeholder.svg?height=400&width=600&text=AI+Revolution"
  },
  {
    id: "2", 
    slug: "chatgpt-advanced-techniques",
    title: "ChatGPT高级使用技巧：提升10倍工作效率",
    excerpt: "掌握这些ChatGPT高级提示词和技巧，让AI成为你的超级助手。",
    content: "...",
    category: "tutorial",
    tags: ["ChatGPT", "提示词", "效率"],
    author: "AI专家",
    publishDate: "2024-01-18",
    readTime: 12,
    featured: true,
    image: "/placeholder.svg?height=400&width=600&text=ChatGPT+Tips"
  },
  {
    id: "3",
    slug: "midjourney-vs-dalle3",
    title: "Midjourney vs DALL-E 3：AI绘画工具终极对比",
    excerpt: "详细对比两大AI绘画平台的优劣势，帮你选择最适合的创作工具。",
    content: "...",
    category: "review",
    tags: ["Midjourney", "DALL-E", "AI绘画"],
    author: "设计师小王",
    publishDate: "2024-01-15",
    readTime: 6,
    featured: false,
    image: "/placeholder.svg?height=400&width=600&text=AI+Art+Comparison"
  },
  {
    id: "4",
    slug: "ai-coding-guide-2024",
    title: "AI编程完全指南：从入门到精通",
    excerpt: "全面介绍AI辅助编程的最新工具和最佳实践，提升开发效率。",
    content: "...",
    category: "guide",
    tags: ["编程", "AI工具", "开发"],
    author: "技术总监",
    publishDate: "2024-01-12",
    readTime: 15,
    featured: false,
    image: "/placeholder.svg?height=400&width=600&text=AI+Coding"
  },
  {
    id: "5",
    slug: "ai-business-transformation",
    title: "企业AI转型：成功案例与最佳实践",
    excerpt: "分析成功企业如何通过AI技术实现数字化转型和效率提升。",
    content: "...",
    category: "analysis",
    tags: ["企业AI", "转型", "案例研究"],
    author: "商业分析师",
    publishDate: "2024-01-10",
    readTime: 10,
    featured: false,
    image: "/placeholder.svg?height=400&width=600&text=Business+AI"
  }
];

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale, defaultLocale } = context;
  const t = await loadTranslations(locale, defaultLocale);
  
  return {
    props: {
      t,
      posts: mockBlogPosts,
    },
  };
}

export default function BlogPage({ t, posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { locale } = router;
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCount, setShowCount] = useState(6);

  // 分类选项
  const categories = useMemo(() => [
    { value: "all", label: t.blogCategoryAll },
    { value: "tutorial", label: t.blogCategoryTutorial },
    { value: "review", label: t.blogCategoryReview },
    { value: "news", label: t.blogCategoryNews },
    { value: "guide", label: t.blogCategoryGuide },
    { value: "analysis", label: t.articleCategoryAnalysis },
  ], [t]);

  // 筛选文章
  const filteredPosts = useMemo(() => {
    return posts.filter((post: BlogPost) => {
      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
      const matchesSearch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPosts = posts.filter((post: BlogPost) => post.featured);
  const displayedPosts = filteredPosts.slice(0, showCount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <Head>
        <title>{`${t.blogTitle} - ${t.siteName}`}</title>
        <meta name="description" content={t.blogDescription} />
        <meta property="og:title" content={`${t.blogTitle} - ${t.siteName}`} />
        <meta property="og:description" content={t.blogDescription} />
        <meta property="og:url" content={`https://mustknowai.com${router.asPath}`} />
        <meta property="og:site_name" content={t.siteName} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={locale} />
        {router.locales?.filter(l => l !== locale).map(l => (
          <meta key={l} property="og:locale:alternate" content={l} />
        ))}
      </Head>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/80 backdrop-blur-md dark:bg-slate-950/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" locale={locale} className="flex items-center space-x-2">
            <DefaultBrainIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">{t.siteName}</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" locale={locale} className="text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
              {t.navHome}
            </Link>
            <Link href="/tools" locale={locale} className="text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
              {t.navTools}
            </Link>
            <Link href="/blog" locale={locale} className="font-semibold text-blue-600 dark:text-blue-400">
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

      {/* Hero Section - 参考 GlobalGPT 简洁设计 */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              {t.blogTitle}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              {t.blogSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white/50 backdrop-blur-sm dark:bg-slate-900/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder={t.searchBlogPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-sm border-slate-200 focus:border-blue-500"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto bg-white/80 backdrop-blur-sm">
                  <Filter className="mr-2 h-4 w-4" />
                  {categories.find(cat => cat.value === selectedCategory)?.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    {category.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && selectedCategory === "all" && !searchQuery && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-8">
              <Star className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t.featuredPostsTitle}</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post: BlogPost) => (
                <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                  <Link href={`/blog/${post.slug}`} locale={locale}>
                    <div className="aspect-video overflow-hidden relative">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary">
                          {categories.find(cat => cat.value === post.category)?.label}
                        </Badge>
                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime} {t.minutesRead}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(post.publishDate).toLocaleDateString(locale)}
                        </div>
                        <ArrowRight className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {searchQuery || selectedCategory !== "all" ? 
                `${t.searchBlogPlaceholder.replace('...', '')} (${filteredPosts.length})` : 
                t.recentPostsTitle
              }
            </h2>
          </div>

          {displayedPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedPosts.map((post: BlogPost) => (
                  <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                    <Link href={`/blog/${post.slug}`} locale={locale}>
                      <div className="aspect-video overflow-hidden relative">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {categories.find(cat => cat.value === post.category)?.label}
                          </Badge>
                          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readTime} {t.minutesRead}
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3 text-sm">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(post.publishDate).toLocaleDateString(locale)}
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>

              {/* Load More Button */}
              {displayedPosts.length < filteredPosts.length && (
                <div className="text-center mt-12">
                  <Button 
                    onClick={() => setShowCount(prev => prev + 6)}
                    variant="outline"
                    size="lg"
                    className="px-8"
                  >
                    {t.loadMoreButton}
                  </Button>
                </div>
              )}
            </>
          ) : (
            /* No Posts Found */
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {t.noBlogPostsFound}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                {t.noBlogPostsFoundDesc}
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                variant="outline"
              >
                {t.resetFiltersButton}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-4">{t.newsletterTitle}</h2>
            <p className="text-blue-100 mb-8">{t.newsletterSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t.newsletterPlaceholder}
                className="bg-white/10 border-white/20 placeholder:text-blue-100 text-white focus:ring-white/50"
              />
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                {t.subscribeButton}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <DefaultBrainIcon className="h-6 w-6 text-blue-400" />
              <span className="text-white font-semibold">{t.siteName}</span>
            </div>
            <p className="text-slate-400 text-sm">{t.footerRights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}