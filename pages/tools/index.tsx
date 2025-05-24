"use client"

import { useState, useMemo } from "react"
import { Search, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ToolCard } from "@/components/ToolCard"

// Mock tool interface - adjust based on your actual ToolCard props
interface Tool {
  id: string
  name: string
  description: string
  category: string
  image?: string
  url?: string
  tags?: string[]
  featured?: boolean
}

// Mock data - replace with your actual data source
const mockTools: Tool[] = [
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
    url: "https://notion.so",
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
]

const categories = ["All", "Writing", "Image", "Video", "Code", "Audio", "Business", "Education", "Design"]

interface AIToolsDirectoryProps {
  tools?: Tool[]
}

export default function AIToolsDirectory({ tools = mockTools }: AIToolsDirectoryProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [displayCount, setDisplayCount] = useState(12)

  // Filter tools based on category and search query
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory
      const matchesSearch =
        searchQuery === "" ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesCategory && matchesSearch
    })
  }, [tools, selectedCategory, searchQuery])

  // Get tools to display (for pagination)
  const displayedTools = filteredTools.slice(0, displayCount)
  const hasMoreTools = displayCount < filteredTools.length

  const loadMore = () => {
    setDisplayCount((prev) => prev + 12)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground mb-6">全部 AI 工具目录</h1>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto justify-between">
                  {selectedCategory === "All" ? "所有分类" : selectedCategory}
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
                    {category === "All" ? "所有分类" : category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="搜索工具名称或关键词"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            找到 {filteredTools.length} 个工具
            {selectedCategory !== "All" && ` · ${selectedCategory}`}
            {searchQuery && ` · "${searchQuery}"`}
          </p>
        </div>

        {/* Tools Grid */}
        {displayedTools.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayedTools.map((tool) => (
                <div key={tool.id} className="h-fit">
                  <ToolCard {...tool} />
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMoreTools && (
              <div className="flex justify-center">
                <Button onClick={loadMore} variant="outline" size="lg" className="px-8">
                  加载更多工具
                </Button>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">未找到相关工具</h3>
            <p className="text-muted-foreground mb-4">尝试调整搜索条件或选择其他分类</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
              }}
            >
              重置筛选条件
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
