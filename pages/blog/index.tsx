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
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { t } from '@/lib/translations'

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  publishDate: string;
  readTime: number;
  featured: boolean;
  image: string;
}

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "getting-started-with-ai-art-generation",
    title: "Getting Started with AI Art Generation",
    excerpt: "Learn how to create stunning digital artwork using AI tools like Midjourney and DALL-E.",
    content: "...",
    category: "tutorial",
    tags: ["AI Art", "Midjourney", "DALL-E"],
    author: "AI Artist",
    publishDate: "2024-01-15",
    readTime: 8,
    featured: true,
    image: "/placeholder.svg?height=400&width=600&text=AI+Art"
  },
  {
    id: "2",
    slug: "best-ai-writing-tools-2024",
    title: "Best AI Writing Tools in 2024",
    excerpt: "Comprehensive review of the top AI writing assistants to boost your productivity.",
    content: "...",
    category: "review",
    tags: ["Writing", "Productivity", "Tools"],
    author: "Tech Reviewer",
    publishDate: "2024-01-12",
    readTime: 12,
    featured: true,
    image: "/placeholder.svg?height=400&width=600&text=Writing+Tools"
  },
  {
    id: "3",
    slug: "future-of-ai-in-software-development",
    title: "The Future of AI in Software Development",
    excerpt: "Exploring how artificial intelligence is transforming every aspect of software development.",
    content: "...",
    category: "analysis",
    tags: ["Development", "Future", "Technology"],
    author: "Software Engineer",
    publishDate: "2024-01-10",
    readTime: 15,
    featured: false,
    image: "/placeholder.svg?height=400&width=600&text=AI+Development"
  },
  {
    id: "4",
    slug: "ai-video-editing-revolution",
    title: "AI Video Editing Revolution",
    excerpt: "How AI is changing the landscape of video production and editing workflows.",
    content: "...",
    category: "guide",
    tags: ["Video", "Editing", "AI Tools"],
    author: "Video Producer",
    publishDate: "2024-01-08",
    readTime: 10,
    featured: false,
    image: "/placeholder.svg?height=400&width=600&text=Video+AI"
  },
  {
    id: "5",
    slug: "ai-business-transformation",
    title: "AI Business Transformation: Success Stories",
    excerpt: "Real-world examples of how businesses are leveraging AI for growth and efficiency.",
    content: "...",
    category: "analysis",
    tags: ["Business", "Transformation", "Case Studies"],
    author: "Business Analyst",
    publishDate: "2024-01-05",
    readTime: 10,
    featured: false,
    image: "/placeholder.svg?height=400&width=600&text=Business+AI"
  }
];

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: mockBlogPosts,
    },
  };
}

export default function BlogPage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCount, setShowCount] = useState(6);

  const categories = useMemo(() => [
    { value: "all", label: t.blogCategoryAll },
    { value: "tutorial", label: t.blogCategoryTutorial },
    { value: "review", label: t.blogCategoryReview },
    { value: "news", label: t.blogCategoryNews },
    { value: "guide", label: t.blogCategoryGuide },
    { value: "analysis", label: t.articleCategoryAnalysis },
  ], []);

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
      </Head>

      {/* Header */}
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
            <Link href="/blog" className="font-semibold text-blue-600 dark:text-blue-400">
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

      {/* Search and Filter Section */}
      <section className="py-8 bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder={t.searchBlogPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
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

      {/* Featured Posts Section */}
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
                  <Link href={`/blog/${post.slug}`}>
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
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.publishDate).toLocaleDateString('en-US')}
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
            {searchQuery || selectedCategory !== "all" ? "Search Results" : t.recentPostsTitle}
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{t.noBlogPostsFound}</h3>
              <p className="text-slate-600 dark:text-slate-300">{t.noBlogPostsFoundDesc}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedPosts.map((post: BlogPost) => (
                  <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                    <Link href={`/blog/${post.slug}`}>
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
                          {new Date(post.publishDate).toLocaleDateString('en-US')}
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
              
              {filteredPosts.length > showCount && (
                <div className="text-center mt-12">
                  <Button 
                    onClick={() => setShowCount(prev => prev + 6)}
                    variant="outline" 
                    size="lg"
                  >
                    {t.loadMoreButton}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}