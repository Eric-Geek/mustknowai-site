"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, ChevronDown, Brain, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ToolCard } from "@/components/ToolCard" // Ensure ToolCard is updated to use next/image
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { t } from '@/lib/translations';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  url: string;
  tags?: string[];
}

const mockToolsData: Tool[] = [
  {
    id: "1",
    name: "ChatGPT",
    description: "OpenAI's powerful conversational AI",
    category: "Writing",
    image: "/icons/tools/chatgpt-icon.png",
    url: "https://chat.openai.com",
    tags: ["conversation", "writing", "AI assistant"],
  },
  {
    id: "2",
    name: "Midjourney",
    description: "AI-powered image generation",
    category: "Image",
    image: "/icons/tools/midjourney-icon.jpg",
    url: "https://midjourney.com",
    tags: ["image generation", "art", "creative"],
  },
  {
    id: "3",
    name: "GitHub Copilot",
    description: "AI pair programmer",
    category: "Code",
    image: "/icons/tools/github-copilot-icon.jpg",
    url: "https://github.com/features/copilot",
    tags: ["coding", "programming", "development"],
  },
  {
    id: "4",
    name: "Notion AI",
    description: "AI-powered productivity and writing assistant",
    category: "Writing",
    image: "/icons/tools/notion-icon.jpg",
    url: "https://notion.so/product/ai",
    tags: ["productivity", "writing", "organization"],
  },
  {
    id: "5",
    name: "RunwayML",
    description: "AI video editing and generation tools",
    category: "Video",
    image: "/icons/tools/runway-icon.jpg",
    url: "https://runwayml.com",
    tags: ["video editing", "generation", "creative"],
  },
  {
    id: "6",
    name: "Claude AI",
    description: "Anthropic's helpful AI assistant",
    category: "Writing",
    image: "/icons/tools/claude-icon.jpg",
    url: "https://claude.ai",
    tags: ["conversation", "analysis", "writing"],
  },
];

export const getStaticProps: GetStaticProps = async () => {
  const pageTitle = `${t.toolsDirectoryTitle} - ${t.siteName}`;
  const pageDescription = t.exploreByCategorySubtitle;

  return {
    props: {
      tools: mockToolsData,
      pageTitle,
      pageDescription,
    },
  };
}

export default function AIToolsDirectory({ tools = [], pageTitle, pageDescription }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { query } = router;
  const initialCategory = typeof query.category === 'string' ? query.category : t.allCategories;

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(12);

  useEffect(() => {
    const categoryFromQuery = typeof query.category === 'string' ? query.category : t.allCategories;
    setSelectedCategory(categoryFromQuery);
  }, [query.category]);

  const categories = useMemo(() => [
    t.allCategories, "Writing", "Image", "Video", "Code", "Audio", "Business", "Education", "Design"
  ], []);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const toolCategoryForFilter = tool.category;
      const matchesCategory = selectedCategory === t.allCategories || toolCategoryForFilter === selectedCategory;

      const lowerSearchQuery = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        tool.name.toLowerCase().includes(lowerSearchQuery) ||
        tool.description.toLowerCase().includes(lowerSearchQuery) ||
        tool.tags?.some((tag) => tag.toLowerCase().includes(lowerSearchQuery));
      return matchesCategory && matchesSearch;
    });
  }, [tools, selectedCategory, searchQuery]);

  const displayedTools = filteredTools.slice(0, displayCount);
  const hasMoreTools = filteredTools.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 12);
  };

  const handleResetFilters = () => {
    setSelectedCategory(t.allCategories);
    setSearchQuery("");
    setDisplayCount(12);
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
          </nav>
          <div className="md:hidden flex items-center">
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
                {categories.map((categoryValue) => (
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

      <main className="container mx-auto px-4 py-8">
        {filteredTools.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t.noToolsFoundTitle}</h2>
            <p className="text-muted-foreground mb-6">{t.noToolsFoundSubtitle}</p>
            <Button onClick={handleResetFilters} variant="outline">
              {t.resetFiltersButton}
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-muted-foreground">
                {searchQuery && selectedCategory !== t.allCategories
                  ? `Found ${filteredTools.length} tools containing '${searchQuery}' in ${selectedCategory} category`
                  : searchQuery
                  ? `Found ${filteredTools.length} tools containing '${searchQuery}'`
                  : selectedCategory !== t.allCategories
                  ? `Found ${filteredTools.length} tools in ${selectedCategory} category`
                  : `Found ${filteredTools.length} tools`}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedTools.map((tool) => (
                <ToolCard 
                  key={tool.id} 
                  logo={tool.image}
                  name={tool.name}
                  tagline={tool.description}
                  category={tool.category}
                  url={tool.url}
                />
              ))}
            </div>
            
            {hasMoreTools && (
              <div className="text-center mt-12">
                <Button onClick={handleLoadMore} variant="outline" size="lg">
                  {t.loadMoreButton}
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}