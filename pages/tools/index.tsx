"use client"

import { useState, useMemo, useEffect } from "react"
import { Brain, Menu, Home, Wrench, BookOpen, ChevronRight } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ToolCard } from "@/components/ToolCard"
import AdvancedSearch from "@/components/AdvancedSearch"
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
  tags: string[];
  featured: boolean;
  rating: number;
}

const mockToolsData: Tool[] = [
  {
    id: "1",
    name: "ChatGPT",
    description: "OpenAI's powerful conversational AI for writing, coding, and analysis",
    category: "Writing",
    image: "/icons/tools/chatgpt-icon.svg",
    url: "https://chat.openai.com",
    tags: ["conversation", "writing", "AI assistant", "coding", "analysis"],
    featured: true,
    rating: 4.8
  },
  {
    id: "2",
    name: "Midjourney",
    description: "Create stunning AI-generated artwork and images with simple prompts",
    category: "Image",
    image: "/icons/tools/midjourney-icon.svg",
    url: "https://midjourney.com",
    tags: ["image generation", "art", "creative", "design", "visual"],
    featured: true,
    rating: 4.7
  },
  {
    id: "3",
    name: "GitHub Copilot",
    description: "AI pair programmer that helps you write code faster and smarter",
    category: "Code",
    image: "/icons/tools/github-copilot-icon.svg",
    url: "https://github.com/features/copilot",
    tags: ["coding", "programming", "development", "autocomplete", "IDE"],
    featured: false,
    rating: 4.6
  },
  {
    id: "4",
    name: "Notion AI",
    description: "AI-powered productivity assistant integrated into your workspace",
    category: "Writing",
    image: "/icons/tools/notion-icon.svg",
    url: "https://notion.so/product/ai",
    tags: ["productivity", "writing", "organization", "notes", "workspace"],
    featured: false,
    rating: 4.4
  },
  {
    id: "5",
    name: "RunwayML",
    description: "Professional AI video editing and generation platform",
    category: "Video",
    image: "/icons/tools/runway-icon.svg",
    url: "https://runwayml.com",
    tags: ["video editing", "generation", "creative", "media", "production"],
    featured: false,
    rating: 4.3
  },
  {
    id: "6",
    name: "Claude AI",
    description: "Anthropic's helpful AI assistant for analysis, writing, and reasoning",
    category: "Writing",
    image: "/icons/tools/claude-icon.svg",
    url: "https://claude.ai",
    tags: ["conversation", "analysis", "writing", "reasoning", "research"],
    featured: false,
    rating: 4.5
  },
  {
    id: "7",
    name: "Stable Diffusion",
    description: "Open-source AI model for generating high-quality images from text",
    category: "Image",
    image: "/icons/tools/stable-diffusion-icon.svg",
    url: "https://stability.ai/stable-diffusion",
    tags: ["image generation", "open source", "text-to-image", "AI model", "free"],
    featured: false,
    rating: 4.2
  },
  {
    id: "8",
    name: "Cursor",
    description: "AI-powered code editor built for productivity and collaboration",
    category: "Code",
    image: "/icons/tools/cursor-icon.svg",
    url: "https://cursor.sh",
    tags: ["code editor", "AI assistant", "development", "collaboration", "IDE"],
    featured: false,
    rating: 4.4
  },
  {
    id: "9",
    name: "Perplexity AI",
    description: "AI-powered search engine that provides accurate, real-time answers",
    category: "Research",
    image: "/icons/tools/perplexity-icon.svg",
    url: "https://perplexity.ai",
    tags: ["search", "research", "AI search", "answers", "real-time"],
    featured: false,
    rating: 4.3
  },
  {
    id: "10",
    name: "Luma AI",
    description: "Create stunning 3D content and videos with AI technology",
    category: "Video",
    image: "/placeholder.svg?height=64&width=64&text=LM",
    url: "https://lumalabs.ai",
    tags: ["3D", "video generation", "AI video", "content creation", "visual effects"],
    featured: false,
    rating: 4.1
  },
  {
    id: "11",
    name: "Gemini",
    description: "Google's advanced AI model for multimodal understanding and generation",
    category: "Writing",
    image: "/icons/tools/gemini-icon.svg",
    url: "https://gemini.google.com",
    tags: ["conversation", "multimodal", "Google", "AI assistant", "reasoning"],
    featured: true,
    rating: 4.6
  },
  {
    id: "12",
    name: "DeepSeek",
    description: "Advanced AI model for coding and reasoning tasks",
    category: "Code",
    image: "/icons/tools/deepseek-icon.svg",
    url: "https://deepseek.com",
    tags: ["coding", "reasoning", "AI model", "development", "research"],
    featured: false,
    rating: 4.4
  }
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
  const initialCategory = typeof query.category === 'string' ? query.category : "All Categories";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [displayCount, setDisplayCount] = useState(12);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const categoryFromQuery = typeof query.category === 'string' ? query.category : "All Categories";
    setSelectedCategory(categoryFromQuery);
  }, [query.category]);

  const categories = useMemo(() => [
    "All Categories", "Writing", "Image", "Video", "Code", "Research", "Audio", "Business", "Education", "Design"
  ], []);

  // Extract all unique tags from tools
  const availableTags = useMemo(() => {
    const typedTools = tools as Tool[];
    const allTags = typedTools.flatMap(tool => tool.tags || []);
    return Array.from(new Set(allTags)).sort();
  }, [tools]);

  const filteredAndSortedTools = useMemo(() => {
    const typedTools = tools as Tool[];
    let filtered = typedTools.filter((tool) => {
      const matchesCategory = selectedCategory === "All Categories" || tool.category === selectedCategory;
      
      const lowerSearchQuery = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === "" ||
        tool.name.toLowerCase().includes(lowerSearchQuery) ||
        tool.description.toLowerCase().includes(lowerSearchQuery) ||
        tool.tags.some(tag => tag.toLowerCase().includes(lowerSearchQuery));
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => tool.tags.includes(tag));
      
      return matchesCategory && matchesSearch && matchesTags;
    });

    // Sort the filtered results
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // For demo purposes, sort by ID (assuming higher ID = newer)
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case "popular":
        // Sort by featured first, then by rating
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
        break;
      default: // relevance
        // Sort by featured first, then by search relevance
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          
          if (searchQuery) {
            const aRelevance = (
              (a.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 2 : 0) +
              (a.description.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0)
            );
            const bRelevance = (
              (b.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 2 : 0) +
              (b.description.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0)
            );
            return bRelevance - aRelevance;
          }
          
          return b.rating - a.rating;
        });
    }

    return filtered;
  }, [tools, selectedCategory, searchQuery, selectedTags, sortBy]);

  const displayedTools = filteredAndSortedTools.slice(0, displayCount);
  const hasMoreTools = filteredAndSortedTools.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 12);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`https://mustknowai.com${router.asPath}`} />
        <meta property="og:site_name" content={t.siteName} />
      </Head>

      <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/80 backdrop-blur-md dark:bg-slate-950/80">
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
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="打开菜单">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
                <div className="flex flex-col h-full">
                  <SheetHeader className="p-6 pb-4">
                    <SheetTitle className="text-xl font-bold text-slate-900 dark:text-white">
                      {t.siteName}
                    </SheetTitle>
                  </SheetHeader>
                  <Separator />
                  <div className="flex-1 overflow-y-auto">
                    <nav className="p-4 space-y-2">
                      <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
                        导航
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-auto p-4 text-left"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          router.push('/');
                        }}
                      >
                        <div className="flex items-center w-full">
                          <Home className="h-5 w-5 mr-3" />
                          <div className="flex-1">
                            <div className="font-medium">{t.navHome}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">返回首页</div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-400" />
                        </div>
                      </Button>
                      <Button
                        variant="secondary"
                        className="w-full justify-start h-auto p-4 text-left bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="flex items-center w-full">
                          <Wrench className="h-5 w-5 mr-3 text-blue-600 dark:text-blue-400" />
                          <div className="flex-1">
                            <div className="font-medium">{t.navTools}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">当前页面</div>
                          </div>
                        </div>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-auto p-4 text-left"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          router.push('/blog');
                        }}
                      >
                        <div className="flex items-center w-full">
                          <BookOpen className="h-5 w-5 mr-3" />
                          <div className="flex-1">
                            <div className="font-medium">{t.navBlog}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">阅读最新文章</div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-400" />
                        </div>
                      </Button>
                    </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {t.toolsDirectoryTitle}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Discover the perfect AI tools for your needs. Filter by category, search by features, and find exactly what you're looking for.
          </p>
        </div>

        {/* Advanced Search Component */}
        <AdvancedSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          categories={categories}
          availableTags={availableTags}
          sortBy={sortBy}
          onSortChange={setSortBy}
          resultsCount={filteredAndSortedTools.length}
        />

        {/* Tools Grid */}
        {filteredAndSortedTools.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4" aria-hidden="true">🔍</div>
            <h2 className="text-2xl font-bold text-foreground mb-4">{t.noToolsFoundTitle}</h2>
            <p className="text-muted-foreground mb-6">{t.noToolsFoundSubtitle}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {displayedTools.map((tool) => (
                <ToolCard 
                  key={tool.id} 
                  logo={tool.image}
                  name={tool.name}
                  tagline={tool.description}
                  category={tool.category}
                  url={tool.url}
                  featured={tool.featured}
                  rating={tool.rating}
                />
              ))}
            </div>
            
            {hasMoreTools && (
              <div className="text-center">
                <Button 
                  onClick={handleLoadMore} 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-3 text-lg border-2 border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
                >
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