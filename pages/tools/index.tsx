"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, ChevronDown, Brain, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ToolCard } from "@/components/ToolCard"
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Link from 'next/link';

// 辅助函数加载翻译 (可以放在共享的 utils 文件中)
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

// Mock tool interface - 根据实际 ToolCard props 调整
interface Tool {
  id: string
  name: string // 如果工具名称需要翻译，则应从翻译文件加载
  description: string // 同上
  category: string // 分类键，用于筛选和显示
  image?: string
  url?: string
  tags?: string[] // 标签也可能需要翻译
  featured?: boolean
}

// Mock data - 替换为实际数据源
// 注意：对于多语言站点，工具的名称、描述等信息通常也需要国际化。
// 一种常见做法是在 getStaticProps 中根据 locale 加载不同语言的工具数据，
// 或者工具数据本身包含多语言字段。
// 为简化，这里暂时不直接翻译 mockTools 内部的文本。
const mockToolsData: Tool[] = [
  {
    id: "1",
    name: "ChatGPT",
    description: "强大的对话式AI助手，可以回答问题、写作、编程等",
    category: "Writing",
    image: "/placeholder.svg?height=200&width=300",
    url: "https://chat.openai.com",
    tags: ["对话", "写作", "编程"],
    featured: true,
  },
  {
    id: "2",
    name: "Midjourney",
    description: "顶级的AI图像生成工具，创造惊艳的艺术作品",
    category: "Image",
    image: "/placeholder.svg?height=200&width=300",
    url: "https://midjourney.com",
    tags: ["图像生成", "艺术", "创意"],
  },
  {
    id: "3",
    name: "GitHub Copilot",
    description: "AI编程助手，提供智能代码补全和建议",
    category: "Code",
    image: "/placeholder.svg?height=200&width=300",
    url: "https://github.com/features/copilot",
    tags: ["编程", "代码", "开发"],
  },
  {
    id: "4",
    name: "Runway ML",
    description: "专业的AI视频编辑和生成平台",
    category: "Video",
    image: "/placeholder.svg?height=200&width=300",
    url: "https://runwayml.com",
    tags: ["视频", "编辑", "生成"],
  },
  {
    id: "5",
    name: "Notion AI",
    description: "集成在Notion中的AI写作和思维助手",
    category: "Writing",
    image: "/placeholder.svg?height=200&width=300",
    url: "https://notion.so/product/ai",
    tags: ["写作", "笔记", "协作"],
  },
  {
    id: "6",
    name: "DALL-E 3",
    description: "OpenAI的最新图像生成模型",
    category: "Image",
    image: "/placeholder.svg?height=200&width=300",
    url: "https://openai.com/dall-e-3",
    tags: ["图像生成", "OpenAI", "创意"],
  },
];

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale, defaultLocale } = context;
  const t = await loadTranslations(locale, defaultLocale);
  const pageTitle = `${t.toolsDirectoryTitle} - ${t.siteName}`;
  const pageDescription = t.exploreByCategorySubtitle; // 或者更具体的描述

  return {
    props: {
      t,
      tools: mockToolsData, // 传递您的工具数据
      pageTitle,
      pageDescription,
    },
  };
}

export default function AIToolsDirectory({ t, tools = [], pageTitle, pageDescription }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { query } = router;
  const initialCategory = typeof query.category === 'string' ? query.category : t.allCategories;

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(12);

  useEffect(() => {
    const categoryFromQuery = typeof query.category === 'string' ? query.category : t.allCategories;
    setSelectedCategory(categoryFromQuery);
  }, [query.category, t.allCategories]);

  const categories = useMemo(() => [
    t.allCategories, "Writing", "Image", "Video", "Code", "Audio", "Business", "Education", "Design"
  ], [t.allCategories]); // 这些分类名如果也需要翻译，应从 t 对象获取

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const toolCategory = tool.category; // 假设 category 已经是英文键
      const matchesCategory = selectedCategory === t.allCategories || toolCategory === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [tools, selectedCategory, searchQuery, t.allCategories]);

  const displayedTools = filteredTools.slice(0, displayCount);
  const hasMoreTools = displayCount < filteredTools.length;

  const loadMore = () => {
    setDisplayCount((prev) => prev + 12);
  };

  const getResultsText = () => {
    const count = filteredTools.length;
    if (searchQuery && selectedCategory !== t.allCategories) {
      return t.toolsFoundInCategoryWithQuery.replace('{count}', count.toString()).replace('{category}', selectedCategory).replace('{query}', searchQuery);
    }
    if (searchQuery) {
      return t.toolsFoundWithQuery.replace('{count}', count.toString()).replace('{query}', searchQuery);
    }
    if (selectedCategory !== t.allCategories) {
      return t.toolsFoundInCategory.replace('{count}', count.toString()).replace('{category}', selectedCategory);
    }
    return t.toolsFound.replace('{count}', count.toString());
  };

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`https://mustknowai.com${router.asPath}`} />
        <meta property="og:site_name" content={t.siteName} />
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
            <Link href="/tools" className="text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors font-semibold text-blue-600 dark:text-blue-400">
              {t.navTools}
            </Link>
            <Link href="/blog" className="text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
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

      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground mb-6">{t.toolsDirectoryTitle}</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto justify-between">
                  {selectedCategory}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-accent" : ""}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                aria-label={t.searchPlaceholder}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-muted-foreground">
            {getResultsText()}
          </p>
        </div>

        {displayedTools.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayedTools.map((tool) => (
                <div key={tool.id} className="h-fit">
                  <ToolCard
                    logo={tool.image || "/placeholder.svg"}
                    name={tool.name}
                    tagline={tool.description}
                    category={tool.category}
                    url={tool.url || "#"}
                  />
                </div>
              ))}
            </div>
            {hasMoreTools && (
              <div className="flex justify-center">
                <Button onClick={loadMore} variant="outline" size="lg" className="px-8">
                  {t.loadMoreButton}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4" aria-hidden="true">🔍</div>
            <h3 className="text-xl font-semibold mb-2">{t.noToolsFoundTitle}</h3>
            <p className="text-muted-foreground mb-4">{t.noToolsFoundSubtitle}</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(t.allCategories);
              }}
            >
              {t.resetFiltersButton}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}