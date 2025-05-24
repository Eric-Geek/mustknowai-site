import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Sparkles,
  Code,
  PenTool,
  ImageIcon,
  Video,
  Twitter,
  Github,
  Calendar,
  ArrowRight,
  Menu,
} from "lucide-react"

export default function LandingPage() {
  const featuredTools = [
    {
      icon: <Brain className="h-8 w-8" />,
      name: "ChatGPT Plus",
      pitch: "Advanced AI conversations for complex tasks",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: <ImageIcon className="h-8 w-8" />,
      name: "Midjourney",
      pitch: "Create stunning AI-generated artwork",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: <Code className="h-8 w-8" />,
      name: "GitHub Copilot",
      pitch: "AI-powered code completion and assistance",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: <PenTool className="h-8 w-8" />,
      name: "Notion AI",
      pitch: "Smart writing assistant for productivity",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: <Video className="h-8 w-8" />,
      name: "RunwayML",
      pitch: "AI video editing and generation tools",
      color: "from-indigo-500 to-purple-600",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      name: "Claude AI",
      pitch: "Helpful AI assistant for analysis and writing",
      color: "from-teal-500 to-green-600",
    },
  ]

  const categories = [
    {
      icon: <PenTool className="h-12 w-12" />,
      title: "Writing",
      description: "AI writing tools and content generation",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: <ImageIcon className="h-12 w-12" />,
      title: "Image",
      description: "AI image generation and editing tools",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: <Video className="h-12 w-12" />,
      title: "Video",
      description: "AI video creation and editing platforms",
      color: "from-orange-500/20 to-red-500/20",
    },
    {
      icon: <Code className="h-12 w-12" />,
      title: "Code",
      description: "AI coding assistants and development tools",
      color: "from-green-500/20 to-emerald-500/20",
    },
  ]

  const articles = [
    {
      image: "/placeholder.svg?height=200&width=300",
      title: "Getting Started with AI Art Generation",
      date: "2024-01-15",
      excerpt: "Learn how to create stunning artwork using AI tools like Midjourney and DALL-E 3.",
      category: "Tutorial",
    },
    {
      image: "/placeholder.svg?height=200&width=300",
      title: "Best AI Writing Tools for Content Creators",
      date: "2024-01-12",
      excerpt: "Comprehensive review of AI writing assistants that can boost your productivity.",
      category: "Review",
    },
    {
      image: "/placeholder.svg?height=200&width=300",
      title: "The Future of AI in Software Development",
      date: "2024-01-10",
      excerpt: "How AI coding assistants are revolutionizing the way developers write code.",
      category: "Analysis",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/80 backdrop-blur-md dark:bg-slate-950/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">MustKnowAI</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
            >
              Tools
            </a>
            <a
              href="#"
              className="text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
            >
              Blog
            </a>
            <a
              href="#"
              className="text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
            >
              About
            </a>
          </nav>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              MustKnowAI — 必知{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI 工具与玩法
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Discover the latest AI tools, tutorials, and techniques to supercharge your productivity and creativity
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Explore Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 backdrop-blur-sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">Featured Tools</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              The most powerful AI tools you need to know about
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 border-white/20"
              >
                <CardHeader>
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${tool.color} text-white mb-4 w-fit`}>
                    {tool.icon}
                  </div>
                  <CardTitle className="text-slate-900 dark:text-white">{tool.name}</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300">{tool.pitch}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                    Try Now
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
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">Explore by Category</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">Find AI tools organized by your specific needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 border-white/20"
              >
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-4 rounded-lg bg-gradient-to-r ${category.color} mb-4`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{category.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{category.description}</p>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">Latest Articles</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Stay updated with the latest AI trends and tutorials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 border-white/20"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3">
                    {article.category}
                  </Badge>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(article.date).toLocaleDateString()}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">{article.excerpt}</p>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Read more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-none text-white">
            <CardContent className="p-8 lg:p-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Stay Updated with AI Trends</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Get weekly updates on the latest AI tools, tutorials, and industry insights delivered to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 placeholder:text-blue-100 text-white"
                />
                <Button className="bg-white text-blue-600 hover:bg-blue-50">Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-blue-400" />
              <span className="text-white font-semibold">MustKnowAI</span>
            </div>

            <p className="text-slate-400 text-sm mb-4 md:mb-0">© 2025 MustKnowAI. All rights reserved.</p>

            <div className="flex items-center space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
