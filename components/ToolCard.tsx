"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Image from "next/image"; // 导入 Next.js Image 组件

interface ToolCardProps {
  logo: string
  name: string
  tagline: string
  category: string
  url: string
  variant?: "standard" | "compact"
  // 如果工具名称和标语需要翻译，从页面级别传递翻译后的文本
  // translatedName?: string;
  // translatedTagline?: string;
  // translatedCategory?: string;
}

export function ToolCard({ logo, name, tagline, category, url, variant = "standard" }: ToolCardProps) {
  const isStandard = variant === "standard"

  // 优先使用翻译后的文本，如果提供的话
  // const displayName = translatedName || name;
  // const displayTagline = translatedTagline || tagline;
  // const displayCategory = translatedCategory || category;
  // 为简化，这里直接使用传入的 props，实际项目中应考虑翻译

  return (
    <Card
      className={`
        group cursor-pointer transition-all duration-300 ease-in-out
        hover:-translate-y-2 hover:shadow-lg h-full flex flex-col justify-between {/*确保卡片高度一致且内容分布合理*/}
        ${isStandard ? "shadow-md rounded-lg border-0" : "border border-border rounded-md shadow-none hover:shadow-md"}
      `}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center relative shrink-0">
              {/* 使用 Next/Image 进行图片优化 */}
              <Image
                src={logo || "/placeholder.svg"}
                alt={`${name} logo`} // SEO: 描述性 alt 文本
                className="object-contain"
                fill // 使用 fill 属性，父容器需要有固定尺寸或相对定位
                sizes="(max-width: 768px) 10vw, 5vw" // 根据您的布局调整
                onError={(e) => {
                  // Next/Image 的 onError 处理方式与原生 img 不同
                  // 可以考虑一个状态来切换到备用内容
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none"; // 隐藏损坏的图片
                  if (target.parentElement) {
                    const fallbackDiv = target.parentElement.querySelector('.fallback-char');
                    if (!fallbackDiv) { // 防止重复添加
                        const fallback = document.createElement('div');
                        fallback.className = "fallback-char h-full w-full flex items-center justify-center text-xl font-bold bg-muted-foreground/10 text-muted-foreground";
                        fallback.textContent = name.charAt(0).toUpperCase();
                        target.parentElement.appendChild(fallback);
                    }
                  }
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg leading-tight truncate" title={name}>{name}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2" title={tagline}>{tagline}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs shrink-0">
            {category}
          </Badge>
        </div>
      </CardHeader>

      <CardFooter className="pt-0 mt-auto"> {/* mt-auto 将页脚推到底部 */}
        <Button
          variant={isStandard ? "default" : "outline"}
          size="sm"
          className={`
            w-full group-hover:shadow-sm transition-all duration-200
            ${isStandard ? "shadow-sm" : ""}
          `}
          asChild // 使用 asChild 以允许 Button 包装 <a> 标签
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            {/* 这里的文本也应该来自翻译文件，例如 t.tryTool.replace('{toolName}', name) */}
            <span>尝试 {name}</span>
            <ExternalLink className="ml-2 h-3 w-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

// 示例用法组件 - 如果直接显示，这部分也应本地化
export default function ToolCardExample() {
  const tools = [
    {
      logo: "/placeholder.svg?height=40&width=40",
      name: "ChatGPT",
      tagline: "对话式AI，可帮助完成写作、分析和创意任务",
      category: "聊天", // 注意：分类也应该是可翻译的或使用固定键
      url: "https://chat.openai.com",
    },
    {
      logo: "/placeholder.svg?height=40&width=40",
      name: "Midjourney",
      tagline: "为创意专业人士提供AI驱动的图像生成",
      category: "图像",
      url: "https://midjourney.com",
    },
    // ... 其他工具
  ];

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">AI 工具卡片</h1>
        <p className="text-muted-foreground mb-8">
          可重用组件，展示具有标准和紧凑型变体的不同AI工具。
        </p>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">标准样式</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tools.map((tool, index) => (
                <ToolCard key={index} {...tool} variant="standard" />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">紧凑样式</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tools.map((tool, index) => (
                <ToolCard key={index} {...tool} variant="compact" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}