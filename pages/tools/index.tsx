"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, ChevronDown, Brain, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ToolCard } from "@/components/ToolCard" // 确保 ToolCard 已更新为使用 next/image
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Link from 'next/link';

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

interface Tool {
  id: string
  name: string
  description: string
  category: string
  image?: string // 这将是传递给 ToolCard 的 logo 路径
  url?: string
  tags?: string[]
  featured?: boolean
}

// 更新这里的 mockToolsData 以使用您 public 文件夹中的正确图片路径
const mockToolsData: Tool[] = [
  {
    id: "1",
    name: "ChatGPT",
    description: "强大的对话式AI助手，可以回答问题、写作、编程等",
    category: "Writing", // 这些分类名如果也需要翻译，可以在渲染时处理
    image: "/icons/tools/chatgpt-icon.png", // 更新路径
    url: "https://chat.openai.com",
    tags: ["对话", "写作", "编程"],
    featured: true,
  },
  {
    id: "2",
    name: "Midjourney",
    description: "顶级的AI图像生成工具，创造惊艳的艺术作品",
    category: "Image",
    image: "/icons/tools/midjourney-icon.jpg", // 更新路径，注意扩展名
    url: "https://midjourney.com",
    tags: ["图像生成", "艺术", "创意"],
  },
  {
    id: "3",
    name: "GitHub Copilot",
    description: "AI编程助手，提供智能代码补全和建议",
    category: "Code",
    image: "/icons/tools/github-copilot-icon.jpg", // 更新路径 (如果重命名了，确保匹配)
    url: "https://github.com/features/copilot",
    tags: ["编程", "代码", "开发"],
  },
  {
    id: "4",
    name: "RunwayML", // 如果用作 ToolCard 的 name，实际显示 RunwayML
    description: "专业的AI视频编辑和生成平台",
    category: "Video",
    image: "/icons/tools/runway-icon.jpg", // 更新路径
    url: "https://runwayml.com",
    tags: ["视频", "编辑", "生成"],
  },
  {
    id: "5",
    name: "Notion AI",
    description: "集成在Notion中的AI写作和思维助手",
    category: "Writing",
    image: "/icons/tools/notion-icon.jpg", // 更新路径
    url: "https://notion.so/product/ai",
    tags: ["写作", "笔记", "协作"],
  },
  {
    id: "6",
    name: "Claude AI",
    description: "OpenAI的最新图像生成模型", // 描述似乎不符，应为 Claude 的描述
    category: "Image", // 分类也应为 Claude 的分类，例如 Chat 或 Writing
    image: "/icons/tools/claude-icon.jpg", // 更新路径
    url: "https://claude.ai", // URL 指向 claude.ai
    tags: ["图像生成", "OpenAI", "创意"], // 标签也应为 Claude 相关
  },
  // ...您可以添加更多工具，确保 image 路径正确
];

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale, defaultLocale } = context;
  const t = await loadTranslations(locale, defaultLocale);
  const pageTitle = `${t.toolsDirectoryTitle} - ${t.siteName}`;
  const pageDescription = t.exploreByCategorySubtitle;

  // 在这里，您可以根据 locale 动态获取或过滤工具数据
  // 为简单起见，我们直接使用上面定义的 mockToolsData
  // 实际项目中，工具的 name, description, category, tags 都应该国际化
  const localizedTools = mockToolsData.map(tool => ({
    ...tool,
    // name: t[`toolName_${tool.id}`] || tool.name, // 假设翻译文件中有 toolName_1, toolName_2 等
    // description: t[`toolDesc_${tool.id}`] || tool.description,
    // category: t[`toolCategory_${tool.category}`] || tool.category, // 如果分类也翻译
  }));


  return {
    props: {
      t,
      tools: localizedTools,
      pageTitle,
      pageDescription,
    },
  };
}

export default function AIToolsDirectory({ t, tools = [], pageTitle, pageDescription }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { locale, query } = router;
  const initialCategory = typeof query.category === 'string' ? query.category : t.allCategories;

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(12);

  useEffect(() => {
    const categoryFromQuery = typeof query.category === 'string' ? query.category : t.allCategories;
    // 如果URL中的category是翻译后的值，您可能需要将其映射回英文键或统一的键
    setSelectedCategory(categoryFromQuery);
  }, [query.category, t.allCategories]);

  // 分类列表本身也应该可以翻译，如果它们是动态生成的或需要在 UI 中显示不同的文本
  const categories = useMemo(() => [
    t.allCategories, "Writing", "Image", "Video", "Code", "Audio", "Business", "Education", "Design"
    // 更理想的情况是：
    // t.allCategories, t.categoryWriting, t.categoryImage, ...
    // 并确保这些键存在于您的 common.json 文件中
  ], [t]);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const toolCategoryForFilter = tool.category; // 假设 tool.category 存储的是英文键
      const matchesCategory = selectedCategory === t.allCategories || toolCategoryForFilter === selectedCategory;

      const lowerSearchQuery = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        tool.name.toLowerCase().includes(lowerSearchQuery) ||
        tool.description.toLowerCase().includes(lowerSearchQuery) ||
        tool.tags?.some((tag) => tag.toLowerCase().includes(lowerSearchQuery));
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
        <meta property="og:locale" content={locale} />
        {router.locales?.filter(l => l !== locale).map(l => (
          <meta key={l} property="og:locale:alternate" content={l} />
        ))}
      </Head>

      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md dark:bg-slate-950/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" locale={locale} className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">{t.siteName}</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" locale={locale} className="text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
              {t.navHome}
            </Link>
            <Link href="/tools" locale={locale} className="text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors font-semibold text-blue-600 dark:text-blue-400">
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

      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground mb-6">{t.toolsDirectoryTitle}</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto justify-between">
                  {selectedCategory} {/* 如果分类名已翻译，这里会显示翻译后的 */}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {categories.map((categoryValue) => ( // categoryValue 可能是翻译后的值或键
                  <DropdownMenuItem
                    key={categoryValue}
                    onClick={() => setSelectedCategory(categoryValue)}
                    className={selectedCategory === categoryValue ? "bg-accent" : ""}
                  >
                    {categoryValue}
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
                    logo={tool.image || "/placeholder.svg"} // ToolCard 现在使用 next/image
                    name={tool.name} // 如果工具名称已在 getStaticProps 中本地化，则这里是本地化后的名称
                    tagline={tool.description} // 同上
                    category={tool.category} // 同上
                    url={tool.url}
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